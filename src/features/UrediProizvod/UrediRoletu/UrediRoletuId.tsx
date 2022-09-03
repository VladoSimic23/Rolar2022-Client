import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { roleteDbUrl, ukloniRoletu } from "../../../urls";
import { NovaRoletaI } from "../../slices/RoleteSlice/roleteInterface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";
import PopUp from "../../utils/PopUp";
import Message from "../../utils/Message";
import UkloniProizvodBtn from "../../utils/UkloniProizvodBtn";

const UrediRoletuId = () => {
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

  const [popup, setPopup] = useState(false);
  const [izbrisiProizvod, setIzbrisiProizvod] = useState<boolean | null>(null);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const fetchMongoDb = async () => {
      try {
        const res = await fetch(`${roleteDbUrl}/${id}`);
        const news = await res.json();
        setNovaRoleta(news);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMongoDb();
  }, [id]);

  const changeValues = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    axios
      .put(`${roleteDbUrl}/${id}`, novaRoleta)
      .then(() => setMessage("Proizvod uspješno uređen!"))
      .catch((err) => setMessage(`Došlo je do greške : ${err}`));
  };

  const ukloniProizvod = () => {
    setPopup(true);
  };

  useEffect(() => {
    if (izbrisiProizvod) {
      axios
        .delete(`${ukloniRoletu}/${id}`)
        .then(() => history("/urediRoletu"))
        .catch((err) => setMessage(`Došlo je do greške : ${err}`));
      setPopup(false);
    } else if (!izbrisiProizvod) {
      setPopup(false);
      setIzbrisiProizvod(null);
    }
  }, [history, id, izbrisiProizvod]);

  if (!novaRoleta) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.odabirUređivanje}>
      <form className={styles.flexForm} onSubmit={changeValues}>
        <h2>Uredi Proizvod</h2>
        <div className={styles.flexInput}>
          <label htmlFor="imeRolete">Ime Proizvoda </label>
          <input
            type="text"
            name="imeRolete"
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
            name="lamela"
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
            name="vodilica"
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
            name="osovina"
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
                <label htmlFor="visina">Mreža </label>
                <input
                  type="number"
                  name="konacnaMjera"
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
                <label htmlFor="završnaZaMrezu">Završna za mrežu </label>
                <input
                  type="number"
                  name="završnaZaMrezu"
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
        <br />
        <button className={globalStyles.btnPrimary}>Spremi Proizvod</button>
      </form>
      {message && (
        <Message setTheMessage={() => setMessage("")} messageText={message} />
      )}
      <UkloniProizvodBtn
        text={"Ukloni Roletu"}
        ukloniProizvod={ukloniProizvod}
      />
      {popup && (
        <PopUp
          ukloni={() => setIzbrisiProizvod(true)}
          odustani={() => setIzbrisiProizvod(false)}
        />
      )}
    </div>
  );
};

export default UrediRoletuId;
