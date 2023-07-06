import { observable, action } from 'mobx'
import { AddressType } from '../types'

class AddressStore {
  // @ts-ignore
  @observable addressData: AddressType[] = []

  @action setAddressData(data: AddressType) {
    // @ts-ignore
    this.addressData = [...this.addressData, ...data]
  }
}

const addressStore = new AddressStore()
export default addressStore
