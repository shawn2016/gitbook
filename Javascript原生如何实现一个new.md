# Javascript原生如何实现一个new

```javascript
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```

例如下面代码：

```javascript
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    //return ret instanceof Object ? ret : obj;
    return obj;
  }

  function A(d) {
    this.d = d;
    return {
      a: 6
    };
  }
  console.log(new A(123));  //{a: 6}
  console.log(_new(A, 123)); //A {d: 123}
```

