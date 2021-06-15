# JavaScript知识点整理

### JavaScript是一门什么样的语言？有哪些特点？

运行在浏览器的V8引擎中的脚本语言，不要编译就可以由解释器直接运行的，此外变量松散定义，属于弱类型语言。

### 说几条JavaScript的基本规范？

- 不要在同一行声明多个变量
- 用===替代==
- switch语句要有default分支
- 构造函数首字母大写，常量用大写字母
- 使用对象字面量替代new Function(){}

### 页面渲染原理

- 浏览器解析HTML生成一个DOMTree
- 接着解析CSS会产生CSSRuleTree
- 解析完成后，浏览器引擎会通过DOMTree和CSSRuleTree来构造RenderingTree。
- 浏览器调用

### 预编译

- 首先扫描var关键字，提升到顶端；
- 然后扫描function定义，提到var之前
- 然后再顺序执行

#### defer和async

- 在`<script>`元素中设置defer属性，相当于告诉浏览器立刻下载，延迟执行。会等页面解析完后，按指定顺序执行
- async属性会告诉浏览器立刻下载，一旦下载完就会开始执行，且不能保证按照指定它们的先后顺序执行。

## 数据类型

### 原始类型有哪几种？null是对象吗？

原始类型有：boolean, string, number, null, undefined, symbol(ES6新增)  6种。

null不是对象，typeof null会输出object，是因为以前32位系统会将000开头的代表为对象，但null表示为全零所以被错误判断成object

### 原始类型和引用类型的区别

1.原始类型存储的是值，引用类型存储的是指针。 

2.原始数据类型直接存储在栈中，引用数据类型存储在堆中。

### 使用typeof可以得到哪些类型？

undefined,string,number,boolean,object,function

typeof只能区分除null的原始类型，引用类型只能区分function。

### 什么是提升？什么是暂时性死区？var,let及const区别

- ***函数提升优先于变量提升，函数提升会将整个函数挪到作用域顶部，变量提升只将声明提到作用域顶部***
- var存在提升，可以在声明前使用，let，const因为暂时性死区，不能在声明前使用
- var在全局作用域下声明变量会导致变量挂载到window上，其他两者不会
  - let和const作用基本一致，但const声明的变量不能再次赋值
- let和const不允许重复声明

## 原始类型

### 为什么0.1+0.2!=0.3？如何解决这个问题？

在计算机中，数字以二进制形式存储。在JavaScript中数字采用IEEE754的双精度标准进行存储，因为存储空间有限，当出现无法整除的小数时会取一个近似值。

在0.1+0.2中0.1和0.2都是近似表示的，所以相加时两个近似值进行计算导致最后结果为0.3000,0000,0000,0004，此时对于JS来说不够近似于0.3,所以出现了0.1+0.2!=0.3

**解决方法**：parseFloat((0.1+0.2).toFixed(10)) === 0.3 // true

### null和undefined的区别

undefine: 表示变量被声明了但没有赋值。

null：变量被定义赋值了，但是为空，没有任何属性方法和值

### Symbol的使用场景

作为属性名的使用

```javascript
var mySymbol=Symbol();
var a={};
a[mySymbol]='hello'
```

## 操作符

### 何时使用===，何时使用==

==会进行类型转换后再比较，===不会，尽量都用===.

以下两种情况可以用==

- 判断对象属性是否存在

```javascript
var obj={}
if(obj.a == null){
    // 相当于obj.a===null || obj.a===undefined
}
```

- 判断函数参数是否存在

```javascript
function fn(a, b){
    if(b == null){
        // 相当于b===null || b===undefined
    }
}
```

### Object.is()与===,==的区别？

Object.is()可以说是升级版

```javascript
NaN === NaN // false
NaN == NaN // false
Object.is(NaN,NaN) // true
+0 === -0 // true
+0 == -0 // true
Object.is(-0,+0) // false
```

## 引用类型

### Array类型



#### 如何判断一个变量是数组？

```javascript
 // 1.判断是否具有数组某些方法
if(arr.splice){} 

//2.instanceof(某些IE版本不正确)
arr instanceof Array

// 3. Array.isArray
Array.isArray(arr)

// 4.Object.prototype.toString.call()
Object.prototype.toString.call(arr) ==='[object Array]'

// 5.constructor方法
arr.constructor === Array
```



#### 将类数组转化为数组

```javascript
let arrayLike = {
    '0' : 'a',
    '1' : 'b',
    '2' : 'c',
    length : 3
};
let arr1 = Array.prototype.slice.call(arrayLike);
let arr2 = [].slice.call(arrayLike);
let arr3 = Array.from(arrayLike);
```



#### 数组的方法

