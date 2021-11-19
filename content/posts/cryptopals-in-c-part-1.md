---
title: "Cryptopals in c: Part 1"
date: 2021-11-18T22:10:17-05:00
draft: false
summarizable: true
---

Yesterday, after months of work, I finally solved one of the beginner [cryptopals challenges](https://cryptopals.com/).

Ok, that's not totally fair. It's not like I've been working on it a bunch over all these months. I've been picking it up here and there when I have the time, which is usually just an hour or two on the weekends.

It's also supposed to be one of the harder challenges. A kind of "guantlet"; if you can get this one, you should be totally equipped to tackle the rest.

And to top it all off, I'm doing the challenges in possibly the most painful language to do them in: old school c.

## The Why

I [noted](/logs/entry-20) when I started picking my way through these challenges that I was drawn to them for their similar premise to Bob Nystrom's "Crafting Interpreters": yes, the topic is scary (in this case, cryptography), but with the right teacher and sufficient work, anyone can master the arcane arts of computer science.

And like Nystrom's book, they're a window into hands-on systems programming exercises. It's a world I'm becomming more and more obsessed with, but one I'm still on the outside of. Any opportunity to build the muscles required for this type of work is very valuable to me.

But why c? I started in Go, but quickly abandoned that approach and rewrote all my work in c. Honestly, the reason I'm using c is because I _want_ to be using Rust. I'm slowly learning Rust, but I haven't really committed to my textbooks yet, mainly because I want to get "my c legs" (get it?).

Rust is loved by so many develpers, partly because of how it supplants c's often arcane rules and footguns while providing nearly all of its power. I feel comfortable in c, but not really proficient. I want a more intimate knowledge of why people use it and why people hate to use it. I'm hoping that if I can up my c creds I'll be able to appreciate Rust earnestly. This is not to say that Rust won't feel special without the battle scars of years of writing c; plenty of people come from Ruby or JavaScript or all over the programming world before falling in love with Rust. But c is a systems programming staple, it'll never go away.

Although I am starting to wonder if this whole "get my c legs" thing is a waste of time. It's not like I'll ever "master" c (very few have), and the best way to learn a new language is to ge practical experience with it. Maybe after each set of challenges, I'll go back and port all my c code to Rust. We'll see. 

## Challenge 6

[Challenge 6](https://cryptopals.com/sets/1/challenges/6) is about breaking repeating-key XOR. i.e., if we have a buffer of plaintext data and a fixed key, we create a buffer the same size as our plaintext and repeat the key over and over until it's filled, and then XOR the two buffers, each byte at a time, to get our cyphertext.

Breaking this encryption (meaning, deriving the key and re-XORing the cyphertext to produce the plaintext) comes in two steps: first, we determine the likely size of the key. 

This first step is accomplished by analyzing the "hamming distance" between different sizes of contiguous blocks of the cyphertext. I'm not going to go over all the details here, as the method is described in the challenge, and you can learn more there.

Step two involves breaking your cyphertext and transposing it into K blocks, where K is your determined best keysize (i.e. if your keysize is 3, you'd have 3 blocks. The first block would contain byte 0 of the cyphertext at position 0, byte 3 at position 1, 6 at 2, etc.).

You solve each of these blocks as if they were encoded with a XOR by single repeated byte. By determining the byte for block X, you've determined the character at position X in the key, and you can build the key.

## What went wrong

Man... what _didn't_ go wrong. I definitely made a lot of beginner mistakes, but some of my mistakes were so slight and caused such catastrophic failures.

Some of this reads as a hall of fame for c footguns, and some definitely reads as MATT YOU IDIOT. I'll let you be the judge for which is which.

### Uninitialized variables

One of the stupidest things I repeatedly ran into was uninitialized variables. In c, variables that are declared but not initialized with a value are filled with random bits.

```c
  int x = 0; // this is predictably 0
  int y; // this is, well, you have no idea. maybe 1042392817. or maybe -44.
```

I'm sure there was a valid reason for this behavior for compilers in the 70s. But good LORD does this make no sense today. And it creeps up ALL over the place.

To make matters worse, I was trying to code according to the C89 standard, which has an additional restriction about variable declaration: all variable declarations must come at the beginning of a function, before any other statements, presumably so the compiler can set aside storage on the stack.

```c
// a function like this
int *fn(int num) {
  int min = 40;
  int len = min > num ? min : num;
  int *data = (int *)malloc(sizeof (int) * len);

  for (int i = 0; i < len; i++)
    data[i] = i;

  return data;
}

// would look like this in C89
int *fn_c89(int num) {
  int i, min, len;
  int *data;

  min = 40;
  len = min > num ? min : num;
  data = (int *)malloc(sizeof (int) * len);

  for (i = 0; i < len; i++)
    data[i] = i;

  return data;
}
```

It's a contrived example, and I'm making it even more contrived by assigning constants immediately after initializing them (even in C89 you could combine those steps), but the principle is there.

What would happen if you forgot to initialize min to 40 in the second example? Well, you'd get garbage data there, and it if was sufficiently large, you could be malloc'ing an obscenely large amount of memory, and crash your program. 

Or, let's take an example I actually ran into, frequently. I had a struct (a bbuf, or a dynamic "byte buffer") that I wanted to make a "slice" function for, one that would copy a section of a bbuf into a specified one.

I wanted this function to be fairly permissive to use. If the destination bbuf didn't have the capacity for the new section, or was unallocated, it would be allocated to the required size. Otherwise, we'd simply iterate over the buffer and copy the data over.

That second case, _if it was unallocated_, proved especially finicky. Because my instinct was to check for NULL; if the pointer was NULL, we'd need to allocate.

But a pointer is just an unsigned integer, and when a pointer is declared but not initialized, it's filled with random bytes.

So if I ever declared a bbuf but didn't initialize it-- which, to be honest, was very common. There's more syntax around structs than primitives-- the pointer contained with in would be non-NULL. 

And if you tried to fill it via the slice function, the function wouldn't see the pointer as uninitialized, and attempt to write into it. BAM. seg fault. VERY OFTEN.

### Unchecked array bounds

Seems like a simple one, but the dangerous part about this is that accessing an array past its bounds _is perfectly legal in c_. No compiler errors, no runtime warnings, no nothing.

Instead, when you access past an array's bounds, if that memory location is invalid, you get a seg fault when you attempt to read it. But that's actually the best case scenario.

If, instead, the memory location _happens_ to be valid, you read (and potentially write) that memory.

And man. THAT is hard to trace down.

I had a particularly gnarly case of this where I was getting a seg fault while iterating over a bbuf, but I could not trace down why. I followed every path that the struct took, and nothing ever went wrong. Until at one point, a read suddenly seg faulted.  

I spent a lot of time in lldb (the debugger for llvm compilers) trying to figure out what had gone wrong.

Eventually I set a watchpoint on the actual memory location for the buffer, halting whenever that location was written to. But when I ran the program, it halted at a location that made no sense! It was in a loop in a totally separate function, where the bbuf wasn't even in scope.

So I ignored it (lldb is weird, it's not that weird of an assumption) and kept debugging. But I kept getting led back to that function.

It wasn't until I spent some time pouring over it that something caught my eye. Let's see if you can spot it quicker than me.

```c
double score_buffer_as_english(*bbuf buffer)
{
  size_t i;
  uint8_t byte;
  int buffer_char_amounts[52];

  for (i = 0; i < 52; i++)
    buffer_char_amounts[i] = 0;

  for (i = 0; i < buffer->len; i++)
  {
    byte = buffer->buf[i];
    buffer_char_amounts[byte]++;
  }

  // ... function continues ...
}
```

You might notice that buffer_char_amounts has a length of 52. You may also notice that we pull a uint8_t out of our bbuf and then... index into buffer_char_amounts with it, reading and writing at that location.

Ok, you do know have to know some c to realize what's wrong here, because a uint8_t is a full byte; 8 bits. That means 256 possible values. I'm no mathematician, but 256 > 52. Our index is potentially bigger than our bounds.

And, lucky me, the location at this faulty index happened to not only be valid, but also coincidentally was the location of a heap-allocated bbuf's length member.

I read the value correctly, incremented it, and stored it back. Then, when I went to iterate over that buffer, its length member was bigger than the buffer actually was, and when I went to access that bigger size, I got an _invalid_ memory location this time. Voila, seg fault.

So, even though my bbuf wasn't even in scope, reading past an array bounds put me in coincidentally valid heap memory, and I scrambled all sorts of data. Talk about a footgun.

### Lack of generics

I feel spoiled when I gripe about this, but without generic programming, operations for even simple data structures get complicated.

This spawned from a need to maintain an array of structs, sorted by one of their members. Ok, I can do that; no problem.

```c
// our struct
// we want to sort them by their "score" member
typedef struct keysize_t {
    size_t keysize;
    double score;
} keysize_t;

// given an already sorted array of keysize_t's with a size and capacity
// find the place where we would insert a given item
// if the array isn't yet filled to capacity
// or if the item should be inserted in the middle
// move elements as necessary and insert the target one
// return the inserted index or -1 if it wasn't inserted
//
// note that the caller is responsible for updating the len of
// the array based on the result of this function
ssize_t insert_at_sorted_capped_col(keysize_t *collection, size_t len,
                                    size_t cap, keysize_t item)
{
    ssize_t insert_index = 0;

    // a simple linear probe, comparing based the score member
    while (insert_index < len && collection[insert_index].score < item.score)
        insert_index++;

    if (len < cap || insert_index < len)
    {
        // if there are any elements following the insert_index
        // we need to shift them over by one slot to make room
        if (len > 0 && insert_index < len - 1)
            memmove(collection + insert_index + 1, collection + insert_index,
                    sizeof(keysize_t) * (len - insert_index - 1));
        collection[insert_index] = item;
    }
    else
        insert_index = -1;

    return insert_index;
}

```

It's c, so it's admittedly gnarly. But it's fairly simple at its core.

The problem shows up when you want to do the same operation on a different type. What do you do for this struct?

```c
// a similar struct
// but instead of a size_t keysize, we have a uint8_t key
typedef struct sb_xor_decode_details {
    uint8_t key;
    double  score;
} sb_xor_decode_details;
```

Everything would be almost identical. You're even comparing on the same member, "score". It'd be a shame to duplicate the entire function just for a different type. So, you have a few options.

You could use ditch the type and use void pointers, and maybe pass in a size of the struct for when you need it with memmove. But, uh, considering how much I've screwed up so far, I don't think I want to willingly introduce void pointers.

Maybe you could use the preprocessor. Define a macro that would take a type and emit a function with the types swapped. Then you'd just use the macro to "create" a function with the type you need.

That's better, but you're still locked into your structs' shared "score" member. If you ever want to do the same operation with structs that have a different shape, or maybe with primitives, the output of your macro wouldn't compile.

Maybe you could consider extracting the comparison out, and using that as a kind of argument, either to the macro or the emitted function. But this is still c, so we don't have first-class functions or lambdas. You'd have to resort to function pointers.

And again, I have to be honest and admit I was too scared to use function pointers. I think this is actually the "right" way to do this, but I was worried about too much going wrong.

Repeated code that I understand is better than DRY code that I don't, so I simply copied the function and tweaked the types. The show must go on!

## Far from finished

I have learned a LOT since starting these challenges. And this is only the beginner set!

I've seriously slowed my progress down by committing to using c, and while I definitely want to pull my hair out at times, I'm getting a masochistic sort of rush from the exercise.

Challenge 7 involves using OpenSSL, a famously poorly-documented library (libssl). And that beckons in all sorts of nightmares with dynamic linking, so I'm far from finished with my c woes.

But c only accounted for half (maybe even less) of my obstacles when working on this challenge, and in part two, I'll go over what my other issues were.
