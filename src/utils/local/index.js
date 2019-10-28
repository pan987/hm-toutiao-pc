const KEY = 'hm-toutiao-pc-user-key'
const local = {
  setUser (user) {
    const JsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, JsonStr)
  },
  getUser () {
    const JsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(JsonStr)
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