```javascript
// 会改变原数组
pop()       // 末尾删除
push()      // 末尾新增
shift()     // 开头删除
unshift()   // 开头新增
reverse()   // 数组反转
sort()      // 排序
splice()    // 修改数组（删除插入替换）

// 不会改变原数组
concat()    // 合并数组
slice()     // 选择数组的一部分
indexOf()   // 顺序查找指定元素下标
lastIndexOf()   // 倒序查找指定元素下标


// 迭代方法
 every()     // 查询数组是否每一项都满足条件
 some()      // 查询数组中是否有满足条件的项
 filter()    // 过滤，返回true的项组成的数组
 map()       // 对每一项运行给定函数，返回每次函数调用结果组成的数组
 forEach()   //对每一项运行给定函数，无返回值

var numbers = [1,2,3,4,5,4,3,2,1];
numbers.every(function(item,index,array){
    return item>2;
})  // false
numbers.some(function(item,index,array){
    return item>2;
})  // true
numbers.filter(function(item,index,array){
    return item>2;
})  // [3,4,5,4,3]
numbers.map(function(item,index,array){
    return item*2;
})  // [2,4,6,8,10,8,6,4,2]
numbers.forEach(function(item,index,array){
    // 执行某些操作
})  // 无返回值


// 归并方法
 reduce()       // 从第一项开始逐个遍历到最后
 reduceRight()  //从最后一项开始向前遍历到第一项
var values = [1,2,3,4,5];
values.reduce(function(prev,cur,index,array){
    return prev+cur;
}) // 15
// reduceRight()结果一样，顺序相反
```



#### 原生sort使用的是哪些排序算法？

插入排序和快速排序结合的排序算法

#### ['1','2','3'].map(parseInt)的答案是？

[1,NaN,NaN]

因为parentInt需要两个参数(val,radix),radix表示解析进制，而map传入三个(element,index,array)导致对应的radix不合法导致解析错误。

```javascript
var arr = ['1','2','3'];
  function fn(num,a,c){
    console.log(num,a,c);  
    //num       a           c
    //1         0      ["1", "2", "3"]
    //2         1      ["1", "2", "3"]
    //3         2      ["1", "2", "3"]
    return num;
  }
  console.log(arr.map(fn));  // 看这里就明白了
```

详解：https://www.jianshu.com/p/2454d8ec0ff3



### Date()类型

#### 获取2019-02-16格式的日期

```javascript
function formatDate(dt){
    if(!dt){
        dt=new Date()
    }
    var year = dt.getFullYear();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    if(month<10){
        month= '0'+month;
    }
    if(day<0){
        day = '0'+day;
    }
    var formatDt = year+'-'+month+'-'+day
    return formatDt;
}
```

#### 其他一些方法

```javascript
getHour()       // 返回时
getMinutes()    // 返回分
getSeconds()    // 返回秒
getDay()        // 返回星期天数
getTime()       // 返回毫秒数
```

### Function类型

#### 函数声明和函数表达式

解析器会先读取函数声明，提升到最前。而函数表达式会等到执行到它所在的代码才真正被解释执行

```javascript
// 函数声明
function sum(a,b){
    return a+b;
}
// 函数表达式
var sum = function(a,b){
    return a+b;
}
```



#### 谈谈对this对象的理解

this引用函数执行的环境对象，总是指向函数的直接调用者，在执行时才能确定值

#### this的指向

1.默认绑定，在浏览器中为window，在node中是global

2.隐式绑定 例：window.a()

3.显式绑定

- 硬绑定 call,apply,bind
- api调用的上下文 filter，forEach等有一个可选参数，在执行callback时用于this值

4.new绑定

5.箭头函数

详解：https://juejin.cn/post/6844903630592540686

#### bind,call和apply各自有什么区别？

**相同点**

- 都是用来改变函数的this指向
- 第一个参数是this要执行的值
- 都可以利用后续参数传参

**不同点**

- call和apply是对函数直接调用，bind返回一个函数，需要()进行调用
- call传参是一个个传，bind与call一样，apply第二个参数是数组

#### callee和caller的作用？

callee是arguments对象的一个属性，指向arguments对象的函数即当前函数。递归可以使用arguments.callee()。 箭头函数中this作用域与函数外一致，且没有arguments对象，所以箭头函数没有callee

```javascript
function factorial(num){
    if(num<=1){
        return 1;
    }else{
        return num*arguments.callee(num-1)
    }
}
```

caller是函数对象的一个属性，指向调用当前函数的函数，比如A调用B，则B.caller指向A()。全局作用域下调用当前函数，caller的值为null

### 基本包装类型

#### Number

toFixed()按指定小数位返回数值的字符串表示

```
var num=10; num.toFixed(2); // '10.00'
```

#### String

```
// charAt()根据字符位置返回所在位置的字符串
// charCodeAt()根据字符位置返回所在位置字符串的字符编码
var str = 'hello world';
str.charAt(1);      // 'e'
str.charCodeAt(1);    // '101'

// fromCharCode() 接收字符编码转为字符串
String.fromCharCode(104,101,108,108,111) //'hello'

// concat()将字符拼接起来得到新字符串
var str="hello"
str.concat(' world'); // "hello world"

// indexOf()和lastIndexOf() 返回字符位置
// trim() 删除空格
// toLowerCase() 转小写,toUpperCase() 转大写
// localeCompare()  根据字母表比较排序

复制代码
```

#### slice,substr和substring的区别

slice和substring接收的是起始位置和结束位置，substr接收的是起始位置和所要返回的字符串长度

对于负数，slice会将负数与字符串长度相加，substr会将负的第一个参数加上字符串长度，第二个参数转为0，substring会将所有负数转为0

#### split()和join()的区别

join()将数组中的元素放入一个字符串中，split将字符串分割成数组

```
var arr=[1,2,3];
var str=arr.join('|'); // '1|2|3'
str.split('|'); // [1,2,3]
复制代码
```

