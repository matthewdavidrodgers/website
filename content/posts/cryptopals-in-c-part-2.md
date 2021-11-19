---
title: "Cryptopals in C Part 2"
date: 2021-11-18T22:14:18-05:00
draft: true
summarizable: true
---

## todo
[x] buffer overflows
[x] uninitialized memory, often causing overflows or non-null ptrs
[x] the lack of generic types, common collection operations are tough
[] cardinal sin, trying to decode using too-small samples
  [] led to being unable to get good english scores or accurate keysizes
  [] led to trying to brute force too many things, spiraling into permutations
[] basically getting it, but base64 was actually wrong
[] pleasant things
  [] using ifdefs to block in / turn on/off testing features
  [] building an api around dynamic buffers
[] next challenge involves openssl... libssl? uh oh
