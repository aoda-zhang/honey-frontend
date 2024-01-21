import { create } from "zustand";
import _ from "lodash";
type HospitalItem = {
  label: string;
  value: string;
};
type GlobalStage = { hospitales: HospitalItem[] };
type GlobalAction = {
  setHospital: (data: any[]) => void;
};
const globalStore = create<GlobalStage & GlobalAction>(set => ({
  hospitales: [],
  setHospital: (data = []) =>
    set(state => ({
      hospitales: _.uniqBy([...state.hospitales, ...data], "value"),
    })),
}));
export default globalStore;
