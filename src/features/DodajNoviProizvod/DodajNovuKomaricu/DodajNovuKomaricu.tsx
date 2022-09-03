import axios from "axios";
import { useState } from "react";
import { NovaKomaricaR50I } from "../../slices/FIxR50Slice/interface";
import { fixMrezeR50 } from "../../../urls/index";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const DodajNovuKomaricu = () => {
  const [message, setMessage] = useState<string>("");
  const [komarica, setKomarica] = useState<NovaKomaricaR50I>({
    tip: "",
    mjere: [
      { tipMjere: "Konačna", sirina: "", visina: "" },
      { tipMjere: "Unutarnja", sirina: "", visina: "" },
    ],
  });

  const sendDataToDb = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(fixMrezeR50, komarica)
      .then(() =>
        setKomarica({
          tip: "",
          mjere: [
            { tipMjere: "Konačna", sirina: "", visina: "" },
            { tipMjere: "Unutarnja", sirina: "", visina: "" },
          ],
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
            value={komarica.tip}
            required
            onChange={(e) => setKomarica({ ...komarica, tip: e.target.value })}
          />
        </div>

        {komarica.mjere.map((mjere, index) => {
          const { sirina, visina, tipMjere } = mjere;

          return (
            <div key={index}>
              <h3>{tipMjere}</h3>
              <div className={styles.flexInput}>
                <label htmlFor={tipMjere + "sirina"}>Širina </label>
                <input
                  type="number"
                  required
                  value={sirina}
                  onChange={(e) => {
                    mjere.sirina = Number(e.target.value);
                    setKomarica({ ...komarica });
                  }}
                  id={tipMjere + "sirina"}
                  onWheel={(e: any) => e.target.blur()}
                />
              </div>
              <div className={styles.flexInput}>
                <label htmlFor={tipMjere + "visina"}>Visina </label>
                <input
                  type="number"
                  required
                  value={visina}
                  onChange={(e) => {
                    mjere.visina = Number(e.target.value);
                    setKomarica({ ...komarica });
                  }}
                  id={tipMjere + "visina"}
                  onWheel={(e: any) => e.target.blur()}
                />
              </div>
            </div>
          );
        })}

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

export default DodajNovuKomaricu;
