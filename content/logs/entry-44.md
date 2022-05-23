---
title: "Entry 44"
date: 2022-05-22T17:15:07-07:00
draft: false
summarizable: false
---

{{< aside >}} This is an entry in The Logbook - you can read more about what these are [here](/posts/logbook) {{< /aside >}}

2 weeks ago was [Platform Week](https://www.cloudflare.com/platform-week/) at Cloudflare, devoted to new improvements and features for Cloudflare's developer platform, which revolves around my team, Workers. A lot of cool new things were announced - and some of my own work was included! One of my favorite announcements is [D1](https://blog.cloudflare.com/introducing-d1/), a SQLite database running at the edge. Durable Objects (a special version of a Worker that provides strongly consistent persistant storage - D1 is implemented via Durable Objects) are powerful but tough to wrap your head around. D1 will be a great way to port usual use cases to the edge, and I'm sure more is to come.

Speaking of work, the honeymoon of finally getting to write Go in production has started to wear off. Go continues to be great in all the ways it's supposed to be great (concurrency story kicks ass, it's easy to build things quickly, etc), but a few things have started to bug me.

First of all, the type system is just too weak. I see `interface{}` much more than I would like to, and I constantly feel limited by what I can confidently write - I'm constantly thinking the compiler could help me out more, enforce some things that I have to leave to exhaustive user checks.

And I'm starting to _hate_ zero values. Add a new value to a struct? None of the existing uses are affected - you have to manually go through and check whether you need to add the new field to each use, otherwise the compiler will happily insert a zero value and carry on. That's been the most frustrating thing to me.

Everyone seems to be hating on Go recently, and with good reason. We should be critical of our tools. But I'm still having a good time, despite the weirdness.

Signed up for the [Deno newsletter](https://deno.news/) this week, and have already been rewarded with a great [cheat sheet](https://oscarotero.com/deno/) for Deno. I find the decision for a runtime API accessed in a global (the `Deno` object) rather than via imports (like Node) to be a weird one, one that makes me reach for a cheat sheet often. But the design of all these apis is very pleasant. 

Speaking of Deno, I wrote a little file server very quickly this week. I often need to see what a folder of files would look like if it were served over the web, and this little snippet is very useful:

```typescript
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const filepath = "." + decodeURIComponent(url.pathname);

  try {
    const file = await Deno.open(filepath, { read: true });
    console.log(`200 ${filepath}`);
    return new Response(file.readable);
  } catch (err) {
    console.log(`404 ${filepath}`);
    return new Response("Not Found", { status: 404 });
  }
}

console.log("Starting file server in current directory...");
await serve(handler, { port: 8080 });
```

There's a few bugs in there (and all the infosec people are screaming at me right now) but used responsibly, it's fine.

Lastly, a few weeks ago, after 120 hours, I finally beat Elden Ring. All I can do is salute that game. What a masterpiece. Now the torturous wait until the DLC!
