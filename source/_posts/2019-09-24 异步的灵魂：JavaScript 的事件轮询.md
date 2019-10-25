---
layout: post
title: 异步的灵魂：JavaScript 的事件轮询
date: 2019-9-24 10:00:59
tags: JavaScript
description: 在Youtube上找到了两个很精彩的演讲，通俗地解释了事件轮询的工作原理。
---

JavaScript是一门单线程的异步语言。我好奇事件轮询是怎么实现的，它又是如何跟其他几个核心功能进行协作的？比如 Call Stack, Callback Queue。

但是我在ECMA-262标准中，发现异步功能的实现不属于ECMAScript的范畴。在Google了一番后，我才知道，事件轮询 (Event Loop) 是JavaScript异步编程的基础，这个功能由宿主环境实现。如此核心底层的功能，在浏览器和Node中都有实现。

在Youtube上找到了两个很精彩的演讲，通俗地解释了事件轮询的工作原理。

> [What the heck is the event loop anyway? | Philip Roberts | JSConf EU - YouTube](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

> [Jake Archibald: In The Loop - JSConf.Asia - YouTube](https://www.youtube.com/watch?v=cCOL7MC4Pl0)

了解事件轮询的工作原理，就能克服JavaScript异步编程的难点。

参考文章：https://blog.csdn.net/cofecode/article/details/80840817
