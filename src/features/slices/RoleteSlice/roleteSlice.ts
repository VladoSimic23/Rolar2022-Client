import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  NovaRoletaI,
  RoleteInitState,
  RoleteIzradaNalogaI,
  TrenutnaRoletaI,
} from "./roleteInterface";

const initialState: RoleteInitState = {
  tipoviRolete: [],
  trenutniTipProizvoda: "",
  roleteNalog: [],
  roleteRezanje: [],
  trenutnaRoleta: {
    id: "",
    sirina: "",
    visina: "",
    brojLamela: "",
    tip: "",
    komada: "",
    lamela: "",
    osovina: "",
    vodilica: "",
    mrezaZaRoletu: "",
  },
  roleteM2: 0,
};

export const roleteSlice = createSlice({
  name: "rolete",
  initialState,
  reducers: {
    roleteTipovi: (state, action: PayloadAction<NovaRoletaI[]>) => {
      const tipovi: string[] = action.payload?.map((tipRolete: NovaRoletaI) => {
        return tipRolete.tip;
      });
      state.tipoviRolete = tipovi;
    },
    trenutniProizvod: (state, action: PayloadAction<string>) => {
      state.trenutniTipProizvoda = action.payload;
    },
    dodajRoletuNaNalog: (state, { payload }) => {
      payload.id = "_" + Math.random().toString(36).substr(2, 9);
      const roleteNalog: RoleteIzradaNalogaI[] = [
        ...state.roleteNalog,
        payload,
      ];
      const trenutnaRoleta: TrenutnaRoletaI = payload;
      return { ...state, roleteNalog, trenutnaRoleta };
    },
    ukloniRoletuSaNaloga: (state, action) => {
      const filterRolete = state.roleteNalog.filter(
        (rol) => rol.id !== action.payload
      );
      const filterRoletePilanje = state.roleteRezanje.filter(
        (rol) => rol.id !== action.payload
      );

      return {
        ...state,
        roleteNalog: filterRolete,
        roleteRezanje: filterRoletePilanje,
      };
    },
    roleteRezanje: (state, action: PayloadAction<NovaRoletaI[]>) => {
      let mreZaRol: any;
      const rezanjeRol: NovaRoletaI | undefined = action.payload?.find(
        (rol: NovaRoletaI) => {
          if (rol.tip === state.trenutnaRoleta.tip) {
            rol.mrezaZaRoletu.map((mre) => {
              if (mre.tip === state.trenutnaRoleta.mrezaZaRoletu) {
                return (mreZaRol = mre);
              }
              return null;
            });

            return rol;
          }
          return null;
        }
      );

      if (rezanjeRol) {
        const res = {
          id: String(state.trenutnaRoleta.id),
          tip: String(rezanjeRol.tip),
          komada: Number(state.trenutnaRoleta.komada),
          lamela:
            Math.round(
              (Number(state.trenutnaRoleta.sirina) -
                Number(rezanjeRol.lamela)) *
                100
            ) / 100,
          brojLamela:
            (Number(state.trenutnaRoleta.visina) -
              Number(rezanjeRol.vodilica)) /
            3.9,
          osovina:
            Math.round(
              (Number(state.trenutnaRoleta.sirina) -
                Number(rezanjeRol.osovina)) *
                100
            ) / 100,

          vodilica:
            Math.round(
              (Number(state.trenutnaRoleta.visina) -
                Number(rezanjeRol.vodilica)) *
                100
            ) / 100,
          mrezaZaRoletu: {
            mreza:
              mreZaRol &&
              Math.round(
                (Number(state.trenutnaRoleta.sirina) - Number(mreZaRol.mreza)) *
                  100
              ) / 100,
            zavrsnaZaMrezu:
              mreZaRol &&
              Math.round(
                (Number(state.trenutnaRoleta.sirina) -
                  Number(mreZaRol.zavrsnaZaMrezu)) *
                  100
              ) / 100,
          },
        };
        const trEs = [...state.roleteRezanje, res];
        return {
          ...state,
          roleteRezanje: trEs,
          trenutnaRoleta: {
            id: "",
            sirina: "",
            brojLamela: "",
            visina: "",
            tip: "",
            komada: "",
            lamela: "",
            osovina: "",
            vodilica: "",
            mrezaZaRoletu: "",
          },
        };
      }

      return {
        ...state,
      };
    },
    rolM2: (state, action: PayloadAction<"">) => {
      const getRolM2 = state.roleteNalog.map((mreze) => {
        const m2 = ((Number(mreze.sirina) / 100) * Number(mreze.visina)) / 100;
        return m2 * Number(mreze.komada);
      });

      const sumRolM2 = Number(getRolM2.reduce((a, b) => a + b, 0).toFixed(3));
      return { ...state, roleteM2: sumRolM2 };
    },
  },
});

export const {
  roleteTipovi,
  trenutniProizvod,
  dodajRoletuNaNalog,
  ukloniRoletuSaNaloga,
  roleteRezanje,
  rolM2,
} = roleteSlice.actions;
export const selectRolete = (state: RootState) => state;
export default roleteSlice.reducer;
