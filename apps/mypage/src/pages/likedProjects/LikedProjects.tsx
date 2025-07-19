import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Title } from '@repo/ui/styles';
import { VerticalCard } from '@repo/ui/components';

interface LikedProjectFromAPI {
  project_id: number;
  title: string;
  current_amount: number;
  goal_amount: number;
  description: string;
}

interface Project {
  id: number;
  title: string;
  thumbnailUrl: string;
  currentAmount: number;
  targetAmount: number;
  description: string;
}

const LikedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedProjects = async () => {
      try {
        const res = await axios.get<LikedProjectFromAPI[]>('/api/users/likes', {
          withCredentials: true,
        });

        console.log("찜한 프로젝트 조회:", res.data);

        const formatted: Project[] = res.data.map((item) => ({
          id: item.project_id,
          title: item.title,
          thumbnailUrl: 'https://picsum.photos/300/300',
          currentAmount: item.current_amount,
          targetAmount: item.goal_amount,
          description: item.description || '설명이 없습니다.',
        }));

        setProjects(formatted);
      } catch (err) {
        console.error('찜한 프로젝트 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProjects();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Title>찜한 프로젝트</Title>

      {loading ? (
        <div>Loading...</div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {projects.map((project) => {
            const progress = Math.round(
              (project.currentAmount / project.targetAmount) * 100
            );

            return (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="cursor-pointer"
              >
                <VerticalCard
                  imageUrl={project.thumbnailUrl}
                  title={project.title}
                  description={project.description}
                  progress={progress}
                />
              </div>
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