### 单体内置对象

#### Global对象

**URI编码方法**

encodeURI和encodeURICcomponent encodeURI和decodeURICcomponent

**eval的作用？**

功能是将对于字符串解析出JS代码执行。要避免使用eval，不安全且非常消耗性能

#### Math对象

- min()和max()

```javascript
var max=Math.max(3,54,32,16); // 54
```

- 舍入方法 Math.ceil() // 向上舍入 Math.floor() // 向下舍入 Math.round() // 四舍五入
- random()

## 原型和原型链

### 原型

- 所有引用类型（数组、对象、函数）都有一个__proto__**隐式原型**属性，属性值是一个普通对象。 **此外，Object.prototype.__proto__指向null**
- 所有函数都有一个prototype**显式原型**属性，属性值是一个普通对象。 **Function.prototype.bind()没有prototype属性**
- 所有引用类型（数组、对象、函数）的__proto__执行它的构造函数的prototype属性

### 构造函数

构造函数特点：函数名首字母大写，它就类似一个模板，可以new出多个实例

```javascript
var a={} // var a=new Object()的语法糖
var a=[] // var a=new Array()的语法糖
function Foo(){} // var Foo=new Function()的语法糖
```

### instanceof

instanceof判断引用类型属于哪个构造函数

f instanceof Foo的判断逻辑：f的__proto__一层层往上，能否找到Foo.prototype。

但是因为原型链上所有特殊对象的__proto__最终都会指向Object.prototype，所以instanceof判断类型也不完全准确

### new操作符具体干了什么？

- 创建一个空对象
- 将对象的__proto指向构造函数的原型prototype
- 执行构造函数中的代码，传递参数，并将this指向这个对象
- 返回对象

```javascript
function _new(){
    let obj = {};
    let con=[].shift.call(arguments);
    obj.__proto__ = con.prototype;
    let res = con.apply(obj, arguments);
    return res instanceof Object ? res : obj;
}
```

### 通过new的方式创建对象和通过字面量创建的区别

更推荐字面量的方式创建对象，性能和可读性都更好。使用var o=new Object()和var o={}的区别是前者会调用构造函数

### hasOwnProperty

hasOwnProperty判断该对象本身是否有指定属性，不会到原型链上查找。

使用方法：`object.hasOwnProperty(proName)`

利用它可以循环对象自身属性

```
for(let item in f){
    if(f.hasOwnProperty(item)){
        console.log(item)
    }
}
复制代码
```

### 原型链

访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链

## 面向对象

### 创建对象的几种方式

- 工厂模式

```
function createPerson(name, age){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function(){
        console.log(this.name)
    }
    return o;
}
var person1 = createPerson('chen',21)
复制代码
```

- 构造函数模式

没有显示创建对象，直接将属性方法赋给this，没有return语句

```
function Person(name, age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log(this.name)
    }
}
var person1 = new Person('chen',21)
复制代码
```

缺点：每个方法都要在每个实例上重新定义一遍，无法得到复用

- 原型模式

```
function Person(){}
Person.prototype.name="chen"
Person.prototype.age=21
Person.prototype.sayName=function(){
    console.log(this.name)
}
var person1 = new Person()
复制代码
```

缺点：所有实例都取得相同属性值

- 混合构造函数原型模式 构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。

```
function Person(name,age){
    this.name=name;
    this.age=age;
}
Person.prototype = {
    constructor: Person,
    sayName: function(){
        console.log(this.name)
    }
}
var person1=new Person('chen',21)
复制代码
```

### 实现继承

JavaScript通过原型链实现继承

- 原型链继承 核心：将父类的实例作为子类的继承

```
function Parent(){
    this.name = 'parent'
}
Parent.prototype.sayName = function(){
    return this.name
}
function Child(){
}
// 继承了Parent
Child.prototype = new Parent();
var child1=new Child();
child1.say();
复制代码
```

缺点：对象实例共享所有继承的属性和方法

- 借用构造函数 核心：在子构造函数内部调用父构造函数

```
function Parent(){
    this.arr=[1,2,3]
}
function Child(){
    // 继承了Parent
    Parent.call(this)
}
var child1 = new Child();
child.arr.push(4); // [1,2,3,4]
var child2 = new Child();
child.arr;  // [1,2,3]
复制代码
```

- 组合继承

使用原型链继承共享的属性和方法，通过借用构造函数继承实例属性

```
function Parent(name){
    this.name = name;
    this.arr = [1,2,3]
}
Parent.prototype.sayName = function(){
    console.log(this.name)
}
function Child(name,age){
    // 继承属性
    Parent.call(this, name)
    this.age=age
}
// 继承方法
Child.prototype = new Parent()
Child.prototype.constructor = Child;
Child.prototype.sayAge = function(){
    console.log(this.age)
}
var child1=new Child('chen',21);
child1.arr.push(4); //[1,2,3,4]
child1.sayName()    // 'chen'
child1.sayAge()     // 21

var child2=new Child('miao', 12)
child2.arr          // [1,2,3]
child2.sayName()    // "miao"
child2.sayAge()     // 12
复制代码
```

缺点：无论在什么情况都会调用两次父构造函数，一次是创建子类型原型，另一次是在子构造函数内部

- 原型式继承 核心：执行对给定对象的浅复制

