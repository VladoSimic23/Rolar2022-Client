import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { trenutniProizvod } from "../../slices/RoleteSlice/roleteSlice";
import styles from "./css/OdabirProizvoda.module.css";

const OdabirProizvoda = () => {
  const [trenutniTipProizvoda, setTrenutniTipProizvoda] =
    useState<string>("Rolete");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(trenutniProizvod(trenutniTipProizvoda));
  }, [trenutniTipProizvoda, dispatch]);

  return (
    <div>
      <div className={styles.odaberiProizvod}>
        <div>
          <h2>Odaberi Proizvod</h2>
        </div>
        <ul>
          <li
            onClick={() => setTrenutniTipProizvoda("Rolete")}
            className={
              trenutniTipProizvoda === "Rolete" ? styles.bgRed : styles.bgNone
            }
          >
            Rolete
          </li>
          <li
            onClick={() => setTrenutniTipProizvoda("R50")}
            className={
              trenutniTipProizvoda === "R50" ? styles.bgRed : styles.bgNone
            }
          >
            Fix R50
          </li>
          <li
            onClick={() => setTrenutniTipProizvoda("Standard")}
            className={
              trenutniTipProizvoda === "Standard" ? styles.bgRed : styles.bgNone
            }
          >
            Fix Standard
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OdabirProizvoda;
