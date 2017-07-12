export const selectedOrg = state => {
  var user = state.user
  if(user && (user.node_type === 'all' || user.node_id)) {
    return {
      id: user.node_id,
      name: user.node_name,
      type: user.node_type
    }
  } else {
    return null
  }
}

export const selectedRole = state => {
  var user = state.user
  if(user && user.role_id) {
    return {
      id: user.role_id,
      name: user.role_name
    }
  } else {
    return null
  }
}


export const roles = state => {
  var user = state.user
  return user.user_role || []
}