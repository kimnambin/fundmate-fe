import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";
import { localeData } from "../../../public/tempData";

export const MapData = () => {
  const setColorByCount = (count: number) => {
    if (count === 0) return "#F1F1F1";
    if (count > 5000) return "#79D3C4";
    if (count > 3000) return "#43cdb6";
    if (count > 1000) return "#61CDBB";
    if (count > 200) return "#91D9CD";
    if (count > 100) return "#A9DFD6";
    if (count > 50) return "#C1E5DF";
    if (count > 5) return "#D9EBE8";
    else return "#ebfffd";
  };

  return (
    <SimpleSouthKoreaMapChart
      setColorByCount={setColorByCount}
      data={localeData}
    />
  )
}
