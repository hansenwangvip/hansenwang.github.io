---

title: LeetCode in JavaScript(1) Two Sum
date: 2019-05-19
categories: 技术
tags: [算法,LeetCode]

---


# LeetCode JavaScript (1): Two Sum


<!--more-->



> [直达链接：https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

## 问题
Given an array of integers, return  **indices**  of the two numbers such that they add up to a specific target.

You may assume that each input would have  **_exactly_**  one solution, and you may not use the  _same_  element twice.
## 示例

> Given nums = [2, 7, 11, 15], target = 9,
> Because nums[**0**] + nums[**1**] = 2 + 7 = 9,
> return [**0**, **1**].


## 目标
给定一个数组`nums`和一个目标值`target`，数组`nums`中如果有两数之和等于`target`，那么返回包含这个两个值的坐标的数组`[i,j]`。

## 解法一：暴力遍历

最简单暴力的方法，就是遍历整个数组，最坏的情况是两个结果分别位于两端，数组要遍历两边。
时间复杂度：O(n^2)
空间复杂度：O(1)

```js
var twoSum = function(nums, target) {
    var i,len = nums.length;
    for (i=0;i<len-1;i++) {
        for (j=i+1;j<len;j++) {
            if (nums[i] + nums[j] === target) {
                return [i,j];
            }
        }
    }
};
```

## 解法二：哈希表

比较高效的一个方法就是，以JavaScript的对象作为哈希表，通过对象的键值查询快速判断。
将js对象当做hashtable来使用，key是数组元素的值，value是数组元素的索引，只遍历一次数组，每次先查找哈希表中是否有匹配的元素，如果没有就将现有元素添加进哈希表中。

从头遍历数组，通过哈希表，查找第一个元素a1的匹配值，如果哈希表中没有，就先缓存当前元素，以此类推。

每个元素都要通过对象查到匹配值，JavaScript对于对象的取值有所优化，所以查询哈希表的方法很高效。

所以哈希表的方法看似还是在遍历两次，但是其中的第二次遍历是在哈希表中执行的。JavaScript的对象取值速度很快，远远快于数组遍历。这就是优势所在。

> 关于JavaScript的性能问题，我打算在后面的博客写一篇性能分析。这里我推荐《高性能JavaScript》这本书，里面有关于优化性能的措施和原理。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    let len = nums.length;
    
    let hash = {};
    
    for (let i = 0; i < len; i++){
        let j = target - nums[i]; // hash table 要找的值
        if(hash[j] !== undefined){ // hash table里面有这个值，说明这个数组中存在匹配nums[i]的另一个数nums[j]
            return [i, hash[j]];
        }else{
            hash[nums[i]] = i // hash table没有这个值,就先把它加入哈希表中，缓存。
        }
    }
};
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEyMjk4OTY0OSwyMDI3NTkwNDIzLDg0Nz
IzNTk1NV19
-->