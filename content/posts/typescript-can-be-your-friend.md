---
title: "TypeScript can be your friend... if you let it"
date: 2021-07-31T11:06:20-07:00
draft: false
summarizable: true
---

I got bit by the TypeScript bug _hard_ a few years ago. Having the compiler to lean on has made me much more productive and confident in my work.

But I know a lot of people don't feel this way. We don't always get autonomy in what tools we use, so sometimes people are forced onto TypeScript against their preferences. And people can often get stuck feeling like they have to fight against the compiler, or at least continually contend with its nagging.

Most people understand that TypeScript adjusts some tradeoffs in the effort we apply to a project. In normal JS, you can get something up and running quickly, but may have to spend much more time addressing bugs or edge cases. Where with TS, you put in more work up front, and have to do less fiddling with small things, as the compiler will catch them early on.

But "putting in the work" up front isn't as easy as it sounds. There are many ways to type a system, especially with a type system as powerful as TypeScript's. And in my opinion, a poorly typed system can be a lot more frustrating than an untyped one. Having an app blow up on a TypeError even though it compiled successfully can drive me nuts.

So today I want to go through an example of converting an example set of JS code to TS: from adding the first annotations to getting to a place where the compiler is genuinely _helping_, not hindering. So let's take a look.

```typescript
let state = {
  dirty: false,
  status: "",
  data: []
}

function actionHandler(action) {
  if (action.type === "ToggleDirty") {
    state.dirty = !state.dirty;
  } else if (action.type === "UpdateStatus") {
    state.status = action.value;
  } else if (action.type === "UpdateData") {
    state.data[action.at] = action.value;
  } else if (action.type === "AppendData") {
    state.data.push(action.value);
  }
}

actionHandler({ type: "UpdateStatus", value: "editing" });
actionHandler({ type: "AppendData", value: "entry" });
actionHandler({ type: "UpdateData", at: 0, value: "edited-entry" });
actionHandler({ type: "ToggleDirty" });
```

We've got a state object and function that takes an action and updates our state in different cases. This might be familiar to anyone with experience with redux, albeit in a simplified form.

One of the reasons we may want to move this to TypeScript in the first place is how permissive the call signature is. We've invoked the function correctly above, but what's to stop us from calling it like this?

```typescript
// none of these will work
actionHandler({ type: "SetDirty" }); // should be "ToggleDirty" instead of "SetDirty"
actionHandler({ type: "UpdateData", index: 0, payload: "incorrect" }); // should be "at" and "value", not "index" and "payload"
actionHandler("ToggleDirty"); // should be an object, not a string
```
 
Ok, so we can recognize that we have to continually check the implementation of actionHandler in order to call it correctly. That's not great. But if we start to lock down the types, we can rely on those instead. So let's add some type annotations.

First thing up is a type for state, that's fairly simple:
```typescript
type State = {
  dirty: boolean;
  status: string;
  data: string[];
}

let state: State = {
  dirty: false,
  status: "",
  data: []
};
```

Next, let's see if we can type our action parameter. By checking the javascript implementation, we can see that it should be an object, definitely with a "type" property, which is a string.

But it's a pretty dynamic object. It could have a "value" property, but in the UpdateData case, it could also have an "at" property. And in ToggleDirty, it doesn't need anything other than the type.

Well, we can make those properties optional. Let's give that a go.

```typescript
type Action = {
  type: string;
  value?: string;
  at?: number;
}
```