```
var person = {
    name: 'chen',
    arr: [1,2,3]
}
var person1 = Object.create(person);
person1.name = 'run'
person1.arr.push(4)
var person2 = Object.create(person);
person2.name = 'miao'
person2.arr.push(5)
person.arr; // [1,2,3,4,5]
复制代码
```

- 寄生式继承 核心：基于某个对象创建一个对象，然后增强对象，返回对象。

```
function create(original){
    // 通过调用函数创建一个新对象
    var clone = object(original); 
    // 以某种方式增强对象
    clone.sayHi = function(){
        console.log('hi')
    }
    return clone;
}
var person = {
    name: 'chen'
}
var person1 = create(person);
person1.sayHi();
复制代码
```

- 寄生组合式继承

```
function Parent(name){
    this.name = name;
    this.arr = [1,2,3]
}
// 将共享的属性/方法放到原型上
Parent.prototype.sayName = function(){
    console.log(this.name)
}
// 借用构造函数增强子类实例属性（支持传参和避免篡改）
function Child(name,age){
    // 继承属性
    Parent.call(this, name)
    this.age=age
}
function inheritPrototype(Child, Parent){
    var prototype=Object.create(Parent.prototype);
    prototype.constructor=Child;
    Child.prototype=prototype;
}
// 将父类原型指向子类
inheritPrototype(Child, Parent);
Child.prototype.sayAge=function(){
    console.log(this.age)
}

var child1=new Child('chen',21);
child1.arr.push(4); //[1,2,3,4] 继承自父类实例属性
child1.sayName()    // 'chen'   继承自父类原型方法
child1.sayAge()     // 21       继承自子类原型方法

var child2=new Child('miao', 12)
child2.arr          // [1,2,3]
child2.sayName()    // "miao" 
child2.sayAge()     // 12
复制代码
```

### class如何实现继承，class本质是什么？

class只是语法糖，本质是函数

```
class Parent{
    constructor(value){
        this.val=value
    }
    getValue(){
        console.log(this.val)
    }
}
class Child extends Parent{
    constructor(value){
        super(value)
        this.val = value
    }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
复制代码
```

核心：使用extends表明继承自哪个父类，并且在子类构造函数中必须使用super，可以看做是Parent.call(this,value)

### 什么是面向对象编程及面向过程编程，它们的异同和优缺点

面向过程就是分析出解决问题所需的步骤，然后用函数把这些步骤一步步实现，使用的时候一个个依次调用

面向对象是把构成问题的事务分解成各个对象，奖励对象的目的不是为了完成一个步骤，而是为了描述某个事物在整个解决问题的步骤中的行为。

优点：易维护，可读性高，易扩展，继承性高，降低重复工作量，缩短了开发走起

## 闭包

闭包指有权访问另一个函数内部变量的函数，当在函数内部定义了其他函数，也就创建了闭包

### 谈谈你对闭包的理解

使用闭包可以模仿块级作用域

**优点**：可以避免全局变量的污染，实现封装和缓存；

**缺点**：闭包会常驻内存，增大内存使用量，使用不当很容易造成内存泄漏。**解决方法**：在退出函数之前，将不适用的局部变量设为null。

**闭包最大的两个用处**：1.可以读取函数内部的变量；2.使这些变量始终保存在内存中；3.封装对象的私有属性和私有方法

### 说说你对作用域链的理解

作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能享受访问，访问到window对象即被终止。

简单来说，作用域就是变量和函数的可访问范围

### 如何创建块级作用域

- ES6 使用let和const
- 闭包

## BOM

### BOM对象有哪些？

- window JS最顶层对象
- location 浏览器当前URL信息
- navigator 浏览器本身信息
- screen 客户端屏幕信息
- history 浏览器访问历史信息

### window对象的方法

alert(),prompt(),confirm(),open(),close(),print(),focus(),blur(),moveBy(),moveTo(),resizeBy(),resizeTo(),scrollBy(),scrollTo(),setInterval(),setTimeout(),clearInterval(),clearTimeout()

### history对象

```
history.go(-1);     // 后退一页
history.go(1);      // 前进一页
history.back();     // 后退一页
history.forward();  // 前进一页
复制代码
```

### 窗口位置

- 跨浏览器取得窗口左边和上边的位置

```
var leftPos=(typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
var topPos=(typeof window.screenTop == 'number') ? window.screenTop : window.screenY;
复制代码
```

- 将窗口移动到指定位置

moveTo():接收新位置的x,y坐标值

moveBy():接收在水平垂直方向上移动的像素数

### 窗口大小

outerWidth和outerHeight返回浏览器窗口本身的尺寸，innerWidth和innerHeight返回容器视图区的大小

- 调整窗口大小 resizeTo()和resizeBy()

### 如何检测浏览器的类型

使用navigator.userAgent

```
var ua = navigator.userAgent;
var isChrome = ua.indexOf('Chrome')
复制代码
```

### 拆解url的各部分

使用location的属性

- href 完整url地址
- protocol 协议
- host 主机名+端口号
- hostname 主机名
- port 端口号
- pathname 相对路径
- hash #锚点
- search ?查询字符串

```
history.go(1)
复制代码
```

## DOM

### 为什么操作DOM慢？

