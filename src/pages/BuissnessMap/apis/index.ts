import httpService from '@/shared/libs/http'

export type Address = {
  id: string
  name: string
}
class AddressAPI {
  getAddressList = () => {
    return httpService.getAPI<Address[]>('/api/address/list')
  }
}
const addressAPI = new AddressAPI()
export default addressAPI
