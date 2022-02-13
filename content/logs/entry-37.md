---
title: "Entry 37"
date: 2022-02-13T11:09:42-08:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

My friend Grace has been in town this weekend, which has been lovely. I haven't seen them for more than a quick lunch over the holidays for quite a while.

We're going to the Getty Center later today, and while I've been to the Getty Villa multiple times, it seems I haven't gotten to the main center quite as much. I remember there being quite an impressive collection of impressionist pieces, and the architecture alone was as much a work of art as anything in the collection.

I read [Some mistakes that Rust doesn't catch](https://fasterthanli.me/articles/some-mistakes-rust-doesnt-catch) this week - which was an enjoyable read for the most part, but felt a bit mean-spirited. The article really felt like it should have been called "Mistakes that go doesn't catch", as it's not until the very end that we have any indication that Rust is anything other than a superior version of go in every way.

Go is very frustrating sometimes, and I don't always agree with some of the principles it holds to. There are also surprising foot-guns, one of which I learned from this article: capturing loop variables in closures. It's a common go mistake it seems, and [much](https://eli.thegreenplace.net/2019/go-internals-capturing-loop-variables-in-closures/) has been written about it. It's very counter-intuitive, even if it sort of makes sense in a language implementation sense. Javascript seems to do the (sensible) reverse, even though it comes with its own set of [surprises](https://www.youtube.com/watch?v=Nzokr6Boeaw).

However, I still like go. The Amos article seems really uncharitable towards the language, even in the parts that make sense (he considers maps not being thread-safe a surprise?)

Anyways, a couple other interesting things I've come across this week include an article about [selecting the most recent record in postgres](https://blog.timescale.com/blog/select-the-most-recent-record-of-many-items-with-postgresql/), something that's decidedly more complex that I expected. I'm surprised how what feels like the natural index isn't always used. I continue to be impressed by db administrators who really fine tune their system.

Oxide open-sourced a Rust [OpenAPI generator](https://github.com/oxidecomputer/progenitor) that leverages the language's macros and serialization approaches, which I think could make simple CRUD-y services really pleasant for Rust (not that the language would be my choice for that anyway).

And finally, Robin Sloan published another thoughtful [post](https://www.robinsloan.com/lab/bad-hosts/) about computer identity on the internet, and how IPV4 and NAT relate to his vision of the web. As a computer science student, it took me a long time to figure out how my computer _actually_ communicates on the internet, and I share Robin's disappointment in how "fake" the actual communication is. We've never had more ability to do cool things on the internet, but we're far from any sense of autonomy.

I think I'll leave it there - much more to update on soon (hopefully next week).
