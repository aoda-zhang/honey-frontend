import { makeAutoObservable } from 'mobx'
import { BMap } from '../types'
import _ from 'lodash'
class FareStore {
  faredData: BMap[] = []
  formData: BMap[] = []
  faredDate: string[] = []
  repeatAddress: string[] = []
  constructor() {
    makeAutoObservable(this)
  }
  setForm = (data = []) => {
    this.faredData = [...this.faredData, ...data]
    this.formData = [...data]
  }
  get getFaredAddress() {
    return this.faredData?.map(item => item?.to) ?? []
  }
  get getRepeatAddress(): BMap[] {
    return _.filter(this.faredData, (value, index, iteratee) => {
      const grouped = _.groupBy(iteratee, 'to')
      return grouped[value?.to]?.length > 1
    })
  }
  setDate = (date: string) => {
    this.faredDate = [...this.faredDate, date]
  }
}
const fareStore = new FareStore()
export default fareStore
