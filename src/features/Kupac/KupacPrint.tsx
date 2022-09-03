import ProizvodiM2 from "../Print/ProizvodiM2";
import styles from "../Print/css/print.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectRolete } from "../slices/RoleteSlice/roleteSlice";
import useDate from "../utils/useDate";

const KupacPrint = () => {
  const {
    kupac: {
      kupacInfo: { ime, mjesto, napomena },
    },
  } = useAppSelector(selectRolete);

  const fullDate = useDate();

  return (
    <div className={styles.kupacParent}>
      <div>
        <div className={styles.kupacFlexPrint}>
          <h4>Ime: </h4>
          <h4 style={{ marginLeft: "15px" }}>{ime}</h4>
        </div>
        <div className={styles.kupacFlexPrint}>
          <h4>Mjesto: </h4>
          <h4 style={{ marginLeft: "15px" }}>{mjesto}</h4>
        </div>

        <div className={styles.kupacFlexPrint}>
          <h4>Datum: </h4>
          <h4 style={{ marginLeft: "15px" }}>{fullDate}</h4>
        </div>
        <div className={styles.kupacFlexPrint}>
          <h4>Napomena: </h4>
          <h4 style={{ marginLeft: "15px" }}>{napomena}</h4>
        </div>
      </div>
      <ProizvodiM2 />
    </div>
  );
};

export default KupacPrint;
