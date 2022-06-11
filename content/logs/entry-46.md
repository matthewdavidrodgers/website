---
title: "Entry 46"
date: 2022-06-12T15:04:07-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Getting very frustrated with kubernetes - I'm just so BORED dealing with all this configuration. Guess it's good I'm not a devops guy, I'd never make it.

Finally finished Showstopper, took me long enough. Still not a huge fan of the book, but I liked the epilogue, as well as a new epilogue added in 2014. It gave a lot of good context to the "failure" of NT to become the be-all end-all OS, particularly due to Microsoft's inability to look to the future of the internet and mobile connectivity.

So I picked up Green Mars as my next book, and I'm already moving quickly through it. I loved Red Mars _so_ much, and I'm hoping to have a similar reaction to this sequel.

Speaking of Kim Stanley Robinson, I liked this little [talk](https://www.youtube.com/watch?v=cvSnKmJ7SZA) he gave on Ursula K Le Guin. Very personable, even if it probably canonizes her in way I imagine she wouldn't like. I have The Dispossed and A Wizard of Earthsea on my self, and I'm excited to get to them soon.

Robin Sloan (a frequent subject of these logs) published a [post](https://www.robinsloan.com/lab/specifying-spring-83/) on his first steps defining a "new protocol": Spring '83. It seems to describe a client/server protocol for publishing and consuming small, ephemeral "boards" of content. This content is very simple - just html and css (no javascript or external assets of any kind), and there's also some sort of peer-to-peer nature to the federated servers allowing for content propagation.

I find this proposal exciting, even if I have some doubts. Chief among them is the restriction of the content. I wholeheartedly agree with the sentiment-- people are quick to overengineer or stuff advertisting trackers or bloat your page given any opportunity to do so, and the smaller palette of content whittles the focus. But the whole reason the web is exciting is the broad canvas and interactivity it provides. I bet you could build this entire protocol over existing email protocols.

And my spidey senses certainly tingled when Robin started mentioning the integrity of the protocol's security. Rolling your own cryptography is a real gamble, and without experience in that area you could get into trouble fast. I hope he's got some friends in that space looking over the proposal.

Nevertheless, I think this is pretty cool. The current story around "following" people across the web sucks, and while [Fraidy Cat](https://fraidyc.at/) has been helping, we could use something new. Very excited to see where this goes.

In fact, I wonder if I could build an implementation of a server all in Cloudflare. Workers for the actual compute resources, R2 for storage of the content, KV as a caching layer, maybe Durable Objects for coordinating peer-to-peer functionality... hm. I'm gonna keep this in my back pocket. That sounds like a fun project.
