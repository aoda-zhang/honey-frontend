import { create } from "zustand";

import { FareInfo, FareProcessStatus, FareProcessStatusItem } from "../types";
interface FareState {
  faredData: FareInfo[];
  formData: FareInfo[];
  faredDate: string[];
  currentDate: string;
  repeathospital: string[];
  fareStatus: FareProcessStatus;
  setForm: (data: any[]) => void;
  setDate: (date: string) => void;
  setCurrentDate: (date: string) => void;
  setFareStatus: (fareStatusItem: FareProcessStatusItem) => void;
}

const FareStore = create<FareState>(set => ({
  faredData: [],
  formData: [],
  faredDate: [],
  currentDate: "",
  repeathospital: [],
  fareStatus: {
    isEdit: true,
    isView: false,
    isInfoOpen: false,
  },
  setForm: (data = []) =>
    set(state => ({
      faredData: [state.faredData, ...data],
      formData: [...data],
    })),
  setDate: (date: string) =>
    set(state => ({ faredDate: [...state.faredDate, date] })),
  setCurrentDate: (date: string) => set(() => ({ currentDate: date })),
  setFareStatus: (fareStatusItem: FareProcessStatusItem) =>
    set(state => ({ fareStatus: { ...state.fareStatus, ...fareStatusItem } })),
}));

export default FareStore;
