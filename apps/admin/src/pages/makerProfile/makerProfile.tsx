import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { VerticalCard } from '@repo/ui/components';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { Title, SubTitle, MediumFont, Layout } from '@repo/ui/styles';
import { Loading } from '@repo/ui/components';

interface Project {
  project_title: string;
  image_url: string;
  short_description: string;
  current_amount: number;
  achievement: string;
  remaining_day: number;
}

interface Maker {
  nickname: string;
  followingCount: number;
  followerCount: number;
  fundingCount: number;
  contents: string;
  imageUrl: string;
  fundingList: Project[];
  isFollowing: boolean;
}

const MakerProfile = () => {
  const [maker, setMaker] = useState<Maker | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user_id) return;
      console.log(`메이커 조회 요청: ${user_id}`);

      try {
        const res = await axios.get(`/api/users/maker/${user_id}`);
        const data = res.data;
        console.log('메이커 데이터 조회 성공:', data);
        setMaker(data);
      } catch (err) {
        console.error('메이커 정보 불러오기 실패:', err);
        setNotFound(true);
      }
    };

    fetchData();
  }, [user_id]);

  const handleFollowToggle = async () => {
    if (!maker || !user_id) return;

    try {
      if (maker.isFollowing) {
        await axios.delete('/api/users/following', {
          data: { following_id: Number(user_id) },
        });
      } else {
        await axios.post('/api/users/following', {
          following_id: Number(user_id),
        });
      }

      setMaker({
        ...maker,
        isFollowing: !maker.isFollowing,
      });
    } catch (error) {
      console.error('팔로우 상태 변경 실패:', error);
    }
  };

  if (notFound) {
    return (
      <Layout>
        <div className="flex flex-col items-center w-full mt-[60px] gap-2">
          <div className="text-gray-500">존재하지 않는 메이커입니다.</div>
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

  if (!maker) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <main className="flex flex-col flex-grow p-8 w-full max-w-[1720px] mx-auto mt-10">
          {/* 프로필 헤더 */}
          <section className="w-full flex items-center justify-between mb-10">
            <div className="flex items-center gap-14">
              <div
                className="w-[130px] h-[130px] rounded-full bg-gray-300 shrink-0"
                style={{
                  backgroundImage: maker.imageUrl
                    ? `url(${maker.imageUrl})`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="flex flex-col">
                <Title className="mb-10">{maker.nickname}</Title>
                <div className="flex gap-16">
                  <div className="flex flex-col">
                    <MediumFont className="text-gray-500">
                      팔로잉 {'>'}
                    </MediumFont>
                    <MediumFont>{maker.followingCount}</MediumFont>
                  </div>
                  <div className="flex flex-col">
                    <MediumFont className="text-gray-500">
                      팔로워 {'>'}
                    </MediumFont>
                    <MediumFont>{maker.followerCount}</MediumFont>
                  </div>
                  <div className="flex flex-col">
                    <MediumFont className="text-gray-500">
                      전체 프로젝트 {'>'}
                    </MediumFont>
                    <MediumFont>{maker.fundingCount}개</MediumFont>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleFollowToggle}
              className={`flex items-center justify-center gap-2 px-6 py-3 border rounded-md text-base font-medium transition 
                ${
                  maker.isFollowing
                    ? 'border-gray-300 text-gray-500 hover:bg-gray-100'
                    : 'border-blue-400 text-blue-400 hover:bg-blue-50'
                }`}
            >
              {maker.isFollowing ? (
                <>
                  <AiOutlineCheck className="text-[22px]" />
                  팔로잉
                </>
              ) : (
                <>
                  <AiOutlinePlus className="text-[22px]" />
                  팔로우
                </>
              )}
            </button>
          </section>

          {/* 소개 */}
          <section className="w-full mb-32">
            <hr className="border-t border-gray-200 mb-6" />
            <MediumFont className="text-gray-500 text-left">
              {maker.contents || '한줄 소개 / 현재 등록한 소개가 없습니다.'}
            </MediumFont>
          </section>

          {/* 프로젝트 목록 */}
          <section className="w-full">
            <hr className="border-t border-gray-200 mt-20 mb-10" />
            <SubTitle className="ml-4 mb-4">
              올린 프로젝트{' '}
              <span className="text-blue-500">{maker.fundingList.length}</span>
            </SubTitle>
            <div className="grid grid-cols-5 gap-4 mb-40">
              {maker.fundingList.map((project, index) => (
                <VerticalCard
                  key={index}
                  imageUrl={project.image_url}
                  title={project.project_title}
                  description={project.short_description}
                  progress={Number(project.achievement)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MakerProfile;
