import { makeAutoObservable } from 'mobx'
class GlobalStore {
  hospitales = []
  constructor() {
    makeAutoObservable(this)
  }
  setHospital = data => {
    this.hospit
    ales = data
  }
}
const globalStore = new GlobalStore()
export default globalStore
