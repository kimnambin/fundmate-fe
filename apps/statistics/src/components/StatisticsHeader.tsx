import { SmallFont, SubTitle, Title } from '@repo/ui/styles';
import { DataChoiceTable } from './DataChoiceTable';
import { DataOptionChoiceTable } from './DataOptionChoice';
import { MainButton } from '@repo/ui/components';
import { useState } from 'react';
import { statisticsStore } from '../stores/StatisticsStore';
import type {
  DataSelectionProps,
  OptionSelectionProps,
} from '../types/Statistics.type';

interface StatisticsProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export const StatisticsHeader = ({ setData }: StatisticsProps) => {
  const [selected, setSeleted] = useState<'keyword' | 'option'>('keyword');
  const setDataSubmitState = statisticsStore(
    (state) => state.setDataSubmitState,
  );
  const isDataSubmitted = statisticsStore((state) => state.isDataSubmitted);
  const [dataSelection, setDataSelection] = useState<DataSelectionProps>({
    people: 0,
    household: 0,
    house: 0,
  });
  const [optionSelection, setOptionSelection] = useState<OptionSelectionProps>({
    ageGroup: '',
    gender: '',
    area: '',
  });

  const dataErrorCondition =
    !!dataSelection.people ||
    !!dataSelection.household ||
    !!dataSelection.house;
  const optionErrorCondition =
    !!optionSelection.ageGroup &&
    !!optionSelection.gender &&
    !!optionSelection.area;

  const handleNext = () => {
    if (isDataSubmitted) {
      setDataSubmitState(false);
    } else {
      try {
        if (selected === 'keyword') {
          if (!dataErrorCondition) return;
          setData({ filteredData: dataSelection, selected: selected });
        } else {
          if (!optionErrorCondition) return;
          setData({ filteredData: optionSelection, selected: selected });
        }
        setDataSubmitState(true);
      } catch (error) {
        console.log(error);
        alert('다시 시도해주세요');
        return;
      }
    }
  };

  return (
    <>
      <div className="flex flex-row gap-10 items-center">
        <Title>타겟층 통계 및 지역 분석</Title>
        <div className="flex flex-row gap-7">
          <button
            type="button"
            key="keyword"
            className={selected !== 'keyword' ? 'opacity-20' : ''}
            disabled={selected === 'keyword'}
            onClick={() => setSeleted('keyword')}
          >
            <SubTitle>키워드별 분석</SubTitle>
          </button>
          <button
            type="button"
            key="option"
            className={selected !== 'option' ? 'opacity-20' : ''}
            disabled={selected === 'option'}
            onClick={() => setSeleted('option')}
          >
            <SubTitle>옵션별 분석</SubTitle>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 my-3">
        {selected === 'keyword' ? (
          <>
            <DataChoiceTable
              selected={dataSelection}
              setSelected={setDataSelection}
            />
            {!dataErrorCondition && (
              <SmallFont className="text-red">
                사용할 데이터를 체크해주세요
              </SmallFont>
            )}
          </>
        ) : (
          <>
            <DataOptionChoiceTable
              selected={optionSelection}
              setSelected={setOptionSelection}
            />
            {!optionErrorCondition && (
              <SmallFont className="text-red">옵션을 선택해주세요</SmallFont>
            )}
          </>
        )}
      </div>
      <div className="flex flex-row justify-end mt-12">
        <MainButton
          label={isDataSubmitted ? '닫기' : '통계 확인하기'}
          width="w-[200px]"
          type="button"
          onClick={handleNext}
          isError={
            selected === 'keyword' ? !dataErrorCondition : !optionErrorCondition
          }
        />
      </div>
    </>
  );
};
