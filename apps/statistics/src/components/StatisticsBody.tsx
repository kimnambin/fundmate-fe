import { SubTitle, Title } from '@repo/ui/styles';
import { HorizonLine } from '../styles/Common.style';
import { useState, useEffect } from 'react';
import {
  convertAllCntDataToLineSeries,
  convertCntDataToCumulativeLineSeries,
  convertKeywordRawDataToNivoFormat,
} from '../utils/keywordDataChanger';
import {
  convertOptionRawDataToCumulativeLineChart,
  convertOptionRawDataToLineChart,
} from '../utils/optionDataConvert';
import { Pie } from '@nivo/pie';
import { StatisticsPie } from './Datas/PieData';

interface dataProps {
  rawData: StatisticsDataProps;
}

interface StatisticsDataProps {
  takenData: any;
  selected: string;
}

export const StatisticsBody = ({ rawData }: dataProps) => {
  const selected = rawData.selected;
  const [pieData, setPieData] = useState<any>([]);
  const [normalLineData, setNormalLineData] = useState<any>([]);
  const [totalLineData, setTotalLineData] = useState<any>([]);

  useEffect(() => {
    if (selected === 'keyword') {
      setPieData(convertKeywordRawDataToNivoFormat(rawData.takenData));
      setNormalLineData(convertAllCntDataToLineSeries(rawData.takenData));
      setTotalLineData(convertCntDataToCumulativeLineSeries(rawData.takenData));
    } else {
      setNormalLineData(convertOptionRawDataToLineChart(rawData.takenData));
      setTotalLineData(
        convertOptionRawDataToCumulativeLineChart(rawData.takenData),
      );
      setPieData([]); // 옵션별이면 파이차트는 비워둠
    }
  }, [rawData.takenData, selected]);

  console.log(rawData);

  return (
    <>
      {selected === 'keyword' ? (
        <div>
          <StatisticsPie data={pieData} />
          {/* 필요하면 라인 차트 컴포넌트도 여기 추가 */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

{
  /* <div className="flex flex-col gap-5"> */
}
{
  /*   <Title>통계 결과</Title> */
}
{
  /*   <HorizonLine /> */
}
{
  /*   <div className="flex flex-col gap-3"> */
}
{
  /*     <SubTitle>연도별 인구 비율</SubTitle> */
}
{
  /*     <div className="flex flex-row h-full min-h-[500px]"> */
}
{
  /*       <div className="flex flex-row basis-[600px] shrink order-0"> */
}
{
  /*         <StatisticsPie /> */
}
{
  /*       </div> */
}
{
  /*       <div className="m-5 p-5 shadow-lg rounded-[10px] flex flex-row grow shrink"> */
}
{
  /*         <PieDataTable /> */
}
{
  /*       </div> */
}
{
  /*     </div> */
}
{
  /*   </div> */
}
{
  /*   <div className="flex flex-col gap-3"> */
}
{
  /*     <SubTitle>연도별 인구 비율(누적)</SubTitle> */
}
{
  /*     <div className="flex flex-row"> */
}
{
  /*       <div className="p-5 flex flex-row basis-[600px] shrink-1 order-0"> */
}
{
  /*         <MapData /> */
}
{
  /*       </div> */
}
{
  /*       <div className="m-5 p-5 rounded-[10px] flex flex-col grow shrink shadow-lg"> */
}
{
  /*         <LineData data={lineData} /> */
}
{
  /*       </div> */
}
{
  /*     </div> */
}
{
  /*   </div> */
}
{
  /* </div> */
}
