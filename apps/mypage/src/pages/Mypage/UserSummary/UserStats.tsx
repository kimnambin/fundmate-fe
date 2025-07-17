import { useEffect, useState } from "react";
import axios from "axios";
import { FaGift, FaHeart, FaCommentDots } from "react-icons/fa";
import { SubTitle } from "@repo/ui/styles";

const UserStats = () => {
  const [paymentCount, setPaymentCount] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);

  const loading = paymentCount === null || likeCount === null || commentCount === null;

  useEffect(() => {
    const fetchStats = async () => {
      try {

        const res = await axios.get("/api/users/mypage", {
          params: { project_id: [] }, //임시 전달값
          withCredentials: true,
        });

        setPaymentCount(res.data.paymentCount);
        setLikeCount(res.data.likeCount);
        setCommentCount(res.data.commentCount);

        console.log("펀딩 찜 후기 데이터", {
          paymentCount: res.data.paymentCount,
          likeCount: res.data.likeCount,
          commentCount: res.data.commentCount,
        });
      } catch (err) {
        console.error("유저 통계 정보 조회 실패:", err);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { icon: <FaGift size={30} />, label: "펀딩", value: paymentCount, unit: "건" },
    { icon: <FaHeart size={30} />, label: "찜", value: likeCount, unit: "개" },
    { icon: <FaCommentDots size={30} />, label: "후기", value: commentCount, unit: "개" },
  ];

  return (
    <div className="flex w-full justify-evenly py-6 items-center border border-[#DDDDDD] rounded-[10px] shadow-sm">
      {stats.map(({ icon, label, value, unit }, idx) => (
        <div key={idx} className="flex flex-col items-center gap-[8px] w-[60px]">
          <div className="text-black">{icon}</div>
          <SubTitle>{label}</SubTitle>
          <div className="flex flex-col items-center">
            <SubTitle className="text-[16px] font-semibold">
              {loading ? "-" : value}
            </SubTitle>
            <span className="text-[12px] text-gray-400">{unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
