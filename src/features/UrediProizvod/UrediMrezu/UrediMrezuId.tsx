import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fixMrezeR50, ukloniFixR50 } from "../../../urls";
import { NovaKomaricaR50I } from "../../slices/FIxR50Slice/interface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";
import PopUp from "../../utils/PopUp";
import Message from "../../utils/Message";
import UkloniProizvodBtn from "../../utils/UkloniProizvodBtn";

const UrediMrezuId = () => {
  const [message, setMessage] = useState<string>("");
  const [novaMreza, setNovaMreza] = useState<NovaKomaricaR50I>({
    tip: "",
    mjere: [
      { tipMjere: "Konačna", sirina: "", visina: "" },
      { tipMjere: "Unutarnja", sirina: "", visina: "" },
    ],
  });

  const [popup, setPopup] = useState(false);
  const [izbrisiProizvod, setIzbrisiProizvod] = useState<boolean | null>(null);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const fetchMongoDb = async () => {
      try {
        const res = await fetch(`${fixMrezeR50}/${id}`);
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
      .put(`${fixMrezeR50}/${id}`, novaMreza)
      .then(() => setMessage("Proizvod uspješno uređen!"))
      .catch((err) => setMessage(`Došlo je do greške : ${err}`));
  };

  const ukloniProizvod = () => {
    setPopup(true);
  };

  useEffect(() => {
    if (izbrisiProizvod) {
      axios
        .delete(`${ukloniFixR50}/${id}`)
        .then(() => history("/urediMrezu"))
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
            id="imeKomarice"
            value={novaMreza.tip}
            required
            onChange={(e) =>
              setNovaMreza({ ...novaMreza, tip: e.target.value })
            }
          />
        </div>
        {novaMreza.mjere.map((mjere, index) => {
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
                    setNovaMreza({ ...novaMreza });
                  }}
                  onWheel={(e: any) => e.target.blur()}
                  id={tipMjere + "sirina"}
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
                    setNovaMreza({ ...novaMreza });
                  }}
                  onWheel={(e: any) => e.target.blur()}
                  id={tipMjere + "visina"}
                />
              </div>
            </div>
          );
        })}

        <button className={globalStyles.btnPrimary}>Spremi Proizvod</button>
      </form>
      {message && (
        <Message setTheMessage={() => setMessage("")} messageText={message} />
      )}

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

export default UrediMrezuId;
