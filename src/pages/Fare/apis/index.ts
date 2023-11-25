import httpService from '@/shared/libs/http'
export type hospital = {
  id: string
  name: string
}
class FareAPI {
  getHospitalList = () => {
    return httpService.getAPI<hospital[]>('/hospital/list')
  }
  updateHospital = (hospitals: any[]) => {
    return httpService.postAPI<hospital[]>('/hospital/update/?:id', hospitals)
  }
}
const fareAPI = new FareAPI()
export default fareAPI
