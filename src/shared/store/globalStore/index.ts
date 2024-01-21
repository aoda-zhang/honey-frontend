import { create } from "zustand";
import _ from "lodash";
type HospitalItem = {
  label: string;
  value: string;
};
type GlobalStage = { hospitals: HospitalItem[] };
type GlobalAction = {
  setHospital: (data: any[]) => void;
};
const globalStore = create<GlobalStage & GlobalAction>(set => ({
  hospitals: [],
  setHospital: (data = []) =>
    set(state => ({
      hospitals: _.uniqBy([...state.hospitals, ...data], "value"),
    })),
}));
export default globalStore;
