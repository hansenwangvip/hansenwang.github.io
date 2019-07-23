
---

title: 【译文】JavaScript作用域的通俗解读
categories: 技术
date: 2019-06-22
tags: [技术，翻译，JS]

---


> 原文：[http://www.digital-web.com/articles/scope_in_javascript/](http://www.digital-web.com/articles/scope_in_javascript/)
原文发表于2006年11月11日。
译文发表于2019年6月22日。


> 译注单词表：
	- Scope : 作用域
	- Context：上下文
	- Scope Chain：作用域链
	- Execution context: 执行上下文

--- 
# JavaScript作用域的通俗解读 （上篇）

作用域是JavaScript语言的基础概念之一，也可能是我在编写复杂程序时最挣扎的一个概念。我已数不清多少次，在函数间传递控制时，丢失了`this`关键字的指向。我也经常发现自己经常以各种令人困惑的方式扭曲自己的代码，试图在我理解哪些变量可以访问哪些地方的时候，保留一些外观上的理智。

<!--more-->

这篇文章将正面解决问题，概述上下文和作用域的定义，检查两个允许我们修改上下文的JavaScript方法，并深入探讨我遇到的百分之九十的问题的有效解决方案。


## 我在哪里？你是谁？

JavaScript程序的每一部分都在一个执行上下文中执行。你可以把这些上下文当作你的代码的邻居，告诉每一行代码它从哪来，还有它有哪些朋友和邻居。事实证明，这是重要的信息，因为JavaScript社会对谁可以与谁联系有着相当严格的规则；执行上下文更多地被认为是封闭社区，而不是开放式小区。
> 译注：封闭社区(gated communities): 一个通过大门控制交通和人流进出的住宅区。

我们通常可以将这些社会边界称为作用域，并且它们很重要，可以在每个社区的章程中编纂，我们将其称为上下文的作用域链。特定的相邻的代码只能访问其作用域链中列出的变量，并且相较于跟邻里之外的联系，代码更喜欢与本地变量的交互。

实际上说，评估一个函数的时候，会简历一个独特的执行上下文，将其本地作用域附加到其定义的范围链中。在一个特定上下文中，JavaScript通过作用域链的攀爬，从本地到全局地，解析标志符。这就意味着，同名的作用域链上更高的局部变量，优先级更高。这是有道理的：如果我的好朋友在一起讨论"Mike West"，很明显它们在谈论我，而不是同名的歌手或者教授，就算他们更加出名。

让我们通过一些实例代码来探讨其含义：

```

var ima_celebrity = "Everyone can see me! I'm famous!", // 明星 
the_president = "I'm the decider!";` //  总统

function pleasantville() { // 欢乐谷 
	var the_mayor = “I rule Pleasantville with an iron fist!”, // 市长
	ima_celebrity = “All my neighbors know who I am!”;

	function lonely_house() { // 山上的小屋
		var agoraphobic = “I fear the day star!”, // 广场恐惧症患者
		a_cat = “Meow.”;  // 猫
	}  
}

```

我们的明星`ima_celebrity`，每个人都认识她。她在政治上很活跃，经常和总统联系，并且非常友好；她会为遇到的任何人签名并回答问题。也就是说，她和她的粉丝没有很多个人接触。她很确定他们的存在，并且他们可能在某个地方有自己的生活，但她当然不知道他们在做什么，甚至不知道他们的名字。

在欢乐谷（pleasantville）中，市长是一个众所周知的面孔。她经常在城市的街道穿行，和她的选民谈话，握手，还有亲吻小孩子。因为欢乐谷是一个很大很重要的社区，所以她的办公室里又一个大大的红色电话，给她一条直连总统的线，一周七天，一天24小时无休。她看到过城郊小山上有一间孤独的小屋（lonely_house），但是从不去关心谁住在里面。

那间孤独的小屋对它自己来说就是一个世界。有个广场恐惧症患者（agoraphobic）大多数时间待在里面，玩纸牌，喂猫(a_cat)。他好几次打电话给市长询问关于本地噪音的法规，并且在本地新闻上看到明星(ima_celebrity)后，甚至还给她写过一些粉丝信。


## this? 是什么东西？

除了建立作用域链之外，每个执行上下文都提供了一个名为this的关键字。在大多数的用法中，`this`提供一个标志的功能，为我们的社区提供了一个引用自身的方式。然而，我们不能总是依赖这个行为：依赖于我们如何进入一个特定的社区，`this`可能代表着完全不同的东西。事实上，*我们如何访问社区*本身`this`通常所指的内容。有四个场景值得我们关注：

- 调用一个对象的方法
在典型的面向对象语言中，我们需要一种识别和引用我们当前正在使用的对象的方法。`this`令人欣慰，为我们的对象提供了检查自己的能力，并指出了自己的属性。

```js
var deep_thought = {
	the_answer: 42,
	ask_question: function(){
		return this.the_answer;
	}
}

var the_meaning = deep_thought.ask_question();
```

这个例子新建了一个名为"deep_thought"的对象，将它的the_answer属性设置为42，并且创建了一个ask_question方法。当deep-thought.ask_question()执行了，JS为函数调用创建了一个执行上下文，将this设置为"."之前引用的对象，在这个示例中就是deep_thought。这个方法通过this查看镜像以检查其自身的属性，并返回存储在this.the_answer中的值：42。



- 调用构造函数
同样地，当定义一个要作为new关键字的构造器函数时，this可被用来指代正在创建的对象。让我们重写商民的例子来演示这个场景：

```js
function BigComputer(answer){
	this.the_answer = answer;
	this.ask_question = function(){
		return this.the_answer;
	}
}
var deep_thought = new BigComputer(42);
var the_meaning = deep_thought.ask_question(); // 42
```

我们没有直接创建这个`deep_thought`对象，而是写了一个函数去创建BigComputer对象，并且通过new关键字，实例化了一个deep_thought实例变量。当 `new BigComputer()`执行的时候，在后台公开地创建了一个全新的对象。`BigComputer`被调用了，并且它的`this`关键字被设置为引用那个新对象。这个函数可以在`this`上设置属性和方法，在BigComputer执行结束时公开地返回。

但是请注意，deep_thought.the_question()仍然像以前一样工作。那里发生了什么？为什么this在the_question内部与BigComputer内部的意义不一样？简单来说，我们通过new 进入了BigComputer，所以this表示"新对象"。另一方面，我们通过deep_thought进入了the_question，所以当我们执行了那个方法，this意味着"deep_thought指向的任何值"。this不像其他变量一样，从作用域链中读取，而是在上下文的基础上重置。

- 调用普通函数

如果我们只是调用一个普通的日常的没有其他花样的函数呢？在这种场景中`this`又如何指向？

```js
function test_this(){
	return this;
}
var i_wonder_what_this_is = test_this();
```

在这种情况下，我们没有提供新的上下文，也没有给出一个背景形式的上下文来捎带。在这里，this可以引用最全局的东西：对于网页，就是window对象。


- 事件处理器（**Event Handler**）
对于正常函数调用的更复杂的转换，假设我们正在使用函数来处理onclick事件。当事件出发我们的函数执行时，this指向哪里呢？不幸的是，这个问题没有简单的答案。如果我们内联地写一个事件处理函数，this指向全局的window对象：
```js
function click_handler(){
	alert(this); // alerts the window object
}
// ...
// <button id="thebutton" onclick="click_handler()">Click me!</button>

```

然而，当我们通过JS来添加一个事件处理函数，this就指向了生成事件的DOM元素。
```js
function click_handler() {  
	alert(this); // alerts the button DOM node  
}

function addhandler() {  
document.getElementById(‘thebutton’).onclick = click_handler;  
}

window.onload = addhandler;
```


## 难题
 
让我们在最后一个例子中运行一会儿。如果不是运行click_handler，我们每次点击按钮时都想"问deep_thought一个question"怎么办？代码看起来非常简单:
```js
function BigComputer(answer) {
	this.the_answer = answer;
	this.ask_question = function () {
		alert(this.the_answer);
	}
}

function addhandler() {
	var deep_thought = new BigComputer(42),
	the_button = document.getElementById(’thebutton‘);
	the_button.onclick = deep_thought.ask_question;
}

window.onload = addhandler;
```

很完美，对吧？我们点击了按钮，`deep_thought.ask_question`被执行了，然后我们得到"42"。那么为什么浏览器却给我们返回了 undefined？我们那里错了？

问题很简单：我们传递了对ask_question方法的引用，当作为事件处理程序执行时，该方法在与作为对象方法执行时不同的上下文中执行。简短来说，ask_question中的 this 关键字，指向了生成事件的DOM元素，而不是BigComputer对象。这个DOM元素没有the_answer属性，因此我们将返回undefined，而不是“42”。setTimeout 表现出类似的行为，延迟函数的执行，同时将其移动到了全局上下文中。

这个问题遍布在我们的程序中，如果没有仔细跟踪程序所有角落的情况，调试是一个非常困难的问题，特别是如果你的对象具有DOM元素上存在的属性或者window对象。

## 使用`.apply()` 和 `.call()`修改上下文
我们很想在点击按钮的时候向`deep_thought`提一个问题，并且更一般地说，我们希望能够在响应事件和setTimeout调用之类的事情时在其本地上下文中调用对象方法。两个鲜为人知的JavaScript方法，`apply()`和`call()`，通过允许我们在执行函数调用时手动覆盖this的值，来间接启用这个功能。我们先来看`call`:
```js
var first_object = {  
	num: 42  
};  
var second_object = {  
	num: 24  
};

function multiply(mult) {  
	return this.num * mult;  
}

multiply.call(first_object, 5); // returns 42 * 5  
multiply.call(second_object, 5); // returns 24 * 5
```

---
未完待续... 
下一篇：《JavaScript作用域的通俗解读 （下篇）》
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMzU5OTUzNywtNzY5ODE2MjU1LDYxMT
I5OTc2M119
-->