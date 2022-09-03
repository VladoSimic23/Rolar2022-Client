export interface R50InitStateI {
  tipoviMrezeR50: string[];
  fixR50Nalog: MrezeNalogR50I[];
  mrezeR50Rezanje: MrezeR50RezanjeI[];
  trenutnaMrezaR50: MrezeR50RezanjeI;
  r50M2: Number;
}

export interface NovaKomaricaR50I {
  _id?: string;
  tip: string;
  mjere: [
    { tipMjere: "Konačna"; sirina: number | ""; visina: number | "" },
    { tipMjere: "Unutarnja"; sirina: number | ""; visina: number | "" }
  ];
}

// Mreže Nalog Tip 1
export interface MrezeNalogR50I {
  id: string | "";
  tip: string | "";
  sirina: number | "";
  visina: number | "";
  komada: number | "";
  kukice: number | "";
  mjera: string | "";
}

// Mreže Rezanje Tip 1
export interface MrezeR50RezanjeI {
  id: string | "";
  tip: string | "";
  ukupnaSirina: number | "";
  sirina: number | "";
  ukupnaVisina: number | "";
  visina: number | "";
  komada: number | "";
  kukice: number | "";
  mjera?: string | "";
}
