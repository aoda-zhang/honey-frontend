import { create } from "zustand";
import _ from "lodash";
type HospitalItem = {
  label: string;
  value: string;
};
interface FareState {
  hospitales: HospitalItem[];
  setHospital: (data: any[]) => void;
}

const globalStore = create<FareState>(set => ({
  hospitales: [],
  setHospital: (data = []) =>
    set(state => ({
      hospitales: _.uniqBy([...state.hospitales, ...data], "value"),
    })),
}));
export default globalStore;
