import { makeAutoObservable } from 'mobx'
import { BMap } from '../types'
class FareStore {
  formData: BMap[] = []
  constructor() {
    makeAutoObservable(this)
  }
  setForm = (data = []) => {
    this.formData = [...data]
  }
}
const fareStore = new FareStore()
export default fareStore
