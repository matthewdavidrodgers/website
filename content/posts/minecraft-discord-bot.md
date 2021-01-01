---
title: "Managing a cloud Minecraft server from a Discord chatbot"
date: 2020-12-31T19:58:32-05:00
draft: false
---

![Logos (Minecraft, Amazon Web Services, Discord, Go)](/images/bot-logos-raw.png)

## Bits of community
2020 has not been especially \*ahem\* bright for the most part. But I was lucky to find a bit of solace after setting up a Discord server, giving my friends and I a place for a bit of digital community.

If you're unfamiliar, [Discord](https://discord.com/) is a essentially a big chat room-- like Slack or Microsoft Teams or GroupMe-- but geared towards gamers.

Communication is organized around "servers", which have any number of "channels" for specific topics, including voice channels, which are simple to pop into and talk with others. There's even support for streaming your computer screen and video calling, which has been perfect for our always-apart era.

As for the gaming part, most of us couldn't really be called "gamers". But we did end up playing one game together frequently: Minecraft.

## The boys and their blocks
Minecraft was perfect for us mainly due to its simplicity. The basic controls are great since many of us don't often game and can't be expected to keep up with anything hardcore; its system requirements are minimal, which was essential since only a few of us were playing on anything other than standard laptops; but mostly, the rules of the game are perfectly relaxed. You're not really expected do anything other than make a nice house to sleep in and... make it nicer. 

The trouble comes in when you want to play Minecraft _together_. While it's totally possible to join a networked game and interact with other players, there's little ready-to-go infrastructure; you can't just click a button and hop into a networked match like you'd expect with multiplayer games like Call of Duty.

