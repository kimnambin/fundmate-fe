import { useEffect, useState } from 'react';
import { Title, SubTitle, MediumFont } from '@repo/ui/styles';
import axios from 'axios';
import clsx from 'clsx';

interface FundingItem {
  project_title: string;
  image_url: string;
  short_description: string;
  current_amount: number;
  achievement: string;
  remaining_day: number;
  sponsor?: number;
  start_date?: string;
  end_date?: string;
}

const CompletedFundingComponent = () => {
  const [completedFunding, setCompletedFunding] = useState<FundingItem | null>(null);
  const [fundingList, setFundingList] = useState<FundingItem[]>([]);
  const [selectedFunding, setSelectedFunding] = useState<FundingItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/users/projects', { withCredentials: true });

        const data = res.data;
        const parsedCompleted: FundingItem = {
          ...data.completedFunding,
        };

        setCompletedFunding(parsedCompleted);
        setSelectedFunding(parsedCompleted);
        setFundingList(data.fundingList || []);
      } catch (error) {
        console.error('펀딩 데이터 조회 실패:', error);
        setCompletedFunding(null);
        setSelectedFunding(null);
        setFundingList([]);
      }
    };

    fetchData();
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const formatDate = (date?: string) => {
    if (!date) return '-';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('ko-KR');
  };

  const displayedList = fundingList.slice(0, 4);
  const getProgressWidth = (achievement: string) => `${Math.min(Number(achievement), 100)}%`;

  return (
    <div className="w-full max-w-screen-xl bg-white rounded-md flex flex-col gap-4 px-12 md:px-4">
      <Title>최근 완료된 펀딩</Title>

      {selectedFunding ? (
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <div className="w-[420px] max-w-[420px] h-[240px] bg-gray-300 rounded-lg shrink-0 overflow-hidden">
            {selectedFunding.image_url ? (
              <img
                src={selectedFunding.image_url}
                alt={selectedFunding.project_title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : null}
          </div>

          {/* gap 조정된 정보 영역 */}
          <div className="flex flex-col flex-1 justify-between gap-2">
            {/* 제목, 날짜 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <SubTitle className="text-black">
                  {selectedFunding.project_title || '제목 없음'}
                </SubTitle>
                <span className="bg-[#5FBDFF] text-white text-xs md:text-sm font-bold px-2 py-[2px] rounded-md">
                  완료
                </span>
              </div>
              {(selectedFunding.start_date || selectedFunding.end_date) && (
                <MediumFont className="text-[#7E7C7C]">
                  {formatDate(selectedFunding.start_date)} ~ {formatDate(selectedFunding.end_date)}
                </MediumFont>
              )}
            </div>

            {/* 진행률 */}
            <div className="flex flex-col gap-1">
              <MediumFont className="text-black">진행률</MediumFont>
              <div className="relative w-full h-4 md:h-5 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-4 md:h-5 bg-[#5FBDFF] rounded-full flex items-center justify-center"
                  style={{ width: getProgressWidth(selectedFunding.achievement) }}
                >
                  <span
                    className={clsx(
                      'text-[10px] md:text-sm font-medium',
                      selectedFunding.achievement === '0' ? 'text-black' : 'text-white'
                    )}
                  >
                    {selectedFunding.achievement}%
                  </span>
                </div>
              </div>
            </div>

            {/* 모금액 / 참여인원 간격 좁힘 */}
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-2">
                <MediumFont className="text-black">모금액</MediumFont>
                <MediumFont className="text-[#7E7C7C]">
                  {selectedFunding.current_amount.toLocaleString()}원
                </MediumFont>
              </div>
              <div className="flex items-center gap-2">
                <MediumFont className="text-black">참여인원</MediumFont>
                <MediumFont className="text-[#7E7C7C]">
                  {selectedFunding.sponsor ?? '0'}명
                </MediumFont>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">표시할 펀딩이 없습니다.</div>
      )}

      {displayedList.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={toggleOpen}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-200 transition"
          >
            <svg
              className={clsx(
                'w-4 h-4 text-black transform transition-transform duration-300',
                isOpen ? 'rotate-180' : 'rotate-0'
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      <div
        className={clsx(
          'transition-all duration-500 overflow-hidden',
          isOpen ? 'max-h-[1000px] mt-4' : 'max-h-0'
        )}
      >
        {isOpen && displayedList.length > 0 && (
          <ul className="flex flex-col gap-3 mt-2">
            {displayedList.map((item, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedFunding(item)}
                className="border px-4 py-2 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100"
              >
                <div className="font-semibold text-black">{item.project_title}</div>
                <div className="text-xs text-gray-400">
                  성과율 {item.achievement}% | 현재 금액 {item.current_amount.toLocaleString()}원 | 남은일 {item.remaining_day}일
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompletedFundingComponent;
