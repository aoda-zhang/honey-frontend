const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('localStorage设置数据时出错：', error)
    }
  },
  get(key) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('localStorage获取数据时出错：', error)
      return null
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('localStorage删除数据时出错：', error)
    }
  }
}
export default storage
