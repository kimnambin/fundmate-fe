import { VerticalCard } from "../VerticalCard";
import { useRecentViewedProjectsStore } from "../../../store/recentViewedProjects";

const UserRecentProjects = () => {
  const recentViewedProjects = useRecentViewedProjectsStore(
    (state) => state.recentViewedProjects
  );

  if (!recentViewedProjects || recentViewedProjects.length === 0) {
    return null;
  }

  return (
    <div className="mt-[-24px] flex flex-col items-center">
      <h2 className="mr-[390px] text-[20px] font-semibold mb-10">
        서포터 닉네임님이 최근 본 프로젝트
      </h2>
      <div className="ml-[510px] mt-[-25px] grid grid-cols-6 gap-y-[10px] gap-x-[20px] mb-[100px]">
        {recentViewedProjects.slice(0, 12).map((project) => (
          <VerticalCard
            key={project.id}
            thumbnailUrl={project.thumbnailUrl}
            title={project.title}
            description={project.description}
            progress={project.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default UserRecentProjects;
