import { useEffect, useState } from "react";
import { apiClient } from '@repo/ui/api-client';
import { SubTitle } from "@repo/ui/styles";
import {
  FollowerTextContainer,
  UserFollowStatsContainer,
} from "../../../style/UserFollowStats.style";

const UserFollowStats = () => {
  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);

  useEffect(() => {
    const fetchFollowStats = async () => {
      try {

        const [followingRes, followerRes] = await Promise.all([
          apiClient.get("/api/users/mypage/following"),
          apiClient.get("/api/users/mypage/follower"),
        ]);


        const followingTotal = followingRes.data.total ?? 0;
        const followerTotal = followerRes.data.total ?? 0;

        setFollowing(followingTotal);
        setFollower(followerTotal);

      } catch (err) {
        console.error("팔로우 정보 조회 실패:", err);
      }
    };

    fetchFollowStats();
  }, []);

  return (
    <UserFollowStatsContainer>
      <div className="flex flex-col justify-center gap-5 w-full p-3">
        <FollowerTextContainer>
          <SubTitle className="text-gray-400">팔로잉</SubTitle>
          <SubTitle>{following}명</SubTitle>
        </FollowerTextContainer>
        <div className="w-full border border-gray-200" />
        <FollowerTextContainer>
          <SubTitle className="text-gray-400">팔로워</SubTitle>
          <SubTitle>{follower}명</SubTitle>
        </FollowerTextContainer>
      </div>
    </UserFollowStatsContainer>
  );
};

export default UserFollowStats;
