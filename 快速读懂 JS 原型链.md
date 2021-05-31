# 快速读懂 JS 原型链

## 理解原型链

Js 中的原型链是一个比较有意思的话题，它采用了一套巧妙的方法，解决了 Js 中的继承问题。

按我的理解，原型链可以拆分成：

- 原型（prototype）
- 链（`__proto__`）

### 原型（prototype）

原型（prototype）是一个普通的对象，它为构造函数的实例共享了属性和方法。在所有的实例中，引用到的原型都是同一个对象。

例如：

```javascript
function Student(name) {
this.name = name;
this.study = function () {
console.log("study js");
};
}
// 创建 2 个实例
const student1 = new Student("xiaoming");
const student2 = new Student("xiaohong");
student1.study();
student2.study();
 
```

上面的代码中，我们创建了 2 个 Student 实例，每个实例都有一个 study 方法，用来打印 “study js”。

这样写会有个问题：2 个实例中的 study 方法都是独立的，虽然功能相同，但在系统中占用的是 2 份内存，如果我创建 100 个 Student 实例，就得占用 100 份内存，这样算下去，将会造成大量的内存浪费。

所以 Js 创造了 prototype。

```
function Student(name) {
this.name = name;
}
Student.prototype.study = function () {
console.log("study js");
};
// 创建 2 个实例
const student1 = new Student("xiaoming");
const student2 = new Student("xiaohong");
student1.study();
student2.study();
 
```

使用 prototype 之后， study 方法存放在 Student 的原型中，内存中只会存放一份，所有 Student 实例都会共享它，内存问题就迎刃而解了。

但这里还存在一个问题。

> 为什么 student1 能够访问到 Student 原型上的属性和方法？

答案在 `__proto__` 中，我们接着往下看。

### 链（`__proto__`）

链（`__proto__`）可以理解为一个指针，它是实例对象中的一个属性，指向了构造函数的原型（prototype）。

我们来看一个案例：

```
function Student(name) {
this.name = name;
}
Student.prototype.study = function () {
console.log("study js");
};
const student = new Student("xiaoming");
student.study(); // study js
console.log(student.__proto__ === Student.prototype); // true
 
```

从打印结果可以得出：函数实例的 `__proto__` 指向了构造函数的 prototype，上文中遗留的问题也就解决了。

但很多同学可能有这个疑问。

> 为什么调用 student.study 时，访问到的却是 Student.prototype.study 呢？

答案在原型链中，我们接着往下看。

### 原型链

原型链指的是：一个实例对象，在调用属性或方法时，会依次从实例本身、构造函数原型、构造函数原型的原型… 上去寻找，查看是否有对应的属性或方法。这样的寻找方式就好像一个链条一样，从实例对象，一直找到 Object.prototype ，专业上称之为原型链。

还是来看一个案例：

```
function Student(name) {
this.name = name;
}
Student.prototype.study = function () {
console.log("study js");
};
const student = new Student("xiaoming");
student.study(); // study js。
// 在实例中没找到，在构造函数的原型上找到了。
// 实际调用的是：student.__proto__.say 也就是 Student.prototype.say。
student.toString(); // "[object Object]"
// 在实例中没找到。
// 在构造函数的原型上也没找到。
// 在构造函数的原型的原型上找到了。
// 实际调用的是 student.__proto__.__proto__.toString 也就是 Object.prototype.toString。
 
```

可以看到， `__proto__` 就像一个链一样，串联起了实例对象和原型。

同样，上面代码中还会存在以下疑问。

> 为什么 `Student.prototype.__proto__` 是 Object.prototype？

这里提供一个推导步骤：

1. 先找 `__proto__` 前面的对象，也就是 Student.prototype 的构造函数。
   1. 判断 Student.prototype 类型， `typeof Student.prototype` 是 `object`。
   2. `object` 的构造函数是 Object。
   3. 得出 Student.prototype 的构造函数是 Object。
2. 所以 `Student.prototype.__proto__` 是 Object.prototype。

这个推导方法很实用，除了自定义构造函数对象之外，其他对象都可以推导出正确答案。

### 原型链常见问题

原型链中的问题很多，这里再列举几个常见的问题。

> `Function.__proto__` 是什么？

1. 找 Function 的构造函数。

   1. 判断 Function 类型，`typeof Function` 是 `function`。
   2. 函数类型的构造函数就是 Function。
   3. 得出 Function 的构造函数是 Function。

2. 所以 `Function.__proto__` = Function.prototype。

   ------

> `Number.__proto__` 是什么？

这里只是稍微变了一下，很多同学就不知道了，其实和上面的问题是一样的。

1. 找 Number 的构造函数。

   1. 判断 Number 类型，`typeof Number` 是 `function`。
   2. 函数类型的构造函数就是 Function。
   3. 得出 Number 的构造函数是 Function。

2. 所以 `Number.__proto__` = Function.prototype。

   ------

> `Object.prototype.__proto__` 是什么？

这是个特例，如果按照常理去推导，`Object.prototype.__proto__` 是 Object.prototype，但这是不对的，这样下去原型链就在 Object 处无限循环了。

为了解决这个问题，Js 的造物主就直接在规定了 `Object.prototype.__proto__` 为 null，打破了原型链的无线循环。

明白了这些问题之后，看一下这张经典的图，我们应该都能理解了。

![img](https://www.h5w3.com/wp-content/uploads/2020/07/1691fc878b9beefa.png)