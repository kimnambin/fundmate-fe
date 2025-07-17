import React, { useEffect, useState } from "react";
import { SubTitle, MediumFont } from "@repo/ui/styles";
import axios from "axios";

interface StatsData {
  fundingCount: number;
  successfulCount: number;
  totalAmount: number;
  supporterCount: number;
  paymentCount: number;
}

const StatsSummary: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    fundingCount: 0,
    successfulCount: 0,
    totalAmount: 0,
    supporterCount: 0,
    paymentCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/users/projects/statistics", {
          withCredentials: true,
        });

        const { fundingCount, statistic } = res.data;

        setStats({
          fundingCount: fundingCount || 0,
          successfulCount: statistic?.successfulCount || 0,
          totalAmount: statistic?.totalAmount || 0,
          supporterCount: statistic?.count || 0,
          paymentCount: statistic?.paymentCount || 0,
        });
      } catch (err) {
        console.error("📉 6월 통계 데이터 로딩 실패:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full flex-1">
      <div>
        <SubTitle className="mb-7">6월 통계</SubTitle>
        {[
          { label: "프로젝트 수", value: `${stats.fundingCount}개` },
          { label: "성공한 프로젝트", value: `${stats.successfulCount}개` },
          { label: "총 모금액", value: `${stats.totalAmount.toLocaleString()}원` },
          { label: "후원자 수", value: `${stats.supporterCount}명` },
        ].map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center text-[18px] mb-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-[2px] h-[18px] bg-gray-400" />
              <MediumFont className="text-gray-500">{item.label}</MediumFont>
            </div>
            <MediumFont>{item.value}</MediumFont>
          </div>
        ))}
      </div>

      <div>
        <SubTitle className="mb-3">펀딩 내역</SubTitle>
        <div className="flex justify-between items-center text-[18px]">
          <div className="flex items-center gap-2">
            <div className="w-[2px] h-[18px] bg-gray-400" />
            <MediumFont className="text-gray-500">결제 건수</MediumFont>
          </div>
          <MediumFont>{stats.paymentCount}개</MediumFont>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
