import { makeAutoObservable } from 'mobx'
import { FareInfo, FareProcessStatus, FareProcessStatusItem } from '../types'
import _ from 'lodash'

class FareStore {
  faredData: FareInfo[] = []
  formData: FareInfo[] = []
  faredDate: string[] = []
  currentDate: string
  repeathospital: string[] = []
  fareStatus: FareProcessStatus = {
    isEdit: true,
    isView: false,
    isInfoOpen: false
  }
  constructor() {
    makeAutoObservable(this)
  }
  setForm = (data = []) => {
    this.faredData = [...this.faredData, ...data]
    this.formData = [...data]
  }
  get getCurrentFaredhospital() {
    return this.formData?.map(item => item?.to) ?? []
  }

  get getCurrentTotalMileage() {
    return this.formData?.reduce((pre, item) => {
      const value = parseFloat(String(item?.allMileage))
      if (!isNaN(value)) {
        pre += value
      }
      return pre
    }, 0)
  }

  get getRepeathospital(): FareInfo[] {
    return _.filter(this.faredData, (value, index, iteratee) => {
      const grouped = _.groupBy(iteratee, 'to')
      return grouped[value?.to]?.length > 1
    })
  }
  setDate = (date: string) => {
    this.faredDate = [...this.faredDate, date]
  }
  setCurrentDate = (date: string) => {
    this.currentDate = date
  }
  setFareStatus = (fareStatusItem: FareProcessStatusItem) => {
    this.fareStatus = { ...this.fareStatus, ...fareStatusItem }
  }
}
const fareStore = new FareStore()
export default fareStore
