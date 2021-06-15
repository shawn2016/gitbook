# 第一节：nuxt.js相关概述

nuxt.js简单的说是Vue.js的通用框架，最常用的就是用来作SSR（服务器端渲染）.Vue.js是开发SPA（单页应用）的,Nuxt.js这个框架，用Vue开发多页应用，并在服务端完成渲染，可以直接用命令把我们制作的vue项目生成为静态html。

## 1.那服务器端渲染到底有什么好处呢？

主要的原因时SPA（单页应用）不利于搜索引擎的SEO操作，Nuxt.js适合作新闻、博客、电影、咨询这样的需要搜索引擎提供流量的项目。如果你要作移动端的项目，就没必要使用这个框架了。

## 2.什么是SSR？

在认识`SSR`之前，首先对`CSR`与`SSR`之间做个对比。

首先看一下传统的web开发，传统的web开发是，客户端向服务端发送请求，服务端查询数据库，拼接`HTML`字符串（模板），通过一系列的数据处理之后，把整理好的`HTML`返回给客户端,浏览器相当于打开了一个页面。这种比如我们经常听说过的`jsp`,`PHP`,`aspx`也就是传统的`MVC`的开发。

`SPA`应用，到了`Vue`、`React`，单页面应用优秀的用户体验，逐渐成为了主流，页面整体式`javaScript`渲染出来的，称之为客户端渲染`CSR`。`SPA`渲染过程。由客户端访问`URL`发送请求到服务端，返回`HTML`结构（但是`SPA`的返回的`HTML`结构是非常的小的，只有一个基本的结构，如第一段代码所示）。客户端接收到返回结果之后，在客户端开始渲染`HTML`，渲染时执行对应`javaScript`，最后渲染`template`，渲染完成之后，再次向服务端发送数据请求，注意这里时数据请求，服务端返回`json`格式数据。客户端接收数据，然后完成最终渲染。

`SPA`虽然给服务器减轻了压力，但是也是有缺点的：

1. 首屏渲染时间比较长：必须等待`JavaScript`加载完毕，并且执行完毕，才能渲染出首屏。
2. `SEO`不友好：爬虫只能拿到一个`div`元素，认为页面是空的，不利于`SEO`。

为了解决如上两个问题，出现了`SSR`解决方案，后端渲染出首屏的`DOM`结构返回，前端拿到内容带上首屏，后续的页面操作，再用单页面路由和渲染，称之为服务端渲染(`SSR`)。

`SSR`渲染流程是这样的，客户端发送`URL`请求到服务端，服务端读取对应的`url`的模板信息，在服务端做出`html`和`数据`的渲染，渲染完成之后返回`html`结构，客户端这时拿到的之后首屏页面的`html`结构。所以用户在浏览首屏的时候速度会很快，因为客户端不需要再次发送`ajax`请求。并不是做了`SSR`我们的页面就不属于`SPA`应用了，它仍然是一个独立的`spa`应用。

`SSR`是处于`CSR`与`SPA`应用之间的一个折中的方案，在渲染首屏的时候在服务端做出了渲染，注意仅仅是首屏，其他页面还是需要在客户端渲染的，在`服务端`接收到请求之后并且渲染出首屏页面，会携带着剩余的路由信息预留给`客户端`去渲染其他路由的页面。

Nuxt.js是特点（优点）：

- 基于`Vue`
- 自动代码分层
- 服务端渲染
- 强大的路由功能，支持异步数据
- 静态文件服务
- `EcmaScript6`和`EcmaScript7`的语法支持
- 打包和压缩`JavaScript`和`Css`
- `HTML`头部标签管理
- 本地开发支持热加载
- 集成`ESLint`
- 支持各种样式预编译器`SASS`、`LESS`等等
- 支持`HTTP/2`推送

# 第二节：Nuxt环境搭建

## 1.nuxt.js安装

