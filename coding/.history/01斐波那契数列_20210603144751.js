/*
 * @Author: your name
 * @Date: 2021-06-03 14:14:17
 * @LastEditTime: 2021-06-03 14:47:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coding/01.js
 */
// 斐波那契数，指的是这样一个数列：1、1、2、3、5、8、13、21、……在数学上，斐波那契数列以如下被以递归的方法定义：F0=0，F1=1，Fn=Fn-1+Fn-2（n>=2，n∈N*），用文字来说，就是斐波那契数列由 0 和 1 开始，之后的斐波那契数列系数就由之前的两数相加。
// 常用的计算斐波那契数列的方法分为两大类：递归和循环。

//方法一：普通递归
function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}
// fibonacci(30)  832040

// 方法二：改进递归-把前两位数字做成参数避免重复计算
function fibonacci(n) {
  function fib(n, v1, v2) {
    if (n === 1) {
      return v1;
    } else if (n === 2) {
      return v2;
    }
    return fib(n - 1, v2, v1 + v2);
  }
  return fib(n, 1, 1);
}

// 循环
// 方法一：普通for循环
function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  var n1 = 1,
    n2 = 1,
    sum;
  for (let i = 2; i < n; i++) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return sum;
}
// fibonacci(30)
// 方法二：for循环+解构赋值
var fibonacci = function (n) {
  let n1 = 1;
  n2 = 1;
  for (let i = 2; i < n; i++) {
    [n1, n2] = [n2, n1 + n2];
  }
  return n2;
};
// fibonacci(30);

// 各种方法运行耗时如下图：普通递归>改进递归>for循环