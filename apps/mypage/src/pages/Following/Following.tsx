import { useEffect, useState } from "react";
import { FollowingCard } from "./FollowingCard";
import { getFollowingUsers, getFollowerUsers } from "../../api/follow"; 
import { MediumFont, SubTitle, Title } from "@repo/ui/styles";

interface FollowingUser {
  id: number;
  name: string;
  initial: string;
  isFollowing: boolean;
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
        
        const formattedFollowings = followingsRes.map((user: any) => ({
          id: user.userId,
          name: user.nickname,
          initial: user.nickname?.slice(0, 2).toUpperCase() ?? "??",
          isFollowing: true,
        }));

        const formattedFollowers = followersRes.map((user: any) => ({
          id: user.userId,
          name: user.nickname,
          initial: user.nickname?.slice(0, 2).toUpperCase() ?? "??",
          isFollowing: true,
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

  const currentList = showFollowings ? followings : followers;

  return (
    <div className="flex flex-col gap-7 w-full">
      <Title>팔로잉</Title>
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
            className={`flex flex-row items-center gap-2 ${
              !showFollowings
                ? "font-semibold shadow-[inset_0_-2px_0_0_#000000]"
                : "text-[#343F59]"
            }`}
          >
            <MediumFont>팔로워</MediumFont>
            <SubTitle className="text-main">{followers.length}</SubTitle>
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
                initial={user.initial}
                isFollowing={user.isFollowing}
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
