---

title: Git Commit Message规范参考

categories: 软件工程

date: 2019-01-24

update: 2019-01-24

tags: 规范 Git 团队协作 软件工程

---

> 注：在Git协作模式的团队中，Commit Message的规范对版本控制起着很重要的作用。本文引用自团队内部的规范，分享出来，一是为了贡献社区，二是为了加深印象。

## Commit Message规范

在`git`开发流程中，每次`git commit`，都需要对该次`commit`添加描述信息，描述此次`commit`的具体改动内容。规范的`commit message`格式，可以让团队成员对每次改动内容进行快速了解，也可以方便`git log`时的浏览和筛选。

目前社区使用最广的是 AngularJS 的规范：

- [Google Docs 原文](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)

- [阮一峰博客对于commit message的介绍](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

### 简述

一条完整的提交信息(`commit message`)一般来说包含`Header`和`Body`，其中`Header`是必须的，`Body`是可选的。

对于大部分可以简单描述清楚的改动，只需要一个`Header`即可。

而对于一些需要更详细说明、要分条列出的改动，我们在`Header`进行简述之外，还要在`Body`中详细描述。

一般而言，`Header`长度不应超过50个字符，如果超过的话则考虑添加`Body`进行详述。

我们通常使用的`git commit -m "<Commit Message Header>"`，就是只添加单行的`Header`信息。例如：

```sh
# 这里只添加了Header
git commit -m "feat(官网主页): 将iOS的头部背景与Android统一，不再使用默认蓝色图片"
```

如果需要添加`Body`详细信息，则使用`git commit`进入文本编辑器，再进行具体编辑。例如：

```sh
# 这里既添加了Header，又添加了Body
chore(构建优化): 解决构建流程几个问题

- 每次构建chunkhash会改变的问题
- 内联和外链样式重复问题
- 图片md5错误问题
- 提取项目公共vendor
```

### 具体规范

从上面的示例可以看到，`Header`的格式为：`<type>(<scope>): <subject>`。

`Header`主要由`type`, `scope`和`subject`三部分组成：

- `type`用来描述这次提交属于哪一类修改，比如是`完成需求`还是`修复BUG`。_（必需）_
- `scope`用来描述这次提交涉及的范围，比如是`详情页`还是`礼包页`。对于一些没有明确范围的改动，可以忽略。_（可选）_
- `subject`是这次提交的简单描述，具体做了什么。如果50字符内不能描述清楚，建议添加`Body`继续描述。_（必需）_

### `type`类别

常用：
- `feat` - 新增需求、需求迭代、新功能等相关的提交
- `fix` - BUG修复提交
- `docs` - 文档相关的提交
- `refactor` - 技术优化类的代码重构，不影响具体需求和逻辑，也不涉及BUG修复的修改，如：测速优化、性能优化、模块拆分等
- `chore` - 代码维护相关的小改动，如：更新依赖库、构建工具及其配置的改动、代码格式调整等

较不常用：
- `workflow` - 开发工作流的改动，比如修改`package.json`中的`scripts`，比如增加或修改一些发布脚本
- `test` - 测试相关的修改，比如增加测试用例。

### Revert

在需要回滚某些改动的时候，使用`revert: <reverted commit Header>`格式，也就是将回滚的那一条提交的`Header`作为`revert`后的内容。

例如，之前进行了某些改动：

```sh
fix(礼包页): 修复了礼包页展示不完全的bug
```

之后发现这个改动会引起一些其他的bug，不得已需要回滚：

```sh
revert: fix(礼包页): 修复了礼包页展示不完全的bug
```

### 注意事项

- `scope`不是必须的，也没有具体的限定，但是有明显范围特征的尽量写上。（比如下面例子中的`(详情页)`）；
- 注意描述要清晰，要针对改动本身，让其他成员在没有任何上下文的情况下，也能看懂改动了什么。
- 不写废话（不过可以偶尔卖个萌😉）；
- `typo`修正、代码格式调整之类的，在AngularJS标准里另分到`style`类别，我们统一放在`chore`当中。这些很细小的改动，描述可以不用特别详细；
- 应保证`改动`和`commit`一一对应；
- 一个`commit`只对应一处改动、一个需求或一个BUG，不要把多个改动集中混在一起提交。在同时修改了多个文件时，不要直接`git add .`，应该挑选相关的文件进行`add`和`commit`，再挑选另一部分文件进行`add`和`commit`；
- 一处改动、一个需求或一个BUG，应尽量集中在同一个`commit`中，不要开发到中途先提交一次，开发完成再提交一次。

```sh
# Bad
fix: bug修复
fix: 修复了测试昨天发现的bug
feat: 完成了今天排期的需求

# OK
chore: 修正了几处拼写错误

# Good
feat: 在新的主页新增了一个关闭按钮
fix(详情页): 修复展开活动的sid为string的bug
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NzIyNTgzNjldfQ==
-->