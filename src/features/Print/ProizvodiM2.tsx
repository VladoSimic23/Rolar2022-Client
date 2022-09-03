import { useAppSelector } from "../../app/hooks";
import { selectRolete } from "../slices/RoleteSlice/roleteSlice";

const ProizvodiM2 = () => {
  const {
    rolete: { roleteNalog, roleteM2 },
    fixR50: { fixR50Nalog, r50M2 },
    fixStandard: { fixStandardNalog, mrezeStandardM2 },
  } = useAppSelector(selectRolete);
  return (
    <div>
      {roleteNalog.length > 0 && (
        <h5>
          Rolete: {String(roleteM2)}{" "}
          <span style={{ fontSize: "14px" }}>m2</span>
        </h5>
      )}
      {fixStandardNalog.length > 0 && (
        <h5>
          Fix Standard: {String(mrezeStandardM2)}{" "}
          <span style={{ fontSize: "14px" }}>m2</span>
        </h5>
      )}
      {fixR50Nalog.length > 0 && (
        <h5>
          R50: {String(r50M2)} <span style={{ fontSize: "14px" }}>m2</span>
        </h5>
      )}
    </div>
  );
};

export default ProizvodiM2;
