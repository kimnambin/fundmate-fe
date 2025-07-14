import { MediumFont, SmallFont, Title } from '@repo/ui/styles';
import { DataChoiceTable } from './DataChoiceTable';
import { DataOptionChoiceTable } from './DataOptionChoice';
import { MainButton } from '@repo/ui/components'
import { useState } from 'react';
import { IoTriangle } from 'react-icons/io5';
import { statisticsStore } from '../stores/StatisticsStore';
import type { OptionSelectionProps } from '../types/Statistics.type';


export const StatisticsHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);

  const [dataSelection, setDataSelection] = useState<string[]>([]);
  const [optionSelection, setOptionSelection] = useState<OptionSelectionProps>({
    age: '',
    gender: '',
    region: ''
  })

  const dataErrorCondition = !!dataSelection.length
  const optionErrorCondition = !!optionSelection.age && !!optionSelection.gender && !!optionSelection.region

  const setIsLoading = statisticsStore((state) => state.setIsLoading);
  const setIsSubmit = statisticsStore((state) => state.setIsSubmit);

  const handleNext = () => {
    setSubmitPressed(true);
    if (!dataErrorCondition || !optionErrorCondition) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmit(true);
      setIsLoading(false);
    }, 2000)
  }

  return (
    <>
      <Title>타겟층 통계 및 지역 분석</Title>
      <div className='flex flex-col gap-5 my-3'>
        <DataChoiceTable selected={dataSelection} setSelected={setDataSelection} />
        {
          submitPressed
          && !dataErrorCondition
          && <SmallFont className='text-red'>사용할 데이터를 체크해주세요</SmallFont>
        }
        <div className='flex flex-col gap-2'>
          <button className='flex flex-row items-center gap-3 text-sub-text' type='button' onClick={() => setIsOpen(!isOpen)}>
            <MediumFont>
              <IoTriangle className={`${isOpen ? 'rotate-180' : 'rotate-90'} transition-all`} />
            </MediumFont>
            <MediumFont>
              옵션 선택하기
            </MediumFont>
          </button>
          {
            isOpen && <DataOptionChoiceTable selected={optionSelection} setSelected={setOptionSelection} />
          }
          {
            submitPressed && !optionErrorCondition
            && <SmallFont className='text-red'>옵션을 선택해주세요</SmallFont>
          }
        </div>
      </div>
      <div className='flex flex-row justify-end mt-12'>
        <MainButton
          label='통계 확인하기'
          width='w-[200px]'
          type='button'
          onClick={handleNext}
          isError={!dataErrorCondition && !optionErrorCondition}
        />
      </div>
    </>
  );
};
