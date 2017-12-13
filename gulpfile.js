var gulp = require('gulp');
var del = require('del')
var replace = require('gulp-replace')

const adminRoot = 'admin'
const vueCliAdminRoot = 'vue-cli-admin'

gulp.task('generator-admin:clean', function() {
  return del([
    `${vueCliAdminRoot}/template/**`, 
    `!${vueCliAdminRoot}/template`,
  ])
})

gulp.task('generator-admin:mv', ['generator-admin:clean'], function() {
  return gulp.src([
    `${adminRoot}/**/*`,
    `${adminRoot}/.*`, // 不这么写竟然未移动隐藏文件。。。
    `!${adminRoot}/src/**/*.vue`, // 会在 replace 中做替换
    `!${adminRoot}/node_modules/**/*`,
    `!${adminRoot}/dist/**/*`,
    `!${adminRoot}/TODO.md`,
    ])
    .pipe(gulp.dest(`${vueCliAdminRoot}/template`))
})

gulp.task('generator-admin:replace', ['generator-admin:mv'], function() {
  return gulp.src([
    `${adminRoot}/src/**/*.vue`,
    ])
    .pipe(replace(/{{/g, '\\{{')) // 将 {{ 替换成 \{{ 。避免与脚手架中的{{}}冲突。
    .pipe(gulp.dest(`${vueCliAdminRoot}/template/src`))
})

gulp.task('generator-admin', ['generator-admin:replace'])
