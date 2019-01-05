---
title: JavaScript 观察者模式的通用实现
categories: 技术
date: 2017-05-07
tags: JavaScript
---

这篇文章主要是列举代码，关于一个经典的设计模式——观察者模式，又名发布-订阅模式的通用实现。
<!--more-->

```js
//封装观察者模式，放进一个对象中，可复用。
var event = {
	clientList:[],
	//订阅的消息添加进缓存列表
	listen: function(key, fn){
		if( !this.clientList[key]){
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);
	},
	trigger: function(){
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];
		if(!fns || fns.length === 0){
			return false;
		}
		for(var i = 0, fn; fn = fns[i++];){
			fn.apply(this, arguments);
		}
	}，
	remove: function(key, fn){
		var fns = ClientList[key];
		if( !fns ){
			return false;
		}
		if(!fn){
			fns && fns.length = 0;
		}else{
			for(var len = fns.length-1; len>=0; len--){
				var _fn = fns[len};
				if(_fn === fn){
					fns.splice(len, 1);
				}	
			}
		}		
	}
}
```
```
//所有对象都能动态安装 ‘观察者模式’
var installEvent = function(obj){
	for (var i in event){
		obj[i] = event[i];
	}
};
```

```
//测试
var salesOffices = {};
installEvent(salesOffices);
	//订阅
salesOffices.listen('squareMeter88', function(price){
	console.log('88平方米的价格='+price);
});
salesOffices.listen('squareMeter110',function(price){
	console.log('110平方米的价格='+price);
});
	//发布
salesOffices.trigger('squareMeter88',2000000);	//输出："88平方米的价格=2000000"
salesOffices.trigger('squareMeter110',3000000);	//输出："110平方米的价格=3000000"	

```