Actually, we can go ahead and go a step further than that. We can lock down the "type" field so that we only handle specific action types (i.e. so that somebody doesn't accidentally pass "SetDirty" instead of "ToggleDirty").

```typescript
type Action = {
  type: "ToggleDirty" | "UpdateStatus" | "UpdateData" | "AppendData";
  value?: string;
  at?: number;
}
```

Definitely getting there. Let's plug it in to the function signature.

```typescript
type Action = {
  type: "ToggleDirty" | "UpdateStatus" | "UpdateData" | "AppendData";
  value?: string;
  at?: number;
}

function actionHandler(action: Action) {
  if (action.type === "ToggleDirty") {
    state.dirty = !state.dirty;
  } else if (action.type === "UpdateStatus") {
    state.status = action.value;
  } else if (action.type === "UpdateData") {
    state.data[action.at] = action.value;
  } else if (action.type === "AppendData") {
    state.data.push(action.value);
  }
}

actionHandler({ type: "UpdateStatus", value: "editing" });
actionHandler({ type: "AppendData", value: "entry" });
actionHandler({ type: "UpdateData", at: 0, value: "edited-entry" });
actionHandler({ type: "ToggleDirty" });
```

Hm. If you tried this yourself, you noticed that this doesn't compile. TypeScript is telling us that we can't assign status to undefined, or push undefined into data, or index data with undefined. Because we made "value" and "at" optional in our action, we can't guarantee that they'll be present when we need them to be.

Ok, well let's make that guarantee. We can just add a check or two to the if cases.

```typescript
type Action = {
  type: "ToggleDirty" | "UpdateStatus" | "UpdateData" | "AppendData";
  value?: string;
  at?: number;
}

function actionHandler(action: Action) {
  if (action.type === "ToggleDirty") {
    state.dirty = !state.dirty;
  } else if (action.type === "UpdateStatus" && action.value !== undefined) {
    state.status = action.value;
  } else if (action.type === "UpdateData" && action.value !== undefined && action.at !== undefined) {
    state.data[action.at] = action.value;
  } else if (action.type === "AppendData" && action.value !== undefined) {
    state.data.push(action.value);
  }
}

actionHandler({ type: "UpdateStatus", value: "editing" });
actionHandler({ type: "AppendData", value: "entry" });
actionHandler({ type: "UpdateData", at: 0, value: "edited-entry" });
actionHandler({ type: "ToggleDirty" });
```

There, we're back to compiling.

But I still don't think we've gotten to that sweet spot where the compiler helps us out. It seems pretty impossible to get a TypeError here, but we can still get in trouble when we call the function.

What happens when we do this?

```typescript
actionHandler({ type: "UpdateStatus" });
// or this?
actionHandler({ type: "ToggleDirty", value: "garbage", at: 12 });
```

Those calls will still compile, but they will fall out of all the if cases in the function, meaning nothing will happen when you call the function this way.

This is what I mean when I say the compiler isn't _helping_ us yet. It's helping us avoid doing the wrong thing, something that could error, yes. But it's not really helping us do the _right_ thing.

Can we get the compiler to guide us to the right thing? If we adjust the type for our Action, yes! Check this out:

```typescript
type Action =
  | { type: "ToggleDirty"; }
  | { type: "UpdateStatus"; value: string; }
  | { type: "UpdateData"; value: string; at: number; }
  | { type: "AppendData"; value: string; }
```

We've broken our action out from being a single object type to being a _union_ of object types, in the same way that we previously had a union on the "type" field for our string types.

What's great about this is that we can now isolate other properties to a single string type-- the compiler is smart enough to know that when it can guarantee that "type" === "AppendData", "value" is a string, and there is no "at" property. This is called "Type Narrowing" -- narrowing a wider type into a more narrow one based on a discriminating field.

Now we can even remove the extra checks against properties being undefined in the function body.

```typescript
type Action =
  | { type: "ToggleDirty"; }
  | { type: "UpdateStatus"; value: string; }
  | { type: "UpdateData"; value: string; at: number; }
  | { type: "AppendData"; value: string; }

function actionHandler(action: Action) {
  if (action.type === "ToggleDirty") {
    state.dirty = !state.dirty;
  } else if (action.type === "UpdateStatus") {
    state.status = action.value;
  } else if (action.type === "UpdateData") {
    state.data[action.at] = action.value;
  } else if (action.type === "AppendData") {
    state.data.push(action.value);
  }
}
```

So now what happens if you try to call an "UpdateStatus" action without a "value"? A compiler error! And a very useful one too! `Property 'value' is missing in type '{ type: "UpdateStatus"; }' but required in type '{ type: "UpdateStatus"; value: string; }'.`

That lets you know very quickly what you're missing.

And _this_ is our sweet spot. The compiler is not only helping you avoid writing the wrong thing, but guiding you to the right thing.

And, as an added benefit, the function body _is exactly the same_ as the plain JS version. We're able to maintain the dynamism and expressivity of JS but put guidelines around it, for ourselves and whomever touches the code next.

There are lots of ways to weild TypeScript, and it's not always easy to get to the sweet spot. But code authored in this way can seriously be a plus, and can assist in everything from reading/groking a codebase to bolstering confidence in huge refactors that may touch many things. 

So let TypeScript be your friend!

{{< aside >}} If you enjoyed this and want to dive deeper into the ways TypeScript can guide you to writing correct code, check out [this article](https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/) about conditional types, one of TypeScript's biggest superpowers {{</ aside >}}
