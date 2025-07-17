import { useEffect, useState } from 'react';
import { VerticalCard } from '@repo/ui/components';
import { SubTitle, MediumFont } from '@repo/ui/styles';
import { Dropdown } from '@repo/ui/components';
import axios from 'axios';

interface FundingItem {
  project_title: string;
  image_url: string;
  short_description: string;
  current_amount: number;
  achievement: string;
  remaining_day: number;
}

const FundingList = () => {
  const [fundingList, setFundingList] = useState<FundingItem[]>([]);
  const [filteredList, setFilteredList] = useState<FundingItem[]>([]);

  const [statusFilter, setStatusFilter] = useState<number>(0);     // 0: 전체, 1: 진행 중, 2: 완료됨
  const [completeFilter, setCompleteFilter] = useState<number>(0); // 0: 75% 이상, 1: 75~100%, 2: 100% 이상
  const [sortType, setSortType] = useState<number>(0);             // 0: 추천순, 1: 인기순, 2: 최신순, 3: 마감임박순

  useEffect(() => {
    const fetchFundingList = async () => {
      try {
        const res = await axios.get('/api/users/projects', {
          withCredentials: true,
        });

        const funding = res.data.fundingList.map((item: FundingItem, idx: number) => ({
          ...item,
          achievement: ((idx + 1) * 30).toString(), // 30, 60, 90, 120
          remaining_day: idx % 2 === 0 ? 5 : 0,     // 5 or 0
        }));

        setFundingList(funding);
      } catch (err) {
        console.error('펀딩 리스트 조회 실패:', err);
      }
    };

    fetchFundingList();
  }, []);

  useEffect(() => {
    let filtered = [...fundingList];

    // 상태 필터링
    if (statusFilter === 1) {
      filtered = filtered.filter((item) => Number(item.remaining_day) > 0);
    } else if (statusFilter === 2) {
      filtered = filtered.filter((item) => Number(item.remaining_day) === 0);
    }

    // 달성률 필터링
    if (completeFilter === 0) {
      filtered = filtered.filter((item) => Number(item.achievement) >= 75);
    } else if (completeFilter === 1) {
      filtered = filtered.filter((item) => {
        const val = Number(item.achievement);
        return val >= 75 && val <= 100;
      });
    } else if (completeFilter === 2) {
      filtered = filtered.filter((item) => Number(item.achievement) >= 100);
    }

    // 정렬
    if (sortType === 1) {
      filtered.sort((a, b) => b.current_amount - a.current_amount);
    } else if (sortType === 2) {
      filtered.sort((a, b) => a.remaining_day - b.remaining_day);
    } else if (sortType === 3) {
      filtered.sort((a, b) => b.remaining_day - a.remaining_day);
    }

    console.log('필터링된 리스트:', filtered);

    setFilteredList(filtered);
  }, [fundingList, statusFilter, completeFilter, sortType]);

  return (
    <section className="w-full flex flex-col gap-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 relative">
        <div className="flex flex-col gap-2">
          <SubTitle>펀딩 리스트</SubTitle>

          <div className="flex flex-wrap gap-2 relative">
            <Dropdown kind="status" usage="click" onClick={setStatusFilter} />
            <Dropdown kind="complete" usage="click" onClick={setCompleteFilter} />
          </div>

          <MediumFont className="mt-1">
            <span className="text-blue-500 font-semibold">
              {filteredList.length.toLocaleString()}
            </span>
            개의 프로젝트가 있습니다
          </MediumFont>
        </div>

        <div className="flex justify-start md:justify-end">
          <Dropdown kind="recommand" usage="click" onClick={setSortType} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredList.length > 0 ? (
          filteredList.map((item, idx) => (
            <VerticalCard
              key={idx}
              title={item.project_title}
              image={item.image_url}
              description={item.short_description}
              currentAmount={item.current_amount}
              achievement={item.achievement}
              remainingDays={item.remaining_day}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            조건에 맞는 프로젝트가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
};

export default FundingList;
