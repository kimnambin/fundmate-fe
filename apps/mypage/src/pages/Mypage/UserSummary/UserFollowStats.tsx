import { useEffect, useState } from "react";
import axios from "axios";
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
        const res = await axios.get("/users/mypage", {
          withCredentials: true,
        });
        setFollowing(res.data.followingCount);
        setFollower(res.data.followerCount);
      } catch (err) {
        console.error("팔로우 정보 조회 실패:", err);
      }
    };

    fetchFollowStats();
  }, []);

  return (
    <UserFollowStatsContainer>
      <div className="flex flex-col justify-center gap-5 w-full p-3">
        {/* 팔로잉 */}
        <FollowerTextContainer>
          <SubTitle className="text-gray-400">팔로잉</SubTitle>
          <SubTitle>{following}명</SubTitle>
        </FollowerTextContainer>
        <div className="w-full border border-gray-200" />
        {/* 팔로워 */}
        <FollowerTextContainer>
          <SubTitle className="text-gray-400">팔로워</SubTitle>
          <SubTitle>{follower}명</SubTitle>
        </FollowerTextContainer>
      </div>
    </UserFollowStatsContainer>
  );
};

export default UserFollowStats;
