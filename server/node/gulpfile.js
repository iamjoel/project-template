var gulp = require('gulp');
var del = require('del')
var replace = require('gulp-replace')

const eggSrcRoot = 'egg'
const eggDistRoot = 'egg-boilerplate/boilerplate'
// const adminHasVueFolder = []



generateTask('egg')



function clean(type) {
  var {srcRootPath, distRootPath} = getFoldInfo(type)

  return del([
    `${distRootPath}`, 
  ])
}

function mv(type) {
  var {srcRootPath, distRootPath, hasVueFolder} = getFoldInfo(type)
  // var hasVueFolderPath = hasVueFolder.map(item => `!${srcRootPath}/${item}/**/*.vue`)
  return gulp.src([
    `${srcRootPath}/**/*`,
    `${srcRootPath}/**/.*`, // 不这么写竟然未移动隐藏文件。。。
    `!${srcRootPath}/node_modules`,
    `!${srcRootPath}/node_modules/**/*`,
    `!${srcRootPath}/node_modules/**/.*`,
    `!${srcRootPath}/.github`,
    `!${srcRootPath}/.idea`,
    `!${srcRootPath}/logs`,
    `!${srcRootPath}/logs/**/*`,
    `!${srcRootPath}/db.sql`,
    `!${srcRootPath}/yarn.lock`,
    // ...hasVueFolderPath,  // 会在 replace 中做替换
    ])
    .pipe(gulp.dest(`${distRootPath}`))
}

function replaceContent(type) {
  // var {srcRootPath, distRootPath, hasVueFolder} = getFoldInfo(type)

  // hasVueFolder.forEach(folder => {
  //   gulp.src([
  //   `${srcRootPath}/${folder}/**/*.vue`,
  //   ])
  //   .pipe(replace(/{{/g, '\\{{')) // 将 {{ 替换成 \{{ 。避免与脚手架中的{{}}冲突。
  //   .pipe(gulp.dest(`${distRootPath}/template/${folder}`))
  // })

}

function getFoldInfo(type) {
  var srcRootPath
  var distRootPath
  var hasVueFolder

  switch(type) {
    case 'egg': 
      srcRootPath = eggSrcRoot
      distRootPath = eggDistRoot
      // hasVueFolder = adminHasVueFolder
      break;
    
  }

  return {
    // hasVueFolder,
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

  // gulp.task(`generator-${type}:replace`, [`generator-${type}:mv`], function() {
  //   return replaceContent(type)
  // })

  gulp.task(`generator-${type}`,[`generator-${type}:mv`])
}