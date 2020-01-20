export const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem("userToken"))
  if(user && user.token) {
    return { Authorization: `bearer ${ user.token }` }
  }else {
    return {}
  }
}
