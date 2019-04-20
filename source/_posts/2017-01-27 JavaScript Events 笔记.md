---

title: 笔记：JavaScript事件处理
categories: 技术
date: 2017-01-27
update: 8
tags: [JavaScript,前端]

---


## JavaScript --- 事件处理：

### 笔记摘要
> 参考书籍：
> 《Modern JavaScript》(Larry Ullman 著);
> 《JavaScript高级程序设计》 (Nicholas C Zakas著).



---

### 一、 事件处理：
#### 1.嵌入式事件处理器（强烈不建议）:
```
		/*比如*/
        <form action= "#" method = "post" onsubmit = "validataForm();">
        /*或者*/
     	<a href = "somepage.html" onclick = "doSomething();">Some link</a> 
   
```

#### 2.传统事件处理方法(不建议)： 
``` JavaScript
		/* 以下传统方法不建议使用 */
		window.onload = init; //易用，可靠，属性名必须全小写。
		/* 或者 */
		window.onload = function(){ //匿名函数方法
		//Do whatever.
		}
```
> 原因：
		1. 一次只能指定一个时间处理器；
		2. 较后的函数会覆盖较前的；
		
	 
``` javascript
document.getElementById('theForm').onsubmit = progress;
document.getElementById('theForm').onsubmit = calculate; // 呃!有问题.
```

	
``` javascript
	//缓解方法
	document.getElementById('theForm').onsubmit = function(){
		progress();  //当然你也可以这样解决，但是这样的代码很丑陋。
		calculate();
	}
```
	 

#### 3.W3C事件处理(建议)
1. 接受三个参数：事件类型，事件发生时调用的函数，表示事件阶段的布尔值。
``` 
	addEventListener('load', init , false);  //可以为相同元素添加多个事件监听器；`
	removeEventListener()('load', process , false);
```	

2. IE<9的事件处理(事件名称前缀多了"on")

		1. attachEvent('onload' , init);
		2. detachEvent('onload' , init);
3. 创建一个事件分配器
	
	``` javascript
	function addEvent( obj , type , fn){
	     if(obj && objEventListener){          //W3c
	          obj.addEventListener(type, fn , false);
	     }else if(obj && obj.attachEvent){     //IE<9
	          obj.attachEvent("on" + type, fn);
	     }
	} 
	```
	
#### 4. **范例：创建一个实用程序库**

``` javascript
    //所有函数都定义在全局对象U中，避免多个新函数污染全局命名空间。
    
    //新对象U （Utility的缩写）
    var U = {
          //定义$()方法
          $: function(id){
               'use strict';
               if (typeof id == 'string'){
                    return document.getElementById(id);
               }
          },
		  //定义setText 方法，两个参数：要更新的元素id和消息本身
          setText: function(id, message){
          	'use strict';
          	if( (typeof id == 'string') && (typeof message == 'string')){
          		var output = this.$(id);
          		if (!output) {return false};	//获取id的元素失败
          		if(output.textContext !== undefined){
          			output.textContext = message;
          		}else{
          			output.innerText = message;
          		}
          		return true;
          	}	//End of main IF.
          }, 	//End of setText() function.
          
          //封装一个‘添加事件监听器’ 函数
          addEvent: function( obj , type , fn){
          		'use strict';
                if(obj && obj.removeEventListener){
                	obj.addEventListener(type, fn, false);
                }else if (obj && obj.detachEvent){
                	obj.attachEvent('on' + type , fn);
                }
          },   	//End of addEvent() function
          
          //封装一个‘移除事件监听器’函数
          removeEvent: function( obj , type , fn){
          		'use strict';
                if(obj && obj.removeEventListener){
                	obj.removeEventListener(type, fn, false);
                }else if (obj && obj.detachEvent){
                	obj.detachEvent('on' + type , fn);
                }
          }   	//End of removeEvent() function
     };	//End of U declaration.
