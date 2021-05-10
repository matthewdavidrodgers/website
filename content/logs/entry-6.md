---
title: "Entry 6"
date: 2021-05-09T16:26:37-07:00
draft: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Nice and slow week over here. The one big "event" was dose 2 of the vaccine for me! Didn't have side effects this time either, at least none beyond a sore arm.

This week I've been lazing my way through a book about the history of early roguelike games (rogue, nethack, angband, etc). It's a fun read, and it entertwines with the history of computing more than I expected; the onset of UNIX systems happened concurrently with a lot of the young developers trying out game ideas (rogue was even included in BSD!).

I have yet to play a true blue roguelike, actually. This is more out of laziness than it is intentional. I'm particularly interested in a newer old-school (weird set of adjectives) roguelike: Caves Of Qud. Apparently, they employ procedural generation not only in the level design, but also the history and lore of each run. So you get totally random, yet (apparently) narrative and engaging history, as told through item descriptions and npc conversations. Can't speak to it from experience, but it sounds like a very cool system if it works.

What I _have_ been playing is the original Half-Life. I did a quick replay of Portal last week, and was once again marvelling at how tight and fun that game is. So I decided to give the other famous Valve title a go.

I'm having fun; it is very obviously a PC game, and shooters in that vein are always fun mechanically to me. I will say it that "tight" may not be a term you could apply to this game. It's not overlong, but each piece doesn't seem as important and unique as the last. It's not a serious critique, not every game can be like that.

I also can definitely feel the game's age. I can't play for too long, or I get a bit seasick. And some mechanics just aren't as intuitive as the ones FPS games eventually coalesced around (looking at you, jump + crouch to get over a high wall). In any case, I'm having a good time, and I've promised myself I would finish this game before moving onto what's sure to be my next consuming obsession: Dark Souls 3.

I built the prototype of the discord bot I was talking about last week. But once I got it working it just seemed... uninteresting? The idea was a link saving app (sites, rss fees, pdfs, etc) that exists as a discord bot. To save something for later, you'd @ the bot (or use a slash command, as it turned out) with the link, and it'd keep a record for you. It would also be context-aware, so it remembered what channels the link was added from, meaning you could "tag" a link just by where you added it.

What I thought would be most interesting was the fact that it would take something usually private (or at least unshared), saving links for later, and making it communal and historical. Anyone in your discord server could see what you were saving for later, and hopefully it would spark conversation or ideas.

I got turned off from it once I realized there was no great way to "delete" or mark-as-read a link, not without asking a user to type in the link all over again or to use some identifier that the bot had generated. And so really this would just end up being a ledger that got more dense as it went on, probably nagging more than anything.

It was a good experience, at least. The new slash commands are pretty cool, and I expect there are more features to come with the interactions api. I also got to try my hand at embedding a sqlite database-- I have an appalling lack of experience with SQL databases, so that piece of it was a welcome learning experience.

I'll close with a talk about [modern c](https://www.youtube.com/watch?v=QpAhX-gsHMs) that I found interesting. It definitely feels like there's less "discourse" around c than more modern languages, almost like it's a dead language. So it can hard to know how people in the real world use it, or what patterns are tried and true and which ones will blow your foot off. But this is a very frank talk about a lot of newer ideas about writing c, and specifically practices that can help you avoid the hairy parts.
