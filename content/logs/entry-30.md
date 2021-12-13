---
title: "Entry 30"
date: 2021-12-12T16:03:17-08:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Not too much to update on this week; I have been CONSUMED by this year's advent of code.

I get very panicked when it takes too long to figure out a solution, because I know if I take a while, more will only pile up. So I've been really diligent about finishing the problems on the day they're released, and I've gotta say: I'm on a bit of a hot streak. There's only been two part-twos that I couldn't figure out, and I haven't really let any pile up on me.

There have been some that were really easy to figure out: there was a matching brackets problem; anyone who has ever played with parsers before would be yelling "USE A STACK" before they could even finish reading.

But some have been harder to wrap my head around. Today's was even a problem that required a sort of tree structure to solve, and I was sure I wouldn't be able to do it just due to Rust alone. Trees are notoriously hard to build in Rust, because the memory ownership and lifetimes of data require a precarious negotiation with the compiler. But I used a trick I've heard people employing (storing indexes in the "children" field of the node that reference a flat array, rather than trying to fit a shared node within another) and things went fine (honestly, it probably didn't even require a tree).

That's another thing I've noticed about this time around with the advent. I'm not spending any time whatsoever addressing optimizations. Last year, I did a "naive" and an "optimized" round for each problem, as if it was a coding interview. This year, I'm just prioritizing _finishing_, so I've chucked all those concerns away. It works? Good. Let's move on.

I think most of my solutions have generally good time-complexity (although today's solution may have been particularly bad), and I assume that Rust is helping me out with space-complexity. But I'm not worrying about it.

One last interesting thing regarding the advent: one of my solutions crashed because my solution hit integer overflow! I was using unsigned 32 bit integers, and my solution was greater than the u32 max (16777215). Thank god Rust caught it; Rust performs bounds checks and overflow checks when compiling in dev. But most languages don't check for that! If I had used another language, I would have been tearing my hair out, wondering why I couldn't get the right answer. I wonder how many other people will run into something similar! Once again, Rust to the rescue.
