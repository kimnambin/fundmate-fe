import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, MediumFont, SubTitle, Title } from '@repo/ui/styles';

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
  const navigate = useNavigate();
  const { nickname } = useParams(); // nickname 파라미터 사용

  useEffect(() => {
    // 예시 mock 데이터
    const fetchData = () => {
      const mockData: Supporter = {
        nickname: nickname ?? '서포터1',
        following: 5,
        follower: 12,
        sponsored: 3,
        introduction: '안녕하세요. 지속 가능한 펀딩에 관심이 많습니다.',
        profileImage: '',
        isFollowing: false,
      };
      setSupporter(mockData);
    };

    fetchData();
  }, [nickname]);

  const handleFollowToggle = () => {
    if (!supporter) return;
    setSupporter({ ...supporter, isFollowing: !supporter.isFollowing });
  };

  const handleGoToMakerProfile = () => {
  if (supporter) {
    // 실제 MFE 배포 주소에 맞게 경로 수정
    window.location.href = `https://maker.fundmate.com/makerprofile/${supporter.nickname}`;
  }
};

  if (!supporter) {
    return (
      <div className="flex flex-col items-center w-full mt-[60px]">
        <div>로딩중...</div>
      </div>
    );
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
              className={`flex items-center px-[12px] py-[12px] border rounded-[5px] gap-[12px] text-[14px]
              ${supporter.isFollowing ? 'border-[#A7A7A7] text-[#A7A7A7]' : 'border-[#5FBDFF] text-[#5FBDFF]'}`}
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
