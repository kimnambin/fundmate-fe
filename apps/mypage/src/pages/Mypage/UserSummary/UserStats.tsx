import { FaGift, FaHeart, FaCommentDots } from "react-icons/fa";
import { SubTitle } from "@repo/ui/styles";

const stats = [
  { icon: <FaGift size={30} />, label: "펀딩", value: 0 },
  { icon: <FaHeart size={30} />, label: "찜", value: 0 },
  { icon: <FaCommentDots size={30} />, label: "후기", value: 0 },
];

const UserStats = () => {
  return (
    <div className="flex w-full justify-evenly py-6 items-center border border-[#DDDDDD] rounded-[10px] shadow-sm">

      {stats.map(({ icon, label, value }, idx) => (
        <div key={idx} className="flex flex-col items-center gap-[10px] w-[60px]">
          <div className="text-black">{icon}</div>
          <SubTitle>{label}</SubTitle>
          <SubTitle>{value}</SubTitle>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
