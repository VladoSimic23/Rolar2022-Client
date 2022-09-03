import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fixMrezeR50 } from "../../../urls";
import useFetchDB from "../../fetchData/useFetchAPI";
import {
  dodajMrezuR50Nalog,
  fixR50M2,
  rezanjeR50,
  selectR50,
  tipoviMrezeR50A,
} from "../../slices/FIxR50Slice/FixR50Slice";
import { MrezeNalogR50I } from "../../slices/FIxR50Slice/interface";
import styles from "./css/fixR50Izrada.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const FixR50Izrada = () => {
  const dispatch = useAppDispatch();
  const { dataDb } = useFetchDB(fixMrezeR50);
  const {
    fixR50: { tipoviMrezeR50, fixR50Nalog },
  } = useAppSelector(selectR50);

  const [mrezeR50, setMrezeR50] = useState<MrezeNalogR50I>({
    id: "",
    tip: "",
    sirina: "",
    visina: "",
    komada: "",
    kukice: "",
    mjera: "",
  });

  useEffect(() => {
    dispatch(tipoviMrezeR50A(dataDb));
  }, [dataDb, dispatch]);
  useEffect(() => {
    dispatch(rezanjeR50(dataDb));
    dispatch(fixR50M2(""));
  }, [dataDb, dispatch, fixR50Nalog]);

  const dodajProizvod = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(dodajMrezuR50Nalog(mrezeR50));
    setMrezeR50({
      ...mrezeR50,
      id: "",
      sirina: "",
      visina: "",
      komada: "",
    });
  };

  return (
    <div className={styles.odabirUređivanje2}>
      <form className={styles.flexForm} onSubmit={dodajProizvod}>
        <select
          required
          onChange={(e) => setMrezeR50({ ...mrezeR50, tip: e.target.value })}
        >
          <option value="">-- Odaberi Proizvod</option>
          {tipoviMrezeR50.length > 0 &&
            tipoviMrezeR50.map((tip: string, idx: number) => {
              return (
                <option value={tip} key={idx}>
                  {tip}
                </option>
              );
            })}
        </select>
        <div className={styles.flexInput}>
          <label htmlFor="r50Sirina">Širina</label>
          <input
            required
            type="number"
            id="r50Sirina"
            value={mrezeR50.sirina}
            onChange={(e) =>
              setMrezeR50({ ...mrezeR50, sirina: Number(e.target.value) })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        <div className={styles.flexInput}>
          <label htmlFor="r50Visina"> Visina</label>
          <input
            required
            id="r50Visina"
            type="number"
            value={mrezeR50.visina}
            onChange={(e) =>
              setMrezeR50({ ...mrezeR50, visina: Number(e.target.value) })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="r50Komada">Komada</label>
          <input
            type="number"
            id="r50Komada"
            value={mrezeR50.komada}
            onChange={(e) =>
              setMrezeR50({ ...mrezeR50, komada: Number(e.target.value) })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="r50Kukice">Kukice</label>
          <input
            type="number"
            id="r50Kukice"
            value={mrezeR50.kukice}
            onChange={(e) =>
              setMrezeR50({ ...mrezeR50, kukice: Number(e.target.value) })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <div>
          <h4>Mjera</h4>
          <div className={styles.mjeraStyle}>
            <label htmlFor="r50Unutarnja">Unutarnja</label>
            <input
              className={styles.inptStyle}
              type="radio"
              id="r50Unutarnja"
              value="Unutarnja"
              onChange={(e) =>
                setMrezeR50({ ...mrezeR50, mjera: e.target.value })
              }
            />
          </div>
          <div className={styles.mjeraStyle}>
            <label htmlFor="r50Konacna">Konačna</label>
            <input
              className={styles.inptStyle}
              type="radio"
              id="r50Konacna"
              value="Konačna"
              onChange={(e) =>
                setMrezeR50({ ...mrezeR50, mjera: e.target.value })
              }
            />
          </div>
        </div>

        <button className={globalStyles.btnPrimary} type="submit">
          Dodaj Proizvod
        </button>
      </form>
    </div>
  );
};

export default FixR50Izrada;
