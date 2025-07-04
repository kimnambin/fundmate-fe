import { DataChoiceTable } from './DataChoiceTable';
import { DataOptionChoiceTable } from './DataOptionChoice';
import { CommonButton } from '@repo/ui/CommonButton'

export const StatisticsHeader = () => {
  return (
    <>
      <span className='text-2xl font-semibold'>타겟층 통계 및 지역 분석</span>
      <div className='my-3'>
        <DataChoiceTable />
        <DataOptionChoiceTable />
      </div>
      <div className='flex flex-row justify-end mt-12'>
        <CommonButton $bigSize={true}>
          <span>통계 확인하기</span>
        </CommonButton>
      </div>
    </>
  );
};
