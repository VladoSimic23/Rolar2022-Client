import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { roleteDbUrl } from "../../../urls";
import useFetchDB from "../../fetchData/useFetchAPI";
import { RoleteIzradaNalogaI } from "../../slices/RoleteSlice/roleteInterface";
import {
  dodajRoletuNaNalog,
  roleteRezanje,
  roleteTipovi,
  rolM2,
  selectRolete,
} from "../../slices/RoleteSlice/roleteSlice";
import styles from "./css/roleteIzradaNaloga.module.css";
import globalStyels from "../../../globalStyles/globalCss.module.css";

const RoleteIzradaNaloga = () => {
  const dispatch = useAppDispatch();
  const { dataDb } = useFetchDB(roleteDbUrl);
  const {
    rolete: { tipoviRolete, roleteNalog },
  } = useAppSelector(selectRolete);

  useEffect(() => {
    dispatch(roleteRezanje(dataDb));
    dispatch(rolM2(""));
  }, [dispatch, dataDb, roleteNalog]);

  useEffect(() => {
    dispatch(roleteTipovi(dataDb));
  }, [dataDb, dispatch]);

  const [rolete, setRolete] = useState<RoleteIzradaNalogaI>({
    id: "",
    tip: "",
    sirina: "",
    visina: "",
    komada: "",
    lijevaKomanda: "",
    desnaKomanda: "",
    tipPodizanja: "",
    mrezaZaRoletu: "",
  });

  const dodajProizvod = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(dodajRoletuNaNalog(rolete));
    setRolete({
      ...rolete,
      id: "",
      sirina: "",
      visina: "",
      komada: "",
      lijevaKomanda: "",
      desnaKomanda: "",
    });
  };

  return (
    <div className={styles.odabirUređivanje2}>
      <form className={styles.flexForm2} onSubmit={dodajProizvod}>
        <select onChange={(e) => setRolete({ ...rolete, tip: e.target.value })}>
          <option value="">-- Odaberi Proizvod</option>
          {tipoviRolete.length > 0 &&
            tipoviRolete.map((tip: string, idx: number) => {
              return (
                <option value={tip} key={idx}>
                  {tip}
                </option>
              );
            })}
        </select>
        <div className={styles.flexInput}>
          <label htmlFor="rolSirina">Širina</label>
          <input
            type="number"
            required
            id="rolSirina"
            value={rolete.sirina}
            onChange={(e) =>
              setRolete({ ...rolete, sirina: Number(e.target.value) })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        <div className={styles.flexInput}>
          <label htmlFor="rolVisina">Visina</label>
          <input
            required
            type="number"
            id="rolVisina"
            value={rolete.visina}
            onChange={(e) =>
              setRolete({ ...rolete, visina: Number(e.target.value) })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="rolKomada">Komada</label>
          <input
            type="number"
            id="rolKomada"
            required
            value={rolete.komada}
            onChange={(e) =>
              setRolete({ ...rolete, komada: Number(e.target.value) })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        <div className={styles.rolWrapper}>
          <div>
            <h4>Komanda</h4>
            <div>
              <label htmlFor="komL">L : </label>
              <input
                className={styles.inptStyle}
                type="number"
                id="komL"
                value={rolete.lijevaKomanda}
                onChange={(e) =>
                  setRolete({
                    ...rolete,
                    lijevaKomanda: Number(e.target.value),
                  })
                }
                onWheel={(e: any) => e.target.blur()}
              />
            </div>

            <div>
              <label htmlFor="komD">D : </label>
              <input
                type="number"
                id="komD"
                className={styles.inptStyle}
                value={rolete.desnaKomanda}
                onChange={(e) =>
                  setRolete({ ...rolete, desnaKomanda: Number(e.target.value) })
                }
                onWheel={(e: any) => e.target.blur()}
              />
            </div>
          </div>

          <div>
            <h4>Podizanje</h4>
            <div className={`${styles.flexInput3} ${styles.podizanje}`}>
              <label htmlFor="kajis">Kajiš </label>
              <input
                type="radio"
                id="kajis"
                name="tipPodizanja"
                value="Kajiš"
                onChange={(e) =>
                  setRolete({ ...rolete, tipPodizanja: e.target.value })
                }
              />
            </div>
            <div className={styles.flexInput3}>
              <label htmlFor="spaga">Špaga </label>
              <input
                type="radio"
                name="tipPodizanja"
                id="spaga"
                value="Špaga"
                onChange={(e) =>
                  setRolete({ ...rolete, tipPodizanja: e.target.value })
                }
              />
            </div>
            <div className={styles.flexInput3}>
              <label htmlFor="motor">Motor</label>
              <input
                type="radio"
                name="tipPodizanja"
                id="motor"
                value="Motor"
                onChange={(e) =>
                  setRolete({ ...rolete, tipPodizanja: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <h4>Mreža Za Roletu</h4>
            <div className={styles.flexInput2}>
              <label htmlFor="bezMreze">Bez Mreže</label>
              <input
                type="radio"
                name="mrezaZaRoletuMr"
                id="bezMreze"
                value="Bez-Mreže"
                onChange={(e) =>
                  setRolete({ ...rolete, mrezaZaRoletu: e.target.value })
                }
              />
            </div>

            <div className={styles.flexInput2}>
              <label htmlFor="klikKlak">Klik-Klak</label>
              <input
                type="radio"
                name="mrezaZaRoletuMr"
                id="klikKlak"
                value="Klik-Klak"
                onChange={(e) =>
                  setRolete({ ...rolete, mrezaZaRoletu: e.target.value })
                }
              />
            </div>
            <div className={styles.flexInput2}>
              <label htmlFor="bolcna">Bolcna</label>
              <input
                type="radio"
                name="mrezaZaRoletuMr"
                id="bolcna"
                value="Bolcna"
                onChange={(e) =>
                  setRolete({ ...rolete, mrezaZaRoletu: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <button className={globalStyels.btnPrimary} type="submit">
          Dodaj Proizvod
        </button>
      </form>
    </div>
  );
};

export default RoleteIzradaNaloga;
