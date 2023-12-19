import httpService from "@/shared/libs/http";
export type HospitalType = {
  id: string;
  name: string;
};
class FareAPI {
  getHospitalList = () => {
    return httpService.getAPI<HospitalType[]>("/hospital/list");
  };

  updateHospital = (hospitals: any[]) => {
    return httpService.postAPI<HospitalType[]>(
      "/hospital/update/?:id",
      hospitals,
    );
  };
}
const fareAPI = new FareAPI();
export default fareAPI;
