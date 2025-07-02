const UserFollowStats = () => {
  return (
    <div className="flex justify-center items-center px-[24px] mt-[93px] py-[24px] ml-[20px] w-[670px] h-[160px] border border-[#DDDDDD] rounded-[12px] shadow-sm">
      <div className="flex flex-col justify-center gap-[20px] w-full max-w-[670px]">
        {/* 팔로잉 */}
        <div className="flex justify-between text-[16px] font-semibold">
          <span className="text-[#999999]">팔로잉</span>
          <span className="text-black">00명</span>
        </div>
        <div className="w-full border border-[#DDDDDD]" />
        {/* 팔로워 */}
        <div className="flex justify-between text-[16px] font-semibold">
          <span className="text-[#999999]">팔로워</span>
          <span className="text-black">00명</span>
        </div>
      </div>
    </div>
  );
};

export default UserFollowStats;
