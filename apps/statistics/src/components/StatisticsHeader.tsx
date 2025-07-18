import { SmallFont, SubTitle, Title } from '@repo/ui/styles';
import { DataChoiceTable } from './DataChoiceTable';
import { DataOptionChoiceTable } from './DataOptionChoice';
import { MainButton } from '@repo/ui/components';
import { useEffect, useState } from 'react';

import type {
  DataSelectionProps,
  OptionSelectionProps,
} from '../types/Statistics.type';
import { commonApiInstance } from '@repo/ui/hooks';
import { useQuery } from '@tanstack/react-query';

interface StatisticsProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const getPublicData = async (data: any, selected: any) => {
  try {
    const response = await commonApiInstance.post(`/datas/${selected}`, data);
    console.log(data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const StatisticsHeader = ({ setData }: StatisticsProps) => {
  const [selected, setSelected] = useState<'keyword' | 'option'>('keyword');
  const [isDataSubmitted, setIsDataSubmitted] = useState<boolean>(false);
  const [inputData, setInputData] = useState<any>({});

  const { refetch } = useQuery({
    queryKey: ['statistics', selected],
    queryFn: () => getPublicData(inputData.filteredData, inputData.selected),
    enabled: false,
  });

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
    await refetch()
      .then((response) => {
        setIsDataSubmitted(true);
        setData({ takenData: response.data, selected: selected });
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    setIsDataSubmitted(false);
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
            onClick={() => setSelected('keyword')}
          >
            <SubTitle>키워드별 분석</SubTitle>
          </button>
          <button
            type="button"
            key="option"
            className={selected !== 'option' ? 'opacity-20' : ''}
            disabled={selected === 'option'}
            onClick={() => setSelected('option')}
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
          onClick={isDataSubmitted ? handleReset : handleDataRequest}
          isError={
            selected === 'keyword' ? !dataErrorCondition : !optionErrorCondition
          }
        />
      </div>
    </>
  );
};
