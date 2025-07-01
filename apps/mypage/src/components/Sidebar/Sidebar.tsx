import userImg from "../../assets/images/user.png";


const Sidebar = () => {
  return (
    <aside className="absolute left-[100px] top-[180px] w-[350px] bg-white rounded-[10px] flex flex-col items-center py-[40px] px-[25px] gap-[40px]">
      {/* 유저 프로필 */}
      <div className="flex flex-col items-center gap-[20px] w-full">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-300">
          <img src={userImg} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[20px] font-semibold text-black">나는야 서포터 님</p>
          <p className="text-[15px] text-[#7E7C7C]">abc@email.com</p>
          <p className="text-[15px] text-black">한줄 소개</p>
        </div>
        <button className="w-full h-[50px] bg-[#5FBDFF] text-white text-[18px] font-medium rounded-[6px]">
          내 정보 설정
        </button>
      </div>

      {/* 나의 활동 (서포터) */}
      <div className="w-full flex flex-col gap-[14px]">
        <p className="text-[15px] text-[#999999] font-semibold">나의 활동 (서포터)</p>
        <div className="flex flex-col gap-[10px]">
          {["후원한 프로젝트", "찜한 프로젝트", "팔로잉", "내 후기"].map((label, idx) => (
            <button
              key={idx}
              className="text-left text-[20px] text-black font-medium pl-[10px] hover:text-[#5FBDFF] transition-colors"
              onClick={() => {
                // 추후 해당 페이지로 이동 로직 추가 예정
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 나의 활동 (메이커) */}
      <div className="w-full flex flex-col gap-[14px]">
        <p className="text-[15px] text-[#999999] font-semibold">나의 활동 (메이커)</p>
        <div className="flex flex-col gap-[10px]">
          {["펀딩 내역", "통계 관리", "결제 관리", "프로젝트 만들기"].map((label, idx) => (
            <button
              key={idx}
              className="text-left text-[20px] text-black font-medium pl-[10px] hover:text-[#5FBDFF] transition-colors"
              onClick={() => {
                // 추후 해당 페이지로 이동 로직 추가 예정
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
