import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { kupacAct, selectKupac } from "../slices/KupacSlice/KupacSlice";
import styles from "./css/kupac.module.css";
import globalStyles from "../../globalStyles/globalCss.module.css";
import { KupacI } from "../slices/KupacSlice/interface";

const Kupac = () => {
  const {
    kupac: { kupacInfo },
  } = useAppSelector(selectKupac);
  const dispatch = useAppDispatch();

  const [kupac2, setKupac2] = useState<KupacI>({
    ime: kupacInfo.ime,
    mjesto: kupacInfo.mjesto,
    napomena: kupacInfo.napomena,
  });

  const handleKupac = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(kupacAct(kupac2));
  };

  return (
    <div className={styles.kupacDiv}>
      <form onSubmit={handleKupac}>
        <div className={styles.kupacFlex}>
          <label htmlFor="imeKupca">Ime: </label>
          <input
            type="text"
            value={kupac2.ime}
            id="imeKupca"
            onChange={(e) => setKupac2({ ...kupac2, ime: e.target.value })}
          />
        </div>
        <div className={styles.kupacFlex}>
          <label htmlFor="mjesto">Mjesto: </label>
          <input
            type="text"
            value={kupac2.mjesto}
            id="mjesto"
            onChange={(e) => setKupac2({ ...kupac2, mjesto: e.target.value })}
          />
        </div>
        <div className={styles.kupacFlex}>
          <label htmlFor="napomena">Napomena: </label>
          <textarea
            value={kupac2.napomena}
            id="napomena"
            onChange={(e) => setKupac2({ ...kupac2, napomena: e.target.value })}
          />
        </div>
        <button className={globalStyles.btnPrimary} type="submit">
          Dodaj Detalje O Kupcu
        </button>
      </form>
    </div>
  );
};

export default Kupac;