Microsoft (Minecraft's owners) have added some ways to play online, but those features are separate to the game, almost like an extension.

It comes down to this. It's easy to play Minecraft with your friends - as long as you're hosting the server.

Minecraft provides [server software](https://www.minecraft.net/en-us/download/) that can create a networked world, but unless you've got a fairly good grip on ip networking and os fundamentals, it can be pretty tough to attempt.

It's out of the scope of this post, but setting up a custom Minecraft server involved opening a port on my home router's firewall, and forwarding that port to my PC (named Marilyn ❤️) which ran the Java server code. Anyone that wanted to play on my server would open a direct connection to my router's public ipv4 address.

This worked great! We had a persistent world to meet up in and fool around.

But there were certainly downsides. First of all, I live in California, and most of the friends on my server were east-coasters. It wasn't a very balanced solution to have one player have a flawless connection to the server (it was barely 10 inches away), and require everyone else to make the hop across the country.

And more importantly, I had to start and stop the server whenever we wanted to play, and troubleshoot it when it crashed.

I obviously didn't have much else to do, but there were times when I'd be putting in some extra hours at work, or maybe cooking dinner, and I couldn't pop over to Marilyn and manage a server. I had accidentally given myself the duties of a sys admin, and I desperately wanted to get rid of them.

My thinking was pretty simple: I'm just starting and stopping a Java program on my machine. __Can I swap my machine for a virtual one from a cloud provider?__

But doing so would give me less access to the program and its execution. __Can I set up a bot on the cloud instance, and send it commands via Discord?__

## Head in the clouds
I find few things as daunting as dealing with the behemoth that is AWS. So many services. So many obscure docs. One glance at the management console and I have to fight a basal urge to give up computing and live the rest of my days as a monk, unbothered by phrases like "outbound DNS rules" and "allocate dedicated hosts"

So I did my best to use a more simple service, one that abstracts over a provider like AWS.

I gave my trusty [Heroku](https://www.heroku.com/) the ole college try, but the pleasure of avoiding AWS comes with the pain of less flexibility and power. I simply couldn't get an instance with enough virtual RAM for the server at the free tier, which was where I constrained myself to as I was playing around.

So I groaned and committed to Amazon.

I don't pretend even for a second that I accomplished it in the optimal-- or even mostly correct, if we're being honest-- way, but I was able to provision a linux EC2 instance (with enough memory), ssh in, install Java, scp the server code over, and run the Minecraft server.

After setting up some inbound DNS rules (\*shudder\*) to allow people to connect, I could finally see that this experiment was on the path to being worth it. I gave the public DNS name of the instance to a friend, and they could connect in to our world!

Even better, it was free! The free tier for EC2 instances gives you 750 hours a month of uptime each month, for a year. That's just over 31 days a month, so as long as I only ever had one instance running at a time, I'll be in the clear!

And then I disconnected from the instance, and everything went dark.

Logging out from a machine kills all processes you started, which obviously included our server. I had to find a way to start a process and have it continue past my session.

I ended up going with the [nohup](https://linux.die.net/man/1/nohup) utility to ignore interrupt signals, but I'm not quite satisfied with the solution. Maybe the disown utility would be more correct, but even that feels like it's lacking.

But until I figure out the way the rest of the world does it, I have a server that keeps on trucking, regardless of my interaction with it.

## Birthing a bot

Ok, I was done with AWS. My next task was to ensure that I never have to open that console again.

Discord has a comprehensive [developer portal](https://discord.com/developers/docs/intro) that gives you all the documentation you need to integrate with their services.

I was particularly interested in the docs about [bots](https://discord.com/developers/docs/topics/oauth2#bots): at the simplest level, bots are special users that interact with a discord server via the Real Time Gateway, a communication service built with WebSockets.

Being a web developer by trade, I was excited to interact with a WebSocket service. But as I started [reading](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers) about the protocol and realized I'd have to be manipulating individual data frames and sending/receiving heartbeats to implement it correctly, I got scared off.

I think correctly implementing the protocol would be a really fun exercise on its own, but I had much more immediate high-level goals, so I offloaded to a third party [library](https://github.com/andersfylling/disgord), written in Go.

Using Go was my own choice; WebSockets are a language-agnostic protocol. But I've recently been quite taken by Go.

As a web developer, I spend a lot of time in Javascript-land, a beautiful-- and often befuddling-- domain, where the interpreter (in your browser, or Node, perhaps) manages your memory, optimizes your repetitive code, and dynamically checks your types during runtime.

It's a wonderful place to quickly build applications and experiences, but sometimes you just want to get a little bit closer to the metal.

Sure, it takes a bit more effort, but there's a specific joy to writing precise and performant systems software, one that is hard to achieve in the comfort of Javascript-land.

While it's worthy of its own blog post (and may get one before too long), I find Go to be a great language to scratch that itch, while still offering excellent quality-of-life features. Goroutines quickly come to mind: Go's simple concurrency model based on message passing.

Now onto the nuts and bolts. I'm going to go over my implementation of the bot here, so you may need a basic understanding of Go fundamentals to track along, notably [goroutines](https://tour.golang.org/concurrency/1) and [channels](https://tour.golang.org/concurrency/2).

My bot needed to do two things: it needed to be __interactive and responsive__, and it needed to __perform useful actions__.

The interactivity comprised of connecting to the Discord WebSocket gateway, listening to messages, and responding when necessary, sometimes asynchronously.

I say asynchronously because some responses will not always be a direct "response" to a user message. For example, the minecraft server may crash, due to no user action, or it may take a long time to start up after you asked it to boot. So we need to be able to send messages at any time, not just in "response" to a user's message.

Disgord takes care of the connection to the gateway, and exposes a simple api to listen and respond to messages.

```go
// MakeBotManager starts discord bot that listens to incoming messages, and sends ServerRequestOps when a valid
// command is requested. it also sends messages back to the discord server based on the messages provided by the
// discordResponses channel
func MakeBotManager(serverRequests chan<- *defs.ServerRequestOp, discordResponses chan string) {
	bg := context.Background()
	client := disgord.New(disgord.Config{
		BotToken: os.Getenv("BOT_TOKEN"),
	})
	var channelID disgord.Snowflake
	fmt.Println(client)

	defer client.StayConnectedUntilInterrupted(bg)

	handleMessage := func(session disgord.Session, evt *disgord.MessageCreate) {
		msg := evt.Message
		if channelID == 0 {
			// NOTE: FLAKY
			// WILL ONLY WORK IF BOT IS ON ONE DISCORD SERVER
			channelID = msg.ChannelID
		}
		if !msg.Author.Bot && strings.HasPrefix(msg.Content, "!bb ") {
			cmd := msg.Content[4:]
			op, err := parseOp(cmd, defs.Commands)
			if err != nil {
				discordResponses <- "ERROR: " + err.Error()
				return
			}
			serverRequests <- op
		}

	}

	client.On(disgord.EvtMessageCreate, handleMessage)

	fmt.Println("BOT IS LISTENING")

	go func() {
		for {
			discordMsg := <-discordResponses
			client.CreateMessage(bg, channelID, &disgord.CreateMessageParams{
				Content: discordMsg,
			})
		}
	}()
}
```

Here we create the "bot manager", given a channel to send requests to our minecraft server (`serverRequests`) and a channel that receives custom messages that we want to send _back_ to the discord server (`discordResponses`).

By using the disgord api `client.On(...)`, we're able to pass our `handleMessage` function and listen to messages that users send in our discord server.

Our command to invoke the bot is "!bb \<your command\>", so any message that begins with that is read as a command, a "serverRequestOp" in the bot's terms.

Parsing the message string into the op is handled by, you guessed it, `parseOp`, which calls some custom string processing logic to handle the available commands and their arguments. (Think "!bb create -name=hyperion -mode=creative". This logic was actually some of the most fun to write! But it's a bit unimportant to this post, so I'll skip over the details.)

Once we've got an op, we pass it into the `serverRequests` channel, which is where the "performing useful actions" cycle begins.

But before we can do the useful stuff, we need the other half of interactivity. We've got the listening part down, all we need now is responding. We let the part that does the useful stuff actually _generate_ those messages, because we need them to be, you know, useful.

We kick off a goroutine with an infinite loop that listens for messages to send back our our `discordResponses` channel. If we get one, we send it to our Discord server. It comes in as "from" our bot user, which is registered with Discord.

And with that, we've got all the plumbing we need for interactivity and responsivity. On to the fun stuff.

```go
// MakeServerManager listens to the serverRequest channel and performs ops against a mc server, sending string updates to the discordMessages channel
func MakeServerManager(serverRequests <-chan *defs.ServerRequestOp, discordResponses chan<- string) {
	serverResponses := make(chan *defs.ServerResponseOp)
	serverManager := &manager{state: idle, server: nil, serverResponses: serverResponses}

	go func() {
		outgoingArrow := "<- "
		for {
			var action serverAction
			var ok bool
			var args map[string]string

			select {
			case serverRequest := <-serverRequests:
				args = serverRequest.Args
				action, ok = serverRequestActions[serverRequest.Code]
				break
			case serverResponse := <-serverResponses:
				args = serverResponse.Args
				action, ok = serverResponseActions[serverResponse.Code]
			}

			if !ok {
				fmt.Println("Hm... unknown action requested")
				continue
			}
			responseMsg := action(serverManager, args)
			fmt.Println(outgoingArrow + responseMsg)
			discordResponses <- responseMsg
		}
	}()
}
```

Where we made a "bot manager" for interactivity, we make a "server manager" for actions associated with our minecraft server given the same two channels in the previous case.

We kick off another goroutine with an infinite loop here, and use Go's concurrent `select` statement to wait until we get a message from `serverRequests`-- which are kicked off by user messages, as we saw earlier-- or from `serverResponses`-- a channel that describes an update to our minecraft server, like the asynchronous updates mentioned earlier. These are created by the server itself, like a crash.

The actual "server", meaning the Java program that creates our networked minecraft world, is abstracted in our `serverManager` struct. It is the "owner" of the `serverResponses` channel; it's the one who sends the messages to that channel on updates.

But the logic-- the _useful_ part-- that is invoked in each case, is pretty spare, isn't it?

That's because we separate the actual _implementation_ of each action (of which there are many), with the plumbing of _receiving and dispatching_ those actions.

The actions for for requests and responses are defined in the two maps, `serverRequestActions` and `serverResponseActions` (who ever said naming things was hard?), and the looked-up action is invoked afterwards: `responseMsg := action(serverManager, args)`.

Those actions define what our bot actually _does_, which include things like: create a new world, start a world, stop a running world, kill it instead, get the status and recent logs of our minecraft server; anything you'd need to manage our digital world. It'd be tedious to go through them all, but if you're interested, each action is implemented [here](https://github.com/matthewdavidrodgers/dbot-mk2/blob/master/mcserver/actions.go).

We always respond immediately to a request for an action; it's good UX to ensure the user knows that their actions are acknowledged, so we pop the result message (`responseMsg`) back to the discord server.

It is time to finally see how we _actually_ start up a Java minecraft server from this Go bot. Let's take a look at `startServer`, a function that's called by the action for "!bb start \<world name\>".

```go
func startServer(notify chan<- *defs.ServerResponseOp, world string) *server {
	serverCmd := exec.Command("Java", "-Xmx1024M", "-Xms512M", "-jar", "../../server.jar", "--nogui")
	pwd, err := os.Getwd()
	utils.Check(err)
	serverCmd.Dir = filepath.Join(pwd, "bb-worlds", world)

	logFile, err := os.OpenFile("bb-logs", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0666)
	utils.Check(err)

	serverCmd.Stdout = logFile
	serverCmd.Stderr = logFile
	serverInputPipe, err := serverCmd.StdinPipe()
	utils.Check(err)

	now := time.Now()
	portPollSucceeded := make(chan bool)
	abortPortPolling := make(chan bool)

	go func() {
		logFile.WriteString("\n\n=== BEGIN BB SESSION " + now.String() + " ===\n\n\n")
		serverCmd.Start()
		serverCmd.Wait()

		logFile.Close()
		notify <- &defs.ServerResponseOp{Code: defs.Stopped}
	}()

	go func() {
		for {
			pingPortCmd := exec.Command("/bin/sh", "-c", "sudo lsof -i -P -n | grep 'TCP \\*:25565 (LISTEN)'")
			resp, err := pingPortCmd.CombinedOutput()

			bound := err == nil && len(resp) > 0
			portPollSucceeded <- bound
			if bound {
				fmt.Println("polled for port - success!")
				return
			}
			fmt.Println("polled for port - failed")
			time.Sleep(5 * time.Second)

		}

	}()

	go func() {
		for {
			select {
			case portWasBound := <-portPollSucceeded:
				if portWasBound {
					notify <- &defs.ServerResponseOp{Code: defs.Started}
					return
				}
			case <-abortPortPolling:
				return
			}
		}
	}()

	return &server{
		startedOn: now,
		worldName: world,
		stop: func() {
			serverInputPipe.Write([]byte("stop\n"))
			serverInputPipe.Close()
		},
		kill: func() {
			abortPortPolling <- true
			serverCmd.Process.Kill()
		},
	}

}
```

There's a lot going on here, including three goroutines kicked off from this one function, but this function is the key to our whole bot.

The first thing we do is create a shell command, as provided by the "os/exec" package in Go's standard library.

If it looks like we just calling Java with the server.jar file, it's because we are! Not too tough after all.

But there's a lot more happening here. The first thing to notice is that we're running the output of this command (stderr and stdout) to a logfile (we call it "bb-logs").

In our first goroutine, we kick off the server, and once it's finished (after any amount of time that we play), we close our logfile and notify that the server stopped with a `serverResponseOp`.

In our second goroutine (which, remember, kicks off concurrently with the first one), kicks off an infinite loop that repeatedly creates a new shell command. It's arcane bash-speak, but what it translates to is: "has port 25565 been bound?".

We ask this because our server may take a long time to start up. And we know it's finished when it's actually bound to port 25565, meaning it's listening to network traffic. Once we're good to go, we send an update to a local channel: `portPollSucceeded`.

Before we look at the third goroutine, we should note that we return a pointer to a `server` struct, which gets stored in our serverManager struct. It has a function `kill`, which sends a message to the other channel local to this function `abortPortPolling`. This "kill" function is called when the action for-- you guessed it again, you're good at this!-- "kill" is invoked.

Now we can take a look at that third goroutine. Another loop and select, this time selecting between `portPollSucceeded` and `abortPortPolling`. Whichever happens first lets us know what occurred: either we bound to the port successfully and can notify the discord that our server is running, or we've bailed out early after a kill command (which we respond to separately in the kill action).

And there we have it! Our bot can start our Java minecraft server as needed!

There are of course similar functions to startServer that handle the stopping and log checking, but they're just extensions of the concepts shown above.

## Final bits

This project has been exciting at all stages. Necessity met innovation quite cleanly, and it allowed me to flex some muscles that I don't often get to exercise.

I wrote a good deal of Go for my bot, and I ended up dipping my fingers into a lot of standard library packages, which has given me a very through tour of the language.

And, as I'm sure it became clear by the end of the walkthrough of my implementation, I had to lean heavily on Go's concurrency model. But Go easily held that weight, and made clear that the message passing model built over channels and goroutines could do much more!

There are still drawbacks that I have yet to resolve, the first of which being that logs can't be checked until the server is stopped, which is very frustrating.

I had trouble with the pipes of the exec'd command and the logfile I was writing them to. Piping directly to the logfile worked fine, but trying to buffer them at all, so that I could check them and report to the discord server on request, proved to be a challenge I didn't quite understand. I expect more work with Go to get me there, but I was ok giving up on that front for this project.

The other piece that's not quite there is the reliability of the minecraft server on my cloud instance. Extended play times would sometimes cause the server to choke and crash, especially with four or more players all playing at once.

For the most part, this hasn't been a huge issue, as we all play very casually, and the amount of time it takes to hit that threshold is usually where we start getting bored, but it is a clear weak point in the infrastructure.

The only available option seems to be upgrading our instance, and selecting one with more virtual RAM. That, of course, means leaving the free tier.

We're not opposed to the option, but for now, I think everyone's quite happy with the state of things.

And the state of things is quite exciting! No part of this project has been especially challenging, and if you wanted to make this even simpler, there are plenty of libraries for interacting with the Discord gateway written in Python, Javascript, and pretty much any other language you're comfortable in.

The real power comes when you give your bot something to _do_. In our case, we wanted our bot to manage a cloud minecraft server.

But what if you wanted to pass an input string to a trained machine learning model, and have it [generate a fantasy story with that input](https://www.robinsloan.com/notes/writing-with-the-machine/)? What if you wanted to [kick off a torrent download](https://blog.jse.li/posts/torrent/) of a given .torrent file and paste back a hosted link in an AWS S3 bucket?

Hosting a minecraft server is just one example of what's possible with these tools, and I don't think for one second that this will be my only project to use them.

Thanks for giving this a read! You can check out all the code for the bot [here](https://github.com/matthewdavidrodgers/dbot-mk2).