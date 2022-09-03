import { useAppSelector } from "../../../app/hooks";
import { selectRolete } from "../../slices/RoleteSlice/roleteSlice";
import styles from "./css/roleteRezanje.module.css";

const RoleteRezanje = () => {
  const {
    rolete: { roleteRezanje },
  } = useAppSelector(selectRolete);
  if (roleteRezanje.length < 1) {
    return null;
  }

  return (
    <div className={styles.printPar} style={{ background: "#7788b0" }}>
      <h4>Rolete Rezanje</h4>
      <div className={styles.roleteRezanjeGrid}>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Komada</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Tip</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Lamela</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Vodilica</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Osovina</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Mre/Zav</p>
        </div>
      </div>

      {roleteRezanje.map((rol) => {
        const { id, lamela, vodilica, komada, osovina, tip, brojLamela } = rol;
        return (
          <div key={id} className={styles.roleteRezanjeGrid}>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{komada}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{tip}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p className={styles.lamela}>
                {lamela}
                <span>{String(brojLamela).slice(0, 4)}</span>
              </p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{vodilica}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{osovina}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>
                {rol.mrezaZaRoletu.mreza} / {rol.mrezaZaRoletu.zavrsnaZaMrezu}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoleteRezanje;
