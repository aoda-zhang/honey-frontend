import httpService from "@/shared/libs/http";
export type HospitalType = {
  id: string;
  name: string;
};
class FareAPI {
  getHospitalList = () => {
    return httpService.getAPI<HospitalType[]>("/hospital/list");
  };

  addHospitals = (hospitals: unknown[]) => {
    return httpService.postAPI<number>("/hospital/add", hospitals);
  };
}
const fareAPI = new FareAPI();
export default fareAPI;
