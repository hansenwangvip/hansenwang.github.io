---

title: 如何忽略一个submodule?

categories: 技术

date: 2019-03-05

update: 2019-03-05

tags: [ 'Git', '技巧' ]

---

# 痛点
在Hexo和Travis结合的过程中，遇到了submodule的问题。
HEXO中，我使用了NexT主题，该主题的一些功能，需要依赖一些插件，也就是直接clone一些repo到主题的目录下。比如加载进度的pace插件，移动设备的fastclick插件。
但是clone之后，Git会默认为我安装的插件是一个submodule，submodule

> 参考链接 https://stackoverflow.com/questions/1759587/un-submodule-a-git-submodule

``` bash
git rm --cached submodule_path # delete reference to submodule HEAD (no trailing slash)
git rm .gitmodules             # if you have more than one submodules,
                               # you need to edit this file instead of deleting!
rm -rf submodule_path/.git     # make sure you have backup!!
git add submodule_path         # will add files instead of commit reference
git commit -m "remove submodule"

```

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMxOTk3NTg5MF19
-->