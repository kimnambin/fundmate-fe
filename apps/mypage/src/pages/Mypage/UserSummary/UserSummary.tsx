import UserGreeting from "./UserGreeting";
import UserStats from "./UserStats";
import UserFollowStats from "./UserFollowStats";
import UserRecentProjects from "./UserRecentProjects";


const UserSummary = () => {
  return (
    <div className="w-full flex flex-col items-center max-w-[1830px] max-h-[1000px] px-[50px] gap-[60px]">

      {/* 상단: 인사말 + 통계 */}
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col mt-[20px] ml-[420px] pl-[100px] gap-[90px]">
          <UserGreeting />
          <UserStats />
        </div>

        {/* 우측: 팔로우 통계 */}
        <UserFollowStats />
      </div>

      {/* 하단: 최근 본 프로젝트 */}
      
      <UserRecentProjects />

    </div>
  );
};

export default UserSummary;
