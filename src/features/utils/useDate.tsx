import { useEffect, useState } from "react";

const useDate = () => {
  const [fullDate, setFullDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const fullDate = `${dd}. ${mm}. ${yyyy} `;
    setFullDate(fullDate);
  }, []);

  return fullDate;
};

export default useDate;
