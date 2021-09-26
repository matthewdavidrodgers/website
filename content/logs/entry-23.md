---
title: "Entry 23"
date: 2021-09-26T16:43:42-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Not too much to update on this week. Lots of housekeeping and boring tasks.

I did upgrade Marilyn (my pc) with a new drive today. An NVMe M.2. It's really wild how much storage has changed over the years. These M.2 formats are _miniscule_. And SO fast. What an improvement over hard disk drives, and seemingly so fast in their adoption!

I installed a copy of Ubuntu on a partition on this new drive, as I've been more and more frustrated by the limitations of WSL (the way you can run a linux distro within windows). It's slow, doesn't allow access to some devices (like speakers, I don't think), and it seems INCREDIBLY behind. I have a debian distro in WSL, and it's crazy behind the latest maintained version of the distro - and that bleeds in to what's available on the package registry. I can't remember why, but I had to build
git from source to get around some stupid issue.

So I'm excited to have an actual copy of linux running again. But faced with the fresh install, I could only feel dread in all the configuring I'd need to do. And so I promply restarted and went back to Windows. I'll return to it when I have more energy.

I've been working more on those cryptographic challenges from cryptopals. Made plenty of progress on one that I was stuck on, but the boring part (to me) keeps tripping me up - scoring a piece of text as how likely it is that it's plaintext. It has to do with evaluating character frequencies based on the english average, but there are quite a few hiccups along the way. My scoring algorithm is _almost_ always right but some things are slipping through the cracks. I'd much rather not have to content with the wishy-washy-ness that is english and just fiddle with some bits. But oh well. It's still interesting.

I got a couple new textbooks this week: The Rust Programming Language-- called "the book" by the initiated; it's authored by the rust core team-- Programming Rust-- an O'Reilly Rust book that I've heard good things about-- and good ole Crafting Interpreters by Bob Nystrom. I learned so much from Nystrom's book-- whether it be packing flags in data or writing a performant hashmap or just general structure for memory management in C code-- that I decided it'd be good to have it around. Also definitely want to support all the work that went into that fantastic book. As for the Rust books, I've decided to dive in there. No more wasting time. I'm getting through "the book", but I'm taking my time with it. It's a fascinating language, and I'll update more about my progress as I go.

Other than that: making progress through Red Mars, which I'm finding fascinating, and I started The Sopranos this week. Really suprised me how immediately good it is, and on a caliber that is still only occasionally reach today. Also considering trying Foundation out, if only for some good sci-fi effects and Lee Pace, but unsure if that's worth it.

I'll close out with [this](https://nickb.dev/blog/reality-check-for-cloudflare-wasm-workers-and-rust) blog post on Rust and Cloudflare workers. I'm really fascinated with what's developing in the compute at edge space, especially with the toolbox that wasm may open up, and obviously really excited about Rust in general. So it was good to read a tempering view on the whole subject; helps to round out my context. 
