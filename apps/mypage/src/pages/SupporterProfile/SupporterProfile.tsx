import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Layout, MediumFont, SubTitle, Title } from '@repo/ui/styles';
import { Loading } from '@repo/ui/components';

interface FundingItem {
  project_id: number;
  project_title: string;
  image_url: string;
  short_description: string;
  current_amount: number;
  achievement: string;
  remaining_day: number;
}

interface UserProfile {
  nickname: string;
  followingCount: number;
  followerCount: number;
  paymentCount: number;
  contents: string;
  imageUrl: string;
  isFollowing: boolean;
  fundingList?: FundingItem[];
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user_id) return;
      try {
        const response = await axios.get(`/api/users/maker/${user_id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('프로필 조회 실패:', error);
        setNotFound(true);
      }
    };

    fetchProfile();
  }, [user_id]);

  const handleFollowToggle = async () => {
    if (!profile || !user_id) return;

    try {
      if (profile.isFollowing) {
        await axios.delete('/api/users/following', {
          data: { following_id: Number(user_id) },
        });
      } else {
        await axios.post('/api/users/following', {
          following_id: Number(user_id),
        });
      }

      setProfile({ ...profile, isFollowing: !profile.isFollowing });
    } catch (error) {
      console.error('팔로우 상태 변경 실패:', error);
    }
  };

  if (notFound) {
    return (
      <Layout>
        <div className="flex flex-col items-center w-full mt-[60px]">
          <div className="text-gray-500">존재하지 않는 사용자입니다.</div>
          <button
            onClick={() => navigate(-1)}
            className="text-[#5FBDFF] text-sm underline"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </Layout>
    );
  }

  if (!profile) return <Loading />;

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        {/* 상단 프로필 박스 */}
        <div className="flex items-center justify-between gap-[20px] bg-white w-full px-[10px] py-[20px]">
          <div className="flex flex-row gap-10 items-start">
            {/* ← 이전 버튼 + 프로필 이미지 */}
            <div className="flex flex-col items-start gap-[5px] relative">
              <button
                onClick={() => navigate(-1)}
                className="absolute -top-20 left-2 text-[#5FBDFF] text-sm underline"
              >
                ← 이전으로
              </button>
              <div
                className="w-[100px] h-[100px] rounded-full bg-gray-300"
                style={{
                  backgroundImage: `url(${profile.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* 닉네임 및 수치 정보 */}
            <div className="flex flex-col justify-between gap-[15px]">
              <Title>{profile.nickname}</Title>

              <div className="flex items-start gap-[55px]">
                <div className="flex flex-col gap-[5px] min-w-[70px] text-center">
                  <MediumFont className="text-[#999A9A]">팔로잉 &gt;</MediumFont>
                  <SubTitle className="min-h-[24px]">{profile.followingCount}</SubTitle>
                </div>

                <div className="flex flex-col gap-[5px] min-w-[70px] text-center">
                  <MediumFont className="text-[#999A9A]">팔로워 &gt;</MediumFont>
                  <SubTitle className="min-h-[24px]">{profile.followerCount}</SubTitle>
                </div>

                <div className="flex flex-col gap-[5px] min-w-[70px] text-center">
                  <MediumFont className="text-[#999A9A]">후원횟수 &gt;</MediumFont>
                  <SubTitle className="min-h-[24px]">{profile.paymentCount ?? 0}</SubTitle>
                </div>
              </div>
            </div>
          </div>

          {/* 팔로우 / 언팔로우 버튼 */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={handleFollowToggle}
              className={`flex items-center px-[12px] py-[12px] border rounded-[5px] gap-[12px] text-[14px] ${
                profile.isFollowing
                  ? 'border-[#A7A7A7] text-[#A7A7A7]'
                  : 'border-[#5FBDFF] text-[#5FBDFF]'
              }`}
            >
              {profile.isFollowing ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="#A7A7A7" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  팔로잉
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24" stroke="#5FBDFF" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  팔로우
                </>
              )}
            </button>
          </div>
        </div>

        {/* 하단 프로필 소개 영역 */}
        <div className="w-full mt-[20px] p-[20px] bg-white">
          <SubTitle className="mb-[10px] border-b-2 border-[#5FBDFF] inline-block pb-[2px]">
            프로필
          </SubTitle>
          <div className="w-full border-b border-gray-200 mb-[10px]" />
          <MediumFont className="text-gray-500">
            {profile.contents || '한줄 소개가 없습니다.'}
          </MediumFont>
        </div>

        {/* 프로젝트 카드 영역 (메이커일 때만 노출) */}
        {profile.fundingList && profile.fundingList.length > 0 && (
          <div className="w-full mt-[120px] p-[20px] bg-white">
            <SubTitle className="mb-[10px] border-b-2 border-[#5FBDFF] inline-block pb-[2px]">
              등록한 프로젝트
            </SubTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {profile.fundingList.map((project, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/projects/${project.project_id}`)}
                  className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
                >
                  <img
                    src={project.image_url}
                    alt={project.project_title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <Title className="text-base">{project.project_title}</Title>
                  <MediumFont className="text-sm text-gray-600">{project.short_description}</MediumFont>
                  <div className="text-sm mt-2 text-gray-500">
                    달성률: {project.achievement}% / 남은 기간: {project.remaining_day}일
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
