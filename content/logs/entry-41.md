---
title: "Entry 41"
date: 2022-04-17T17:01:59-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Making my way through "Showstopper!", a book from the early nineties about the development of Windows NT. It's very deliberately aped after "The Soul of a New Machine", if a little less elegant. The familiarity has started to wear on me, as well as the unavoidable conclusion that this is just a story about an incredibly unhealthy work environment.

However, it continues to be fun to have literature pointed at my craft, and any writing about the development of operating systems is at least a little entertaining to me. Plus, I don't actually know anything about Windows NT - what purpose it surved, its impact, what interacting with it looked like. So I don't know if the descriptions given by this author are really accurate for a computer scientist, or whether they're simplified or bent for non-technical readers. Maybe there's some big twist about its reception, I couldn't say!

Still somehow playing Elden Ring. 95 hours in. Still haven't glimpsed the end. I still haven't even revealed 100% of the map yet!! I hope I never hit the credits.

Solved [challenge 12](https://cryptopals.com/sets/2/challenges/12) from set 2 of the cryptopals challenges today, although almost in spite of the challenge itself. I'm finding the descriptions of these challenges increasingly unhelpful, almost hostile. For instance, it's not explained at all where in your code you're "allowed" to see the secret plaintext. You're trying to break the encryption on it, so you're obviously not allowed to just look and see what it is. But your "encryption oracle" must know the plaintext, and be able to pass it to an encryption cipher as many times as it wants. What's not clear from the description is that you need to consider the oracle as a boundary - treat it as though it was an external piece of code that you know nothing about. Maybe it's an api endpoint on somebody's server, and you're trying to figure out a secret piece of text they keep encrypting.

But I finally managed to solve it, in both c and rust. And it actually led me to one of my favorite pieces of rust code that I've written recently:

```rust
pub fn make_oracle<'a>(secret_content: &'a Vec<u8>) -> Box<dyn Fn(&Vec<u8>) -> Vec<u8> + 'a> {
    let rand_key = Vec::<u8>::from_rand_bytes(16); // method from a custom trait

    Box::new(move |known_prepend: &Vec<u8>| {
        let adjusted_text = [&known_prepend[..], &secret_content[..]].concat();

        aes_ecb(&adjusted_text, &rand_key, Mode::Encrypt)
    })
}
```

I love this so much because it looks like heiroglyphs, but I actually know what everything means and why it's there! It's a function that returns a closure, represented by `Fn(&Vec<u8>) -> Vec<u8>`, but `Fn` is a trait, not a type. So we need `dyn` prepended to use a trait object. But a trait object isn't sized, the compiler has no idea what type that implements a given trait will be, and thus can't be a return type for a function. So we box the trait object, capturing it in a fixed size pointer. And lastly, the body of closure captures `secret_content`,the argument to the top level function, which is a reference, not an owned type. To make sure that the reference always lives long enough to always be valid when we call the closure, we add a lifetime parameter, and tie `secret_content` and our trait object together. If `secret_content` ever goes out of scope, the closure is invalid. Who said rust was hard?

Just kidding, but I do love how much my understanding has grown over the past couple of months! And of course, just as I'm feeling a bit comfortable in rust, I get thrown to the wolves in c++. MAN does that language make no sense. I (tried) to read about [closures in c++20](https://www.scs.stanford.edu/~dm/blog/c++-coroutines.html), and I just had no chance at really grasping the basics there. I've actually already used c++ coroutines at work already, but in an already established pattern, with an async event loop already built in taking care of everything. 

Finally, last night I watched Broadcast News for the first time. And it blew my mind. I won't go in to it much more than saying: this is a perfect movie. If you haven't seen it, make it a priority. Having already fallen in love with Modern Romance, Albert Brooks might very well have become one of my favorite filmmakers ever.
