import UserStats from "./UserStats";
import UserFollowStats from "./UserFollowStats";
import UserRecentProjects from "./UserRecentProjects";
import { Title } from "@repo/ui/styles";


const UserSummary = () => {
  return (
    <div className="w-full flex flex-col items-center gap-16">

      {/* 상단: 인사말 + 통계 */}
      <div className="flex flex-col w-full gap-5">
        <Title>서포터 닉네임님 안녕하세요.</Title>
        <div className="flex flex-row gap-7">
          <UserStats />
          <UserFollowStats />
        </div>
      </div>
      <UserRecentProjects />
    </div>
  );
};

export default UserSummary;
