---
title: "Entry 40"
date: 2022-04-10T17:34:01-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Busy couple of weeks! I'm two weeks in to my new position at Cloudflare! First one was dominated by hr orientations, and the second with engineering onboarding and access management. Looks like I'll start taking on work as early as tomorrow!

Which already is intimidating me! There's some very crazy looking c++ that I'll be working on. I have no particular love for c++. I love c, but I've found c++ to be massively complicated in the past, adding more footguns to the already dangerous toolkit of its precursor. I don't have any production experience in the language though, so maybe once my feet are sufficiently wet I'll feel less intimidated.

What's more is the c++ I'll be working with is written in a sort of "flavor" -- with a library implementing its own versions of the standard library and providing macros that enforce certain conventions. It's all done in order to restrict the way you access memory and control flow... in a way that really reminds me of Rust. For example, it adds strict optional types (can't dereference without checking for null). I would certainly prefer to be writing Rust... but at the very least I expect to gain a really thorough understanding of the problem space that Rust exists to "solve".

To that end, while studying up on some of c++ newer features, I read about [rvalue references and move semantics](http://thbecker.net/articles/rvalue_references/section_01.html). I always found the OOP parts of c++ to be clumsy - there's the obvious benefit of running destructors when objects go out of scope, but tying resources to classes and their instances can just feel clunky and ham-fisted. And I remember quite well having to stay vigilant in how we wrote class methods in order to avoid calling copy constructors unnecessarily - something that move semantics is really great at alleviating (well, not in making it easier to write things. But in avoiding unnecessary allocations).

Mostly it seems like I'll be writing go, so I went through a [workshop](https://github.com/campoy/whispering-gophers) to refresh myself on the language. It's still very pleasant, although the type system feels limitingly weak after using Rust.

Lots to look forward to!
