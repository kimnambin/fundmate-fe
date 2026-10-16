import { SmallFont, SubTitle, Title } from '@repo/ui/styles';
import { DataChoiceTable } from './DataChoiceTable';
import { DataOptionChoiceTable } from './DataOptionChoice';
import { MainButton } from '@repo/ui/components';
import { useEffect, useState } from 'react';

import type {
  DataSelectionProps,
  OptionSelectionProps,
  StatisticsResponse,
} from '../types/Statistics.type';
import { apiClient } from '@repo/ui/api-client';
import { useQuery } from '@tanstack/react-query';
import { dataTypeStore, statisticsStore } from '../stores/StatisticsStore';

interface StatisticsProps {
  setData: React.Dispatch<React.SetStateAction<StatisticsResponse | undefined>>;
}

type StatisticsRequest =
  | { selected: 'keyword'; filteredData: DataSelectionProps }
  | { selected: 'option'; filteredData: OptionSelectionProps };

const getPublicData = async (
  data: DataSelectionProps | OptionSelectionProps,
  selected: 'keyword' | 'option',
) => {
  try {
    const response = await apiClient.post(`/api/datas/${selected}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const StatisticsHeader = ({ setData }: StatisticsProps) => {
  const setDataType = dataTypeStore((state) => state.setDataType);
  const [selected, setSelected] = useState<'keyword' | 'option'>('keyword');

  const isKeywordDataSubmitted = statisticsStore(
    (state) => state.isKeywordDataSubmitted,
  );
  const isOptionDataSubmitted = statisticsStore(
    (state) => state.isOptionDataSubmitted,
  );
  const setKeywordDataSubmitted = statisticsStore(
    (state) => state.setKeywordDataSubmitState,
  );
  const setOptionDataSubmitted = statisticsStore(
    (state) => state.setOptionDataSubmitState,
  );

  const [dataSelection, setDataSelection] = useState<DataSelectionProps>({
    people: 0,
    household: 0,
    house: 0,
  });
  const [optionSelection, setOptionSelection] = useState<OptionSelectionProps>({
    age_group: '',
    gender: '',
    area: '',
  });

  const [inputData, setInputData] = useState<StatisticsRequest>({
    selected: 'keyword',
    filteredData: dataSelection,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { refetch, isFetching } = useQuery({
    queryKey: ['statistics', selected],
    queryFn: () => getPublicData(inputData.filteredData, inputData.selected),
    enabled: false,
  });

  useEffect(() => {
    if (selected === 'keyword') {
      setInputData({ filteredData: dataSelection, selected: selected });
    } else {
      setInputData({ filteredData: optionSelection, selected: selected });
    }
  }, [dataSelection, optionSelection]);

  const dataErrorCondition =
    !!dataSelection.people ||
    !!dataSelection.household ||
    !!dataSelection.house;
  const optionErrorCondition =
    !!optionSelection.age_group &&
    !!optionSelection.gender &&
    !!optionSelection.area;

  const handleDataRequest = async () => {
    setErrorMessage('');
    // react-query의 refetch는 실패해도 reject하지 않고 결과에 에러를 담아 돌려준다.
    const response = await refetch();
    if (response.isError || !response.data) {
      setErrorMessage(
        '통계 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      );
      return;
    }
    setData({ takenData: response.data, selected: selected });
    if (selected === 'keyword') {
      setKeywordDataSubmitted(true);
    } else {
      setOptionDataSubmitted(true);
    }
  };

  const handleReset = () => {
    setErrorMessage('');
    if (selected === 'keyword') {
      setKeywordDataSubmitted(false);
      setDataSelection({
        people: 0,
        household: 0,
        house: 0,
      });
    } else {
      setOptionDataSubmitted(false);
      setOptionSelection({
        age_group: '',
        gender: '',
        area: '',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 sm:items-center">
        <Title>타겟층 통계 및 지역 분석</Title>
        <div className="flex flex-row gap-7">
          <button
            type="button"
            key="keyword"
            className={selected !== 'keyword' ? 'opacity-20' : ''}
            disabled={selected === 'keyword'}
            onClick={() => {
              setSelected('keyword');
              setErrorMessage('');
              setDataType('keyword');
            }}
          >
            <SubTitle>키워드별 분석</SubTitle>
          </button>
          <button
            type="button"
            key="option"
            className={selected !== 'option' ? 'opacity-20' : ''}
            disabled={selected === 'option'}
            onClick={() => {
              setSelected('option');
              setErrorMessage('');
              setDataType('option');
            }}
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
      {errorMessage && (
        <SmallFont className="text-red" role="alert">
          {errorMessage}
        </SmallFont>
      )}
      <div className="flex flex-row justify-end mt-12">
        {selected === 'keyword' ? (
          <MainButton
            label={
              isFetching
                ? '불러오는 중...'
                : isKeywordDataSubmitted
                  ? '닫기'
                  : '통계 확인하기'
            }
            width="w-[200px]"
            type="button"
            disabled={isFetching}
            onClick={isKeywordDataSubmitted ? handleReset : handleDataRequest}
            isError={!dataErrorCondition}
          />
        ) : (
          <MainButton
            label={
              isFetching
                ? '불러오는 중...'
                : isOptionDataSubmitted
                  ? '닫기'
                  : '통계 확인하기'
            }
            width="w-[200px]"
            type="button"
            disabled={isFetching}
            onClick={isOptionDataSubmitted ? handleReset : handleDataRequest}
            isError={!optionErrorCondition}
          />
        )}
      </div>
    </>
  );
};
