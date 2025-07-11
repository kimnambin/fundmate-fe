import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FundiMainImage } from "@repo/ui/assets";
import { MediumFont, SubTitle, Title } from "@repo/ui/styles";
import { InputText } from "@repo/ui/components";
import { MainButton } from "@repo/ui/components";

const Withdrawal = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleWithdrawal = () => {
    const confirmDelete = window.confirm("⚠️ 정말 회원 탈퇴하시겠습니까?");
    if (confirmDelete) {
      console.log("회원 탈퇴 진행");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow px-4">
      {/* 컨텐츠 박스 */}
      <div className="flex flex-col justify-center items-center w-[90%] max-w-[500px] p-8 gap-8 mb-[50px]">

        {/* 로고 */}
        <img
          src={FundiMainImage}
          alt="fundmate"
          className="w-[240px] h-[65px] mb-[10px]"
        />

        {/* 내용 */}
        <div className="flex flex-col items-start w-full gap-5">
          <Title>회원 탈퇴</Title>

          <div className="flex flex-col w-full gap-2">
            <SubTitle>비밀번호</SubTitle>
            <InputText
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>

          <MediumFont className="text-slate-500">
            회원 탈퇴를 원하시면 비밀번호를 입력해 주세요.
          </MediumFont>

          <div className="flex w-full justify-between gap-4 mt-4">
            <MainButton
              label="회원탈퇴"
              onClick={handleWithdrawal}
              width="w-full"
              className="border border-[#FB6565] text-[#FB6565] !hover:bg-[#fb656510] bg-transparent transition"
            />
            <MainButton
              onClick={() => navigate(-1)}
              label="돌아가기"
              width="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
