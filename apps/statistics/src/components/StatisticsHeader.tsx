import { SmallFont, SubTitle, Title } from '@repo/ui/styles';
import { DataChoiceTable } from './DataChoiceTable';
import { DataOptionChoiceTable } from './DataOptionChoice';
import { MainButton } from '@repo/ui/components';
import { useState } from 'react';
import { statisticsStore } from '../stores/StatisticsStore';
import type { OptionSelectionProps } from '../types/Statistics.type';

export const StatisticsHeader = () => {
  const [dataSubmitPressed, setDataSubmitPressed] = useState<boolean>(false);
  const [optionSubmitPressed, setOptionSubmitPressed] =
    useState<boolean>(false);
  const [selected, setSeleted] = useState<'keyword' | 'option'>('keyword');

  const [dataSelection, setDataSelection] = useState<string[]>([]);
  const [optionSelection, setOptionSelection] = useState<OptionSelectionProps>({
    age: '',
    gender: '',
    region: '',
  });

  const dataErrorCondition = !!dataSelection.length;
  const optionErrorCondition =
    !!optionSelection.age &&
    !!optionSelection.gender &&
    !!optionSelection.region;

  const setIsLoading = statisticsStore((state) => state.setIsLoading);
  const setIsSubmit = statisticsStore((state) => state.setIsSubmit);

  const handleNext = () => {
    try {
      if (selected === 'keyword') {
        setDataSubmitPressed(true);
      } else {
        setOptionSubmitPressed(true);
      }
    } catch (error) {
    } finally {
      setIsLoading(true);
      setTimeout(() => {
        setIsSubmit(true);
        setIsLoading(false);
      }, 2000);
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
            {dataSubmitPressed && !dataErrorCondition && (
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
            {optionSubmitPressed && !optionErrorCondition && (
              <SmallFont className="text-red">옵션을 선택해주세요</SmallFont>
            )}
          </>
        )}
      </div>
      <div className="flex flex-row justify-end mt-12">
        <MainButton
          label="통계 확인하기"
          width="w-[200px]"
          type="button"
          onClick={handleNext}
          isError={selected === 'keyword' ? !dataSelection : !optionSelection}
        />
      </div>
    </>
  );
};
