# JavaScript实现一个队列

## 1、什么是队列？

队列和栈有着明显的区别，队列是一种特殊的线性表有着先进先出的特点。它只允许在表头进行删除操作，在表尾进行添加操作。

入队列示意图

![img](https://user-gold-cdn.xitu.io/2019/2/13/168e661d6da02852?w=759&h=634&f=png&s=22032)

出队列示意图

![img](https://user-gold-cdn.xitu.io/2019/2/13/168e662248e9cee8?w=759&h=664&f=png&s=21495)

队列有许多的应用，比如`javascript`的事件循环机制，就是通过`事件队列`来存储异步操作的回调函数。

比如逐层打印一颗树上的节点。像kafka，rabbitmq这类消息队列，其形式就是一种队列，消息生产者把消息放入队列中（尾部），消费者从队列里取出消息进行处理（头部），只不过背后的实现更为复杂。

如果你了解一点socket，那么你应该知道当大量客户端向服务端发起连接，而服务端忙不过来的时候，就会把这些请求放入到队列中，先来的先处理，后来的后处理，队列满时，新来的请求直接抛弃掉。

数据结构在系统设计中的应用非常广泛，只是我们水平达不到那个级别，知道的太少，但如果能理解并掌握这些数据结构，那么就有机会在工作中使用它们并解决一些具体的问题，当我们手里除了锤子还有电锯时，那么我们的眼里就不只是钉子，解决问题的思路也会更加开阔
2、队列的实现
首先先定义一些常用的方法：

enqueue 从队列尾部添加一个元素
dequeue 从队列头部删除一个元素
head 返回头部的元素，注意，不是删除
size 返回队列大小
clear 清空队列
isEmpty 判断队列是否为空
tail 返回队列尾节点
然后我们逐一实现

```
let Queue = (function () {
  let items = new WeakMap() 
  // WeakMap结构与Map结构基本类似。区别是它只接受对象作为键名，
  // 不接受其他类型的值作为键名。键名是对象的弱引用，当对象被回收后，
  // WeakMap自动移除对应的键值对，WeakMap结构有助于防止内存泄漏。 
  class Queue {
    constructor() {
      items.set(this, [])
    }
    // 入队列
    enqueue(item) {
      let queue = items.get(this)
      queue.push(item)
    }
    // 出队列
    dequeue() {
      return items.get(this).shift()
    }
    // 返回队列头
    head() {
      let queue = items.get(this)
      return queue[0]
    }
    // 返回队列大小
    size() {
      let queue = items.get(this)
      return queue.length
    }
    // 清空队列
    clear() {
      items.set(this, [])
    }
    // 判断队列是否为空
    isEmpty() {
      let queue = items.get(this)
      return queue.length === 0
    }
    // 返回队尾
    tail() {
      let queue = items.get(this)
      return queue[queue.length - 1]
    }
  }
  return Queue
})
```

