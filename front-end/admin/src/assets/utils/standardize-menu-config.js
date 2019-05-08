const DEFAULT_PAGES = [
  {
    type: 'list'
  },
  {
    type: 'update'
  },
  {
    type: 'view'
  }
]

export default standardize

function standardize (menuConfig, urls, SERVER_PREFIX) {
  // 添加ajax地址；标准化页面的内容
  menuConfig.forEach(menu => {
    var parentId = menu.id
    if (menu.children) {
      // 二级菜单的页面
      menu.children.forEach(pageGroup => {
        if (!pageGroup.pages) {
          pageGroup.pages = DEFAULT_PAGES.map(item => Object.assign({}, item))
        }
        pageGroup.pages = pageGroup.pages.map(page => {
          var pageInfo = getPageInfo(page, parentId, pageGroup.id, pageGroup)
          return Object.assign(page, pageInfo)
        })
        pageGroup.mainPage = getMainPage(pageGroup)
        setUrls(pageGroup, urls, SERVER_PREFIX)
      })
    } else {
      // 一级菜单的页面
      if (!menu.pages) {
        menu.pages = DEFAULT_PAGES.map(item => Object.assign({}, item))
      }
      menu.pages = menu.pages.map(page => {
        var pageInfo = getPageInfo(page, undefined, menu.id, menu)
        return Object.assign(page, pageInfo)
      })
      menu.mainPage = getMainPage(menu)
      setUrls(menu, urls, SERVER_PREFIX)
    }
  })
  return menuConfig
}

// 入口页面。在左侧菜单中用
function getMainPage (pageGroup) {
  var mainPageType = pageGroup.main || 'list'
  var mainPage
  mainPage = pageGroup.pages.filter(page => page.type === mainPageType)[0]
  if (!mainPage) {
    mainPage = pageGroup.pages[0]
  }
  return mainPage
}

function getPageInfo (page, parentId, pageGroupId, allData) {
  return {
    filePath: getFilePath(page, parentId, pageGroupId, allData),
    routePath: getRoutePath(page, parentId, pageGroupId, allData)
  }
}

function getFilePath (page, parentId, pageGroupId) {
  var filePath = page.filePath
  if (!filePath) {
    let type = page.type
    if (type === 'view') {
      // 详情和更新的是一个页面。
      type = 'update'
    }
    filePath = `${parentId ? parentId + '/' : ''}${pageGroupId}/${type}`
  }
  // 将文件名大写
  var filePathArr = filePath.split('/')
  return filePathArr
    .map((item, i) => {
      if (i === filePathArr.length - 1) {
        return upperCaseFisterLetter(item)
      }
      return item
    })
    .join('/')
}

function getRoutePath (page, parentId, pageGroupId, allData) {
  var routePath = page.routePath
  if (!routePath) {
    var path =
      {
        update: `update/:id`,
        view: `view/:id`
      }[page.type] || page.type
    var isUseCommon = false
    if (
      (page.type === 'list' && allData.listUseCommon) ||
      (page.type !== 'list' && allData.updateUseCommon)
    ) {
      isUseCommon = true
    }
    routePath = `${isUseCommon ? 'common/' : ''}${
      parentId ? parentId + '/' : ''
    }${pageGroupId}/${path}`
  }
  if (routePath.charAt(0) !== '/') {
    routePath = '/' + routePath
  }
  return routePath
}

function setUrls (pageGroup, urls, SERVER_PREFIX) {
  var ajaxKey = pageGroup.ajaxKey || pageGroup.id
  var basicTypes = ['list', 'detail', 'add', 'edit', 'del']
  var customerTypes = pageGroup.pages
    .filter(page => {
      return basicTypes.indexOf(page.type) === -1
    })
    .map(page => page.type)
  var pageTypes = [...basicTypes, ...customerTypes]
  urls[ajaxKey] = addUrlGroup(`${SERVER_PREFIX}/${ajaxKey}`, pageTypes)
}

function upperCaseFisterLetter (str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

function addUrlGroup (
  prefix,
  types = ['list', 'detail', 'add', 'edit', 'del'],
  others
) {
  var res = {}
  if (others && others.length > 0) {
    types = [...types, ...others]
  }
  types.forEach(type => {
    res[type] = `${prefix}/${type}`
  })
  return res
}
