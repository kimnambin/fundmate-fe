import MarkdownEditor from '@uiw/react-markdown-editor';
import html2pdf from 'html2pdf.js';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainButton from '../../components/main-button/mainButton';
import Map from '../../components/map/map';
import { Layout } from '../../style/layout';
import { Bottom, ResultWrapper } from './askFundi.styles';

const AskFundiResult = () => {
  const location = useLocation();
  const response = location.state;

  const [isCapture, setIsCapture] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const handleSavePDF = async () => {
    if (!ref.current) return;

    setIsCapture(true);

    const opt = {
      margin: 1,
      filename: 'FundiResult.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: {
        mode: ['avoid-all'],
      },
    };

    await html2pdf().set(opt).from(ref.current).save();
    setIsCapture(false);
  };

  return (
    <Layout>
      <ResultWrapper ref={ref} isCapture={isCapture}>
        <div className="flex gap-[80px]">
          <Map data={data} />
        </div>
        <div data-color-mode="light" className="wnde-markdown-var">
          <MarkdownEditor.Markdown source={response?.message} />
        </div>
      </ResultWrapper>
      <Bottom>
        <MainButton
          label="저장하기"
          width="w-[200px]"
          onClick={handleSavePDF}
        />
      </Bottom>
    </Layout>
  );
};

export default AskFundiResult;

// 지도용 임시 데이터
export interface Data {
  locale: string;
  count: number;
}

const data = [
  { locale: '부산광역시', count: 1500 },
  { locale: '대구광역시', count: 3000 },
  { locale: '대전광역시', count: 400 },
  { locale: '강원도', count: 2500 },
  { locale: '광주광역시', count: 1000 },
  { locale: '경기도', count: 4000 },
  { locale: '인천광역시', count: 2200 },
  { locale: '제주특별자치도', count: 100 },
  { locale: '충청북도', count: 49 },
  { locale: '경상북도', count: 2000 },
  { locale: '전라북도', count: 3300 },
  { locale: '세종특별자치시', count: 110 },
  { locale: '충청남도', count: 10 },
  { locale: '경상남도', count: 0 },
  { locale: '전라남도', count: 250 },
  { locale: '울산광역시', count: 100 },
  { locale: '서울특별시', count: 10000 },
];
