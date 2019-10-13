---

title: JavaScript对象数组排序
categories: 技术
date: 2017-05-07
tags: [JavaScript, 算法]
description: 数组内元素都是对象的情况下，如何对元素进行排序？
---


# 对象数组排序


----------

## 一、按照对象的属性排序
我要一个函数，传入要对比的key，就能以这个key，把对象数组进行排序。
```js
//示例代码
var by = function(key) {
	return function(o, p) {
		var a, b;
		if (typeof o === 'object' && typeof p === 'object' && o && p) {
			a = o[key];
			b = p[key];
			if (a === b) {
				return 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			//如果a,b所属类型不同，则按类型的英文字符排序，比如'function'排在'object'前面。
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw('error');
		}
	}
}

var employees=[]
employees[0]={name:"George", age:32, retiredate:"March 12, 2014"}
employees[1]={name:"Edward", age:17, retiredate:"June 2, 2023"}
employees[2]={name:"Christine", age:58, retiredate:"December 20, 2036"}
employees[3]={name:"Sarah", age:62, retiredate:"April 30, 2020"}

employees.sort(by('age'));
//得到根据age属性排序的数组。
//[{name:"Edward", age:17, retiredate:"June 2, 2023"},
//{name:"George", age:32, retiredate:"March 12, 2014"},
//{name:"Christine", age:58, retiredate:"December 20, 2036"},
//{name:"Sarah", age:62, retiredate:"April 30, 2020"}]

```

## 二、高级by()函数
当主要的键值产生一个匹配的时候，另一个compare方法（第二个参数）将被调用以决出高下。
举个例子，在比较两个对象的age属性时，age的值相等，现在我想要age相等的人，按照别的属性进行排序。于是我想增强`by()` ，现在我这样使用：

```
//注意外层by函数内有俩个参数，第二个参数就是备用的比较函数。
employees.sort(by('age',by('name')));
```

```
var by = function(name,minor){
    return function(o,p){
        var a,b;
        if(o && p && typeof o === 'object' && typeof p ==='object'){
            a = o[name];
            b = p[name];
            if(a === b){
	            //如果前后元素相同时，用minor函数比较。
                return typeof minor === 'function' ? minor(o,p):0;
            }
            if(typeof a === typeof b){
                return a <b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }else{
            throw("error");
        }
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQxNDgxNDY3NV19
-->