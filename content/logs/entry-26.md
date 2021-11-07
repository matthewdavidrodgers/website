---
title: "Entry 26"
date: 2021-11-07T14:54:39-08:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Busy days - I feel like I just need to make it to Janurary, then things will calm down a bit.

Watched Dune, in IMAX, twice. I read the book, so obviously I have my own beef with the adaptation (nerfing Lady Jessica, the bit with Jamis was rushed, how little focus on Paul's "terrible purpose" there was), but overall I loved it. Feels mostly accurate to the books, especially compared to something like the David Lynch version.

Lots of fun stuff to read across the internet about Dune: an [annotated guide](https://maxread.substack.com/p/dune-annotated) to moments from the movie, and a [two](https://thereveal.substack.com/p/a-conversation-with-john-hodgman) [part](https://thereveal.substack.com/p/a-conversation-with-john-hodgman-e11) interview with John Hodgman about the importance Dune through his life.

Also saw The French Dispatch, which I really enjoyed. Although I found it more "cold" than other Wes Anderson movies. I guess that's what you get with an anthology, but there's less of a moving emotional core to this one. 

Finished Metroid Dread this week, and got my ass HANDED to me by that final boss. I felt that overall the game wasn't as hard as I'd expected, but that final fight shut me up real fast. Reminded me of the Sister Friede fight in the Dark Souls 3 DLC.

Moved on to Papers Please, which has been a delight. Well, a delight with a bit of anxiety mixed in. I feel a lot of dread while playing it, as I'm always so worried that I'm going to screw something up, and that will screw something else up, and it will just snowball and snowball. But that's certainly an intended effect.

I've been in awe of Lucas Pope (the creator of Papers Please) from afar-- it's always thrilling to take in something that's solely one person's vision, something rare for video games. I'm excited to try out The Return Of The Obra Dinn after this.

Fixed a fantastic bug this week in my C implementation of the cryptopals challenges this week, the kind that they tell you about when warning you about the language. I had an array with 52 members, and I was indexing into it multiple types with a uint8_t, a full byte. Obviously, the 256 values in byte meant I was frequently accessing memory past the array boundaries.

Instead of anything sensible happening, instead of even a crash, the program just kept ticking along. It happily got the memory at that random access and gave it back to me, which I happily wrote to. And this random memory just happened to be _random heap memory that I had allocated previously_. So all of the sudden random structs would just have different values, even when nothing had touched them. It was a real bitch to track that one down. I was in the debugger examining raw heap memory before I noticed the access at that array.

To be honest, it gave me a bit of a rush. Is this masochism? Unclear.

Finally, I went to the Musuem Of Jurassic Technology this weekend, which was incredibly magical. It's a musuem that teeters between history and art, focussing on the eccentricities of some of the pasts' advances in technology. It was fascinating, and oddly meditative.

Some of my favorite exhibits include:

- A collection of letters sent by the public to an astrological observatory around the turn of the 20th century. Everyone and their grandmother seemed to be convinced that they had knowledge that they needed to pass on to the astronomers. Convictions that the universe was an ambulating magnet, that the Orion galaxy was God itself, and much more.

- A reflection on the life and work of Geoffrey Sonnabend, a professor of neurophysiology at the turn of the 20th century who developed a formal system for explaining memory and the experience of forgetting. His work centered around a physical model of a plane and cone that represented the operation of exprience and forgetting. Every inch of this model is explored, even to the point of explaining the experience of premonition and deja vu. I want to avoid over-explaining it because it feels so magical on its own, and I desperately to know want more.

- A beautiful garden/tea shop on the roof. An excellent place to reflect and absorb what you've witnessed.

- The paintings of Étienne Léopold Trouvelot, absolutely stunning renderings of astrological phenomena. It was really exciting to see an expressive yet rigorous take on things we're used to seeing from hi-tech cameras. I'll leave you with some striking ones.

![Jupiter](/images/trouvelot-jupiter.webp)
![Eclipse](/images/trouvelot-eclipse.webp)
![Light](/images/trouvelot-light.webp)
