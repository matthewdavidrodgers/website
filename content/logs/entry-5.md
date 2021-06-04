---
title: "Entry 5"
date: 2021-05-02T16:37:07-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Had one of those weeks that just drags on and on, where you're exhausted but don't really ever seem to do anything.

If I did anything, it was to continue keeping my foot on the gas with the books I'm reading. I Ursula K Le Guin's The Left Hand Of Darkness in a week, and desperately wish the book went on for another 300 pages.

The novel follows a human envoy in his solitary first contact on the planet of Gethen. All its inhabitants are androgynous-- totally genderless-- and once every 26 days they become either male or female and sexually capable. Anyone can be a father or a mother, and often are both to different children.

It's a story that would be interesting from many hands. Such a basic physiological difference ripples throughout every piece of their civilation, and just exploring that world would be a rewarding experience. But Le Guin makes it _transcendent_. In her hands, it's a story about personal communication; bridging and treasuring the differences between each other. I actually feel unable to really explain how fantastic it is. There's no praise high enough for it. Go pick it up and see what I mean.

I also finished season 1 of Halt And Catch Fire. I was sold from the beginning (fantastic cast, 80s setting, dawn of the personal computing era), but that didn't mean it wasn't shaky from time to time. All is forgiven, however, with the final three episodes. All the clunkiness melts away, and I was glued to the TV.

I actually found [a syllabus](https://bits.ashleyblewer.com/halt-and-catch-fire-syllabus/) for the show some time ago, with discussion topics, old RFCs, and assembly language exercises to accompany your viewing. I think it's FANTASTIC, and this layering of context is one of the reasons I knew I was gonna be into this show. (I did these [6502 assembly exercises](http://skilldrick.github.io/easy6502/) not too long ago, and it was legitimately fun! Far from stuffy or complex.)

I found out about discord's [slash commands](https://blog.discord.com/slash-commands-are-here-8db0a385d9e6) for bots this week. I've previously [written](/posts/minecraft-discord-bot/) about making a bot responsive before, but it was admittedly brittle. The thing is, it was the best _anyone_ could really do with the api we had. This changes with slash commands.

At the core, slash commands are two things: An "application command" that you register with discord, describing your command, how it's invoked, and what options should be provided. Discord can do smart things with these registrations, like fuzzy-finding commands and displaying help in a nice UI. The other piece is an "interaction response". When someone invokes your application command, an interaction is created, and your bot can respond to that cooresponding event.

So the design separates the registration of the commands with their actual implementation. This is an interesting choice, because their is no assured mapping between the implementation and the registration. If you delete some implementation but forget to delete the registration, users may invoke commands that don't exist, and things will blow up. Or if you delete a registration but leave the implementation, you'll have dead code floating around, without any indicator that this is now unreachable. But it may be that this design actually enables much more than I can see at the moment, maybe some really slick dynamic way of building interactive apps.

I've been thinking of a new side project, one that involves discord bots, which is why I've been looking into all this. It's still evolving, so I'll refrain from going into it yet, but there's just something special about chat bots for my brain. They're incredibly interactive, so you're directly enabling humans doing things with other humans, but they're not so UI focused that I spend a lot of time pushing pixels and handling stuff on the screen.

There's more to come on this front, without a doubt. I'll hopefully have a better picture next week.
