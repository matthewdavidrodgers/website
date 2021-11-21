---
title: "Cryptopals in c: Part 2"
date: 2021-11-21T13:03:00-05:00
draft: false
summarizable: true
---

[Previously](/posts/cryptopals-in-c-part-1), I talked about my headaches with c in my journey (and it does feel like a journey) to solve [challenge 6](https://cryptopals.com/sets/1/challenges/6) of the cryptopals challenges.

I just realized "cryptopals" might give you the impression of something quite different if you're not familiar with computer science. These challenges have _nothing_ to do with cryptocurrencies and the blockchain.

{{< aside >}} As an aside: fuck that noise. {{< /aside >}}

They're about foundational security and cryptography concepts, like encryption. Ok. Just wanted to be extra clear on that point. ANYWAY.

So last time I focused on my issues with c as a language, but for this post, I'm going to focus on what actually went wrong in my implementation. I do assume you have a basic grasp on what the challenge entails, so I'd recommend reading the challenge first.

## A cardinal sin

There were a lot of little things that took a while to get working, but there was one specific thing I did wrong that caused a ton of other issues: using poor examples to test my implementation against.

It came from the correct impulse. The challenge gives a base64 encoded file as the cyphertext, and I felt that that was just too much data to reason about as I was iterating on my solution. I would never know if I was on the right track until I got it totally correct, and there were plenty of steps that could independently go wrong.

So, instead of starting with the full file, I swapped between two examples. One, a previous example of repeating-key XOR encryption from cryptopals [challenge 5](https://cryptopals.com/sets/1/challenges/5):

```c
plaintext: "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal"
key:       "ICE"
```

As well as example from a helpful [blog post](https://arpitbhayani.me/blogs/decipher-repeated-key-xor):

```c
plaintext: "secretattack"
key:       "$^!"
```

Since I knew what the key was, I could evaluating how close I was at each step. Didn't get 3 as the best keysize? Well, I knew to start at my keysize analysis.

However, this got me into a ton of trouble. This is because the algorithm to break repeating-key XOR relies pretty heavily on average distributions. How close a set of text is to the average distribution of english, how the average hamming distance looks, etc.

And while I hoped that at least the cryptopals example was big enough, the fact of the matter is that both samples are too small for this algorithm. Crucial parts of the algorithm just seemed to fall apart.

### Hamming distance analysis

For that first example, I was _never_ able to produce 3 as the likely keysize. The top keysizes I produced were 28, 24, 33, and 12.

If manually set the best keysize to 3 and continued on with the algorithm, I was able to decrypt successfully. So I knew I needed to refine the keysize analysis.

I resorted to keeping a bigger list of my top keysizes and re-scoring the plaintext that came out of my results for each (after determining the best key for that size) and picking the best one, but even that didn't get my the correct key or even size.

You'll likely notice that all but one of those keysizes are multiples of 3, which is promising. But 3 doesn't appear even in the top 10. I supposed there's probably some way to deduce a keysize like that, But determining a common lowest common denominator with outliers sounded a bit like a headache.

To be honest, I don't know why the hamming distance for these blocks didn't produce the correct keysize, but my best guess is to chalk it up to too small a sample.

### English distribution scores

For my second example, I was successfully able to determine that 3 was the best keysize, but that seems mainly due to luck - the keysize _had_ to be between 2 and 6 (half of the cyphertext).

But when I broke the cyphertext into 3 transposed blocks (see the challenge for more info) I was unable to figure out the right characters for the key in every case.

As a bit of background, you break the cyphertext into __K__ transposed blocks (where __K__ is the determined keysize) because of the repeated behavior of the key. Since you know the keysize, you know that every __K__th character in the cyphertext is going to be XORed against the same character of the key.

So rather than try every possible permutation of the key, you can pick out those characters that will be XORed against the same thing (the transposed buffers) and decode them as if they were encrypted by a single repeating byte. The byte that produces the most english-ish buffer is the character that each __K__ th byte in the cyphertext is XORed against. You do this __K__ times, offseting where you start in the cyphertext by one each time to cover the entire buffer.

This allows you to make exponentially fewer comparisons:

```text
to try every permutation of a keysize K
you essentially need to test against every
combination of bits in your K bytes:
256 ^ K

to decode K transposed buffers against a single byte
you only need to test every combination of bits in
a single byte, K times:
256 * K
```

And so, when I ran this algorithm against the second example, I got the key __"$O'"__.

Hm. Well I was expecting __"$^!"__. So _one_ of those characters is right. 

So instead of merely picking the best, I decided to rank the top 6 best keys for each transposed block. __$__ was the best key for block 0, obviously. __^__ was the 2nd best key for block 1, and __!__ was the best key for block 2. Hm. I was doing everything correctly, but I wasn't getting the right keys.

At first I though I'd just skip this transposed block step - once I have the keysize, couldn't I just brute force the key? That turned out not to be a great idea, as you can imagine. Fine for small keysizes, but it gets expontentially worse as the keysize gets bigger. At some point I realized I was about to make 281474976710656 iterations in a loop, and once I saved my poor CPU, I abandoned that approach.

So why wasn't I getting the right keys with this approach?

Well, this transposed blocks method helps you shortcut the amount of comparisons that are needed. But it hides an important fact:

The distribution of characters in the transposed buffers is _not_ the same as the distribution of characters in the full buffer. This screws up your scoring mechanism, since you score on character distribution being closer to the average english distribution.

It's _likely_ to be _similar_, but isn't guaranteed.

For example, a key part of english is that the character __e__ is frequently used; its distribution is much higher than something like __v__ or __t__.

But consider a plaintext that is produced like this:

```c
zzzzzlishammfehsliblimary
```

Gibberish, but let's take the distribution of __z__ as an example. In any 
english text, the distribution of __z__ is low. However, we can see that it's not really all that low here. But what do the the transposed blocks look like?

```c
zlmsi zimlm zsfia zhebr zahly
```

In each of those transposed blocks, the distribution of z _is_ low. So whatever keys that resulted in those transposed blocks clearly can't take into account what their distribution is once combined with the other blocks.

So this lead me to try and mix this approach with my brute force approach. I have my top characters for each block (let's say __N__ top characters) What if, instead of brute forcing every single key possible for a keysize __K__ (trying every combination of the values at every position-- full 256 values each-- in K), I tried every combination of with _just_ my __N__ top characters at each position.

So if my keysize was 3:

```text
brute forcing it for every possible key:
256 ^ 3 = 16777216

but brute forcing it for just my top N characters:
3 ^ 3 = 27
```

Just for kicks, this is what a reduced version of that looked like in c:

```c
void iterate_possible_keys(char **best_keys, size_t keysize, size_t num_best_keys)
{
    size_t i, at_pos, *positions;
    uint8_t *key_buffer;
	
    // positions keeps track of what permutation we're at
    // via index and value
    //
    // i.e. positions = {0, 1, 2, 1} would mean that
    // to make the key for this permutation, we'd want
    // the key at best_keys[0][0] (so the 1st best key for position 0)
    // the key at best_keys[1][1] (so the 2nd best key for position 1)
    // the key at best_keys[2][2] (so the 3rd best key for position 2)
    // the key at best_keys[3][1] (so the 2nd best key for position 3)
    positions = (size_t *)malloc(sizeof (size_t) * keysize);
    for (i = 0; i < keysize; i++)
        positions[i] = 0;

    key_buffer = (uint8_t *)malloc(keysize);

    for (;;)
    {
        // fill the key_buffer with the current permutation
        for (i = 0; i < keysize; i++)
            key_buffer[i] = best_keys[i][positions[i]];

        // do your work on the key for this permutation
        // ...
        // ...
        // ...

        // iterate
        at_pos = 0;
        positions[at_pos]++;

        // propagate carry up
        while (positions[at_pos] == num_best_keys)
        {
            positions[at_pos] = 0;
            at_pos++;
            if (at_pos == keysize) break;
            positions[at_pos]++;
        }
        if (at_pos == keysize) break;
    }

    free(positions);
    free(key_buffer);
}
```

So, I tweaked the algorithm, and gave it run.

Out came the key __"7^&"__. Ugh. Still not there.

But, I still checked what the cyphertext decoded to with that key: "`edaesrtsrcl". That's definitely wrong. But... the distribution of characters actually looks pretty close to the average english text. At least no worse than the "correct" plaintext ("secretattack").

So, just for kicks, I scored both of those texts as english:

```text
distribution scores (note: lower is better)

"`edaesrtsrcl": 0.464264
"secretattack": 0.539537
```

UGH. It actually scores _better_ than the correct plaintext. At this point, I was about ready to tear my hair out.

What's worse was that this limited brute force solution _still_ wasn't feasible for large keysizes. It was still exponential in nature, and any keysize bigger than 10 or so was just painful. I was never even able to finish a run against the my first example - those keysizes were just too big.

There's no way around it: both of those examples were just too small of a sample size to apply this algorithm to. And here's how that finally dawned on me.

## A lightbulb falling on my head

I was pretty disheartened by now, unsure of what I could possibly be doing wrong. I was also upset at the description of the challenge, as it was clear just following the steps as described isn't a complete solution.

Finally, I decided to just try my solution on the base64 file (I did have to turn off my limited brute force algorithm, that was just too unweildy).

But I swapped out my examples for the file, and gave it a run. And then my jaw dropped on the floor.

Totally decoded.

All my fancy optimizations and analysis weren't needed _at all_. With a big enough sample (like a whole file), this algorithm works GREAT.

After I was finished kicking myself, I noticed there was one small thing wrong.

### Base64 corruption

I oversold it a little with "totally decoded". In the resulting plaintext, there were occasional wrong characters, seemingly at random.

In a smaller sample, this would've been much more catastrophic. But the file was large enough that these occasional wrong characters didn't do enough to offset the average distribution of characters; it still registered as english to the algorithm.

I scratched my head on this for a bit. Could the key have a character wrong? No, there'd be a regular corruption at the same offset, and the corruption was observably random. 

The keysize couldn't be wrong, because we wouldn't this much correctly decoded plaintext - a wrong keysize would ripple much more than this.

That pointed me in one direction: my decoding from [base64](https://en.wikipedia.org/wiki/Base64) must be wrong. Since base64 isn't a one-to-one byte operation (decoding of a byte involves more than one byte in the encoded source; the lengths of the source and the encoded result are different) so it would be very possible for a small mistake to propagate to something very hard to trace once decoded. 

But I implemented base64 in challenge 1! Could I really have had it wrong for so long?

I re-ran that challenge, and couldn't see anything wrong. It produced the result that I expected! But I wanted to be sure. So I copied the expected result in and asserted that my result was the same.

And got a big fat error. I _was_ slightly corrupting when converting to and from base64!

I very quickly figured out that I had a typo in my base64 character set. A __Z__ instead of a __V__. This meant that either of those characters in base64 source were decoded incorrectly, and since those characters are almost always combined with other characters to produce a decoded byte, every combination produced a different corruption. It was possible to trace, definitely, but tough to pick up on the pattern if you didn't know what you were looking for.

And once I fixed my base64 conversion, I got a clear plaintext. Totally perfect.

## Not all bad

I won't lie, solving this challenge was a bit of a mess. I made some crucial mistakes as I was iterating on my implementation that made complexity spiral and still got me nowhere. And I was constantly tripping over myself with c.

But I wanted to highlight that it wasn't all bad -- in fact, I had a lot of fun with this! And I even found some things really pleasant in c, if you can believe it.

### Conditional compliation

Everyone warns you about the preprocessor; it's a totally separate system from the rest of the language, so you can really tie yourself in knots over it.

But I found using __#define__ flags and then using __#ifdef__ blocks around certain sections of code to be really helpful.

Given how much legwork is often needed around routine operations in c (allocation, initialization, freeing, etc.), writing and deleting all that code when you just want to debug something is a bit of headache; you can get a bit lost when just going through debug steps.

But with a simple macro flag, shared in a common header file, you can turn features on and off just by defining a macro. Here's an example:

```c
int main()
{
    bbuf cyphertext_b = bbuf_new();
    xor_decode_details result;
    char *plaintext, *keytext;

    // base64_file_cyphertext loads the contents of a file into a
    // buffer and converts from base64
    cyphertext_b = base64_file_cyphertext(DATA_FILENAME);
    
#ifdef DEBUG_VERBOSE
    // bbuf_print prints the contexts of a buffer
    // in a human-readable format
    // BBUF_HEX specifies to print in hex
    bbuf_print(&cyphertext_b, BBUF_HEX);
#endif

    // decode_rk_xor solves repeating key xor for a buffer
    result = decode_rk_xor(&cyphertext_b);

    // toString allocates and fills a string based on
    // the contents of a buffer, interpreted as ascii
    keytext = toString(&result.key_buffer);
    plaintext = toString(&result.plaintext_buffer);

    printf("decoded using key\n\"%s\"\nto\n\"%s\" with score %f\n",
           keytext, plaintext, result.score);
#ifdef DEBUG_VERBOSE
    printf("\tkey: ");
    bbuf_print(&result.key_buffer, BBUF_HEX);
    printf("\tplaintext: ");
    bbuf_print(&result.plaintext_buffer, BBUF_HEX);
#endif

    free(keytext);
    free(plaintext);
    // bbuf_destroy deallocates memory for a buffer
    bbuf_destroy(&result.key_buffer);
    bbuf_destroy(&result.plaintext_buffer);

    bbuf_destroy(&cyphertext_b);
    return 0;
}
```

The limited brute force solution I mentioned above? That was guarded behind an __#ifdef__ as well. When I didn't want to brute force my top keys, I'd just flip that flag, no need to rip out a chunks of an algorithm.

Sure, some things like this could be accomplished with runtime flags, but if the code you want a guard around is mutually exclusive with the rest of the code and won't compile if compiled all together, these compile-time guards are really useful.

### bbuf api

I've talked a lot about "buffers" in these posts. A cardinal rule of the cryptopals challenges is "Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing."

To that end we need a structure to represent a buffer of bytes. In c, any such dynamic structure takes some work, as dynamic memory must be manually managed.

My solution is a structure called __bbuf__ (for "byte buffer"). It's a simple structure, analogous to a "slice" in Go.

```c
typedef struct {
    size_t   cap;
    size_t   len;
    uint8_t *buf;
} bbuf;

typedef enum { BBUF_DECIMAL, BBUF_HEX, BBUF_GRID, BBUF_GRID_ASCII } bbuf_print_format;

bbuf bbuf_new();
void bbuf_init(bbuf *bbuffer);
void bbuf_init_to(bbuf *bbuffer, size_t size);
void bbuf_append(bbuf *bbuffer, uint8_t b);
void bbuf_slice(bbuf *dst_bbuffer, bbuf *src_bbuffer, size_t start, size_t end);
void bbuf_destroy(bbuf *bbuffer);
void bbuf_print(bbuf *bbuffer, bbuf_print_format format);
```

I won't show the implementation of these methods, but I was quite happy with how it felt to use this api. I can credit a lot of this to the "chunks" struct and api in Bob Nystrom's "Crafting Interpreters", a very helpful reference material for a lot of my work here.

## Final words

I'll be brief here; I've already written too much on this one challenge.

I'm a bit disappointed that the first example that I tried decoding against, the one that was sourced directly from a previous cryptopals challenge, doesn't seem to work with this algorithm. I assumed too much on that front, and it really bit me.

Going forward, I think my impulse to re-write my solutions in Rust is a good idea. Once I complete each set of challenges I'll attempt porting them. No better way to learn, right?

This is very obviously only the beginning: challenge 6 of 64. I'm hoping that all my missteps and hurdles were a step towards mastering lower-level programming like this, and at least smooth the way forward. After all, if I can take challenge 6's disclaimer as accurate, I've qualified for the rest of the challenges. 
