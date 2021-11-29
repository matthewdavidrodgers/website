---
title: "Entry 28"
date: 2021-11-28T18:48:41-05:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Heading back to LA this week, but then coming right back home after a few weeks. I've really enjoyed my time back; went to see some of my favorite local bands at our favorite bar, and spent a lot of great time with my family.

Read a great [post](https://engineering.tines.com/blog/understanding-why-our-build-got-15x-slower-with-webpack) about a seemingly random 15x slowdown in node -- turns out a symbol that definitely should've been local on Arrays was applied globally by v8, and caused code to consistently take a slower path. In something like a webpack build, Array operations will definitely constitute a lot of the work happening.

I very quickly solved the two remaining challenges in the first cryptopals set, which honestly surprised me, as it required dynamically linking and using the OpenSSL libraries. But, somehow, it was fairly simple. I even made it worse for myself by having a separate copy of the ssl libraries (OSX provides LibreSSL, but I wanted to stick to OpenSSL), and didn't link it to /usr/lib. But it was somehow really easy to point clang to a new location for libraries.

But, since I've finished set 1, I've decided to re-implement all my c code in Rust, to really explore the language. So I've been reading The Rust Programming Language in earnest, and I've actually made a lot of progress.

I'll probably save my full impressions until I'm further along, but I'm really impressed with the language and this book. I am definitely having some trouble with ownership and references, and I'm surprised that references can be this complex (although the memory system definitely requires it). But with every chapter it makes more sense.

I picked up a collection of Ursula K Le Guin's blog posts, which is an odd thing to have in a physical copy. I almost picked this up last year, but figured it would be better experienced in the bigger context of the website, but it turns out those selected blog posts have been removed from her blog. Honestly, it feels a bit combative to isolate them in this way. But look, I bought it. I'll do anything to hear more of her voice.
