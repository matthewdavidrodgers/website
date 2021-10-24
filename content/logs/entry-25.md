---
title: "Entry 25"
date: 2021-10-24T13:33:18-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

Missed last week because I took a trip home! An old friend got married-- well, had a ceremony for her marriage. She was set to get married in March 2020, so none of us were able to come home. She held a small family-only ceremony and got it over with, but finally was able bring her friends and family together to celebrate it. I bought a suit for this wedding two years ago; was so happy to finally put it to use.

Got a lot I'm excited for at the movies. French Dispatch just came out, I still have yet to see No Time To Die, I'm hearing The Last Duel is actually quite good, and, of course: DUNE. I'm going tonight to an IMAX screening. Could not be more excited. 

I've had the AMC Stubs A-List thing for a while, which is essentially their version of Moviepass (ah, what a time that was). I've been looking for the right time to cancel it, however, as I usually go to smaller repertory cinemas instead. Maybe after I get through this run I'll finally reach the end of its use.

Came across a lot of interesting stuff these past two weeks. Roguelike celebration happened October 17th and 18th. They're my favorite conference - if you've been reading these logs, you may remember me talking about roguelikes [before](/logs/entry-6). I find the genre so fascinating, and so do many others! The talk attracts a lot of game developers as well as computer scientists, writers, and fascinating [mixtures](https://www.youtube.com/watch?v=cIpErjWBqm0) inbetween. I haven't gone through all the talks just yet, but there's something worthwhile in every single one.

Great article from the Zendesk team about [tracking down a c memory leak in a go program](https://medium.com/zendesk-engineering/hunting-down-a-c-memory-leak-in-a-go-program-2d08b24b617d). Never really thought about a program that's leaking memory _but still knows to clean it up_. Valgrind is useless, as there's no hanging memory when the process exits. So impressed by the debugging involved here.

I watched two talks from Steve Klabnik about the [evolution](https://www.youtube.com/watch?v=lJ3NC-R3gSI) and then the [implementation](https://www.youtube.com/watch?v=NNwK5ZPAJCk&t=2249s) of concurrency in Rust. I still don't understand everything presented in the second talk, but it's a fantastic presentation of what happens beyond the async macros and runtimes. And, as always, Steve is a great and friendly presenter who makes everything around Rust seem exciting.

Lastly, I've been wondering about what my options are for trying to contribute to some open source projects out there. I frequently get bored of my world of development at work, but self-guided or personal projects will only get you so far. Open source seems like a great place inbetween (although the horrors around open source maintenance make me want to stay away from too much involvement).

Not sure where to start, though. Very big world, and so much of what happens in public projects is more opaque than the term would have you believe.

My idea right now is to help out on [Fraidy Cat](https://fraidyc.at/) - a delightful browser extension that aggregates RSS feeds (among other sources) unobtrusively. I use it all the time, almost every morning to start my day. The creator/maintainer may be working on other things at the moment, though, which mean contributions are super welcome! Or that any issues or PRs are ignored. Oh well. As soon as I scrape together some time, I'm going to try tackling it.
