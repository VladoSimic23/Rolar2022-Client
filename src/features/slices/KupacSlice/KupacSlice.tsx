import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { KupacI, KupacInitState } from "./interface";

const initialState: KupacInitState = {
  kupacInfo: {
    ime: "",
    mjesto: "",
    napomena: "",
  },
  isSettings: false,
};

export const kupacSlice = createSlice({
  name: "kupac",
  initialState,
  reducers: {
    kupacAct: (state, action: PayloadAction<KupacI>) => {
      const { ime, napomena, mjesto } = action.payload;

      return {
        ...state,
        kupacInfo: { ime: ime, napomena: napomena, mjesto: mjesto },
      };
    },
    isSettings: (state, action: PayloadAction<"">) => {
      return { ...state, isSettings: !state.isSettings };
    },
    settingsToFalse: (state, action: PayloadAction<"">) => {
      return { ...state, isSettings: false };
    },
  },
});

export const { kupacAct, isSettings, settingsToFalse } = kupacSlice.actions;
export const selectKupac = (state: RootState) => state;
export default kupacSlice.reducer;
