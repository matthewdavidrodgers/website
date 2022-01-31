---
title: "Entry 35"
date: 2022-01-30T18:56:59-08:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Not much to update on this week. Been quite busy, but I have read some interesting things:

[Rust Futures and Tasks](https://swatinem.de/blog/futures-n-tasks/) - A great look at some of the primitives and concepts in concurrent (and/or parallel) Rust. It really helped me distinguish between what was concurrent but still single threaded, and what was truly parallel in Rust's asynchronous features. I find it easy to understand how Node's event loop works (via libuv), and why it's only a single thread. And I also find it easy to understand OS threads, and how they're (mostly) parallel. But the asynchronous runtimes for Rust (i.e. Tokio) present as single threaded concurrency (i.e. async and await), but I know they're usually on multiple threads. This article (plus a few others) was great at showing when and how actual parallelism comes into play.

[Store SQLite in Cloudflare Durable Objects](https://ma.rkusa.st/store-sqlite-in-cloudflare-durable-objects) - A really in depth (and thus out of my own depth) look at porting SQLite to run on Cloudflare's Durable Objects, a strongly consistent storage system on the edge. It was possible to do by just adding a new "backend" to SQLite, and then compiling both to WASM (Cloudflare's Workers platform - which hosts DO - is made of V8 isolates, and thus can execute WASM seamlessly). I didn't understand most of this post, but I found it a fascinating application of Cloudflare's platform.

And finally, I stumbled upon [slshx](https://github.com/mrbbot/slshx), a library for interacting with Discord servers, all built on Cloudflare Workers. What's most interesting is how inspired it seems to be from React. There are hooks-y apis, as well as JSX for "rendering" messages to send to a server. It's surprising, but if you were looking to build a reactive declarative system, I'm sure there would be worse places to look than React. When I [built a discord bot](/posts/minecraft-discord-bot/), I basically discounted serverless outright, partly because I just wanted to do it all by hand, and partly because I didn't think there were enough "stateful" features in a platform like this. This library proves me wrong, handily. I'm really impressed by it.

