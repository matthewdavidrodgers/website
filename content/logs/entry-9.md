---
title: "Entry 9"
date: 2021-05-30T15:15:53-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Howdy all. Lovely Memorial Day weekend here; I went to a Dodger game yesterday and had a blast (even though the Giants stomped us, and, at time of writing, are doing it again). It really was something to get sunburned in a swath of unfamiliar people again.

Continuing on through The Story Of A New Name, which is currently eviscerating me. I think I'm starting to develop a vocublary about why the prose is so interesting: it's told in past first-person, so there's a very personal voice that guides us through. But while it's a very emotional story, and those emotions are funnelling through our narrator, a lot of those interior emotions are not told to us. She recounts reactions from everyone around her, but it seems like she omits hers, or at least recounts them separately, after the events surrounding the emotions. You can hear shame or fury in her dialogue, but she holds back a lot in the telling.

It fits the narrative very well, as Elena is constantly sublimating herself, too eager to please and unable to make her desires known. But it makes for such a fascinating read-- we never think of Elena as cold or emotionless, but we're not always privy to the actual range of emotions she experiences in the moment.

This week I really enjoyed some of the work from Julia Evans. I've known her as the person that published these really fun little [zines](https://wizardzines.com/) and [comics](https://wizardzines.com/comics/) about programming and network/operating systems topics. But this week I started reading her blog and watching some of her conference talks.

I was really impressed with her [story](https://www.youtube.com/watch?v=ftQfpAeyxPo) of coming to systems programming, a new field for her, in order to build a tool she knew was possible and knew at least some people would find it useful: a ruby profiler.

Systems programming can feel like a whole different skill than something like application development (whether that be ux work or work on a service-- anything higher than the OS level), and I constantly find myself interested in the space. Especially with my interest in WebAssembly recently-- as a system in itself and as an interface to the system that embeds it. But it can feel like a place I'm not supposed to be. I don't have the experience, I don't have the education, etc.

But part of Julia's story is [the recurse center](https://www.recurse.com/), a retreat for programmers to try new things/build something interesting/exercise muscles they don't normally get to. That sounds like the best thing in the world to me right now. I'm in a bit of a rut when it comes to the day job, and I feel like there's so much on the horizon, if I could just try some things out.

I'm not sure about many details about it (would I have to quit my job to go? do I even have anything worth devoting time to? is doing it remotely any different than in person? could I even get accepted?), but it is certainly a fun idea at the moment.

I've started following the tutorial for [building your own text editor](https://viewsourcecode.org/snaptoken/kilo/) this week, which I've mentioned interest in before. VT 100 escape sequences, which is what we use to draw complex patterns to a terminal emulator (think of the difference between the simple "print to stdout" vs something like what vim renders) are wild. They feel incredibly archaic, so I'm just following blindly so far. Once we get past the rendering text stage I think I'm anticipating some interesting stateful patterns.

As I'm building this text editor, I'm wondering if implementing something similar like this in the browser would be an interesting exercise. I even forsee it being a good exercise to do the entire thing in simple WebAssembly and render it via 2d canvas. Maybe use the FileSystem api to edit stuff on your system?

Finally, I found out about [SerenityOS](http://serenityos.org/) this week, an operating system and set of tools built from scratch. It's really inspiring, because while obviously building an operating system kernel from scratch is almost infathomibly complex, they're also building out a whole suite of tools and applications, like a totally hand-made browser. I didn't even know that was a task that could be attempted after all the accumulation of engineering and knowledge in modern browsers, but Andreas Kling, the maintainer/chief chief author of the project, is always insistent in his [youtube channel](https://www.youtube.com/watch?v=-YlVex4nbfw) that nothing is too big to build incrementally.