因为DOM属于渲染引擎的东西，JS又是JS引擎的东西，当我们通过JS操作DOM的时候，涉及到两个线程间的通信，而且操作DOM可能会带来重绘回流的情况，所以就导致了性能问题。

### 插入几万个DOM，如何实现页面不卡顿？

- 1.分批次部分渲染DOM，通过requestAnimationFrame去循环插入DOM
- 2.虚拟滚动，只渲染可视区域内的内容

### 什么情况阻塞渲染

- 1.HTML和CSS都会阻塞渲染，如果想渲染快就应该降低一开始渲染的文件大小，扁平层级，优化选择器
- 2.浏览器解析到script标签时会暂停构建DOM，

**解决方法**：

- ①将script标签放到body底部
- ②给script标签加上defer属性，该JS文件会并行下载但等到HTML解析完后顺序执行
- ③script标签加上async属性，表示JS文件下载和解析不会阻塞渲染

### 重绘Repaint和回流Reflow

重绘是当节点改变样式而不影响布局，回流是当布局或几何属性需要改变

回流必定会发生重绘，回流的成本比重绘高

**性能问题**：1.改变window大小 2.改变字体 3.添加或删除样式 4.文字改变 5.定位或浮动 6.盒模型

### 减少重绘和回流

- 1.使用transform替代top
- 2.使用visibility换成display:none，前者只引起重绘，后者引发回流
- 3.不要把节点的属性值放在一个循环里当成循环里的变量
- 4.不要使用table布局
- 5.动画实现的动画速度越快，回流次数越多，也可使用requestAnimationFrame
- 6.CSS选择符从右往左匹配，避免节点层级过多
- 7.将频繁重绘或回流的节点设置为图层 ①will-change属性 ②video, iframe标签

### 创建节点

- createElement 创建一个元素
- createTextNode 创建一个文本节点
- createDocumentFragment 创建一个文档片段
- cloneNode 返回调用该方法的节点的一个副本

**注意事项：**

- 以上只是创建一个孤立的节点，需要通过appendChild添加到文档中
- cloneNode要注意被复制的节点是否包含子节点以及事件绑定等问题
- 使用createDocumentFragment来解决添加大量节点时的性能问题

### 页面修改API

- appendChild() 添加子节点
- insertBefore() 添加节点到参考节点之前 `parentNode.insertBefore(newNode, refNode)` parentNode表示父节点，newNode表示要添加的节点，refNode表示参照节点
- removeChild() 删除子节点
- replaceChild() 替换 `parent.replaceChild(newChild,oldChild)`

### 节点查询API

- document.getElementById
- document.getElementsByTagName
- document.getElementsByName
- document.getElementsByClassName
- document.querySelector // 返回第一个匹配的元素
- document.querySelectorAll

### 节点关系型API

- parentNode // 父节点
- parentElement // 父节点，必须是element
- childNodes // 子元素列表，包含文本，注释节点
- children // 子元素列表
- firstChild // 第一个子节点
- lastChild // 最后一个子节点
- hasChildNodes // 判断当前节点是否有子节点
- previousSibling // 前一个兄弟节点
- previousElementSibling // 前一个兄弟元素节点
- nextSibling // 后一个兄弟节点
- nextElementSibling // 后一个兄弟元素节点

### 元素属性API

- setAttribute 设置属性 `element.setAttribute(name, value)`
- getAttribute 返回属性值
- removeAttribute 删除属性

### 元素样式API

- window.getComputedStyle 返回元素计算后的样式
- getBoundingClientRect 返回元素大小以及相对于浏览器可视窗口的位置
- 直接修改元素的样式

```
ele.style.color = 'red'
ele.style.setProperty('font-size', '16px')
ele.style.removeProperty('color')
复制代码
```

- 动态添加样式规则

```
var style = document.createElement('style');
style.innerHTML='body{color:red;} #top{color:white;}';
document.head.appendChild(style);
复制代码
```

### attribute和property的区别是什么？

attribute是dom元素在文档中作为HTML标签拥有的属性

prototype是dom元素在JS中作为对象拥有的属性

### JS如何设置获取盒模型对于的宽和高？

- 获取内联元素的宽高 `dom.style.width/height`
- 只适用在IE中获取元素宽高 `dom.currentStyle.width/height`
- 获取元素宽高，兼容性较好 `window.getCompontedStyle(dom).width/height`
- 根据元素在视窗中的绝对位置获取宽高 `dom.getBoundingClientRect().width/height`
- 最常用，兼容性最好 `dom.offsetWidth/offsetHeight`

### offsetWidth/offsetHeight,clientWidth/clientHeight与srcollWidth/scrollHeight的区别

- offsetWidth/offsetHeight返回包含content+padding+border，效果与e.getBoundingClientRect()相同
- clientWidth/clientHeight返回包含content+padding，如果有滚动条，也不包含滚动条
- scrollWidth/scrollHeight返回包含content+paddin+溢出内容的尺寸

### document.write和innerHTML的区别

- document.write只能重绘整个页面
- innerHTML可以重绘页面的一部分

### DOM事件

#### DOM事件的级别

- DOM0 `element.onclick=function(){}`
- DOM2 `element.addEventListener('click',function(){},false)`
- DOM3 `element.addEventListener('keyup',function(){},false)`

