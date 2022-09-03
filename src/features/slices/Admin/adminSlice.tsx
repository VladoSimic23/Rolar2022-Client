import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { adminI } from "./interface";

const initialState: adminI = {
  admin: { username: "", password: "" },
  isAdmin: false,
  pogresanUnos: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (
      state,
      action: PayloadAction<{
        name: string;
        password: string;
        dataDb: { name: string; password: string };
      }>
    ) => {
      const { name, password, dataDb } = action.payload;

      if (name === dataDb.name && password === dataDb.password) {
        return { ...state, isAdmin: true, pogresanUnos: false };
      } else if (name !== dataDb.name || password !== dataDb.password) {
        return { ...state, pogresanUnos: true };
      }

      return state;
    },
  },
});

export const { adminLogin } = adminSlice.actions;
export const selectAdmin = (state: RootState) => state;
export default adminSlice.reducer;
