import { useEffect, useState } from 'react';
import { Title } from '@repo/ui/styles';
import { VerticalCard } from '@repo/ui/components';


interface Project { // 임시 타입
  id: number;
  title: string;
  thumbnailUrl: string;
  category: string;
  currentAmount: number;
  targetAmount: number;
  endDate: string;
  description: string;
}

const LikedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 임시 더미 데이터
    const mockData: Project[] = [
      {
        id: 1,
        title: "환경 보호 프로젝트",
        thumbnailUrl: "https://picsum.photos/300/300",
        category: "환경",
        currentAmount: 500000,
        targetAmount: 1000000,
        endDate: "2025-08-01",
        description: "지구를 위한 작은 시작",
      },
      {
        id: 2,
        title: "유기동물 후원 프로젝트",
        thumbnailUrl: "https://picsum.photos/300/300",
        category: "동물",
        currentAmount: 200000,
        targetAmount: 500000,
        endDate: "2025-08-15",
        description: "유기동물 보호소 지원",
      },
      {
        id: 3,
        title: "청년 창업 펀딩",
        thumbnailUrl: "https://picsum.photos/300/300",
        category: "창업",
        currentAmount: 750000,
        targetAmount: 1000000,
        endDate: "2025-08-20",
        description: "청년 창업가의 꿈을 응원합니다",
      },
    ];

    setProjects(mockData);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Title>찜한 프로젝트</Title>

      {loading ? (
        <div>Loading...</div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {projects.map((_project) => {
            return (
              <VerticalCard />
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500">찜한 프로젝트가 없습니다.</div>
      )}
    </div>
  );
};

export default LikedProjects;
