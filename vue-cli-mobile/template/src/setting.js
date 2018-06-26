var HOST
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  HOST = document.body.getAttribute('data-server-dev')
} else {
  HOST = document.body.getAttribute('data-server')
}

const SERVER_PREFIX = `${HOST}/api`
export const IMGS_PREFIX = `${HOST}/public/img`

export const urls = {
  care_service: addUrlGroup('care_service'),
  single_service: addUrlGroup('single_service'),
  skill: addUrlGroup('skill'),
}

function addUrlGroup (key, types = ['list', 'detail', 'add', 'edit','del'], others) {
  var res = {}
  if(others && others.length > 0) {
    types = [...types, ...others]
  }
  types.forEach(type => {
    res[type] = `${SERVER_PREFIX}/${key}/${type}`
  })
  return res
}