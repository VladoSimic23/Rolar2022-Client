export interface FixStandardInitStateI {
  tipoviMrezeStandard: string[];
  fixStandardNalog: MrezeNalogStandard[];
  standardRezanje: MrezeStandardRezanjeI[];
  trenutnaStandardMreza: MrezeStandardRezanjeI;
  mrezeStandardM2: number;
}

export interface NovaKomaricaStandardI {
  _id?: string;
  tip: string;
  sirina: number | "";
  visina: number | "";
}

// Mreže Nalog Tip 2
export interface MrezeNalogStandard {
  id: string | "";
  tip: string | "";
  sirina: number | "";
  visina: number | "";
  komada: number | "";
}

// Mreže Rezanje Tip 2
export interface MrezeStandardRezanjeI {
  id: string | "";
  tip: string | "";
  ukupnaSirina: number | "";
  sirina: number | "";
  ukupnaVisina: number | "";
  visina: number | "";
  komada: number | "";
}
