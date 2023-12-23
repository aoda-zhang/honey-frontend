import { create } from "zustand";
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
  setHospital: (data = []) => set(() => ({ hospitales: [...data] })),
}));
export default globalStore;
