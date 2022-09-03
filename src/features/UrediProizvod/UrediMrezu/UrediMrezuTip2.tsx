import { Link } from "react-router-dom";
import { fixMrezeStandard } from "../../../urls";
import useFetchDB from "../../fetchData/useFetchAPI";
import { NovaKomaricaStandardI } from "../../slices/FixStandardSlice/interface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const UrediMrezuTip2 = () => {
  const { dataDb } = useFetchDB(fixMrezeStandard);

  if (!dataDb) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.odabirUređivanje}>
      <h2>Odaberite Mrežu za uređivanje</h2>
      <ul className={styles.flexGrid}>
        {dataDb.length > 0 &&
          dataDb.map((mreza: NovaKomaricaStandardI) => {
            return (
              <li key={mreza._id} className={globalStyles.btnPrimary}>
                <Link to={`/urediMrezuTip2/${mreza._id}`}>{mreza.tip}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UrediMrezuTip2;
