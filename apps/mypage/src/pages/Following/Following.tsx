import { useEffect, useState } from "react";
import { FollowingCard } from "./FollowingCard";
import {
  getFollowingUsers,
  getFollowerUsers,
  followUser,
  unfollowUser,
} from "../../api/follow";
import { MediumFont, Title } from "@repo/ui/styles";

interface FollowingUser {
  id: number;
  name: string;
  nickname: string; // 추가
  initial: string;
  isFollowing: boolean;
  imageUrl?: string;
}

const Following = () => {
  const [followings, setFollowings] = useState<FollowingUser[]>([]);
  const [followers, setFollowers] = useState<FollowingUser[]>([]);
  const [showFollowings, setShowFollowings] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        const [followingsRes, followersRes] = await Promise.all([
          getFollowingUsers(),
          getFollowerUsers(),
        ]);

        console.log("팔로잉 목록:", followingsRes);
        console.log("팔로워 목록:", followersRes);

        const formattedFollowings = followingsRes.map((user: any) => ({
          id: user.userId,
          name: user.nickname,
          nickname: user.nickname, // 서포터 페이지 라우팅용
          initial: user.nickname?.slice(0, 2).toUpperCase() ?? "??",
          isFollowing: true,
          imageUrl: user.imageUrl ?? undefined,
        }));

        const formattedFollowers = followersRes.map((user: any) => ({
          id: user.userId,
          name: user.nickname,
          nickname: user.nickname, // 서포터 페이지 라우팅용
          initial: user.nickname?.slice(0, 2).toUpperCase() ?? "??",
          isFollowing: false,
          imageUrl: user.imageUrl ?? undefined,
        }));

        setFollowings(formattedFollowings);
        setFollowers(formattedFollowers);
      } catch (err) {
        console.error("팔로잉/팔로워 목록 조회 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowData();
  }, []);

  const handleToggleFollow = async (userId: number, next: boolean) => {
    try {
      if (next) {
        await followUser(userId);
      } else {
        await unfollowUser(userId);
      }

      setFollowings((prev) => {
        const exists = prev.some((u) => u.id === userId);
        if (next && !exists) {
          const newUser = followers.find((u) => u.id === userId);
          if (newUser) return [...prev, { ...newUser, isFollowing: true }];
        } else if (!next && exists) {
          return prev.filter((u) => u.id !== userId);
        }
        return prev;
      });

      setFollowers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isFollowing: next } : u))
      );
    } catch (err) {
      console.error("팔로우 상태 변경 실패", err);
    }
  };

  const currentList = showFollowings ? followings : followers;

  return (
    <div className="flex flex-col gap-7 w-full">
      <Title>팔로우 목록</Title>
      <div className="flex flex-col gap-5">
        <div className="flex gap-8 border-b">
          <button
            onClick={() => setShowFollowings(true)}
            className={`flex items-center gap-1 py-2 ${
              showFollowings
                ? "font-semibold shadow-[inset_0_-2px_0_0_#000000]"
                : "text-[#343F59]"
            }`}
          >
            <MediumFont>팔로잉</MediumFont>
            <span className="text-[#5FBDFF]">{followings.length}</span>
          </button>
          <button
            onClick={() => setShowFollowings(false)}
            className={`flex items-center gap-1 py-2 ${
              !showFollowings
                ? "font-semibold shadow-[inset_0_-2px_0_0_#000000]"
                : "text-[#343F59]"
            }`}
          >
            <MediumFont>팔로워</MediumFont>
            <span className="text-[#5FBDFF]">{followers.length}</span>
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : currentList.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {currentList.map((user) => (
              <FollowingCard
                key={user.id}
                userId={user.id}
                name={user.name}
                nickname={user.nickname} // 전달
                initial={user.initial}
                isFollowing={user.isFollowing}
                imageUrl={user.imageUrl}
                onToggleFollow={handleToggleFollow}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            {showFollowings ? "팔로잉한 사용자가 없습니다." : "팔로워가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Following;
