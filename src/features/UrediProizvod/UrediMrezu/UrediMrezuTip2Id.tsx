import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fixMrezeStandard, ukloniStandard } from "../../../urls";
import { NovaKomaricaStandardI } from "../../slices/FixStandardSlice/interface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";
import PopUp from "../../utils/PopUp";
import Message from "../../utils/Message";
import UkloniProizvodBtn from "../../utils/UkloniProizvodBtn";

const UrediMrezuTip2Id = () => {
  const [message, setMessage] = useState<string>("");
  const [novaMreza, setNovaMreza] = useState<NovaKomaricaStandardI>({
    tip: "",
    sirina: "",
    visina: "",
  });

  const [popup, setPopup] = useState(false);
  const [izbrisiProizvod, setIzbrisiProizvod] = useState<boolean | null>(null);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const fetchMongoDb = async () => {
      try {
        const res = await fetch(`${fixMrezeStandard}/${id}`);
        const news = await res.json();
        setNovaMreza(news);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMongoDb();
  }, [id]);

  const changeValues = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    axios
      .put(`${fixMrezeStandard}/${id}`, novaMreza)
      .then(() => setMessage("Proizvod uspješno uređen!"))
      .catch((err) => setMessage(`Došlo je do greške : ${err}`));
  };

  const ukloniProizvod = () => {
    setPopup(true);
  };

  useEffect(() => {
    if (izbrisiProizvod) {
      axios
        .delete(`${ukloniStandard}/${id}`)
        .then(() => history("/urediMrezuTip2"))
        .catch((err) => setMessage(`Došlo je do greške : ${err}`));
      setPopup(false);
    } else if (!izbrisiProizvod) {
      setPopup(false);
      setIzbrisiProizvod(null);
    }
  }, [history, id, izbrisiProizvod]);

  if (!novaMreza) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.odabirUređivanje}>
      <form className={styles.flexForm} onSubmit={changeValues}>
        <h2>Uredi Proizvod</h2>
        <div className={styles.flexInput}>
          <label htmlFor="imeKomarice">Ime Proizvoda </label>
          <input
            type="text"
            name="imeKomarice"
            value={novaMreza.tip}
            required
            onChange={(e) =>
              setNovaMreza({ ...novaMreza, tip: e.target.value })
            }
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="sirina">Širina </label>
          <input
            type="number"
            required
            value={novaMreza.sirina}
            onChange={(e) =>
              setNovaMreza({
                ...novaMreza,

                sirina: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
            name="sirina"
          />
        </div>
        <div className={styles.flexInput}>
          <label htmlFor="visina">Visina </label>
          <input
            type="number"
            name="visina"
            required
            value={novaMreza.visina}
            onChange={(e) =>
              setNovaMreza({
                ...novaMreza,

                visina: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <button className={globalStyles.btnPrimary}>Spremi Proizvod</button>
      </form>
      {message && (
        <Message setTheMessage={() => setMessage("")} messageText={message} />
      )}

      {/* <button className={globalStyles.btnRed} onClick={ukloniProizvod}>
        Ukloni Mrezu
      </button> */}
      <UkloniProizvodBtn
        text={"Ukloni Mrežu"}
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

export default UrediMrezuTip2Id;
