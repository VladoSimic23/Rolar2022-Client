import globalStyles from "../../globalStyles/globalCss.module.css";

interface UkloniBtnI {
  text: String;
  ukloniProizvod: () => void;
}

const UkloniProizvodBtn = ({ text, ukloniProizvod }: UkloniBtnI) => {
  return (
    <div>
      <button className={globalStyles.btnRed} onClick={ukloniProizvod}>
        {text}
      </button>
    </div>
  );
};

export default UkloniProizvodBtn;
