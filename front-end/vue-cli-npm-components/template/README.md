# {{ name }}
[![npm](https://img.shields.io/npm/v/{{ name }}.svg) ![npm](https://img.shields.io/npm/dm/{{ name }}.svg)](https://www.npmjs.com/package/{{ name }})
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

{{ description }}

## 目录
- [安装](#安装)
- [使用](#使用)

# 安装
```
npm install --save {{ name }}
```

## 使用
```
<template>
  <lj-{{ name }} 
  >
    
  </lj-{{ name }}>
</template>

<script>
import Vue from 'vue'
import {{ library }} from '@lucky-joel/{{ name }}'
Vue.use({{ library }})

export default {
  ...
}
</script>
```

## 构建
```
npm run build
```

## 发布到 npm

```
npm run build
npm publish --access public
```

## License
[MIT](http://opensource.org/licenses/MIT)
