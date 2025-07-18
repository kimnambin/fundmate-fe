import React from 'react';
import StatsHeader from './statsHeader';
import StatsContent from './statsContent';
import { Title } from '@repo/ui/styles';

const StatsPage: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Title className="mt-[10px]">통계 관리</Title>

      {/* 상단 주요 지표 영역 */}
      <StatsHeader />

      {/* 하단 통계/그래프 영역 */}
      <StatsContent />
    </div>
  );
};

export default StatsPage;
