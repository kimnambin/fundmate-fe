import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Layout, MediumFont, SubTitle, Title } from '@repo/ui/styles';
import { Loading } from '@repo/ui/components';

interface Supporter {
  nickname: string;
  following: number;
  follower: number;
  sponsored: number;
  introduction: string;
  profileImage: string;
  isFollowing: boolean;
}

const SupporterProfile = () => {
  const [supporter, setSupporter] = useState<Supporter | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user_id) return;
      console.log(`서포터 조회 요청: ${user_id}`);

      try {
        const response = await axios.get(`/api/users/supporter/${user_id}`);
        const data = response.data;

        console.log("프로필 이미지 URL:", data.imageUrl);

        const supporterData: Supporter = {
          nickname: data.nickname,
          following: data.followingCount,
          follower: data.followerCount,
          sponsored: data.paymentCount,
          introduction: data.contents,
          profileImage: data.imageUrl,
          isFollowing: data.isFollowing ?? false,
        };

        setSupporter(supporterData);
      } catch (error) {
        console.error('서포터 정보 불러오기 실패:', error);
        setNotFound(true);
      }
    };

    fetchData();
  }, [user_id]);

  const handleFollowToggle = async () => {
  if (!supporter || !user_id) return;

  try {
    if (supporter.isFollowing) {
      //언팔로우
      await axios.delete('/api/users/following', {
        data: { following_id: Number(user_id) },
      });
    } else {
      //팔로우
      await axios.post('/api/users/following', {
        following_id: Number(user_id),
      });
    }

    // 상태 반영
    setSupporter({
      ...supporter,
      isFollowing: !supporter.isFollowing,
    });
  } catch (error) {
    console.error('팔로우 상태 변경 실패:', error);
  }
};
  const handleGoToMakerProfile = () => {
    if (supporter) {
      window.location.href = `http://localhost:5001/user/maker/profile?nickname=${supporter.nickname}`;
    }
  };

  if (notFound) {
    return (
      <Layout>
        <div className="flex flex-col items-center w-full mt-[60px]">
          <div className="text-gray-500">존재하지 않는 서포터입니다.</div>
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

  if (!supporter) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        {/* 상단 프로필 박스 */}
        <div className="flex items-center justify-between p-[10px] gap-[20px] bg-white w-full">
          <div className="flex flex-row gap-10">
            <div
              className="w-[100px] h-[100px] rounded-full bg-gray-300"
              style={{
                backgroundImage: supporter.profileImage
                  ? `url(${supporter.profileImage})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="flex flex-col justify-between gap-[15px]">
              <Title>{supporter.nickname}</Title>

              <div className="flex items-end gap-[55px]">
                <div className="flex flex-col gap-[5px]">
                  <MediumFont className="text-[#999A9A]">팔로잉 &gt;</MediumFont>
                  <SubTitle>{supporter.following}</SubTitle>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <MediumFont className="text-[#999A9A]">팔로워 &gt;</MediumFont>
                  <SubTitle>{supporter.follower}</SubTitle>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <MediumFont className="text-[#999A9A]">후원횟수 &gt;</MediumFont>
                  <SubTitle>{supporter.sponsored}</SubTitle>
                </div>
              </div>
            </div>
          </div>

          {/* 팔로우 / 팔로잉 버튼 */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={handleFollowToggle}
              className={`flex items-center px-[12px] py-[12px] border rounded-[5px] gap-[12px] text-[14px] ${
                supporter.isFollowing
                  ? 'border-[#A7A7A7] text-[#A7A7A7]'
                  : 'border-[#5FBDFF] text-[#5FBDFF]'
              }`}
            >
              {supporter.isFollowing ? (
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

            <button
              onClick={handleGoToMakerProfile}
              className="text-[#5FBDFF] text-sm underline"
            >
              메이커 프로필 보기
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
            {supporter.introduction || '한줄 소개 / 없다면 등록한 소개가 없습니다.'}
          </MediumFont>
        </div>
      </div>
    </Layout>
  );
};

export default SupporterProfile;
