---

title: 如何忽略一个submodule?

categories: 技术

date: 2019-03-05

update: 2019-03-05

tags: [ 'Git', '技巧' ]

---

# 痛点


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
eyJoaXN0b3J5IjpbLTE0NjYzOTY4MDhdfQ==
-->