import Vue from 'vue'

Vue.filter('toI18nName', (name, lan) => {
  if(typeof name === 'object') {
    return name[lan]
  } else {
    return name
  }
})