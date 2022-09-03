import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminUrl } from "../../urls";
import useFetchDB from "../fetchData/useFetchAPI";
import { adminLogin, selectAdmin } from "../slices/Admin/adminSlice";
import styles from "../../features/IzradaNaloga/RoleteIzrada/css/roleteIzradaNaloga.module.css";
import globalStyles from "../../globalStyles/globalCss.module.css";
import PogresanUnos from "../PogresanUnos/PogresanUnos";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const {
    admin: { pogresanUnos },
  } = useAppSelector(selectAdmin);
  const { dataDb } = useFetchDB(adminUrl);

  const handleLogIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(adminLogin({ password, name, dataDb }));
  };

  return (
    <div className={styles.odabirUređivanje}>
      <form onSubmit={handleLogIn}>
        <div>
          <label htmlFor="username">Ime: </label>
          <input
            type="text"
            id="username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Šifra: </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={globalStyles.btnPrimary}>
          Ulogiraj se
        </button>
      </form>
      {pogresanUnos && <PogresanUnos />}
    </div>
  );
};

export default AdminLogin;
