---

title: JavaScript 基础(1)
categories: 前端
date: 2017-03-06 
update: 2017-07-11
tags: [JavaScript]

---

这篇文章主要总结了JavaScript的基础，包括数据类型，值和易混淆的概念。
<!--more-->

# 1. JavaScript的基本数据类型

 1. Undefined
 2. Null
 3. Number
 4. Boolean
 5. String
 6. Symbol(ES2015新增)

# 2. JavaScript的内置对象

 - Object 是JS中所有对象的父对象
 - 数据封装类对象：
  1. Object
  2. Array
  3. Boolean
  4. Number
  5. String
 - 其他对象：
	 1. Function
	 2. Arguments
	 3. Math
	 4. Date
	 5. RegExp
	 6. Error 

> 参考文档：[文档链接](http://www.ibm.com/developerworks/cn/web/wa-objectsinjs-v1b/index.html)



# 3. JavaScript 中有几种类型的值？

 - 栈(Stack)：原始(primitive)数据类型(Undefined, Null , Boolean, Number, String)
 - 堆(Heap)：合成(complex)数据类型(Object, Array, Function)

 - 两种类型的区别是： **存储位置不同**
 - 原始数据类型：直接存储在**栈**中的简单数据段，占据空间小，大小固定，属于被频繁使用的数据，所以放入栈中存储；
 - 引用数据类型：存储在堆(Heap)中的对象，占据空间大，大小不固定。如果存储在栈中，则会影响程序的性能。
 > 引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后，从堆中获得实体。

 - 内存图： 
 ![enter image description here](https://camo.githubusercontent.com/d1947e624a0444d1032a85800013df487adc5550/687474703a2f2f7777772e77337363686f6f6c2e636f6d2e636e2f692f63745f6a735f76616c75652e676966)



# 4. null和undefined的区别

 - null 表示"没有对象"，即该处不应该有值，典型用法：

    > 1. 作为函数的参数，表示该函数的参数不是对象。
    > 2. 作为对象原型链的终点。 
    
    ```js
    Object.getPrototypeOf(Object.prototype)
    //null
    ```

 - undefined 表示“缺少值”，即此处应该有值，但是没有被赋值，典型用法：

    > 1. 变量被声明了，但是没有赋值，默认等于undefined。
    > 2. 调用函数时，应该提供的参数没有提供，该参数等于undefined。
    > 3. 对象没有赋值的属性，该属性默认值为undefined。
    > 4. 函数没有返回值时，默认返回undefined。
    ```js
    var i;
    i  //undefined
    
    function f(x){console.log(x)}
    f() //undefined
    
    var o = new Object();
    o.p //undefined
    
    var x = f();
    x //undefinde
    ```


```js
	//二者的测试
	typeof undefined == "undefined" //true
	typeof null == "object" //true
	
	Number(undefined)   //NaN
	Number(null)  //0
```

 3. 注意：
	 在验证null时，一定要使用 `===`,因为 `==` 无法分辨null和undefined：
	 
	```js
	    null == undefined //true
	    null === undefined //false
	```
 4. 打个比方： 
  - null
	  - Q: 有张三这个人吗？
	  - A:  有！
	  - Q: 张三有房子吗？
	  - A: 没有！
  - undefined
	  - Q: 有张三这个人吗？
	  - A: 有！
	  - Q: 张三多少岁了？
	  - A: 不知道（没有被告诉）



# 5. JavaScript的this

 - this是一个指针
 - this的指向：
	 1. 函数直接调用时：this指向函数的直接调用者；
	 2. 通过new关键字，this指向new产生的新对象；
	 3. 通过call/apply/bind的绑定，this指向绑定对象。
	 4. 在JS事件中，this指向触发这个事件的对象，但是在IE中，attachEvent中的this总是指向全局对象Window。



# 6.JavaScript的作用域链
全局函数无法查看局部函数的内部细节，但局部函数刻意查看上层函数的细节，直至全局细节。

当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局函数，这种组织形式就是作用域链。
 




# 7. JavaScript原型和原型链

 - 原型：每个对象都会在其内部初始化一个属性，就是prototype(原型)。换句话说，**所有对象都是以对象为模板创建实例的。**

 - 原型链：当我们访问一个对象的属性A时，如果属性A不存在于该对象中，那么我们会去prototype里查找A，而这个prototype又会有自己的prototype，于是就如此查找下去，就形成了一个原型链。这个原型链表示的是一种连带关系。

 - 关系：`instance.constructor.prototype = instance.__proto__`

 - 特点：JS对象是通过**引用传递**的（对比于值传递），我们创建的每一个新对象实体中，并没有一份属于自己的原型副本。当我们修改了原型，与之相关的对象也会**继承**这些变化。
 - 终点：原型链的顶端，是`Object.prototype`, 它的`__proto__`指向`null`.

# 8.JavaScript的闭包

 1. 概念
	闭包是一种手段，一个有权访问另一个函数作用域中变量的函数，记住闭包也是函数。
	
 2. 创建闭包
  最常见的方式，就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量(相当于一个对外的接口)。
  
 3. 作用
	利用闭包可以突破作用域链，将函数内部的变量方法传递到外部。
	
 4. 特性
		 1. 函数内再嵌套函数
		 2. 内部函数可以引用外层的参数和变量
		 3. 参数和变量不会被垃圾回收机制回收

# 9. new操作符到底干了什么？
 1. 创建一个空对象，将this指针指向该对象，同时继承该函数的原型。
 2. 属性和方法被添加到this指向的对象中。
 3. 新创建的对象由this所应用，并且最后隐式的返回this 。
 
 ```js
 var obj = {};
 obj.__proto__ = Base.prototype;
 Base.call(obj);
 ```


# 10. JavaScript开发的基本规范

 1. 不要在同一行声明多个变量；
 2. 请使用 ===/!==来比较布尔值或者数值；
 3. 使用对象字面量替代 new Array这种形式；
 4. 不要使用全局函数；
 5. Switch语句必须带有default分支；
 6. 函数应该有返回值；
 7. For循环必须使用大括号；
 8. if语句必须使用大括号；
 9. for-in循环中的变量应该使用let 关键字明确限定作用域，避免命名空间污染。
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTMyNjgwOTE5Nyw4MDc3MDE4MzZdfQ==
-->