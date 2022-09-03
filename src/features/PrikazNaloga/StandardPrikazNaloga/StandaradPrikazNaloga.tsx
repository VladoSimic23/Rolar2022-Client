import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectStandard,
  ukloniMrezuStandardSaNaloga,
} from "../../slices/FixStandardSlice/FixStandardSlice";
import styles from "./css/standardPrikaznaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const StandardPrikazNaloga = () => {
  const {
    fixStandard: { fixStandardNalog, mrezeStandardM2 },
  } = useAppSelector(selectStandard);
  const dispatch = useAppDispatch();

  if (fixStandardNalog.length < 1) {
    return null;
  }

  return (
    <div>
      <div className={styles.prikazKomariceStandard}>
        <h4>Fix Standard Nalog</h4>
        <div className={styles.komariceStandGrid}>
          <div className={styles.komariceStandChild}>
            <p>Komada</p>
          </div>
          <div className={styles.komariceStandChild}>
            <p>Tip</p>
          </div>
          <div className={styles.komariceStandChild}>
            <p>Šir x Vis</p>
          </div>
          <div className={styles.komariceStandChild}>
            <p></p>
          </div>
        </div>
        {fixStandardNalog.map((komar) => {
          const { sirina, visina, komada, tip, id } = komar;
          return (
            <div key={id} className={styles.komariceStandGrid}>
              <div className={styles.komariceStandChild}>
                <p>{komada}</p>
              </div>
              <div className={styles.komariceStandChild}>
                <p>{tip}</p>
              </div>
              <div className={styles.komariceStandChild}>
                <p>
                  {sirina} x {visina}
                </p>
              </div>

              <div className={styles.komariceStandChild}>
                <button
                  style={{
                    marginTop: "3px",
                    padding: "3px 8px",
                    fontSize: "16px",
                  }}
                  className={globalStyles.btnPrimary}
                  onClick={() => dispatch(ukloniMrezuStandardSaNaloga(id))}
                >
                  Ukloni
                </button>
              </div>
            </div>
          );
        })}
        <h4>
          Mreže: {String(mrezeStandardM2)}{" "}
          <span style={{ fontSize: "14px" }}>m2</span>
        </h4>
      </div>
    </div>
  );
};

export default StandardPrikazNaloga;
