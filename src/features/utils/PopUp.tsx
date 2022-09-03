import globalStyles from "../../globalStyles/globalCss.module.css";

export interface PopUpI {
  ukloni: () => void;
  odustani: () => void;
}

const PopUp = ({ ukloni, odustani }: PopUpI) => {
  return (
    <div className={globalStyles.popUpParent}>
      <div className={globalStyles.popUp}>
        <h3>Jeste li sigurni da želite uklonit proizvod?</h3>
        <div className={globalStyles.popUpBtns}>
          <button onClick={ukloni}>Da</button>
          <button onClick={odustani}>Ne</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
