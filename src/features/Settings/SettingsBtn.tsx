import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { isSettings } from "../slices/KupacSlice/KupacSlice";
import styles from "./css/settings.module.css";

const SettingsButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(isSettings(""));
  };

  return (
    <div>
      <span className={styles.sidebarSettings} onClick={handleClick}>
        <FontAwesomeIcon icon={faGear} />
      </span>
    </div>
  );
};

export default SettingsButton;
