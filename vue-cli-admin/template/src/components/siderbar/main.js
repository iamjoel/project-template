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
      var allMenu = this.menu
      var currMenu = false
      var pathArr = this.pathArr
      // debugger
      if (pathArr.length >= 1 && allMenu.length > 0) {
        allMenu.forEach(menu=> {
          if(!currMenu) { // 未找到
            if(menu.children) {
              if(menu.children.length > 0) {
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
            } else {
              var menuPath = menu.path.split('/')[1]
              if(menuPath === pathArr[0]) {
                currMenu = menu
              }
            }
          }
        })
      }
      return currMenu
    },
    currMenuId() {
      return this.currMenu ? this.currMenu.id : ''
    },
    currSubMenuId() {
      // 一级菜单
      if(!this.currMenu.children) {
        return ''
      }
      var id
      var currMenu = this.currMenu
      var currPathArr = this.pathArr

      if(currMenu) {
        currMenu.children.forEach(subMenu=> {
          var pathArr = subMenu.path.split('/')
          if(pathArr[2] === currPathArr[1]) {
            id = subMenu.id
          }
        })
      }
      return id
    },
  },
  data() {
    return {
    }
  },
  methods: {
      
  },
  mounted() {
  }
}
