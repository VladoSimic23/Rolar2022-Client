import axios from "axios";
import { useState } from "react";
import { fixMrezeStandard } from "../../../urls";
import { NovaKomaricaStandardI } from "../../slices/FixStandardSlice/interface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const DodajNovuKomaricuTip2 = () => {
  const [message, setMessage] = useState<string>("");
  const [komaricaTip2, setKomaricaTip2] = useState<NovaKomaricaStandardI>({
    tip: "",
    sirina: "",
    visina: "",
  });

  const sendDataToDb = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(fixMrezeStandard, komaricaTip2)
      .then(() =>
        setKomaricaTip2({
          tip: "",
          sirina: "",
          visina: "",
        })
      )
      .then(() => setMessage("Proizvod uspješno dodan!"))
      .catch((error) => {
        setMessage(`Došlo je do greške! (${error.message})`);
      });
  };

  return (
    <div className={styles.odabirUređivanje}>
      <form className={styles.flexForm} onSubmit={sendDataToDb}>
        <h2>Dodaj Novi Proizvod</h2>
        <div className={styles.flexInput}>
          <label htmlFor="imeKomarice">Ime Proizvoda </label>
          <input
            type="text"
            id="imeKomarice"
            value={komaricaTip2.tip}
            required
            onChange={(e) =>
              setKomaricaTip2({ ...komaricaTip2, tip: e.target.value })
            }
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="sirina">Širina </label>
          <input
            type="number"
            id="sirina"
            required
            value={komaricaTip2.sirina}
            onChange={(e) =>
              setKomaricaTip2({
                ...komaricaTip2,
                sirina: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="visina">Visina </label>
          <input
            type="number"
            id="visina"
            required
            value={komaricaTip2.visina}
            onChange={(e) =>
              setKomaricaTip2({
                ...komaricaTip2,
                visina: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <button className={globalStyles.btnPrimary}>Spremi Proizvod</button>
      </form>
      {message && (
        <h4
          onClick={() => setMessage("")}
          className={`${
            message === "Proizvod uspješno dodan!"
              ? `${globalStyles.success}`
              : `${globalStyles.error}`
          }   `}
        >
          {message}
        </h4>
      )}
    </div>
  );
};

export default DodajNovuKomaricuTip2;
