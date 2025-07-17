import { useEffect, useState } from "react";
import { useRecentViewedProjectsStore } from "../../../store/recentViewedProjects";
import { SubTitle } from "@repo/ui/styles";
import { VerticalCard } from "@repo/ui/components";
import axios from "axios";

interface Props {
  nickname: string;
}

interface Project {
  image_id: number;
  title: string;
  short_description: string;
  achievement: number;
  current_amount: number;
  remaining_day: number;
}

const UserRecentProjects = ({ nickname }: Props) => {
  const recentViewedProjects = useRecentViewedProjectsStore(
    (state) => state.recentViewedProjects
  );

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      if (!recentViewedProjects || recentViewedProjects.length === 0) return;

      const projectIdList = recentViewedProjects.map((p) => p.id);
      setIsLoading(true);

      try {
        const res = await axios.get("/api/users/mypage", {
          params: {
            project_id: projectIdList,
          },
          withCredentials: true,
        });

        console.log("최근 본 프로젝트:", res.data.fundingGetList);
        setProjectList(res.data.fundingGetList || []);
      } catch (err) {
        console.error("최근 본 프로젝트 조회 실패", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentProjects();
  }, [recentViewedProjects]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <SubTitle>
        {nickname ? `${nickname}님이 최근 본 프로젝트` : "최근 본 프로젝트"}
      </SubTitle>

      {isLoading ? (
        <div className="text-gray-400">불러오는 중...</div>
      ) : projectList.length === 0 ? (
        <div className="text-gray-400">최근 본 프로젝트가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-6 gap-3">
          {projectList.slice(0, 12).map((project, index) => (
            <VerticalCard
              key={index}
              imageId={project.image_id}
              title={project.title}
              description={project.short_description}
              achievement={project.achievement}
              amount={project.current_amount}
              remainingDay={project.remaining_day}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecentProjects;
