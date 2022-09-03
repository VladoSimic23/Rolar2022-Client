import axios from "axios";
import { useState } from "react";
import { roleteDbUrl } from "../../../urls";
import { NovaRoletaI } from "../../slices/RoleteSlice/roleteInterface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const DodajNovuRoletu = () => {
  const [message, setMessage] = useState<string>("");
  const [novaRoleta, setNovaRoleta] = useState<NovaRoletaI>({
    tip: "",
    lamela: "",
    osovina: "",
    vodilica: "",
    mrezaZaRoletu: [
      { tip: "Klik-Klak", mreza: "", zavrsnaZaMrezu: "" },
      { tip: "Bolcna", mreza: "", zavrsnaZaMrezu: "" },
    ],
  });

  const sendDataToDb = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setNovaRoleta({
      ...novaRoleta,
      mrezaZaRoletu: [
        { tip: "Klik-Klak", mreza: "", zavrsnaZaMrezu: "" },
        { tip: "Bolcna", mreza: "", zavrsnaZaMrezu: "" },
      ],
    });
    axios
      .post(roleteDbUrl, novaRoleta)
      .then(() =>
        setNovaRoleta({
          tip: "",
          lamela: "",
          osovina: "",
          vodilica: "",
          mrezaZaRoletu: [
            { tip: "Klik-Klak", mreza: "", zavrsnaZaMrezu: "" },
            { tip: "Bolcna", mreza: "", zavrsnaZaMrezu: "" },
          ],
        })
      )
      .then(() => setMessage("Proizvod uspješno dodan!"))
      .catch((error) => {
        if (error) {
          setMessage(`Došlo je do greške! (${error.message})`);
        }
      });
  };

  return (
    <div className={styles.odabirUređivanje}>
      <form className={styles.flexForm} onSubmit={sendDataToDb}>
        <h2>Dodaj Novi Proizvod</h2>
        <div className={styles.flexInput}>
          <label htmlFor="imeRolete">Ime Proizvoda </label>
          <input
            type="text"
            id="imeRolete"
            value={novaRoleta.tip}
            required
            onChange={(e) =>
              setNovaRoleta({ ...novaRoleta, tip: e.target.value })
            }
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="lamela">Lamela </label>
          <input
            type="number"
            required
            id="lamela"
            value={novaRoleta.lamela}
            onChange={(e) =>
              setNovaRoleta({
                ...novaRoleta,
                lamela: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        <div className={styles.flexInput}>
          <label htmlFor="vodilica">Vodilica </label>
          <input
            type="number"
            id="vodilica"
            required
            value={novaRoleta.vodilica}
            onChange={(e) =>
              setNovaRoleta({
                ...novaRoleta,
                vodilica: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        <div className={styles.flexInput}>
          <label htmlFor="osovina">Osovina </label>
          <input
            type="number"
            id="osovina"
            value={novaRoleta.osovina}
            required
            onChange={(e) =>
              setNovaRoleta({
                ...novaRoleta,
                osovina: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        {novaRoleta.mrezaZaRoletu.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.tip}</h3>
              <div className={styles.flexInput}>
                <label htmlFor={`${item.tip} Mreža`}>Mreža </label>
                <input
                  type="number"
                  id={`${item.tip} Mreža`}
                  required
                  value={item.mreza}
                  onChange={(e) => {
                    item.mreza = Number(e.target.value);
                    setNovaRoleta({ ...novaRoleta });
                  }}
                  onWheel={(e: any) => e.target.blur()}
                />
              </div>
              <div className={styles.flexInput}>
                <label htmlFor={`${item.tip} Završna`}>Završna za mrežu </label>
                <input
                  type="number"
                  id={`${item.tip} Završna`}
                  required
                  value={item.zavrsnaZaMrezu}
                  onChange={(e) => {
                    item.zavrsnaZaMrezu = Number(e.target.value);
                    setNovaRoleta({ ...novaRoleta });
                  }}
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

export default DodajNovuRoletu;
