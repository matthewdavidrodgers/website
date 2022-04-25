---
title: "Entry 42"
date: 2022-04-24T17:17:21-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Julia Evans put out a new [zine](https://wizardzines.com/zines/dns/) this week, this one about DNS. I haven't read it yet, but I'm going to pick it up soon, as so much of Cloudflare's business is about or adjacent to DNS. Even at the Workers level, I'm already dealing with DNS. It will be good to have a firm grasp on how it all works, not the "yeah, I guess I know how it works" understanding that I have now.

To flesh out another topic that I have a not-quite-solid-enough understanding of, I picked up [Kubernetes in Action](https://www.manning.com/books/kubernetes-in-action). There's no downside to getting familiar with such a prevalent technology; it's sure to be helpful. I picked up [Real-World Cryptography](https://www.manning.com/books/real-world-cryptography) at the same time, as I'm just generally interested in the that world at the moment, and there seems to a fairly good reaction to this book.

And speaking of crypto, there was a really nasty [CVE](https://neilmadden.blog/2022/04/19/psychic-signatures-in-java/) around ECDSA signatures in Java this week. Essentially, if you provided zero for some components of your cryptographic signature, Java's implementation of the algorithm would always verify you. Tons of stuff around the internet are signed by this mechanism: signed JWTs, YubiKeys, etc. This bug is no joke.

I find it interesting that this bug seems to have appeared while porting over a c++ crypto library to Java. They both treat zero the same way -- but I suppose that's not entirely true when you consider `NULL`.

This week I hit 100 hours in Elden Ring. Ah. What a game. I'm definitely in the endgame now, but there's still so much to do. I avoid the wikis as much as possible, so I just know I'm butchering a bunch of quest lines. Oh well, I guess that's for the second playthrough!
