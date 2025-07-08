import { SimpleSouthKoreaMapChart } from 'react-simple-south-korea-map-chart';
import type { Data } from '../../pages/askFundi/askFundiResult';
import { Wrapper } from './map.styles';

interface Props {
  data: Data[];
}

const Map = ({ data }: Props) => {
  const setColorByCount = (count: number) => {
    if (count === 0) return '#F1F9FF';
    if (count > 5000) return '#0077CC';
    if (count > 3000) return '#1A90E0';
    if (count > 1000) return '#3FAFFF';
    if (count > 200) return '#5FBDFF';
    if (count > 100) return '#85CEFF';
    if (count > 50) return '#ACDEFF';
    if (count > 5) return '#D1EDFF';
    else return '#EAF7FF';
  };

  return (
    <Wrapper>
      <SimpleSouthKoreaMapChart
        setColorByCount={setColorByCount}
        data={data}
        unit="명"
        style={{ height: '225px' }}
      />
    </Wrapper>
  );
};

export default Map;
