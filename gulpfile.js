var gulp = require('gulp');
var del = require('del')
var replace = require('gulp-replace')

const adminRoot = 'admin'
const vueCliAdminRoot = 'vue-cli-admin'

const mobileRoot = 'mobile'
const vueCliMobileRoot = 'vue-cli-mobile'

// admin
gulp.task('generator-admin:clean', function() {
  return clean('admin')
})

gulp.task('generator-admin:mv', ['generator-admin:clean'], function() {
  return mv('admin')
})

gulp.task('generator-admin:replace', ['generator-admin:mv'], function() {
  return replaceContent('admin')
})

gulp.task('generator-admin', ['generator-admin:replace'])


// mobile
gulp.task('generator-mobile:clean', function() {
  return clean('mobile')
})

gulp.task('generator-mobile:mv', ['generator-mobile:clean'], function() {
  return mv('mobile')
})

gulp.task('generator-mobile:replace', ['generator-mobile:mv'], function() {
  return replaceContent('mobile')
})
gulp.task('generator-mobile', ['generator-mobile:replace'])

function clean(type) {
  var srcRootPath = type === 'admin' ? adminRoot : mobileRoot
  var distRootPath = type === 'admin' ? vueCliAdminRoot : vueCliMobileRoot
  return del([
    `${distRootPath}/template/**`, 
    `!${distRootPath}/template`,
  ])
}

function mv(type) {
  var srcRootPath = type === 'admin' ? adminRoot : mobileRoot
  var distRootPath = type === 'admin' ? vueCliAdminRoot : vueCliMobileRoot
  return gulp.src([
    `${srcRootPath}/**/*`,
    `${srcRootPath}/**/.*`, // 不这么写竟然未移动隐藏文件。。。
    `!${srcRootPath}/src/**/*.vue`, // 会在 replace 中做替换
    `!${srcRootPath}/node_modules/**/*`,
    `!${srcRootPath}/dist/**/*`,
    `!${srcRootPath}/TODO.md`,
    `!${srcRootPath}/yarn.lock`,
    `!${srcRootPath}/stats.json`,
    ])
    .pipe(gulp.dest(`${distRootPath}/template`))
}

function replaceContent(type) {
  var srcRootPath = type === 'admin' ? adminRoot : mobileRoot
  var distRootPath = type === 'admin' ? vueCliAdminRoot : vueCliMobileRoot
  return gulp.src([
    `${srcRootPath}/src/**/*.vue`,
    ])
    .pipe(replace(/{{/g, '\\{{')) // 将 {{ 替换成 \{{ 。避免与脚手架中的{{}}冲突。
    .pipe(gulp.dest(`${distRootPath}/template/src`))
}
