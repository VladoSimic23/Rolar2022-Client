import { Link } from "react-router-dom";
import { roleteDbUrl } from "../../../urls";
import useFetchDB from "../../fetchData/useFetchAPI";
import { NovaRoletaI } from "../../slices/RoleteSlice/roleteInterface";
import styles from "../../IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const UrediRoletu = () => {
  const { dataDb } = useFetchDB(roleteDbUrl);

  if (!dataDb) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.odabirUređivanje}>
      <h2>Odaberite roletu za uređivanje</h2>
      <ul className={styles.flexGrid}>
        {dataDb.length > 0 &&
          dataDb.map((roleta: NovaRoletaI) => {
            return (
              <li key={roleta._id} className={globalStyles.btnPrimary}>
                <Link to={`/urediRoletu/${roleta._id}`}>{roleta.tip}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UrediRoletu;
