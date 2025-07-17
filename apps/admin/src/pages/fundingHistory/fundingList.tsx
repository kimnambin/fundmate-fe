import { VerticalCard } from '@repo/ui/components';
import { SubTitle, MediumFont } from '@repo/ui/styles';
import { Dropdown } from '@repo/ui/components'

const FundingList = () => {
  return (
    <section className="w-full flex flex-col gap-6 px-4 md:px-6">
      {/* 상단 타이틀 + 필터 */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 relative">
        {/* 타이틀 + 필터 */}
        <div className="flex flex-col gap-2">
          <SubTitle>펀딩 리스트</SubTitle>

          <div className="flex flex-wrap gap-2 relative">
            <Dropdown kind='status' usage='click' onClick={(e) => console.log(e)} />
            <Dropdown kind='complete' usage='click' onClick={(e) => console.log(e)} />
          </div>

          <MediumFont className="mt-1">
            <span className="text-blue-500 font-semibold">10,000</span>개의 프로젝트가 있습니다
          </MediumFont>
        </div>

        {/* 정렬 버튼 */}
        <div className="flex justify-start md:justify-end">
          <Dropdown kind='recommand' usage='click' onClick={(e) => console.log(e)} />
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <VerticalCard key={idx} />
        ))}
      </div>
    </section>
  );
};

export default FundingList;
