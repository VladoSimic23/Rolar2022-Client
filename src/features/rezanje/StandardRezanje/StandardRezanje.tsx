import { useAppSelector } from "../../../app/hooks";
import { selectStandard } from "../../slices/FixStandardSlice/FixStandardSlice";
import styles from "../RoleteRezanje/css/roleteRezanje.module.css";

const StandardRezanje = () => {
  const {
    fixStandard: { standardRezanje },
  } = useAppSelector(selectStandard);

  if (standardRezanje.length < 1) {
    return null;
  }

  return (
    <div className={styles.printPar} style={{ background: "#382f3e" }}>
      {" "}
      <div>
        <h4>Fix Standard Nalog + Rezanje</h4>
        <div className={styles.roleteRezanjeGrid}>
          <div className={styles.roleteRezanjeGridChild}>
            <p>Komada</p>
          </div>
          <div className={styles.roleteRezanjeGridChild}>
            <p>Tip</p>
          </div>
          <div className={styles.roleteRezanjeGridChild}>
            <p>Šir x Vis</p>
          </div>
        </div>
        {standardRezanje.map((mreza) => {
          const {
            id,
            visina,
            sirina,
            tip,
            komada,
            ukupnaSirina,
            ukupnaVisina,
          } = mreza;
          return (
            <div key={id} className={styles.roleteRezanjeGrid}>
              <div className={styles.roleteRezanjeGridChild}>
                <p>{komada}</p>
              </div>
              <div className={styles.roleteRezanjeGridChild}>
                <p>{tip}</p>
              </div>
              <div className={styles.roleteRezanjeGridChild}>
                <p className={styles.rezanjeParent}>
                  <span style={{ left: "20px" }}>{sirina}</span> {ukupnaSirina}{" "}
                  x {ukupnaVisina}
                  <span style={{ right: "20px" }}>{visina} </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StandardRezanje;
