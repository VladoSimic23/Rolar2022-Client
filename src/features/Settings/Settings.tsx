import { Link } from "react-router-dom";
import {
  faPlus,
  faPen,
  faPrint,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../app/hooks";
import styles from "./css/settings.module.css";
import { settingsToFalse } from "../slices/KupacSlice/KupacSlice";

const Settings = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <ul className={styles.sidebarUl}>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="izradaNaloga">
            <FontAwesomeIcon icon={faPen} /> Izrada Naloga
          </Link>
        </li>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="dodajNovuKomaricu">
            <FontAwesomeIcon icon={faPlus} /> Dodaj Novu Komaricu
          </Link>
        </li>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="dodajNovuKomaricuTip2">
            <FontAwesomeIcon icon={faPlus} /> Dodaj Novu Komaricu Tip 2
          </Link>
        </li>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="dodajNovuRoletu">
            <FontAwesomeIcon icon={faPlus} /> Dodaj Novu Roletu
          </Link>
        </li>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="urediRoletu">
            <FontAwesomeIcon icon={faPenToSquare} /> Uredi Rolete
          </Link>
        </li>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="urediMrezu">
            <FontAwesomeIcon icon={faPenToSquare} /> Uredi Mreže
          </Link>
        </li>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="urediMrezuTip2">
            <FontAwesomeIcon icon={faPenToSquare} /> Uredi Mreže Tip2
          </Link>
        </li>
        <li onClick={() => dispatch(settingsToFalse(""))}>
          <Link to="print">
            <FontAwesomeIcon icon={faPrint} /> Pregled Printa
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
