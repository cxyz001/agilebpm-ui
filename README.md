 
# agile-bpm-basic  前端工程介绍

前端是基于 ElementPlugs 开发，支持 Chrome、Edge、Firefox、Safari 等现代主流浏览器。
您可以访问 ElementPlugs 官网文档去查阅基础组件 API，您还可以查阅 AgileBPM 基础组件 API

## 快速开始

#### 安装

建议使用 **VSCode** 开发，请务必安装[必备插件](./qianduan.html#vscode-必备插件)

1. 检查环境， node16 或 18 ，在项目跟目录打开 命令窗口 

2. 安装依赖 `yarn install`

3. 启动服务 `npm run dev`

#### 初次设置

在开始开发前，有一些内容需要提前一次性设置，分别是：

1. 选择合适的 vsCode 插件用于开发
   vsCode 插件请参考 [vscode 配置插件](./qianduan.html#vscode-必备插件)。
 
3. 更换网站 logo：
   -  `public\img\logo.png`
   - `public\img\logo-r.png`

#### 配置

项目基本配置:`src\config\defaultConfig.ts` 
请求配置: `.env`

## 前端工程目录

```
agilebpm-ui
├── src
│   ├── api			           API 接口定义位置
│   ├── assets		             	静态资源
│   ├── components	           前端组件  		
│   ├── config		             	系统配置				
│   ├── hooks		             	
│   ├── icon		             	
│   ├── layout		             	前端框架的布局
│   ├── main.ts                 入口 mian js 
│   ├── router                  路由 
│   ├── store                   状态管理
│   ├── style                   css
│   ├── utils                   工具类
│   ├── views                  
│   │   ├── biz              页面部分  
│   │   ├── bpm                
│   │   ├── cms                
│   │   ├── home               
│   │   ├── login              
│   │   ├── news               
│   │   ├── org                
│   │   ├── sys                
├── types                      类型
├── package.json               引入
├── prettier.config.js         风格定义
└── vite.config.ts             vite 配置



```

## 新增页面

增加一个新的页面，需要 3 步：

- 创建新的 `.vue` 页面文件，请参考 [通用列表页规范](./qianduan.html#通用列表页规范)
- 在路由中添加新页面
- 在菜单中配置该页面

以下是具体使用方法：

#### 创建新的 .vue 页面文件

所有的页面文件在 `/src/views` 目录下管理，处于可维护性考虑，对页面按模块进行了目录拆分，请根据模块添加文件

#### 在路由中添加新页面

一个页面主要分为两类：

1. 在主框架内的页面，即包含了顶部、侧边栏、多页签等基础布局（大部分页面应当属于此类型）
2. 在主框架外的页面，常见的有首页、登录 / 注册 / 注册结果页，它们较独立，没有其他布局

打开路由配置文件 `src\router\index.ts` 。

如果是主框架内页面，将路由配置添加在 `layout` 的children 中,它含有基础布局。
其他页面请不要放在  `layout` 的children 中 ，如登录页面

由于框架内的页面通常较多，处于可维护性考虑，我们分了模块，比如组织路由 `src\router\modules\org.ts`
 

#### 路由常见问题

- 设置 cache 后缓存无效，目前还未支持，下个版本会支持
  如果缓存无效请注意 路由的 name 和 .vue 页面组件的 name 要保持一致。

#### 在菜单中配置该页面

在 系统-系统资源 中 新增菜单资源

1. 选择需要添加菜单的父目录，点击添加
2. 输入资源信息
   - 资源名：菜单的名字，会覆盖路由 title
   - 资源别名：唯一的 CODE，按钮权限中它用于鉴权标识
   - 请求地址：为路由地址，按钮权限中，该资源地址为接口后端访问的地址，同时也会通过地址匹配权限
   - 默认展开： 菜单默认会以展开形式展现

## 构建和发布

#### 构建

在终端执行命令进行项目打包
：
`$ npm run build `

构建打包成功之后，默认会在根目录生成 `dist` 文件夹，里面就是构建打包好的文件，通常是 `**.js` 、`*.css`、`index.html` 等静态文件。

#### 发布

前端是典型的 SPA 类型的工程，打包后的文件分为 index.html 和其它静态资源，整个项目只有 index.html 这一个入口文件，其它都是 Webpack 来管理的了。

所以，发布一个 SPA 项目，核心就是渲染这个 index.html 以及静态资源的位置。

一般来说，你可能使用 Nginx、Apache 等渲染这个入口文件 index.html，也可以使用 CDN 的服务，比如七牛。
更多资料可以查阅 [vue 官方文档](https://cli.vuejs.org/zh/guide/deployment.html#pwa)

## 通用列表页规范

列表页面建议混入 `abTableMix` 组件，它内置了 search,reset,handleCollapse,delBySeletedIds 这些列表页通用的方法。
具体请参考用户列表页面 `src\views\org\user\userList.vue`，具体 `ab-table` 组件功能可以到 api 章节查阅。

## 通用编辑页规范

编辑页请参考 `src\views\org\role\roleEdit.vue`，主要使用了 `ab-save` 组件，`ab-load` 组件用于简化部分代码。

## vscode 必备插件

vscode [下载地址](https://code.visualstudio.com/) 必备插件安装

- local-history (opens new window)local-history]（强烈推荐，必须安装，可找回丢失代码）
- eslint (opens new window)eslint（必须安装，建议开启 Eslint 保存时自动修复）
- stylelint (opens new window)stylelint（必须安装）
- Prettier - Code formatter (opens new window)代码自动格式化（必须安装）
- volar (opens new window)vue3 开发必备
- Auto Import (opens new window)import 引入自动补全（推荐安装）
- Import Cost (opens new window)查看你引入的依赖模块大小（推荐安装）
- Auto Close Tag (opens new window)自动补全 html 标签（推荐安装）
- Auto Rename Tag (opens new window)自动重命名 html 标签（推荐安装）
- vscode-element-helper (opens new window)element 开发必备（推荐安装）
- docthis (opens new window)注释插件（可不安装）
- Git History (opens new window)查看 git 提交历史（可不安装）
- Svg Preview (opens new window)svg 查看器（可不安装）
