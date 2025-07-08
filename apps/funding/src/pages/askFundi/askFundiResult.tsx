import { MainButton } from '@repo/ui/components';
import { SmallFont, Title, Layout } from '@repo/ui/styles';
import MarkdownEditor from '@uiw/react-markdown-editor';
import html2pdf from 'html2pdf.js';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftArrow from '../../assets/icons/ic_left-arrow.svg';
import PieChart from '../../components/chart/pie';
import Map from '../../components/map/map';
import { Bottom, ResultWrapper } from './askFundi.styles';

const AskFundiResult = () => {
  const location = useLocation();
  const response = location.state;
  const navigate = useNavigate();

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
      <div className="flex flex-col gap-[20px] mb-[20px]">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={LeftArrow} alt="left arrow" />
          <SmallFont className="text-main font-bold text-[12px]">
            메인페이지로 돌아가기
          </SmallFont>
        </div>
        <Title>펀디에게 물어봐 - 분석결과</Title>
      </div>

      <ResultWrapper ref={ref} isCapture={isCapture}>
        <div className="flex gap-[80px]">
          <Map data={data} />
          <PieChart data={chartData} />
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

// 차트 임시 데이터
export interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const chartData = [
  {
    id: '여성',
    label: '여성',
    value: 210,
    color: '#5FBDFF',
  },
  {
    id: '남성',
    label: '남성',
    value: 182,
    color: '#85CEFF',
  },
];
