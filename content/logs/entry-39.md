---
title: "Entry 39"
date: 2022-03-20T18:37:34-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Fist week of being "unemployed" down, and I'm honestly not as bored as I expected to be.

My days mainly consist of two things. The first: Elden Ring.

God DAMN is this game good. It really feels like the best parts from FromSoftware's previous games all rolled into one. And I wish I was able to explain how _huge_ the game is. Not in a mindless, copy-pasted sort of way. An enormous, _insanely_ dense map, one that is clearly not fully discovered. I've put 40 hours into this game already, and I don't think I've even hit the halfway point.

I'm really impressed with how accessible it is, while still maintaining every inch of the punishing gameplay of their other titles. Guard counters are totally over-powered, but in a great way! A melee/shield build is almost certainly going to be the first choice for a newcomer, and having a powerful mechanic like that is a great way to have safety while exploring the combat. The more advanced, focused builds can't rely on it. There a million ways to play, and a million ways to have fun. I have a friend who _swore_ he'd never play games on anything other than "easy" difficulty. He wanted fun, and wanted story. I tried to explain why I loved the FromSoftware games to him, but he wasn't interested. He has... uh... put in over 150 hours into Elden Ring. Everything clicked. And he's diving into the other games next. What a testament to this game's design.

The rest of my time I've been spending working on side projects. I wanted to port my [`quest`](https://github.com/matthewdavidrodgers/quest) tool to rust, and got a good chunk of the way through! However, I hit a snag that has scared me off unfortunately.

The key part of the tool for me is the `-e` flag, which allows me to open vim with my request details and fiddle with whatever I want before sending, giving me all the flexibility of the editor.

This is done by just spawning a child thread with the vim command and wiring up stdin, stdout, and stderr. Works fine in go, but in the rust version, when the process with vim spawns, it prints an error about input not being a terminal, and exits immediately. Which is... right! The created process is not attached to a tty, there are no details like "window size" or whatever associated with that process.

Which reminded me of [this](https://fasterthanli.me/articles/a-terminal-case-of-linux) article - about convincing the os that a process is indeed attached to a tty. The fix in the article is... involved. Multiple unsafe calls into libc, plus multiple threads to wire io together. It's not all that scary, but this just _works_ in go. And the language is honestly a good fit for this. Maybe I won't abandon it altogether, but I did jump off it for now.

Instead, I've been catching up on the cryptopals challenges. I'm into set 2 now, about basic block ciphers. I gotta say, there are a lot of assumptions baked into these challenges. For example, there's assumptions that you'll probably see repeated blocks in a plaintext (which helps you to detect something like ecb block chaining)... but none of their example plaintexts for the other challenges have repeated blocks. But I'm still loving the challenges, and having a lot of fun stretching out in both c and rust.