```
---
### 二、事件类型
        
**事件类型分为4类：**
 - **输入设备**
 - **键盘**
 - **浏览器**
 - **表单** 


#### 1.输入设备事件
##### 1. 输入按钮事件：
		1. click 事件；
		2. dblclick 事件；
		3. contextmenu 事件(罕见)；
##### 2. 输入移动事件：
		1.  mouseout 鼠标移出;
		2.  mouseover 鼠标移过;
		3.  mousemove 鼠标移动（持续监视鼠标，消耗性能）;
##### 3. 键盘事件：
		1.   keydown (按下);
		2.   keyup (释放); 
		3.   keypress (按键，前二者组合);
##### 4. 浏览器事件：
		1. load (加载完成);
		2. unload (卸载);
		3. resize (改变浏览器窗口大小);
		4. scroll (滚动事件);
		5. copy;
		6. cut;
		7. paste;  
##### 5. 表单事件：
   -- **reset**：表单重置(点击重置html按钮)时触发，用户很少有重置表单的需要；若要使用此事件，可以添加监视：	 
		
				
			```
			addEvent(document.getElementById('theForm'), 'reset' , function(){
				return confirm("您确定想要重置表单吗？");		
			});
			         
			```
![重置表单提醒](http://img.blog.csdn.net/20161210172136724?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2lubmVyMTc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
		  
-- **select**: 文本输入域和文本区域的文本内容被选中时；

-- **change**: 元素值变化时；

-- **focus**: 单击或Tab键到文本输入域时；

-- **blur**: 光标或选择项的移动时；

---

### 三、事件可访问性(Accessibility)

#### 1. 配对事件(Pairing events):
> 使用同一个函数处理相同元素的类似事件。

#### 2. 可访问性(Accessibility):
在移动设备和其他非标准浏览器上，对于不使用输入设备的浏览器，mouseover和mouseout事件毫无意义，因为它们永远不会发生。
例如：
``` html5
	 <a href = "somepage.html" id = "link" > Some Text </a>
	 <script>
		addEvent(document.getElementById('link'), 'mouseover',handleLinkMouseOver);
	 </script>
```
> 上述代码中，事件只能通过鼠标触发。
> 但是还是有缓解方法。
> 如果浏览器仅由键盘控制，那么它是可以监视**focus**事件的(Tab键)。
> 因此，**增强可访问性**的事件处理方法是创建两个事件监听器：
``` html5
	 <a href = "somepage.html" id = "link">some Text</a>
	 <script>
	 //配对事件
	 addEvent(document.getElementById('link'), 'mouseover', doSomething);
	 addEvent(document.getElementById('link'), 'focus', doSomething);
	 </script>
```

#### 3.事件和渐进增强

 - 渐进增强的真正原则： 
	 > 使用JavaScript( 和CSS )改进**基本功能**，使得用户不管使用何种设备，都不会被抛弃(忽略)。
	
	- 只有在开发者有意识的**忽略**一些用户时，JavaScript才是有必要的。
	- 但是在很多情况下，**JavaScript是没有必要的**：比如表单的提交应该在有无JavaScript的情况下都能进行(在服务端都能验证)。
	- 将**渐进增强的思想**应用到事件处理中，向已经有默认事件行为的元素添加事件时必须小心。例如：表单提交时，表单的数据发送给服务器端脚本。为表单添加提交事件，为其添加其他功能，在逻辑上是毫无意义的。

---

### 四、高级事件处理

 - 引用事件
 - 事件属性
 - 检查按键
 - 阻止默认事件行为
 - 事件的两个阶段：捕捉和冒泡
 - 委派事件处理 

#### 1.引用事件
> 当事件处理程序用于多个元素上的相同事件（或者相同元素上的不同事件）时，事件处理程序就必须考虑其灵活性。

``` javascript
	function someEventHandler(e){  //e就是引用事件，代表发生的事件
		if(typeof e == "undefined"){
			e = window.event;      //考虑IE8及更早
		}
	};
```

#### 2.事件属性
> 事件对象通过各种属性提供信息，但是不同浏览器支持的属性有所差异。(这里不深究，后续补充。)

#### 3.检查按键
> 当键盘事件触发时，可以通过事件对象确定按下的具体键。这个问题有点复杂，在这里稍微带过。

示例代码：以一致的方式获得字符：
	

```
var charCode = e.which || e.keyCode;	//IE中不支持which
// 或者更准确的
var charCode = (typeof e.which == 'number')?e.which : e.keyCode;

