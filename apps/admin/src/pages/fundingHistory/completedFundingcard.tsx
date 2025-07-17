import { useEffect, useState } from 'react';
import { Title, SubTitle, MediumFont } from '@repo/ui/styles';
import axios from 'axios';
import clsx from 'clsx';

interface FundingItem {
  project_title: string;
  image_url: string;
  start_date: string;
  end_date: string;
  current_amount: number;
  achievement: number;
  sponsor: number;
}

const CompletedFunding = () => {
  const [fundingList, setFundingList] = useState<FundingItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCompletedFunding = async () => {
      try {
        const res = await axios.get('/api/profiles/recent-completed', {
          withCredentials: true,
        });

        console.log('최근 완료된 펀딩 데이터:', res.data);

        if (!res.data || !res.data.project_title) {
          setFundingList([]);
          return;
        }

        const parsed: FundingItem = {
          project_title: res.data.project_title,
          image_url: res.data.image_url,
          start_date: res.data.start_date,
          end_date: res.data.end_date,
          current_amount: Number(res.data.current_amount),
          achievement: Number(res.data.achievement),
          sponsor: Number(res.data.sponsor),
        };

        setFundingList([parsed]);
      } catch (err) {
        setFundingList([]);
      }
    };

    fetchCompletedFunding();
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const mainFunding = fundingList[0];
  const restFunding = fundingList.slice(1);

  const formatDate = (date: string) => {
    if (!date) return '-';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('ko-KR');
  };

  return (
    <div className="w-full max-w-screen-xl bg-white rounded-md flex flex-col gap-4 px-12 md:px-4">
      <Title>최근 완료된 펀딩</Title>

      {mainFunding ? (
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <div className="w-[420px] max-w-[420px] h-[240px] bg-gray-300 rounded-lg shrink-0 overflow-hidden">
            {mainFunding.image_url ? (
              <img
                src={mainFunding.image_url}
                alt={mainFunding.project_title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : null}
          </div>

          <div className="flex flex-col flex-1 justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <SubTitle className="text-black">
                  {mainFunding.project_title || '제목 없음'}
                </SubTitle>
                <span className="bg-[#5FBDFF] text-white text-xs md:text-sm font-bold px-2 py-[2px] rounded-md">
                  완료
                </span>
              </div>
              <MediumFont className="text-[#7E7C7C]">
                {formatDate(mainFunding.start_date)} ~ {formatDate(mainFunding.end_date)}
              </MediumFont>
            </div>

            <div className="flex flex-col gap-2">
              <MediumFont className="text-black">진행률</MediumFont>
              <div className="relative w-full h-4 md:h-5 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-4 md:h-5 bg-[#5FBDFF] rounded-full flex items-center justify-center"
                  style={{ width: `${mainFunding.achievement}%` }}
                >
                  <span
                    className={clsx(
                      'text-[10px] md:text-sm font-medium',
                      mainFunding.achievement === 0 ? 'text-black' : 'text-white'
                    )}
                  >
                    {mainFunding.achievement}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MediumFont className="text-black">모금액</MediumFont>
              <MediumFont className="text-[#7E7C7C]">
                {mainFunding.current_amount.toLocaleString()}원
              </MediumFont>
            </div>

            <div className="flex items-center gap-2">
              <MediumFont className="text-black">참여인원</MediumFont>
              <MediumFont className="text-black">{mainFunding.sponsor}명</MediumFont>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-4 py-12">
          <p className="text-gray-500 text-sm md:text-base text-center">
            아직 완료된 펀딩이 없습니다.
          </p>
        </div>
      )}

      {restFunding.length > 0 && (
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
        {restFunding.length > 0 && (
          <ul className="flex flex-col gap-3 mt-2">
            {restFunding.map((item, idx) => (
              <li key={idx} className="border px-4 py-2 rounded-md bg-gray-50">
                <div className="font-semibold text-black">{item.project_title}</div>
                <div className="text-xs text-gray-400">
                  성과율 {item.achievement}% | 현재 금액 {item.current_amount.toLocaleString()}원 | 참여인원 {item.sponsor}명
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompletedFunding;
