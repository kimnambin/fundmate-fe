import { useEffect, useState } from "react";
import axios from "axios";
import UserStats from "./UserStats";
import UserFollowStats from "./UserFollowStats";
import UserRecentProjects from "./UserRecentProjects";
import { Title } from "@repo/ui/styles";

const UserSummary = () => {
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/users/mypage/profile", {
          withCredentials: true,
        });
        setNickname(response.data.nickname);
      } catch (error) {
        console.error("유저 프로필 조회 실패:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-16">
      {/* 상단: 인사말 + 통계 */}
      <div className="flex flex-col w-full gap-5">
        <Title>
          {nickname ? `${nickname}님 안녕하세요.` : "안녕하세요."}
        </Title>
        <div className="flex flex-row gap-7">
          <UserStats />
          <UserFollowStats />
        </div>
      </div>

      {/* 하단: 최근 본 프로젝트 (닉네임 전달) */}
      <UserRecentProjects nickname={nickname} />
    </div>
  );
};

export default UserSummary;
