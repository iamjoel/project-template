var pathNameMap = {
  'list': '列表',
  'update': '编辑',
  'view': '详情',
  // 其他類型
}
export default {
  props: {
    menu: {
      type: Array
    }
  },
  computed: {
    pathArr() {
      return this.$route.path.split('/').filter(item=> {
        return item !== ''
      })
    },
    currMenu() {
      var currMenu = false
      var pathArr = this.pathArr
      // console.log(pathArr)
      var allMenu = this.menu
      if (pathArr.length >= 3 && allMenu.length > 0) {
        allMenu.forEach(menu=> {
          if(!currMenu && menu.children.length > 0) {
            var subMenu = menu.children[0]
            if(!subMenu.path) {
              console.error(subMenu)
              return
            }
            var menuPath = subMenu.path.split('/')[1]
            if(menuPath === pathArr[0]) {
              currMenu = menu
            }
          }
        })
      }
      return currMenu
    },
    menuName() {
      return this.currMenu ? this.currMenu.name : ''
    },
    subMenuName() {
      var name
      var currMenu = this.currMenu
      var currPathArr = this.pathArr

      if(currMenu) {
        var subMenuNamePrefix = ''
        currMenu.children.forEach(subMenu=> {
          var pathArr = subMenu.path.split('/')
          if(pathArr[2] === currPathArr[1]) {
            subMenuNamePrefix = subMenu.name
          }
        })
        
        name = subMenuNamePrefix + (pathNameMap[this.pathArr[2]] || ('未知' + this.pathArr[2]))
      }
      return name
    }
  },
  mounted() {

  }
}