import { MediumFont, Title } from '@repo/ui/styles';
import { DataChoiceTable } from './DataChoiceTable';
import { DataOptionChoiceTable } from './DataOptionChoice';
import { MainButton } from '@repo/ui/components'
import { useState } from 'react';
import { IoTriangle } from 'react-icons/io5';
import { statisticsStore } from '../stores/StatisticsStore';

export const StatisticsHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const setIsLoading = statisticsStore((state) => state.setIsLoading);
  const setIsSubmit = statisticsStore((state) => state.setIsSubmit);

  const handleNext = () => {
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
        <DataChoiceTable />
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
            isOpen && <DataOptionChoiceTable />
          }
        </div>
      </div>
      <div className='flex flex-row justify-end mt-12'>
        <MainButton
          label='통계 확인하기'
          width='w-[20%]'
          type='button'
          onClick={handleNext}
        />
      </div>
    </>
  );
};