在使用npm前你需要安装Node到系统中。若没有安装参考此链接 [www.cnblogs.com/zhouyu2017/…](https://www.cnblogs.com/zhouyu2017/p/6485265.html)

（1）用npm来安装vue-cli这个框架。

```
npm install vue-cli -g
复制代码
```

安装完成后可以使用vue -V 来测试是否安装成功。（注意：这里要使用大写的V，小写无效）。

（2）使用vue安装 nuxt

安装好vue-cli后，就可以使用init命令来初始化Nuxt.js项目。

```
vue init nuxt/starter
复制代码
```

这时候他会在github上下载模版，然后会询问你项目的名称叫什么，作者什么的，这些完全可以根据自己的爱好填写。

（3）使用npm install安装依赖包

```
npm install
复制代码
```

这个过程是要等一会的，如果你这个过程安装失败，可以直接诶删除项目中的node_modules文件夹后，重新npm install进行安装。

（4）使用npm run dev 启动服务

（5）在浏览器输入 localhost:3000,可以看到结果,如下：



![img](https://user-gold-cdn.xitu.io/2019/4/30/16a6db583e58fd21?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## 2.第一个Nuxt应用程序安装

```
npm i create-nuxt-app -g
create-nuxt-app my-nuxt-demo
cd my-nuxt-demo
npm run dev
复制代码
```

安装向导：

```
Project name                                //  项目名称
Project description                         //  项目描述
Use a custom server framework               //  选择服务器框架
Choose features to install                  //  选择安装的特性
Use a custom UI framework                   //  选择UI框架
Use a custom test framework                 //  测试框架
Choose rendering mode                       //  渲染模式
Universal                                   //  渲染所有连接页面
Single Page App                             //  只渲染当前页面
复制代码
```

## 3.Nuxt 渲染流程

一个完整的服务器请求到渲染的流程



![img](https://user-gold-cdn.xitu.io/2019/4/30/16a6db58678e3bbe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



通过上面的流程图可以看出，当一个客户端请求进入的时候，服务端有通过`nuxtServerInit`这个命令执行在`Store`的`action`中，在这里接收到客户端请求的时候，可以将一些客户端信息存储到`Store`中，也就是说可以把在服务端存储的一些客户端的一些登录信息存储到`Store`中。之后使用了`中间件`机制，中间件其实就是一个函数，会在每个路由执行之前去执行，在这里可以做很多事情，或者说可以理解为是路由器的拦截器的作用。然后再`validate`执行的时候对客户端携带的参数进行校验，在`asyncData`与`fetch`进入正式的渲染周期，`asyncData`向服务端获取数据，把请求到的数据合并到`Vue`中的`data`中，

# 第三节 ：Nuxt目录结构

## # 目录结构介绍

```
└─my-nuxt-demo
  ├─.nuxt               // Nuxt自动生成，临时的用于编辑的文件，build
  ├─assets              // 用于组织未编译的静态资源如LESS、SASS或JavaScript,对于不需要通过 Webpack 处理的静态资源文件，可以放置在 static 目录中
  ├─components          // 用于自己编写的Vue组件，比如日历组件、分页组件
  ├─layouts             // 布局目录，用于组织应用的布局组件，不可更改⭐
  ├─middleware          // 用于存放中间件
  ├─node_modules
  ├─pages               // 用于组织应用的路由及视图,Nuxt.js根据该目录结构自动生成对应的路由配置，文件名不可更改⭐
  ├─plugins             // 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。
  ├─static              // 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。文件夹名不可更改。⭐
  └─store               // 用于组织应用的Vuex 状态管理。文件夹名不可更改。⭐
  ├─.editorconfig       // 开发工具格式配置
  ├─.eslintrc.js        // ESLint的配置文件，用于检查代码格式
  ├─.gitignore          // 配置git忽略文件
  ├─nuxt.config.js      // 用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。文件名不可更改。⭐
  ├─package-lock.json   // npm自动生成，用于帮助package的统一设置的，yarn也有相同的操作
  ├─package.json        // npm 包管理配置文件
  ├─README.md
复制代码
```

## # 配置文件

```
const pkg = require('./package')
module.exports = {
  mode: 'universal',    //  当前渲染使用模式
  head: {       //  页面head配置信息
    title: pkg.name,        //  title
    meta: [         //  meat
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [     //  favicon，若引用css不会进行打包处理
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },   //  页面进度条
  css: [    //  全局css（会进行webpack打包处理）
    'element-ui/lib/theme-chalk/index.css'  
  ],
  plugins: [        //  插件
    '@/plugins/element-ui'
  ],
  modules: [        //  模块
    '@nuxtjs/axios',
  ],
  axios: {},
  build: {      //  打包
    transpile: [/^element-ui/],
    extend(config, ctx) {       //  webpack自定义配置
    }
  }
}
复制代码
```

## # Nuxt运行命令

```
{
  "scripts": {
    //  开发环境
    "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server",
    //  打包
    "build": "nuxt build",
    //  在服务端运行
    "start": "cross-env NODE_ENV=production node server/index.js",
    //  生成静态页面
    "generate": "nuxt generate"
  }
}
复制代码
```

# 第四节：Nuxt常用配置项

## 1.配置IP和端口

开发中经常会遇到端口被占用或者指定IP的情况。我们需要在根目录下的package.json里对config项进行配置。比如现在我们想把IP配置成127.0.0.1，端口设置1000。

/package.json

```
"config":{
    "nuxt":{
      "host":"127.0.0.1",
      "port":"1000"
    }
  },
复制代码
```

配置好后，我们在终端中输入npm run dev，然后你会看到服务地址改为了127.0.0.1:1000.

## 2.配置全局CSS

在开发多页项目时，都会定义一个全局的CSS来初始化我们的页面渲染，比如把padding和margin设置成0，网上也有非常出名的开源css文件normailze.css。要定义这些配置，需要在nuxt.config.js里进行操作。

比如现在我们要把页面字体设置为红色，就可以在assets/css/common.css文件，然后把字体设置为红色。

/assets/css/common.css

```
html{
    color:red;
}
复制代码
```

/nuxt.config.js

```
  css:['~assets/css/normailze.css'],
复制代码
```

设置好后，在终端输入npm run dev 。然后你会发现字体已经变成了红色。

## 3.配置webpack的loader

在nuxt.config.js里是可以对webpack的基本配置进行覆盖的，比如现在我们要配置一个url-loader来进行小图片的64位打包。就可以在nuxt.config.js的build选项里进行配置,相关可参照此链接[www.cnblogs.com/ssh-007/p/7…](https://www.cnblogs.com/ssh-007/p/7867954.html)

```
build: {
    loaders:[
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        loader:"url-loader",
        query:{
          limit:10000,
          name:'img/[name].[hash].[ext]'
        }
      }
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
复制代码
```

## 4.全局修改seo的head信息

nuxt.config.js文件中,修改title为wfaceboss：

```
 head: {
    title: 'wfaceboss',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
复制代码
```

修改后重启服务，即运行 npm run dev,效果如下



![img](https://user-gold-cdn.xitu.io/2019/4/30/16a6db583aa9f80d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# 第五节：Nuxt的路由配置和参数传递

Nuxt.js的路由并不复杂，它给我们进行了封装，让我们节省了很多配置环节。

## 1.基本路由

Nuxt.js 依据 `pages` 目录结构自动生成 vue-router 模块的路由配置。

假设 `pages` 的目录结构如下

```
└─pages
    ├─index.vue
    └─user
      ├─index.vue
      ├─one.vue
复制代码
```

那么，Nuxt.js 自动生成的路由配置如下：

```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
复制代码
```

## 2.页面跳转

1. 不要写成a标签，因为是重新获取一个新的页面，并不是SPA
2. `<nuxt-link to="/users"></nuxt-link>`
3. this.$router.push('/users')

## 3.动态路由

- 在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的**以下划线作为前缀**的 Vue 文件 或 目录。
- 获取动态参数{{$route.params.id}}

## 4.跳转路由传递参数并且取值

路由经常需要传递参数，我们可以简单的使用params来进行传递参数，我们现在向新闻页面（news）传递个参数，然后在新闻页面进行简单的接收。

（1）使用nuxt传递参数

```
<template>
  <div>
    <ul>
      <li><nuxt-link :to="`informa/${item.newsCode}-${item.newsType}`"></li>
    </ul>
  </div>
</template>
复制代码
```

注意：name其实指向的是路由（文件夹或文件名），而路由死活区分大小写的 ， 所以to后面区分大小写！！！建议文件夹都写成小写的。



![img](https://user-gold-cdn.xitu.io/2019/4/30/16a6db5841bd84bb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



（2）使用nuxt接收参数

```
async asyncData(context) {
    let newsCode = context.route.params.code.split('-')[0]
    let newsType = context.route.params.code.split('-')[1]
},
复制代码
```

（3）使用this.$router.push的params传递参数

```
传递参数  -- this.$router.push({path: ' 路由 ', query: {key: value}})
参数取值  -- this.$route.query.key

注: 使用这种方式，传递参数会拼接在路由后面，出现在地址栏
复制代码
```

（4）使用this.$router.push的params传递参数

```
传递参数  -- this.$router.push({name: ' 路由的name ', params: {key: value}})
参数取值  -- this.$route.params.key

注: 使用这种方式，参数不会拼接在路由后面，地址栏上看不到参数

注意: 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面。
复制代码
```

## 4.项目需求url优化

this.$route.query.key的方式参数显示在地址栏上, 但是并不是我们想要的, :id?id=``?

所以建议还是尽量使用router-link来实现跳转来解决地址栏的变化,更方便网站的优化

## 5.路由参数校验

Nuxt.js 可以让你在动态路由对应的页面组件中配置一个`validate`方法用于校验动态路由参数的有效性。该函数有一个布尔类型的返回值，如果返回true则表示校验通过，如果返回false则表示校验未通过。

```
export default {
  // nuxt中使用validate方法进行路由参数校验，这个方法必须返回一个布尔值，为true表示校验通过，为false表示校验失败。注意validate不能写到methods属性中。
  validate(obj) {
    // console.log(obj);
    // return true
    return /^\d+$/.test(obj.params.id)
  }
}
复制代码
```

## 6.嵌套路由

1. 添加一个Vue文件，作为父组件
2. 添加一个与父组件同名的文件夹来存放子视图组件
3. 在父文件中，添加组件，用于展示匹配到的子视图

# 第六节：Nuxt的路由动画效果

路由的动画效果，也叫作页面的更换效果。Nuxt.js提供两种方法为路由提供动画效果，一种是全局的，一种是针对单独页面制作。

## 1.全局路由动画

全局动画默认使用page来进行设置，例如现在我们为每个页面都设置一个进入和退出时的渐隐渐现的效果。我们可以先在根目录的assets/css下建立一个normailze.css文件。

（1）添加样式文件

/assets/css/normailze.css(没有请自行建立)

```
.page-enter-active, .page-leave-active {
    transition: opacity 2s;
}

.page-enter, .page-leave-active {
    opacity: 0;
}
复制代码
```

（2）文件配置

然后在nuxt.config.js里加入一个全局的css文件就可以了。

```
css:['assets/css/main.css'],
复制代码
```

这时候在页面切换的时候就会有2秒钟的动画切换效果了，但是你会发现一些页面是没有效果的，这是因为你没有是`<nuxt-link>`组件来制作跳转链接。你需要进行更改。

比如我们上节课作的动态路由新闻页，你就需要改成下面的链接。

```
<li><nuxt-link :to="{name:'news-id',params:{id:123}}">News-1</nuxt-link></li>
复制代码
```

改过之后你就会看到动画效果了。

## 2.单独设置页面动效

想给一个页面单独设置特殊的效果时，我们只要在css里改变默认的page，然后在页面组件的配置中加入transition字段即可。例如，我们想给about页面加入一个字体放大然后缩小的效果，其他页面没有这个效果。

（1）在全局样式assets/main.css 中添加以下内容

```
.test-enter-active, .test-leave-active {
    transition: all 2s;
    font-size:12px;
}
.test-enter, .test-leave-active {
    opacity: 0;
    font-size:40px;
}
复制代码
```

（2）然后在about/index.vue组件中设置

```
export default {
  transition:'test'
}
复制代码
```

这时候就有了页面的切换独特动效了。

总结：在需要使用的页面导入即可。

# 第七节：Nuxt的默认模版和默认布局

在开发应用时，经常会用到一些公用的元素，比如网页的标题是一样的，每个页面都是一模一样的标题。这时候我们有两种方法，第一种方法是作一个公用的组件出来，第二种方法是修改默认模版。这两种方法各有利弊，比如公用组件更加灵活，但是每次都需要自己手动引入；模版比较方便，但是只能每个页面都引入。

## 1.默认模板

Nuxt为我们提供了超简单的默认模版订制方法，只要在根目录下创建一个app.html就可以实现了。现在我们希望每个页面的最上边都加入“ 学习nuxt.js” 这几个字，我们就可以使用默认模版来完成。

app.html中：

```
<!DOCTYPE html>
<html lang="en">
<head>
   {{ HEAD }}
</head>
<body>
    <p>学习nuxt.js</p>
    {{ APP }}
</body>
</html>
复制代码
```

这里的{{ HEAD }}读取的是nuxt.config.js里的信息，{{APP}} 就是我们写的pages文件夹下的主体页面了。需要注意的是HEAD和APP都需要大写，如果小写会报错的。

注意：如果你建立了默认模板后，记得要重启服务器，否则显示不会成功；但是默认布局是不用重启服务器的。

## 2.默认布局

默认模板类似的功能还有默认布局，但是从名字上你就可以看出来，默认布局主要针对于页面的统一布局使用。它在位置根目录下的layouts/default.vue。需要注意的是在默认布局里不要加入头部信息，只是关于`<template>`标签下的内容统一订制。

需求：我们在每个页面的最顶部放入“学习nuxt.js” 这几个字，看一下在默认布局里的实现。

```
<template>
  <div>
    <p>学习nuxt.js</p>
    <nuxt/>
  </div>
</template>
复制代码
```

这里的`<nuxt/>`就相当于我们每个页面的内容，你也可以把一些通用样式放入这个默认布局里，但会增加页面的复杂程度。

总结：要区分默认模版和默认布局的区别，模版可以订制很多头部信息，包括IE版本的判断；模版只能定制`<template>`里的内容，跟布局有关系。在工作中修改时要看情况来编写代码。

# 第八节：Nuxt插件的使用

## 1.ElementUI使用

1. 下载npm i element-ui -S

2. 在plugins文件夹下面，创建ElementUI.js文件

   ```
   import Vue from 'vue'
   import ElementUI from 'element-ui'
   Vue.use(ElementUI)
   复制代码
   ```

3. 在nuxt.config.js中添加配置

   ```
   css: [
     'element-ui/lib/theme-chalk/index.css'
   ],
   plugins: [
     {src: '~/plugins/ElementUI', ssr: true }
   ],
   build: {
     vendor: ['element-ui']
   }
   复制代码
   ```

### 2.axios的使用

1. 安装`npm install --save axios`
2. 使用

```
import axios from 'axios'

asyncData(context, callback) {
  axios.get('http://localhost:3301/in_theaters')
    .then(res => {
      console.log(res);
      callback(null, {list: res.data})
    })
}
复制代码
```

1. 为防止重复打包，在nuxt.config.js中配置

```
module.exports = {
  build: {
    vendor: ['axios']
  }
}
复制代码
```

# 第九节：Nuxt的错误页面和个性meta设置

当用户输入路由错误的时候，我们需要给他一个明确的指引，所以说在应用程序开发中404页面是必不可少的。Nuxt.js支持直接在默认布局文件夹里建立错误页面。

## 1.建立错误页面

在根目录下的layouts文件夹下建立一个error.vue文件，它相当于一个显示应用错误的组件。

```
<template>
  <div>
      <h2 v-if="error.statusCode==404">404页面不存在</h2>
      <h2 v-else>500服务器错误</h2>
      <ul>
          <li><nuxt-link to="/">HOME</nuxt-link></li>
      </ul>
  </div>
</template>

<script>
export default {
  props:['error'],
}
</script>
复制代码
```

代码用v-if进行判断错误类型，需要注意的是这个错误是你需要在`<script>`里进行声明的，如果不声明程序是找不到error.statusCode的。

这里我也用了一个`<nuxt-link>`的简单写法直接跟上路径就可以了。

## 2.个性meta设置

页面的Meta对于SEO的设置非常重要，比如你现在要作个新闻页面，那为了搜索引擎对新闻的收录，需要每个页面对新闻都有不同的title和meta设置。直接使用head方法来设置当前页面的头部信息就可以了。我们现在要把New-1这个页面设置成个性的meta和title。

1.我们先把`pages/news/index.vue`页面的链接进行修改一下，传入一个title，目的是为了在新闻具体页面进行接收title，形成文章的标题。

/pages/news/index.vue

```
<li><nuxt-link :to="{name:'news-id',params:{id:123,title:'nuxt.com'}}">News-1</nuxt-link></li>
复制代码
```

2.第一步完成后，我们修改/pages/news/_id.vue，让它根据传递值变成独特的meta和title标签。

```
<template>
  <div>
      <h2>News-Content [{{$route.params.id}}]</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data(){
    return{
      title:this.$route.params.title,
    }
  },
//独立设置head信息
  head(){
      return{
        title:this.title,
        meta:[
          {hid:'description',name:'news',content:'This is news page'}
        ]
      }
    }
}
</script>
复制代码
```

注意：为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为meta标签配一个唯一的标识编号。

# 第十节：asyncData方法获取数据

Nuxt.js贴心的为我们扩展了Vue.js的方法，增加了anyncData，异步请求数据。

## 1.造假数据

（1）创建远程数据

在这里制作一些假的远程数据，我选择的网站是myjson.com，它是一个json的简单仓库，学习使用是非常适合的。 我们打开网站，在对话空中输入JSON代码，这个代码可以随意输入，key和value均采用字符串格式创建。

```
{
  "name": "Nuxt",
  "age": 18,
  "interest": "I love coding!"
}
复制代码
```

输入后保存，网站会给你一个地址，这就是你这个JSON仓库的地址了。[api.myjson.com/bins/1ctwlm](https://api.myjson.com/bins/1ctwlm)

（2）安装Axios

Vue.js官方推荐使用的远程数据获取方式就Axios，所以我们安装官方推荐，来使用Axios。这里我们使用npm 来安装 axios。 直接在终端中输入下面的命令：

```
npm install axios --save
复制代码
```

## 2.ansycData的promise方法

我们在pages下面新建一个文件，叫做ansyData.vue。然后写入下面的代码：

```
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  asyncData(){
      return axios.get('https://api.myjson.com/bins/1ctwlm')
      .then((res)=>{
          console.log(res)
          return {info:res.data}
      })
  }
}
</script>
复制代码
```

这时候我们可以看到，浏览器中已经能输出结果了。asyncData的方法会把值返回到data中。是组件创建（页面渲染）之前的动作，所以不能使用this.info,

## # return的重要性

```
一定要return出去获取到的对象，这样就可以在组件中使用，这里返回的数据会和组件中的data合并。这个函数不光在服务端会执行，在客户端同样也会执行。
复制代码
```

## 3.ansycData的promise并发应用

```
async asyncData(context) {
  let [newDetailRes, hotInformationRes, correlationRes] = await Promise.all([
    axios.post('http://www.huanjingwuyou.com/eia/news/detail', {
      newsCode: newsCode
    }),
    axios.post('http://www.huanjingwuyou.com/eia/news/select', {
      newsType: newsType, // 资讯类型： 3环评资讯 4环评知识
      start: 0, // 从第0条开始
      pageSize: 10,
      newsRecommend: true
    }),
    axios.post('http://www.huanjingwuyou.com/eia/news/select', {
      newsType: newsType, // 资讯类型： 3环评资讯 4环评知识
      start: 0, // 从第0条开始
      pageSize: 3,
      newsRecommend: false
    })
  ])
  return {
    newDetailList: newDetailRes.data.result,
    hotNewList: hotInformationRes.data.result.data,
    newsList: correlationRes.data.result.data,
    newsCode: newsCode,
    newsType: newsType
  }
},
复制代码
```

## 4.ansycData的await方法

当然上面的方法稍显过时，现在都在用ansyc…await来解决异步,改写上面的代码。

```
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  async asyncData(){
      let {data}=await axios.get('https://api.myjson.com/bins/8gdmr')
      return {info: data}
  }
}
</script>
复制代码
```

## 5.注意事项+生命周期：

1. asyncData 方法会在组件(限于页面组件)每次加载之前被调用
2. asyncData 可以在服务端或路由更新之前被调用
3. 第一个参数被设定为当前页面的上下文对象
4. Nuxt会将 asyncData 返回的数据融合到组件的data方法返回的数据一并返回给组件使用
5. 对于 asyncData 方式实在组件初始化前被调用的，所以在方法内饰没办法通过`this`来引用组件的实例对象