//获得与字符代码相对应的实际字符:
String.fromCharCode(charcode);
```

#### 4.阻止事件默认行为
> 一些与基本浏览器相关的JS事件： 单击链接、提交表单等。在事件处理器存在时，事件发生会调用对应的函数，**在函数运行之后，浏览器仍然继续进行它通常应该进行的事件处理。**
> 例如：提交表单时，提交事件处理器可能执行客户端验证。**如果发生了错误，应该阻止表单提交到服务器端脚本，让客户有机会改正错误。**
> 方法：**从事件处理器中返回false**。

```
// 仅在传统方法注册事件处理器时可靠工作，不建议。
function handleForm(){
	//Do whatever.
	if(errors){
		return false;
	}else{
		return true;
	}
}

//以下是跨浏览器的兼容方法，调用事件对象的preventDefault();
if(typeof e == 'undefined') {e = window.event;}
if(e.preventDefault){
	e.preventDefault();
}else {
	e.returnValue = false;
}
return false;	//额外的预防措施。

```

> 使用PreventDefault()或设置returnValue的另一个好处就是：**可以在函数开始时执行，使后续的函数代码仍然运行。**
#### 5.事件的两个阶段：捕捉和冒泡

##### **示例**：
	

``` html5
	<div>
		<h1>This is a title</h1>
		<p>This is a paragraph.
			<a href = "#" id = "link">This is a link.</a>
		</p>
	</div>
	<script>
		// U.$()方法与jquery获取DOM节点方法一致，只是在前文定义了一个新对象U.
		addEvent(U.$('link'), 'mouseover' , doSomething);
	</script>
	
```

**在上述代码中，包含关系：a< p< div< html< Document< window。当鼠标悬停在链接之上，mouseover事件实际上经历了几个步骤，在两个不同的阶段到达和离开目标（链接）。

![这里写图片描述](http://img.blog.csdn.net/20161211094137004?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2lubmVyMTc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

> 注意，事件传播一共有**三个阶段**：1.捕获阶段； 2.调用事件处理程序； 3.冒泡阶段。

1.捕捉阶段：
	
> 当你使用事件捕获时，由外向内，父级元素先触发，子级元素后触发；即div先触发，p后触发。

2.事件处理：

> 调用查找到的事件处理程序；

3.冒泡阶段：

> 事件冒泡
当你使用事件冒泡时，由内向外，子级元素先触发，父级元素后触发；即p先触发，div后触发。

 - W3C模型

> 在W3C模型中，任何事件发生时，先从顶层开始进行事件捕获，直到事件触发到达了事件源元素。然后，再从事件源往上进行事件冒泡，直到到达document。

程序员可以自己选择绑定事件时采用事件捕获还是事件冒泡，方法就是绑定事件时通过addEventListener函数，它有三个参数，第三个参数若是true，则表示采用事件捕获，若是false，则表示采用事件冒泡。

```
ele.addEventListener('click',doSomething2,true)
```

> true=捕获 false=冒泡

 - 传统绑定事件方式

> 在一个支持W3C DOM的浏览器中，像这样一般的绑定事件方式，是采用的事件冒泡方式。

```
ele.onclick = doSomething2
```

 - IE浏览器

> 如上面所说，IE只支持事件冒泡，不支持事件捕获，它也不支持addEventListener函数，不会用第三个参数来表示是冒泡还是捕获，它提供了另一个函数attachEvent。

```
ele.attachEvent("onclick", doSomething2);
```

附：事件冒泡（的过程）：事件从发生的目标（event.srcElement||event.target）开始，沿着文档逐层向上冒泡，到document为止。

 - 事件的传播是可以阻止的：
• 在W3C中，使用stopPropagation（）方法
• 在IE下设置cancelBubble = true；

> 在捕获的过程中`stopPropagation（）;`后，后面的冒泡过程也不会发生了

 - 阻止事件的默认行为
	 - 例如click后的跳转:
• 在W3C中，使用preventDefault（）方法；
• 在IE下设置window.event.returnValue = false;

终于写完了，花了一天时间总结了"事件处理"，文末部分参考了网友的经验。

九月份看的《JS高级程序设计》，当时云里雾里，后来敲了很多代码半懂不懂，现在写完这篇博客才算明白过来。

在写的时候翻阅《JS权威指南》，里面有更深入的细节，有一部分事件类型已经被HTML5标准化。

后续再补充。^_^
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc1NzgxMDY4MF19
-->