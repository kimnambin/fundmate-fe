import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { SupportedProject } from '../../api/supportedProjects';
import { Title } from '@repo/ui/styles';
import { SupportedHorizontalCard } from '../../components/common/SupportHorizontalCard';

const SupportedProjects = () => {
  const [projects, setProjects] = useState<SupportedProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSupportedProjects = async () => {
      try {
        const res = await axios.get('/api/users/mypage/payments', {
          withCredentials: true,
        });

        const rawData = res.data?.data ?? [];

        if (!Array.isArray(rawData)) return;

        const formatted: SupportedProject[] = rawData.map((item: any) => ({
          id: item.scheduleId,
          projectId: item.projectId,
          supportDate: item.createdAt.slice(0, 10).replace(/-/g, '.'),
          supportNumber: String(item.scheduleId).padStart(8, '0'),
          title: item.productName,
          option: item.optionName,
          price: `${item.totalAmount.toLocaleString()}원`,
          paymentDate:
            new Date(item.scheduleDate).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }) + ' 결제 예정',
          thumbnailUrl: item.productImage,
        }));

        setProjects(formatted);
      } catch (err) {
        console.error('후원한 프로젝트 조회 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupportedProjects();
  }, []);

  return (
    <div className="flex flex-col gap-7 w-full">
      <Title>후원한 프로젝트</Title>

      {isLoading ? (
        <div className="text-gray-400">불러오는 중...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-400">후원한 프로젝트가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="cursor-pointer"
            >
              <SupportedHorizontalCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportedProjects;
