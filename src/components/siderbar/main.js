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
      if (pathArr.length >= 3 && allMenu.length > 0) {
        allMenu.forEach(menu=> {
          if(!name && menu.children.length > 0) {
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
    currMenuId() {
      return this.currMenu ? this.currMenu.innerid : ''
    },
    currSubMenuId() {
      var id
      var currMenu = this.currMenu
      var currPathArr = this.pathArr

      if(currMenu) {
        currMenu.children.forEach(subMenu=> {
          var pathArr = subMenu.path.split('/')
          if(pathArr[2] === currPathArr[1]) {
            id = subMenu.innerid
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
