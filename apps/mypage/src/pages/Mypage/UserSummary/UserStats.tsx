import { FaGift, FaHeart, FaCommentDots } from "react-icons/fa";

const stats = [
  { icon: <FaGift size={24} />, label: "펀딩", value: 0 },
  { icon: <FaHeart size={24} />, label: "찜", value: 0 },
  { icon: <FaCommentDots size={24} />, label: "후기", value: 0 },
];

const UserStats = () => {
  return (
   <div className="flex justify-center items-center px-[60px] py-[24px] gap-[60px] w-[580px] h-[160px] border border-[#DDDDDD] rounded-[12px] shadow-sm mt-[-37px]">

      {stats.map(({ icon, label, value }, idx) => (
        <div key={idx} className="flex flex-col items-center gap-[10px] w-[60px]">
          <div className="text-black">{icon}</div>
          <p className="text-[15px] font-bold text-black">{label}</p>
          <p className="text-[15px] font-bold text-black">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
