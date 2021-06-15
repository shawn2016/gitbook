/*
 * @Author: your name
 * @Date: 2021-06-03 14:14:17
 * @LastEditTime: 2021-06-03 14:16:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coding/01.js
 */
// 斐波那契数，指的是这样一个数列：1、1、2、3、5、8、13、21、……在数学上，斐波那契数列以如下被以递归的方法定义：F0=0，F1=1，Fn=Fn-1+Fn-2（n>=2，n∈N*），用文字来说，就是斐波那契数列由 0 和 1 开始，之后的斐波那契数列系数就由之前的两数相加。
// 常用的计算斐波那契数列的方法分为两大类：递归和循环。
// 普通递归

function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}