**DOM0级事件**就是将一个函数赋值给一个事件处理属性，缺点在于一个处理程序无法同时绑定多个处理函数。

**DOM2级事件**运行给一个程序添加多个处理函数，定义了addEventListener和removeEventListener两个方法，分别用于绑定和解绑事件，方法包含三个参数分别是绑定的事件处理的属性名称，处理函数，是否在捕获时执行事件

IE8以下使用attachEvent和detachEvent实现，不需要传入第三个参数，因为IE8以下只支持冒泡型事件

```
btn.attachEvent('onclick', showFn);
btn.detachEvent('onclick', showFn);
复制代码
```

**DOM3级事件**是在DOM2级事件的基础上添加很多事件类型如load,scroll,blur,focus,dbclick,mouseup,mousewheel,textInput,keydown,keypress，同时也允许使用者自定义一些事件。

#### 如何使用事件？

- HTML事件处理程序

```
<div onclick="clicked()"></div>
复制代码
```

优缺点：简单，但与HTML代码紧密耦合，更改不方便

- DOM0级处理程序

```
document.onclick = function(){}; // 指定事件
docuemtn.onclick = null;         // 删除事件
复制代码
```

优缺点：简单且跨浏览器

- DOM2级处理程序

```
addEventListener('click', function(){},布尔值) // 指定事件
removeListener('click', function(){}, 布尔值) // 移除事件
复制代码
```

优缺点：可以添加多个监听函数，如果指定处理函数是匿名函数，则无法删除

- IE事件处理程序

```
attachEvent('onclick', function(){}) // 指定事件
detachEvent('click', function(){}) // 移除事件
复制代码
```

优缺点：可以添加多个监听函数，如果指定处理函数是匿名函数，则无法删除

#### IE与标准DOM事件模型之间存在的差别

- 参数的差别：

attachEvent()第一个参数比addEventListener()的事件名多一个“on”；且没有第三个参数，因为IE事件模型只支持冒泡事件流

- 事件处理函数作用域：

IE中事件处理程序处于全局作用域，其内的this会指向window，而DOM事件模型是作用于元素，其内的this执行所属元素

- 事件对象event的属性方法的差别

**阻止冒泡**

IE：cancelBubble=true

DOM: stopPropagation()

**阻止元素默认事件**

IE：returnValue=false

DOM：preventDefault()

**事件目标**

IE: srcElement DOM: target

#### IE与标准有哪些兼容性写法？

```
var ev = ev || window.event;
document.docuemntElement.clientWidth || document.body.clientWidth
var target = ev.srcElement || ev.target
复制代码
```

#### DOM事件模型（冒泡和捕获）

- 事件冒泡

addEventListener第三个参数为false，事件在冒泡时候执行，事件目标target一级一级往上冒泡

**如何阻止事件冒泡**

```
child.addEventListener('click', function(e){
    console.log('目标事件')
    e.stopPropagation();
}, false)
复制代码
```

- 事件捕获

事件捕获是自上而下执行的，将addEventListener第三个参数为true

#### DOM事件流

DOM2级事件规定的事件流包括三个阶段：事件捕获阶段，处于目标阶段和事件冒泡阶段。首先发送的是事件捕获，为截获事件提供了机会，然后是实际的目标接收到事件，最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应

#### 捕获DOM事件捕获的具体流程

window->docuemnt->html->body->...

一开始接收事件的window，window接收完以后给到document，第三个才是html标签，再就是body，然后在一级一级往下传。与之相当的就是冒泡，从当前元素到window的过程

#### Event对象的常见应用

- event.preventDefault(): 阻止默认事件
- event.stopPropagation(): 阻止冒泡
- event.stopImmediatePropagatio(): 阻止剩余事件处理函数的执行，并防止当前事件在DOM上冒泡
- event.currentTarget: 事件委托时，当前绑定的事件元素
- event.target: 事件委托时，区分当前哪个元素被点击

#### 自定义事件

```
var event = new Event('custome');
ev.addEventListener('custome', function(){
    console.log('custome');
});
ev.dispatchEvent(event);
复制代码
```

#### mouseover和mouseenter的区别

mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout

mouseenter: 当鼠标移入元素本身（不包含子元素）会触发事件，不会冒泡，对应的移除事件是mouseleave

#### 请解释什么是事件代理？

事件代理（事件委托）把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。原理是DOM元素的事件冒泡。

好处：可以提高性能，大量节省内存占用，减少事件注册，可以实现新增子对象时无需再次对其绑定

#### document.load和document.ready的区别

document.onload是在样式结构加载完才执行，window.onload()不仅要样式结构加载完还要执行完所有样式图片资源文件全部加载完后才会触发

document.ready原生中无此方法，jQuery中有$().ready()，ready事件不要求页面全加载完，只需要加载完DOM结构即可触发。

## JSON

### 如何理解JSON？

JSON是JS的一个内置对象，也是一种轻量级的数据交换格式。 常用两个方法：

- parse // 字符串转对象
- stringify // 对象转字符串

### XML和JSON的区别？

- 数据体积方面：JSON相对于XML来讲，数据的体积小，传递的速度更快些。
- 数据交互方面：JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互
- 数据描述方面：JSON对数据的描述性比XML较差
- 传输速度方面：JSON的速度要远远快于XML

## Ajax

### 如何创建Ajax？

