import { SubTitle } from "@repo/ui/styles";
import { FollowerTextContainer, UserFollowStatsContainer } from "../../../style/UserFollowStats.style";

const UserFollowStats = () => {
  return (
    <UserFollowStatsContainer>
      <div className="flex flex-col justify-center gap-5 w-full p-3">
        {/* 팔로잉 */}
        <FollowerTextContainer>
          <SubTitle className='text-gray-400'>팔로잉</SubTitle>
          <SubTitle>00명</SubTitle>
        </FollowerTextContainer>
        <div className="w-full border border-gray-200" />
        {/* 팔로워 */}
        <FollowerTextContainer>
          <SubTitle className='text-gray-400'>팔로워</SubTitle>
          <SubTitle>00명</SubTitle>
        </FollowerTextContainer>
      </div>
    </UserFollowStatsContainer>
  );
};

export default UserFollowStats;
