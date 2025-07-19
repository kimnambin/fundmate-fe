import { Title } from '@repo/ui/styles';
import { HorizonLine } from '../styles/Common.style';
import { useState, useEffect } from 'react';
import { StatisticsPie } from './Datas/PieData';
import { convert2024DataToChartFormat } from '../utils/pieChartConverter';
import { PieDataTable, type PieItem } from './Datas/PieDataTable';
import { dataTypeStore, statisticsStore } from '../stores/StatisticsStore';
import { LineData } from './Datas/LineData';
import {
  calculateGrowthNivoLineData,
  convertOptionRawDataToRegionLineChart,
} from '../utils/keywordLineChart';
import { convertOptionRawDataToNivoPie } from '../utils/optionPieChartConverter';
import { convertOptionRawDataToLineChart } from '../utils/optionLineDataConverter';

interface dataProps {
  rawData: StatisticsDataProps;
}

interface StatisticsDataProps {
  takenData: any;
  selected: string;
}

interface keywordDataProps {
  people: any;
  household: any;
  house: any;
}

type NivoLineDatum = {
  x: string | number;
  y: number;
};

type NivoLineSeries = {
  id: any;
  data: NivoLineDatum[];
};

export const StatisticsBody = ({ rawData }: dataProps) => {
  const dataKind = {
    people: '인구 수',
    household: '가구 인구',
    house: '가구 수',
  };
  const dataType = dataTypeStore((state) => state.dataType);
  const isKeywordDataSubmitted = statisticsStore(
    (state) => state.isKeywordDataSubmitted,
  );
  const isOptionDataSubmitted = statisticsStore(
    (state) => state.isOptionDataSubmitted,
  );
  const keyword: (keyof keywordDataProps)[] = ['people', 'household', 'house'];
  const selected = rawData.selected;
  const filteredData = rawData.takenData;
  const [pieData, setPieData] = useState<keywordDataProps>({
    people: [],
    household: [],
    house: [],
  });
  const [normalLineData, setNormalLineData] = useState<keywordDataProps>({
    people: [],
    household: [],
    house: [],
  });

  const [transitionLineData, setTransitionLineData] =
    useState<keywordDataProps>({
      people: [],
      household: [],
      house: [],
    });

  const [optionPieData, setOptionPieData] = useState<PieItem[]>([]);
  const [optionLineData, setOptionLineData] = useState<NivoLineSeries[]>([]);

  useEffect(() => {
    if (selected === 'keyword') {
      const updatedPieData: Partial<keywordDataProps> = {};
      const updatedLineData: Partial<keywordDataProps> = {};
      const updatedTransitionLineData: Partial<keywordDataProps> = {};

      keyword.forEach((k) => {
        const tempPie = convert2024DataToChartFormat(filteredData, k);
        updatedPieData[k] = tempPie;
        console.log(tempPie);

        const tempLine = convertOptionRawDataToRegionLineChart(filteredData, k);
        updatedLineData[k] = tempLine;

        const tempTransitionLine = calculateGrowthNivoLineData(filteredData, k);
        updatedTransitionLineData[k] = tempTransitionLine;
      });

      setPieData((prev) => ({
        ...prev,
        ...updatedPieData,
      }));

      setNormalLineData((prev) => ({
        ...prev,
        ...updatedLineData,
      }));

      setTransitionLineData((prev) => ({
        ...prev,
        ...updatedTransitionLineData,
      }));
    } else {
      const tempPie = convertOptionRawDataToNivoPie(filteredData, 2023);
      setOptionPieData(tempPie);
      const tempLine = convertOptionRawDataToLineChart(filteredData);
      setOptionLineData(tempLine);
      console.log(tempPie);
    }
  }, [rawData]);

  return (
    <>
      {dataType === 'keyword' ? (
        <>
          {isKeywordDataSubmitted ? (
            <>
              <div className="flex flex-col gap-10">
                {keyword.map((k: keyof keywordDataProps) =>
                  pieData[k].length ? (
                    <>
                      <div className="flex flex-col gap-5">
                        <Title>2023년 기준 {dataKind[k]} 상황</Title>
                        <HorizonLine />
                        <div
                          key={k}
                          className="flex flex-row h-[450px] w-full gap-10"
                        >
                          <div className="flex shrink basis-[30%] w-full">
                            <StatisticsPie data={pieData[k]} />
                          </div>
                          <div className="flex shrink-1 grow overflow-scroll overflow-x-hidden">
                            <PieDataTable data={pieData[k]} />
                          </div>
                        </div>
                      </div>
                      <>
                        {normalLineData[k].length ? (
                          <div className="h-[600px] w-full flex flex-col gap-5">
                            <Title>연도별 {dataKind[k]} 추이</Title>
                            <HorizonLine />
                            <div className="h-[600px]">
                              <LineData data={normalLineData[k]} />
                            </div>
                          </div>
                        ) : null}
                      </>
                      <>
                        {transitionLineData[k].length ? (
                          <div className="w-full flex flex-col gap-5">
                            <Title>연도별 {dataKind[k]} 증감 추이</Title>
                            <HorizonLine />
                            <div className="h-[600px] ">
                              <LineData data={transitionLineData[k]} />
                            </div>
                          </div>
                        ) : null}
                      </>
                    </>
                  ) : null,
                )}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          {isOptionDataSubmitted ? (
            <>
              {optionPieData.length !== 1 && (
                <>
                  <div className="flex flex-col gap-5">
                    <Title>2023년 기준 인구 상황</Title>
                    <HorizonLine />
                    <div className="flex flex-row h-[450px] w-full gap-10">
                      <div className="flex shrink basis-[30%] w-full">
                        <StatisticsPie data={optionPieData} />
                      </div>
                      <div className="flex shrink-1 grow overflow-scroll overflow-x-hidden">
                        <PieDataTable data={optionPieData} />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="h-[600px] w-full flex flex-col gap-5">
                <Title>연도별 인구 변화 추이</Title>
                <HorizonLine />
                <div className="h-[600px]">
                  <LineData data={optionLineData} />
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
};
