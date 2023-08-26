import { makeAutoObservable } from 'mobx'
class GlobalStore {
  addresses = []
  constructor() {
    makeAutoObservable(this)
  }
  setAddress = data => {
    this.addresses = data
  }
}
const globalStore = new GlobalStore()
export default globalStore
