import { useRecentViewedProjectsStore } from "../../../store/recentViewedProjects";
import { SubTitle } from "@repo/ui/styles";
import { VerticalCard } from "@repo/ui/components";

const UserRecentProjects = () => {
  const recentViewedProjects = useRecentViewedProjectsStore(
    (state) => state.recentViewedProjects
  );
  const nickname = useRecentViewedProjectsStore((state) => state.nickname);

  if (!recentViewedProjects || recentViewedProjects.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <SubTitle>
        {nickname}님이 최근 본 프로젝트
      </SubTitle>
      <div className="grid grid-cols-6 gap-3">
        {recentViewedProjects.slice(0, 12).map(() => (
          <VerticalCard />
        ))}
      </div>
    </div>
  );
};

export default UserRecentProjects;
