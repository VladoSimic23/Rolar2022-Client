export interface KupacI {
  ime: string | "";
  mjesto: string | "";
  napomena: string | "";
}

export interface KupacInitState {
  kupacInfo: KupacI;
  isSettings: boolean;
}
