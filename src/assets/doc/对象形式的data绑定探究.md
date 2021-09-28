<!--
 * @Author: your name
 * @Date: 2021-09-28 09:58:47
 * @LastEditTime: 2021-09-28 10:00:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-demo\src\assets\doc\对象形式的data绑定探究.md
-->
# 对象形式的data绑定探究

## 特性

* 1.vue会递归遍历对象，在data中声明的对象的property，会直接具有相应性，会被this.obj.property = xxx触发；
* 2.使用this.obj.property = xxx增加，或者使用delete this.obj.property去除的property不具有响应式，但会挂载到obj上，被下次flush一并更新；
* 3.使用this.obj = xxx的情况下，会触发视图更新，但obj所有property的响应性会被切断，vue会重新递归新的obj，给他的所有property增加响应性；

## 最佳实践：

* 1.尽量少使用对象形式的data绑定，将响应式数据扁平化；
* 2.在增加/去除对象的property时，只使用响应式API（$set,$delete）；
* 3.尽量不要在不确定property的前提下直接进行this.obj = xxx的操作。