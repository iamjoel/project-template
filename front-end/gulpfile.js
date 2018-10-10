var gulp = require('gulp');
var del = require('del')
var replace = require('gulp-replace')

const adminRoot = 'admin'
const vueCliAdminRoot = 'vue-cli-admin'
const adminHasVueFolder = ['src']

const mobileRoot = 'mobile'
const vueCliMobileRoot = 'vue-cli-mobile'
const mobileHasVueFolder = ['src']

const nuxtRoot = 'nuxt'
const vueCliNuxtRoot = 'vue-cli-nuxt'
const nuxtHasVueFolder = ['layouts', 'components','pages','plugins']


generateTask('admin')
generateTask('mobile')
generateTask('nuxt')


function clean(type) {
  var {srcRootPath, distRootPath} = getFoldInfo(type)

  return del([
    `${distRootPath}/template/**`, 
    `!${distRootPath}/template`,
  ])
}

function mv(type) {
  var {srcRootPath, distRootPath, hasVueFolder} = getFoldInfo(type)
  var hasVueFolderPath = hasVueFolder.map(item => `!${srcRootPath}/${item}/**/*.vue`)
  return gulp.src([
    `${srcRootPath}/**/*`,
    `${srcRootPath}/**/.*`, // 不这么写竟然未移动隐藏文件。。。
    `!${srcRootPath}/node_modules/**/*`,
    `!${srcRootPath}/dist/**/*`,
    `!${srcRootPath}/TODO.md`,
    `!${srcRootPath}/yarn.lock`,
    `!${srcRootPath}/stats.json`,
    ...hasVueFolderPath,  // 会在 replace 中做替换
    ])
    .pipe(gulp.dest(`${distRootPath}/template`))
}

function replaceContent(type) {
  var {srcRootPath, distRootPath, hasVueFolder} = getFoldInfo(type)

  hasVueFolder.forEach(folder => {
    gulp.src([
    `${srcRootPath}/${folder}/**/*.vue`,
    ])
    .pipe(replace(/{{/g, '\\{{')) // 将 {{ 替换成 \{{ 。避免与脚手架中的{{}}冲突。
    .pipe(gulp.dest(`${distRootPath}/template/${folder}`))
  })

}

function getFoldInfo(type) {
  var srcRootPath
  var distRootPath
  var hasVueFolder

  switch(type) {
    case 'admin': 
      srcRootPath = adminRoot
      distRootPath = vueCliAdminRoot
      hasVueFolder = adminHasVueFolder
      break;
    case 'mobile': 
      srcRootPath = mobileRoot
      distRootPath = vueCliMobileRoot
      hasVueFolder = mobileHasVueFolder
      break;
    case 'nuxt': 
      srcRootPath = nuxtRoot
      distRootPath = vueCliNuxtRoot
      hasVueFolder = nuxtHasVueFolder
      break;
  }

  return {
    hasVueFolder,
    srcRootPath,
    distRootPath
  }
}

function generateTask(type) {
  gulp.task(`generator-${type}:clean`, function() {
    return clean(type)
  })

  gulp.task(`generator-${type}:mv`, [`generator-${type}:clean`], function() {
    return mv(type)
  })

  gulp.task(`generator-${type}:replace`, [`generator-${type}:mv`], function() {
    return replaceContent(type)
  })

  gulp.task(`generator-${type}`,[`generator-${type}:replace`])
}