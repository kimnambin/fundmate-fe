import { useEffect, useState } from "react";
import { FollowingCard } from "./FollowingCard";
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
    // 임시 더미 데이터 (백엔드 연동 시 교체)
    const mockFollowings: FollowingUser[] = [
      { id: 1, name: "닉네임1", initial: "CN", isFollowing: true },
      { id: 2, name: "닉네임2", initial: "CN", isFollowing: true },
      { id: 3, name: "닉네임3", initial: "CN", isFollowing: false },
      { id: 4, name: "닉네임4", initial: "CN", isFollowing: false },
      { id: 5, name: "닉네임5", initial: "CN", isFollowing: false },
    ];
    const mockFollowers: FollowingUser[] = [
      { id: 6, name: "팔로워1", initial: "CN", isFollowing: true },
      { id: 7, name: "팔로워2", initial: "CN", isFollowing: false },
    ];

    setFollowings(mockFollowings);
    setFollowers(mockFollowers);
    setLoading(false);
  }, []);

  const currentList = showFollowings ? followings : followers;

  return (
    <div className="flex flex-col gap-7 w-full">
      <Title>팔로잉</Title>
      <div className="flex flex-col gap-5">
        <div className="flex gap-8 border-b">
          <button
            onClick={() => setShowFollowings(true)}
            className={`flex items-center gap-1 py-2 ${showFollowings
              ? "font-semibold shadow-[inset_0_-2px_0_0_#000000]"
              : "text-[#343F59]"
              }`}
          >
            <MediumFont>팔로잉</MediumFont>
            <span className="text-[#5FBDFF]">{followings.length}</span>
          </button>
          <button
            onClick={() => setShowFollowings(false)}
            className={`flex flex-row items-center gap-2 ${!showFollowings
              ? "font-semibold shadow-[inset_0_-2px_0_0_#000000]"
              : "text-[#343F59]"
              }`}
          >
            <MediumFont>팔로워</MediumFont>
            <SubTitle className="text-main">{followers.length}</SubTitle>
          </button>
        </div>

        {/* 리스트 */}
        {loading ? (
          <div>Loading...</div>
        ) : currentList.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {currentList.map((user) => (
              <FollowingCard
                key={user.id}
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
