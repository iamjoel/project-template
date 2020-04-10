# 项目模板
已不维护。 每种项目，单独放了个库。

* 管理后台
  * Vue
    * [源码](front-end/admin)。 [代码库](https://github.com/iamjoel/admin-codes-collection)。
    * [脚手架](front-end/vue-cli-admin)。同步源码到脚手架:
      * 项目根目录下 `cd front-end`
      * `npm run build:admin`
    * 使用脚手架: `vue init 脚手架所在文件夹的路径`
    * [代码生成工具](https://iamjoel.github.io/admin-fe-generator/src/)
  * React
    * [react boilerplate](https://github.com/react-boilerplate/react-boilerplate)
* 多页面
  * Vue [源码](front-end/multi-page)
* [移动端](front-end/mobile)
  * Vue
    * [源码](front-end/mobile)。 [代码库](https://github.com/iamjoel/mobile-codes-collection)。
    * [脚手架](front-end/vue-cli-mobile)。同步源码到脚手架:
      * 项目根目录下 `cd front-end` 
      * `npm run build:mobile`
    * 使用脚手架: `vue init 脚手架所在文件夹的路径`
  * React
    * [react boilerplate](https://github.com/react-boilerplate/react-boilerplate)
* [可发布到 npm 的 Vue 组件模板](front-end/vue-cli-npm-components)。使用方式：`vue init 改组件模板所在文件夹的路径`。
* 小程序
  * [mpvue](http://mpvue.com/mpvue/quickstart/)。 `vue init mpvue/mpvue-quickstart my-project`
  * [WePY](front-end/wepy)
* 服务器端渲染(SSR)
  * Nuxt.js [源码](front-end/nuxt)
* PC 应用程序
  * [electron-vue](https://github.com/SimulatedGREG/electron-vue)
* 服务器端
  * Node
    * [egg](server/node/egg)
      * [源码](server/node/egg)
      * [脚手架](server/node/egg-boilerplate)。同步源码到脚手架:
        * 项目根目录下 `cd server/node` 
        * `npm run build:egg`
      * 使用脚手架 `egg-init --template=脚手架所在文件夹的路径` 。注意: 脚手架路径不支持 `~`，支持 `../`。
