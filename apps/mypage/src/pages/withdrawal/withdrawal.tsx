import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../../../packages/ui/components/Header";
import fundmateLogo from "../../../../../packages/ui/assets/images/Fundmate.png";

const Withdrawal = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleWithdrawal = () => {
    const confirmDelete = window.confirm("⚠️ 정말 회원 탈퇴하시겠습니까?");
    if (confirmDelete) {
      // TODO: 탈퇴 API 연동
      console.log("회원 탈퇴 진행");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex flex-col justify-center items-center flex-grow">

        {/* 컨텐츠 박스 */}
        <div className="flex flex-col justify-center ml-[-40px] items-center w-[430px] p-6 gap-6 bg-white rounded-md mb-[50px]">

          {/* 로고 */}
          <img
            src={fundmateLogo}
            alt="fundmate"
            className="w-[226px] h-[60px] mb-[25px]"
          />

          {/* 내용 */}
          <div className="flex flex-col items-start w-full gap-4">
            <h2 className="text-[16px] font-semibold text-black">회원 탈퇴</h2>

            <div className="flex flex-col w-full gap-1">
              <label className="text-[14px] font-medium text-black">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요."
                className="w-full h-[40px] px-3 border border-slate-300 rounded-md placeholder:text-slate-400 focus:border-[#5FBDFF] focus:outline-none"
              />
            </div>

            <p className="text-[14px] text-slate-500">
              회원 탈퇴를 원하시면 비밀번호를 입력해 주세요.
            </p>

            <div className="flex w-full justify-between gap-4 mt-2">
              <button
                onClick={handleWithdrawal}
                className="flex-1 h-[40px] flex justify-center items-center rounded-md border border-[#FB6565] text-[#FB6565] font-medium text-[14px]"
              >
                회원 탈퇴
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 h-[40px] flex justify-center items-center rounded-md bg-[#5FBDFF] text-white font-medium text-[14px]"
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Withdrawal;
