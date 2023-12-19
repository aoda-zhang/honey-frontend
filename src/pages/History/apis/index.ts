import httpService from "@/shared/libs/http";
import { FormValue } from "@/pages/Fare/types";
class HistoryAPI {
  addFareHistory = (fareHistory: FormValue) => {
    return httpService.postAPI("/history/add", fareHistory);
  };
}
const historyAPI = new HistoryAPI();
export default historyAPI;
