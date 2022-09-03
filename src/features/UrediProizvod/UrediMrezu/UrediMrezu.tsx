import { Link } from "react-router-dom";
import { fixMrezeR50 } from "../../../urls";
import useFetchDb from "../../fetchData/useFetchAPI";
import { NovaKomaricaR50I } from "../../slices/FIxR50Slice/interface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const UrediMrezu = () => {
  const { dataDb } = useFetchDb(fixMrezeR50);

  if (!dataDb) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.odabirUređivanje}>
      <h2>Odaberite Mrežu za uređivanje</h2>
      <ul className={styles.flexGrid}>
        {dataDb.length > 0 &&
          dataDb.map((mreza: NovaKomaricaR50I) => {
            return (
              <li key={mreza._id} className={globalStyles.btnPrimary}>
                <Link to={`/urediMrezu/${mreza._id}`}>{mreza.tip}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UrediMrezu;
