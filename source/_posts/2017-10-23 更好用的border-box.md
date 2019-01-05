---
title: 更好用的border-box
date: 2017-10-23
categories: 技术
tags: [前端,CSS]
---

英文原文来自CSS-tricks: [Inheriting box-sizing Probably Slightly Better Best-Practice](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)

我是把`box-sizing`重置为`border-box`的忠实粉丝，甚至于我们有一个“年度特别日子”。但是这里有一个细小的调整，而且看起来是个不错的思路。
<!--more-->
这是微调的版本：
``` css
    html{
	    box-sizing: border-box;
	}
	*, *:before, *:after{
		box-sizing:inherit;
	}	
```

感谢[Job Neal的继承思想](http://blog.teamtreehouse.com/box-sizing-secret-simple-css-layouts#comment-50223)，他说：
> This will give you the same result ,and make it easier to change the box-sizing in plugins or other components that leverage other behavior.
> 这会给你同样的结果，而且使得在插件中或其他组件中更容易改变 box-sizing 的值，而不会影响别的表现。

进一步解释，打个比方，你有一个组件，它本被设计为默认的`box-sizing` 为 `content-box`. 你只想要使用，又不搞砸它。

``` css
	.component{
		/*旨在以默认的box-sizing工作*/
		/*在你的页面中， 你可以把它重置为normal */
		box-sizing: content-box;
	}	
```

但问题是，这样实际上并不重置整个组件。也许在组件内部有一个`<header>`，期望它在一个`content-box`中。如果这个选择器在你的CSS中，老办法就是做一个 box-sizing **reset**...

```css
*{
	box-sizing: border-box;
}
```

然后这个header不是你想要的`content-box`, 而是 `border-box`. 就像：
```html
<div class= "component"> <!-- I'm content box -->
	<header> <!-- I'm border-box still>
	</header>
</div>	
```
为了更简单直观地做到**reset**，你可以使用文章顶部的继承的代码段，继承的值就会被保留。
``` css
    html{
	    box-sizing: border-box;
	}
	*, *:before, *:after{
		box-sizing:inherit;
	}	
```

---
这并不是一个很庞大的东西。你可能已经在使用 box-sizing reset 的老办法，并且从没踩到这个坑。但是，只要我们推广一个“最佳实践”风格的片段，我们也可以慢慢把它变成最好的。
