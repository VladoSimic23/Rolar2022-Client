import IzradaNaloga from "./features/IzradaNaloga/Izrada/IzradaNaloga";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectKupac } from "./features/slices/KupacSlice/KupacSlice";
import Settings from "./features/Settings/Settings";
import SettingsButton from "./features/Settings/SettingsBtn";
import sidebarStyles from "./features/Settings/css/settings.module.css";
import DodajNovuKomaricu from "./features/DodajNoviProizvod/DodajNovuKomaricu/DodajNovuKomaricu";
import DodajNovuKomaricuTip2 from "./features/DodajNoviProizvod/DodajNovuKomaricu/DodajNovuKomaricuTip2";
import DodajNovuRoletu from "./features/DodajNoviProizvod/DodajNovuRoletu/DodajNovuRoletu";
import UrediRoletu from "./features/UrediProizvod/UrediRoletu/UrediRoletu";
import UrediRoletuId from "./features/UrediProizvod/UrediRoletu/UrediRoletuId";
import UrediMrezu from "./features/UrediProizvod/UrediMrezu/UrediMrezu";
import UrediMrezuId from "./features/UrediProizvod/UrediMrezu/UrediMrezuId";
import UrediMrezuTip2 from "./features/UrediProizvod/UrediMrezu/UrediMrezuTip2";
import UrediMrezuTip2Id from "./features/UrediProizvod/UrediMrezu/UrediMrezuTip2Id";
import Print from "./features/Print/Print";
import useFetchDB from "./features/fetchData/useFetchAPI";
import { adminUrl } from "./urls";
import AdminLogin from "./features/Admin/AdminLogin";

function App() {
  const {
    kupac: { isSettings },
    admin: { isAdmin },
  } = useAppSelector(selectKupac);
  const { dataDb } = useFetchDB(adminUrl);

  if (!isAdmin) {
    if (dataDb === undefined) {
      return <h1>Loading...</h1>;
    }
    return <AdminLogin />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        {isSettings && (
          <div className={sidebarStyles.sidebarParent}>
            <Settings />
          </div>
        )}

        <SettingsButton />

        <div className="routes">
          <Routes>
            <Route path="dodajNovuKomaricu" element={<DodajNovuKomaricu />} />
            <Route
              path="dodajNovuKomaricuTip2"
              element={<DodajNovuKomaricuTip2 />}
            />
            <Route path="dodajNovuRoletu" element={<DodajNovuRoletu />} />
            <Route path="urediRoletu" element={<UrediRoletu />} />
            <Route path="/urediRoletu/:id" element={<UrediRoletuId />} />
            <Route path="urediMrezu" element={<UrediMrezu />} />
            <Route path="/urediMrezu/:id" element={<UrediMrezuId />} />
            <Route path="urediMrezuTip2" element={<UrediMrezuTip2 />} />
            <Route path="/urediMrezuTip2/:id" element={<UrediMrezuTip2Id />} />
            <Route path="/" element={<IzradaNaloga />} />
            <Route path="/Print" element={<Print />} />
            <Route path="*" element={<IzradaNaloga />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
