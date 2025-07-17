import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FundiMainImage } from "@repo/ui/assets";
import { MediumFont, SubTitle, Title } from "@repo/ui/styles";
import { InputText, MainButton } from "@repo/ui/components";

const Withdrawal = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    if (!password.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    const confirmDelete = window.confirm("정말 회원 탈퇴하시겠습니까?");
    if (!confirmDelete) return;

    console.log("회원 탈퇴 진행");

    try {
      const res = await axios.delete("/api/users/account", {
        withCredentials: true,
        data: { password }, // 백엔드에서 비밀번호 확인하는 경우 전달
      });

      alert(res.data.message);

      try {
        await axios.get("/api/users/mypage", {
          withCredentials: true,
        });
      } catch (checkErr: any) {
        if (
          checkErr.response?.status === 401 ||
          checkErr.response?.status === 404
        ) {
          console.log("탈퇴 성공이 확인되었습니다.");
          alert("탈퇴 처리가 완료되었습니다.");
        } else {
          console.error("유저 확인 중 알 수 없는 오류:", checkErr);
        }
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (err: any) {
      console.error("회원 탈퇴 실패:", err);
      alert(err?.response?.data?.message || "회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow px-4">
      <div className="flex flex-col justify-center items-center w-[90%] max-w-[500px] p-8 gap-8 mb-[50px]">
        <img
          src={FundiMainImage}
          alt="fundmate"
          className="w-[240px] h-[65px] mb-[10px]"
        />

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
