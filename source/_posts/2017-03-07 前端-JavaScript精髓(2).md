---

title: JavaScript 基础(2)
categories: 前端
date: 2017-03-07 
update: 2017-07-11
tags: [JavaScript]

---

这篇博客延续上一篇[JavaScript精髓(1)](#)，继续总结JavaScript语言的核心特性和思想精髓。
<!--more-->

# 1. JavaScript继承的实现方式
 1. 构造继承
 2. 原型继承
 3. 实例继承
 4. 拷贝继承

 **原型prototype机制或者apply/call方法较简单，建议使用`构造函数与原型混合方式`。**
 
```js
function Parent(){
	this.name = 'wang';
}
function Child(){
	this.age = 28;
}
Child.prototype = new Parent();	//通过prototype，继承Parent	

var demo = new Child();
alert(demo.age);
alert(demo.name);	//得到继承的属性
```



 
# 2. DOM操作——添加、移除、移动、复制、创建和查找节点
 3. 创建新节点
 4. createDocumentFragment()
 5. createElement()
 6. createTextNode()
 7. 添加、移除、替换、插入
 8. appendChild()
 9. removeChild()
 10. replaceChild()
 11. insertBefore()
 12. 查找
 13. getElementsByTagName()
 14. getElementsByName()
 15. getElementById()
  
# 3. Ajax的概念和用法
 1. AJAX的全称： Asynchronous JavaScript And XML.
 2. 异步的概念：向服务器发送请求时，不必等待结果，而可以同时做其他事情。
 3. Ajax用法：
	 1. 创建XMLHttpRequest对象，也就是创建一个异步调用对象，
	 2. 创建一个新的HTTP请求，并指定该HTTP请求的方法、URL和验证信息，
	 3. 设置响应HTTP请求状态变化的函数，
	 4. 发送HTTP请求，
	 5. 获取异步调用返回的数据，
	 6. 使用JavaScript和DOM实现局部刷新 。

  
# 4. document.write 和 innerHTML的区别
 1. document.write只能重绘**整个页面**
 2. innerHTML可以只重绘**页面的一部分**



# 5. window对象和document对象

 - window对象：指的是浏览器打开的窗口
 - document对象：Document对象的一个只读引用，它是window对象的一个属性。

# 6. 通用的事件侦听器函数
```javascript
//event工具集，参考来源：github.com/markyun
markyun.Event = {
	readyEvent : function(fn){
		if(fn==null){
			fn = document;
		}
		var oldonload = window.onload;
		if(typeof window.onload != 'function'){
			window.onload = fn;
		}else{
			window.onload = function(){
				oldonolad():
				fn();
			}
		}	
	},
	//根据能力分别使用DOM 0级 || DOM 2级 || IE方式，来绑定事件
	//参数：操作元素，事件名称，事件处理函数
	addEvent: function(element, type, handler){
		if(element.addEventListener){
			//事件类型，需要执行的函数，是否捕捉
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent('on' + type, function(){
			handler.call(element);
			});
		}else{
			element['on' + type ] = handler;
		}	
	},
	
	//移除事件
	removeEvent: function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);	
		}else if(element.detachEvent){
			element.detachEvent('on' + type, handler);			
		}else {
			element['on' + type] = null;	
		}	
	}, //End removeEvent
	
	//阻止事件(主要是事件冒泡， 因为IE不支持事件捕获)
	stopPropagation: function(ev){
		if(ev.stopPropagation){
				ev.stopPropagation();
		}else{
			ev.cancelBubble = true;
		}
	}, 
	
	//取消事件的默认行为
	preventDefault : function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
	},
	
	//获取事件目标
	getTarget: function(event){
		return event.target || event.srcElement;
	},

	//获取event对象的引用，取到事件的所有信息，确保随时能使用event；
	getEvent: function(e){
		var ev = e || window.event;
		if(!ev){
			var c = this.getEvent.caller;
			while(c){
				ev = c.arguments[0];
				if(ev && Event == ev.constructor){
					break;
				}
				c = c.caller;
			}	
		}
		return ev;	
	}
		
} //End
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzNjI1MDY2MjhdfQ==
-->