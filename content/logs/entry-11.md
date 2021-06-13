---
title: "Entry 11"
date: 2021-06-13T15:07:05-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

A week of venturing forth. In two days, all covid restrictions are lifted in Los Angeles, and many places have been already been able to do much more. For all my apprehension over the past month or so, I'm actually surprised at how well I've been able to resume some activites. Some things still trigger an animal instinct to retreat, but I feel comfortable in most situations out in public now.

But a monumental thing happened this week. I finished Halt And Catch Fire. I am... destitute. The final season is one of the best stories I've ever seen. It's worlds apart from where the show started, but undeniably an true evolution from the pilot.

It's absolutely heart-rending, too. I cried-- SOBBED-- for the entirety of Goodwill, the third-to-last episode of the season. A full 50 minutes of tears. No spoilers, obviously. But I don't think that episode will leave my thoughts for a long time.

There's a moment when Haley describes what she loves about the internet to Joe, and she says that there's no projection when you're online. You just are who you are. It'd be easy to see this as a flaw of the show, a blindness to what all this connectivity would (and has) lead to. But Halt isn't about the winners of this era-- it's full of failures and getting beaten to the punch. And this optimism, the purity of technology's capabilities, is one of the losers too.

What makes the show so affecting is that all the real moments of triumph are personal ones. Even Joe, the Steve Jobs-alike visionary, constantly innovating and looking to the future, finds his final victory far from the industry and "change" that you'd be forgiven for thinking the show was truely about.

Halt And Catch Fire was so good that I even feel failure in finishing it now-- because I didn't watch it when it was airing, didn't support the team behind it when they needed the viewers.

Now that I've finished the series, I've really started to apply myself to the [syllabus](https://bits.ashleyblewer.com/halt-and-catch-fire-syllabus/) I mentioned some weeks ago. In particular, the readings with each "class" have been fantastic. [Developing the Virtual Landscape](https://journals.sagepub.com/doi/pdf/10.1068/d140127), from 1996, feels incredibly prescient now. It offers a measured response to the optimism in technology's growth, comparing the hopes for the shopping mall as a redefinition of the public space to our (then) hopes for technology redefining communication and community. She notes what a failure it will be if this space becomes totally privatized, without any public sources to join the information superhighway. And with the exception of public libraries, which usually have computers available for use, we failed that fantastically.

I'm also entranced by Ellen Ullman's [The dumbing-down of programming](https://www.salon.com/1998/05/12/feature_321/). It's a two part article, and have to remind myself to be cautious of the attitude of "dumbing-down = bad". That, however, is not the real point of the article. She talks about ripping out windows from a computer to attempt to replace it with a copy of linux, and finding that, without an active partition for the OS, the Master Boot Record attempts to load a rom with a BASIC interpreter, a vestige of how computers used to operate. All that hardware, unsure of what to do, falling back to a simple BASIC program. "The computer was suddenly revealed as palimpsest", she writes. I'm fascinated.

She has a book from around this time period, Close to the Machine: Technophilia and its Discontents. It is now at the top of my to-read list.

I also read [this](https://eli.thegreenplace.net/2013/11/05/how-to-jit-an-introduction) primer on how JIT compilation _actually_ works this week. I've been frustrated with this very topic, and until now, have been unable to find anything helpful. I understand the concepts for JIT compilers just fine, but what I could never understand was: how does machine code actually get generated from the interpreter? Does it manually run clang? How does the generated machine code interact with the state of the system? How could a JIT compiler be portable?

The answer seems to be that you just have to compile it to machine code by hand, into an actual segment of data, and then you can make that block of data executable in C (god C is wild) and run it. Kind of like writing inline assembly. Based on whatever bytecode and assumptions you have about execution, you can just go ahead and generate instructions that can run dynamically, calling the generated code is the same as calling a function. As for portable, heh. It's not. Looks like you have to be able to generate instructions for whatever architecture you're on, which probably means some very fun `#ifdef`s wrapping multiple types of instruction sets. Really cool stuff. Eli always has the most illuminating posts.

Finally, [These Dating Apps Are Crushing Me](https://askpolly.substack.com/p/these-dating-apps-are-crushing-me?r=56z&utm_campaign=post&utm_medium=email&utm_source=copy), an entry from an advice-column-style newsletter about how miserable the thing is that we all somehow decided was going to be how we meet people now, that is, dating apps. To be honest, I don't really find the response all that helpful (I should write a novel? I'm just trying not to die alone, man). But just reading the frustrations of somebody else was enough to be comforting. We're all trying to play ball here, but good lord, it can be a miserable game.
