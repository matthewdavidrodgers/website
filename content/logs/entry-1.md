---
title: "Entry 1"
date: 2021-03-04T14:26:54-07:00
draft: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

The week hasn't been extraordinarily stressful, but I decided to give myself a bit of a break anyway and took a spontaneous weekend trip to Joshua Tree. Since I'm on my own, I'm not being too adventurous, but it's gritty and gorgeous out here. I rewatched Paris, Texas recently, and I feel a lot of the same emotions as I did watching the first half of that movie. You can almost hear the [slide guitar](https://www.youtube.com/watch?v=drg0LMfIkfU) from the soundtrack.

I also watched Chungking Express this week, and loved every frame of it. It hit some sort of resonant frequency with the way I've been thinking about solitude and community recently (which may get its own full-blown blog post at some point, so I won't get into it here). It's a movie filled with lonely characters-- or at least characters who spend a lot of time alone-- but there are so many little bits of togetherness all over the place, especially at the shop that centers the story.

This week I learned about these two people-- a software developer and a visual artist-- who live on a sailboat and make video games and small tools and music and a bunch of other things. They call themselves [100 Rabbits](https://100r.co/), and most of their work focuses on offline-first, low power technology solutions. It's kind of hippy-dippy, but I think it's pretty damn cool.

Recently they've been [experimenting](https://twitter.com/hundredrabbits/status/1378188349144395788) with building a toy operating system in what looks like a virtual stack-based machine with its own assembly language, and some of the results just look... [fascinating](https://twitter.com/hundredrabbits/status/1368289299834179584).

This is dangerous territory for me, because seeing someone go behind the curtain for technology that I've always taken as impenetrable and a bit magic-- like an operating system-- can make me want to dive in after them. This happened with programming language design and Bob Nystrom's EXCELLENT [crafting interpreters](https://craftinginterpreters.com/), and I lost a good 4 months working through a bytecode interpreter in C. I can't help getting excited by stuff like this, but... oof. Sometimes you just can't commit all that time.

At the very least, my interest is really piqued in getting my C chops up. The 100 Rabbits people write a lot of their tools in a single C file, which really shows you how much you can wrench out of the machine and its primitives if you know what you're doing.

But they always depend on SDL, which, is that cheating? No, of course not. But if what's driving me to write more C is that pure, dependecy-less programming, then I don't want to hand anything off to an abstracted library if I don't have to. But at the same time, who in their right mind wants to reinvent the wheel of graphics programming? Certainly not me.

While I'm on programming and languages, I've been reading Structure and Interpretation of Computer Programs (SICP), the famous "introductory" textbook for computer science at MIT. It teaches Scheme, a functional language in the Lisp family. It can be a lot; it was clearly written with math majors in mind-- some of the first exercises are computing integrals. But it's certainly expanding my mind.

For example, I finally understand tail-call optimization in recursive functions! This has always been used as a hand-wavy explanation as to why functional languages aren't always slow compared to imperative ones, and I never really understood it.  But it's pretty clear way to skip a huge call stack in a recursive procedure. If the return value of a function is just the invocation of itself with different parameters (as opposed to, returning the sum of that recursive call and something else), then the result of that final recursive call doesn't depend on anything within its stack frame; there's no need to return to the state of when it was called, and it can jump right back to the stack frame above it. This means the compiler can discard the stack frame that called it, or overwrite it. Suddenly all the resources associated with recursive functions collapse in on themselves. SICP calls this as a "linearly iterative" process instead of a "linearly recursive" one. Light bulbs sparked all over when it clicked.

This log is already much more wieldy than I hoped it'd be, and I'm a bit annoyed that I kept rambling on. I've got to wrap this up.

Before I do, I'll note that I've been listening to a lot of techno and house music recently, partially because I just finished a book on British techno (Join the Future: Bleep Techno and the Birth of British Bass Music by Matt Anniss), and partially because it just kicks ass.

The big highlight: this [ep](https://open.spotify.com/album/5xp8nj4Uji2Kr1nkm3CLFC?si=1YUdD-25Qr-kvdn_kU0otA) by Logic1000. Fun every second. A friend also showed me a really incredible [record](https://open.spotify.com/album/3ShtO5VCYa3ctlR5uzLWBa?si=Vl5oJ3HDRK2tk3WsGXdtIA) by an incredible techno producer and a legendary sax player that played with Miles Davis. AND the London Symphony Orchestra backs them both up. It's meditative and droney but also lyrical and emotional and it's been cracking my brain open.
