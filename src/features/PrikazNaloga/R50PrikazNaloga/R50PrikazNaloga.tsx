import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectR50,
  ukloniMrezuR50SaNaloga,
} from "../../slices/FIxR50Slice/FixR50Slice";
import styles from "./css/R50PrikazNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const R50PrikazNaloga = () => {
  const {
    fixR50: { fixR50Nalog, r50M2 },
  } = useAppSelector(selectR50);
  const dispatch = useAppDispatch();

  if (fixR50Nalog.length < 1) {
    return null;
  }

  return (
    <div>
      <div className={styles.prikazKomariceR50}>
        <h4>Fix R-50 Nalog</h4>
        <div className={styles.komariceR50Grid}>
          <div className={styles.komariceR50Child}>
            <p>Komada</p>
          </div>
          <div className={styles.komariceR50Child}>
            <p>Tip</p>
          </div>
          <div className={styles.komariceR50Child}>
            <p>Šir x Vis</p>
          </div>
          <div className={styles.komariceR50Child}>
            <p>Mjera</p>
          </div>
          <div className={styles.komariceR50Child}>
            <p>Kukice</p>
          </div>
          <div className={styles.komariceR50Child}>
            <p></p>
          </div>
        </div>
        {fixR50Nalog.map((komar) => {
          const { sirina, visina, komada, kukice, id, tip, mjera } = komar;
          return (
            <div key={id} className={styles.komariceR50Grid}>
              <div className={styles.komariceR50Child}>
                <p>{komada}</p>
              </div>
              <div className={styles.komariceR50Child}>
                <p>{tip}</p>
              </div>
              <div className={styles.komariceR50Child}>
                <p>
                  {sirina} x {visina}
                </p>
              </div>
              <div className={styles.komariceR50Child}>
                <p>{mjera}</p>
              </div>
              <div className={styles.komariceR50Child}>
                <p>{kukice}</p>
              </div>
              <div className={styles.komariceR50Child}>
                <button
                  style={{
                    marginTop: "3px",
                    padding: "3px 8px",
                    fontSize: "16px",
                  }}
                  className={globalStyles.btnPrimary}
                  onClick={() => dispatch(ukloniMrezuR50SaNaloga(id))}
                >
                  Ukloni
                </button>
              </div>
            </div>
          );
        })}
        <h4>
          Mreže: {String(r50M2)}
          <span style={{ fontSize: "14px" }}>m2</span>
        </h4>
      </div>
    </div>
  );
};

export default R50PrikazNaloga;
