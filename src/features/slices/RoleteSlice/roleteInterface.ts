export interface RoleteInitState {
  tipoviRolete: string[];
  trenutniTipProizvoda: string;
  roleteNalog: RoleteIzradaNalogaI[] | [];
  roleteRezanje: RoleteRezanjeI[];
  trenutnaRoleta: TrenutnaRoletaI;
  roleteM2: Number;
}

export interface TrenutnaRoletaI {
  id: string | "";
  brojLamela: number | "";
  sirina?: number | "";
  visina?: number | "";
  tip: string | "";
  komada?: number | "";
  lamela: number | "";
  osovina: number | "";
  vodilica: number | "";
  mrezaZaRoletu: string | "";
}

// Nova Roleta
export interface NovaRoletaI {
  _id?: string;
  tip: string;
  lamela: number | "";
  osovina: number | "";
  vodilica: number | "";
  mrezaZaRoletu: [
    { tip: "Klik-Klak"; mreza: number | ""; zavrsnaZaMrezu: number | "" },
    { tip: "Bolcna"; mreza: number | ""; zavrsnaZaMrezu: number | "" }
  ];
}

// Rolete Izrada Naloga
export interface RoleteIzradaNalogaI {
  id?: string;
  tip: string | "";
  sirina: number | "";
  visina: number | "";
  komada: number | "";
  lijevaKomanda: number | "";
  desnaKomanda: number | "";
  tipPodizanja: string | "";
  mrezaZaRoletu: string | "";
}

// Rolete Rezanje
export interface RoleteRezanjeI {
  id: string | "";
  brojLamela: number | "";
  sirina?: number | "";
  visina?: number | "";
  tip: string | "";
  komada?: number | "";
  lamela: number | "";
  osovina: number | "";
  vodilica: number | "";
  mrezaZaRoletu: { mreza: number | ""; zavrsnaZaMrezu: number | "" };
}