```
// 创建XMLHTTPRequest对象
var xhr = new XMLHttpRequest();
// 创建一个新的http请求
xhr.open("get", url, true)
// 设置响应HTTP请求状态变化的函数
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            // 获取异步调用返回的数据
            alert(xhr.responseText)
        }
    }
}
// 发送HTTP请求
xhr.send(null);
复制代码
```

状态码readyState说明：0：未初始化，未调用send()；1：已调用send()，正在发生请求；2:send()方法执行完毕，已经接收到全部响应内容；3：正在解析响应内容；4：解析完成，可以在客户端调用了

### Ajax有哪些优缺点？

**优点**：1.通过异步模式，提升用户体验；2.优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用；3.Ajax在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载；4.Ajax可以实现局部刷新

**缺点**：1.Ajax暴露了与服务器交互的的细节；2.对搜索引擎的支持较弱；3.不容易调试

### GET和POST在浏览器实现的区别

- GET后退刷新无害，可收藏为书签，能被缓存，参数会保留在浏览器历史中，只允许ASCII字符，安全性较差，数据显示在URL中
- POST后退刷新会重新提交数据，不可被收藏为标签，不能被缓存，参数不会被保存在浏览器历史中，对数据类型无限制，安全性较好，数据不会显示在URL中

### GET请求传参的误区

误区：我们常认为GET请求参数的大小存在限制，而POST无限制

实际上HTTP协议没有限制GET/POST的请求长度限制，GET的最大长度限制是因为浏览器和WEB服务器限制了URL的长度。

### GET和POST的区别

GET和POST方法没有实质区别，只是报文格式不同。

## 跨域

**可以跨域的三个标签**：`<img><link><script>`

### 什么是跨域？

跨域指通过JS在不同的域之间进行数据传入或通信。 协议，域名，端口有一个不同就是不同域

### 浏览器为什么要使用同源策略？

同源策略是为了防止CSRF攻击，它是利用用户的登录态发起恶意请求。如果没有同源策略，网站可以被任意来源的Ajax访问到内容。

### 如何解决跨域问题？

- JSONP 原理是利用`<script>`标签没有跨域限制的漏洞

```
function jsonp(url, callback, success){
    let script = docuemnt.createElement('scipt');
    script.src = url;
    script.async = true;
    script.type = "text/javascript";
    window[callback] = function(data){
        success && success(data)
    }
    document.body.appendChild(script)
}
jsonp('http://xxx.com', 'callback', function(value){
    console.log(value);  
})
复制代码
```

JSONP使用简单，兼容性不错但仅限GET请求

- CORS CORS需要前后端同时支持，服务器端设置Access-Control-Origin开启CORS，该属性表明哪些域名可以访问资源。分为简单请求和复杂请求，复杂请求多一个预检请求
- document.domain 只适用于二级域名相同，例如`a.test.com`和`b.test.com`。在页面添加`document.domain = 'test.com'`表示二级域名相同即可跨域
- postMessage 通常用于获取嵌入页面的第三方页面数据，一个页面发送消息，另一个页面判断来源并接收消息

```
// 发送消息
window.parent.postMessage('message', 'http://www.test.com')
// 接收消息
let mc=new MessageChannel()
mc.addEventListener('message', event => {
    let origin = event.origin || event.originalEvent.origin;
    if(origin === 'http://www.test.com'){
        console.log('验证通过')
    }
})
复制代码
```

- `window.name`

## 存储

### 请描述cookie，sessionStorage和localStorage的区别

答：

- 容量：cookie只有4kb，localStorage和sessionStorage最大容量5M
- 服务器通信：cookie用于客户端与服务器端的通信
- 有效时间：cookie在设置的有效时间过期前都存在，sessionStorage关闭当前页面就清理，localStorage除非主动删除否则一直存在
- api易用性：cookie的api需要自己封装才能使用，localStorage.setItem(key,value);localStorage.getItem(key)

### 有几种方式可以实现存储功能？

cookie,sessionStorage,localStorage,indexDB。

indexDB不限存储大小，不与服务器端通信，除非主动删除否则一直存在。

### 什么是Service Worker？

Service Worker是运行在浏览器背后的独立线程，一般可以用来实现缓存功能，传输协议必须为https

### Server Worker的工作？

- 与缓存进行交互，当用户请求缓存中的东西时，Service Worker能立刻从缓存中获取数据不通过外部http调用
- 发送推送通知
- 运行背景同步：在离线的情况下用浏览器发送一个文件，Service Worker可以保存此任务，等网络连接恢复后将文件上传至外部服务器

## ES6

### 箭头函数

箭头函数与普通函数的区别：

- 箭头函数没有arguments（用剩余运算符替代）
- 箭头函数没有prototype，不能作为构造函数（不能用new关键字调用）
- 箭头函数没有自己的this，引用的是外层执行上下文的this

### 扩展运算符

- 可将类数组转为真正的数组

```
let nodeList = document.querySelectorAll('div')
let arr=[...nodeList]
复制代码
```

- 合并多个数组

```
let arr1=[1,2,3]
let arr2=[4,5,6]
let arr3=[...arr1, ...arr2]
复制代码
```

### for...of循环

#### for-of与for-in的区别

