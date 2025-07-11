import { useNavigate } from "react-router-dom";
import userImg from "../../assets/images/user.png";
import { MediumFont, SubTitle, Title } from "@repo/ui/styles";
import { MainButton } from "@repo/ui/components";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-[400px] bg-white rounded-[10px] flex flex-col items-center gap-[40px]">
      {/* 유저 프로필 */}
      <div className="flex flex-col items-center gap-[20px] w-full">
        <div
          className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-300 cursor-pointer"
          onClick={() => navigate("/mypage")}
        >
          <img src={userImg} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center gap-[10px]">
          <Title>나는야 서포터 님</Title>
          <MediumFont className="text-[#7E7C7C]">abc@email.com</MediumFont>
          <MediumFont>한줄 소개</MediumFont>
        </div>
        <MainButton label="내 정보 설정" width='w-full' onClick={() => navigate('/user/settings')} />
      </div>

      {/* 나의 활동 (서포터) */}
      <div className="w-full flex flex-col gap-[14px] p-2">
        <SubTitle className='text-gray-400'>나의 활동 (서포터)</SubTitle>
        <div className="flex flex-col gap-[10px]">
          <button
            className="text-left text-[22px] text-black font-medium pl-[10px] hover:text-[#5FBDFF] transition-colors"
            onClick={() => navigate("/mypage/projects/supported")}
          >
            후원한 프로젝트
          </button>
          <button
            className="text-left text-[22px] text-black font-medium pl-[10px] hover:text-[#5FBDFF] transition-colors"
            onClick={() => navigate("/mypage/projects/liked")}
          >
            찜한 프로젝트
          </button>
          <button
            className="text-left text-[22px] text-black font-medium pl-[10px] hover:text-[#5FBDFF] transition-colors"
            onClick={() => navigate("/mypage/projects/following")}
          >
            팔로잉
          </button>
          <button
            className="text-left text-[22px] text-black font-medium pl-[10px] hover:text-[#5FBDFF] transition-colors"
            onClick={() => navigate("/mypage/projects/myreviews")}
          >
            내 후기
          </button>
        </div>
      </div>

      {/* 나의 활동 (메이커) */}
      <div className="w-full flex flex-col gap-[14px] p-2">
        <SubTitle className="text-gray-400">나의 활동 (메이커)</SubTitle>
        <div className="flex flex-col gap-[10px]">
          {["펀딩 내역", "통계 관리", "결제 관리", "프로젝트 만들기"].map((label, idx) => (
            <button
              key={idx}
              className="text-left text-[22px] text-black font-medium pl-[10px] hover:text-[#5FBDFF] transition-colors"
              onClick={() => {
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside >
  );
};

export default Sidebar;
