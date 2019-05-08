var pathNameMap = {
  list: '列表',
  update: '编辑',
  view: '详情'
  // 其他類型
}
export default {
  props: {
    menu: {
      type: Array
    }
  },
  computed: {
    pathArr () {
      var filteredArr = this.$route.path.split('/').filter(item => {
        return item !== ''
      })
      if (filteredArr[0] === 'common') {
        // 通用页面处理成普通页面
        filteredArr.shift()
      }
      return filteredArr
    },
    currMenu () {
      var currMenu = false
      var pathArr = this.pathArr
      // console.log(pathArr)
      var allMenu = this.menu
      if (pathArr.length >= 1 && allMenu.length > 0) {
        allMenu.forEach(menu => {
          if (!currMenu) {
            if (menu.children) {
              if (menu.children.length > 0) {
                var subMenu = menu.children[0]
                if (!subMenu.path) {
                  console.error(subMenu)
                  return
                }
                var menuPath = subMenu.path
                  .split('/')
                  .filter(item => item !== 'common')[1]
                if (menuPath === pathArr[0]) {
                  currMenu = menu
                }
              }
            } else {
              var menuPath = menu.path
                .split('/')
                .filter(item => item !== 'common')[1]
              if (menuPath === pathArr[0]) {
                currMenu = menu
              }
            }
          }
        })
      }
      return currMenu
    },
    menuName () {
      return this.currMenu ? this.currMenu.name : ''
    },
    subMenuName () {
      // 一级菜单
      if (!this.currMenu.children) {
        return ''
      }
      var name
      var currMenu = this.currMenu
      var currPathArr = this.pathArr

      if (currMenu) {
        var subMenuNamePrefix = ''
        currMenu.children.forEach(subMenu => {
          var pathArr = subMenu.path
            .split('/')
            .filter(item => item !== 'common') // 通用页面处理成普通页面
          if (pathArr[2] === currPathArr[1]) {
            subMenuNamePrefix = subMenu.name
          }
        })

        name =
          subMenuNamePrefix +
          (pathNameMap[this.pathArr[2]] || '未知' + this.pathArr[2])
      }
      return name
    }
  },
  mounted () {}
}