- for-of遍历获取的是对象的键值，for-in获取的是键名
- for-in会遍历对象的整个原型链，性能差，for...of只遍历当前对象不会遍历原型链
- 对于数组的遍历，for-in会遍历所有可枚举属性（包括原型链），for...of只返回数组下标所对应的属性值

#### for...of的原理

利用了遍历对象内部的iterator接口，将for...of循环分解为最原始的for循环

### 对promise的理解，分别有什么优缺点？什么是Promise链？Promise构造函数执行和then函数执行有什么区别？

- Promise有三种状态：pending等待中，resolved完成，rejected拒绝 且一旦从等待状态变为其他状态就不能再次改变
- 构造Promise时，构造函数内部的代码是立即执行的。
- Promise实现了链式调用即每次调用then之后返回的都是一个全新的Promise，如果在then中使用return，那么return的值会被Promise.resolve()包装

### 你理解的Generator是什么？

Generator可以控制函数的执行

```
function *foo(x){
let y=2*(yield(x+1))
let z=yield(y/3)
return (x+y+z)
}
let it=foo(5)
it.next()		// {value:6,done:false}
it.next(12)
it.next(13)
复制代码
```

Generator函数调用会返回一个迭代器，第一次next，函数停在yield(x+1)所以value=5+1=6; 第二次next,传入参数相当于上一个yield的值，即let y=2*12=24; let z=24/3=8;第三次next,传入参数相当于上一个yield的值，即let z=13,y=24,x=5，相加返回42

### async,await相比于promise的优势

- 优势在于处理then的调用链，能够更清晰准确的写出代码
- 缺点：await将异步代码改造成同步，如果多个异步代码之间没有依赖性却使用了await会导致性能降低

### 对async，await的理解，内部原理

async就是将函数返回值使用Promise.resolve()包裹一下，和then中处理返回值一样，并且async只能搭配await使用 await其实就是generator加上Promise的语法糖，且内部实现了自动执行generator

### setTimeout,setInterval,requestAnimationFrame各有什么特点？

setTimeout延后执行，setInterval每隔一段时间执行一次回调函数，以上两种都不能保证在预期时间执行任务 requestAnimationFrame自带函数节流功能，且延时效果是精确的

### 自己实现一个Promise

```
const PENDGIN='pending'
const RESOLVED='resolved'
const REJECTED='rejected'
function myPromise(fn){
	const that=this
	that.state=PENDING
	that.value=null
	that.resolvedCallbacks=[]
	that.rejectedCallbacks=[]
	function resolve(value){
		if(value instanceof myPromise){
			return value.then(resolve, reject)
		}
		setTimeout(()=>{
			if(that.state===PENDING){
				that.state=RESOLVED;
				that.value=value;
				that.resolvedCallbacks.map(cb => cb(that.value))
			}
		},0)
	}
	function reject(error){
		setTimeout(()=>{
			if(that.state===PENDING){
				that.state=REJECTED
				that.value=value
				that.rejectedCallbacks.map(cb => cb(that.value))
			}
		},0)
	}
	try{
		fn(resolve, reject)
	}catch(e){
		reject(e)
	}
}
myPromise.prototype.then=function(onFulfilled, onRejected){
	const that=this
	onFulfilled=typeof onFulfilled==='function'?onFulfilled: v=>v
	onRejected=typeof onRejected==='function'?onRejected: r=>{throw r}
	if(that.state===PENDING){
		that.resolvedCallbacks.push(onFulfilled)
		that.rejectedCallbacks.push(onRejected)
	}
	if(that.state===RESOLVED){
		onFulfilled(that.value)
	}
	if(that.state===REJECTED){
		onRejected(that.value)
	}
}
new myPromise((resolve, reject) => {
	setTimeout(()=>{
		resolve(1)
	},0)
}).then(value=>{
	console.log(value)
})
复制代码
```

### 线程和进程的区别

进程描述了CPU在运行指令及加载和保存上下文所需的事件，线程是更小的单位，秒速了执行一段指令所需的时间

### JS单线程带来的好处

因为js可以修改DOM，如果JS执行的过程UI线程还在工作会导致不能不能安全的渲染UI。 JS单线程运行，可以达到节省内存，节约上下文切换时间，没有锁的问题

### 什么是执行栈

执行栈存放函数调用的栈结构，遵循先进后出的原则。 从底部开始放进去执行栈，然后从栈顶取出执行

### 微任务与宏任务

不同的任务源会被分配到不同task队列中，任务源可以分为微任务(microtask)和宏任务(macrotask) 微任务包括process.nextTick, promise, MutationObserver 宏任务包括script，setTimeout，setInterval，setImmediate，I/O，UI rendering

### EventLoop执行顺序

1.首先执行同步代码，这属于宏任务 2.当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行 3.执行所有微任务 4.当执行完所有微任务后，如有必要会渲染页面 5.然后开始下一轮EventLoop，执行宏任务中的异步代码，也就是setTimeout中的回调函数

### Proxy

Vue3.0其中一个核心功能就是使用Proxy替代Object.defineProperty Proxy可以在目标对象前架设一个拦截器，一般Reflect搭配，前者拦截对象，后者返回拦截的结果

#### Object.defineProperty的不足

1.无法探测到对象根属性的添加和删除 2.无法探测到对数组基于下标的修改 3.无法探测到.length修改的监测