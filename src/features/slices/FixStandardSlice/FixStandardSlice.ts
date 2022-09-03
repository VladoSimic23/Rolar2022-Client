import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  FixStandardInitStateI,
  MrezeNalogStandard,
  NovaKomaricaStandardI,
} from "./interface";

const initialState: FixStandardInitStateI = {
  tipoviMrezeStandard: [],
  fixStandardNalog: [],
  standardRezanje: [],
  trenutnaStandardMreza: {
    id: "",
    tip: "",
    ukupnaVisina: "",
    visina: "",
    sirina: "",
    ukupnaSirina: "",
    komada: "",
  },
  mrezeStandardM2: 0,
};

export const fixStandardSlice = createSlice({
  name: "fixStandard",
  initialState,
  reducers: {
    tipoviMrezeStand: (
      state,
      action: PayloadAction<NovaKomaricaStandardI[]>
    ) => {
      const tipoviMreze: string[] = action.payload?.map(
        (tipMreze: NovaKomaricaStandardI) => {
          return tipMreze.tip;
        }
      );

      state.tipoviMrezeStandard = tipoviMreze;
    },
    dodajMrezuStandNalog: (state, action) => {
      action.payload.id = "_" + Math.random().toString(36).substr(2, 9);
      const fixStandardNalog: MrezeNalogStandard[] = [
        ...state.fixStandardNalog,
        action.payload,
      ];

      return {
        ...state,
        fixStandardNalog,
        trenutnaStandardMreza: action.payload,
      };
    },
    ukloniMrezuStandardSaNaloga: (state, action: PayloadAction<string>) => {
      const filterMrezeTip2 = state.fixStandardNalog.filter(
        (mreza) => mreza.id !== action.payload
      );
      const filterMrezeTip2Pilanje = state.standardRezanje.filter(
        (mre) => mre.id !== action.payload
      );
      return {
        ...state,
        fixStandardNalog: filterMrezeTip2,
        standardRezanje: filterMrezeTip2Pilanje,
      };
    },
    rezanjeFixStandard: (
      state,
      action: PayloadAction<NovaKomaricaStandardI[]>
    ) => {
      const rezanjeMrezetip2: NovaKomaricaStandardI | undefined =
        action.payload?.find((mreza: NovaKomaricaStandardI) => {
          if (mreza.tip === state.trenutnaStandardMreza.tip) {
            return mreza;
          }
          return null;
        });

      if (rezanjeMrezetip2) {
        const res = {
          id: String(state.trenutnaStandardMreza.id),
          tip: String(state.trenutnaStandardMreza.tip),
          ukupnaSirina: state.trenutnaStandardMreza.sirina,
          sirina:
            state.trenutnaStandardMreza.sirina &&
            Math.round(
              (Number(state.trenutnaStandardMreza.sirina) -
                Number(rezanjeMrezetip2.sirina)) *
                100
            ) / 100,
          ukupnaVisina: state.trenutnaStandardMreza.visina,
          visina:
            state.trenutnaStandardMreza.visina &&
            Math.round(
              (Number(state.trenutnaStandardMreza.visina) -
                Number(rezanjeMrezetip2.visina)) *
                100
            ) / 100,
          komada: state.trenutnaStandardMreza.komada,
        };
        const trEs = [...state.standardRezanje, res];

        const filterByIdMrezeTip2 = trEs.filter((it) => it.id !== "");

        return {
          ...state,
          standardRezanje: filterByIdMrezeTip2,
          trenutnaStandardMreza: {
            ...state.trenutnaStandardMreza,
            id: "",
            sirina: "",
            visina: "",
            komada: "",
          },
        };
      }

      return state;
    },
    standardM2: (state, action: PayloadAction<"">) => {
      const getMrezeTip2M2 = state.fixStandardNalog.map((mreze) => {
        const m2 = ((Number(mreze.sirina) / 100) * Number(mreze.visina)) / 100;
        return m2 * Number(mreze.komada);
      });

      const sumMrezeTip2M2 = Number(
        getMrezeTip2M2.reduce((a, b) => a + b, 0).toFixed(3)
      );
      return { ...state, mrezeStandardM2: sumMrezeTip2M2 };
    },
  },
});

export const {
  dodajMrezuStandNalog,
  tipoviMrezeStand,
  ukloniMrezuStandardSaNaloga,
  rezanjeFixStandard,
  standardM2,
} = fixStandardSlice.actions;
export const selectStandard = (state: RootState) => state;
export default fixStandardSlice.reducer;
