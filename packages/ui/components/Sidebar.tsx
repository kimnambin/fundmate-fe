import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import userImg from "../assets/images/user.png";
import { MediumFont, SubTitle, Title } from "@repo/ui/styles";
import { MainButton } from "@repo/ui/components";
import { useTmpLogin } from "../../../../fundmate-fe/apps/mypage/src/hook/login";

export const Sidebar = () => {
  const navigate = useNavigate();

  // 로그인 임시 훅 실행
  useTmpLogin();

  // 사용자 프로필 상태
  const [profile, setProfile] = useState({
    nickname: "",
    email: "",
    contents: "",
    imageUrl: "", 
  });

  // 프로필 정보 호출
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/mypage/profile", {
          withCredentials: true,
        });
        console.log("프로필 응답 데이터:", res.data);

        setProfile({
          nickname: res.data.nickname,
          email: res.data.email,
          contents: res.data.contents,
          imageUrl: res.data.imageUrl, 
        });
      } catch (error) {
        console.error("프로필 정보 불러오기 실패", error);
      }
    };

    fetchProfile();
  }, []);

  const supporterMenu = [
    { label: "후원한 프로젝트", path: "/mypage/projects/supported" },
    { label: "찜한 프로젝트", path: "/mypage/projects/liked" },
    { label: "팔로잉", path: "/mypage/projects/following" },
    { label: "내 후기", path: "/mypage/projects/myreviews" },
  ];

  const makerMenu = [
    { label: "펀딩 내역", path: "/mypage/history" },
    { label: "통계 관리", path: "/mypage/sellstats" },
    { label: "결제 관리", path: "/mypage/paymentproceed" },
    { label: "프로젝트 만들기", path: "/funding/create" },
  ];

  return (
    <aside className="w-[400px] bg-white rounded-[10px] flex flex-col items-center gap-[40px]">
      {/* 유저 프로필 */}
      <div className="flex flex-col items-center gap-[20px] w-full">
        <div
          className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-300 cursor-pointer"
          onClick={() => navigate("/mypage")}
        >
          <img
            src={profile.imageUrl || userImg}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center gap-[10px]">
          <Title>{profile.nickname ? `${profile.nickname} 님` : "닉네임 없음"}</Title>
          <MediumFont className="text-[#7E7C7C]">{profile.email}</MediumFont>
          <MediumFont>
            {profile.contents ? profile.contents : "한줄 소개가 없습니다."}
          </MediumFont>
        </div>
        <MainButton
          label="내 정보 설정"
          width="w-full"
          onClick={() => navigate("/user/settings")}
        />
      </div>

      {/* 나의 활동 (서포터) */}
      <div className="w-full flex flex-col gap-[14px] p-2">
        <SubTitle className="text-gray-400">나의 활동 (서포터)</SubTitle>
        <div className="flex flex-col gap-[10px]">
          {supporterMenu.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `text-left text-[22px] font-medium pl-[10px] transition-colors ${
                  isActive ? "text-[#5FBDFF]" : "text-black hover:text-[#5FBDFF]"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* 나의 활동 (메이커) */}
      <div className="w-full flex flex-col gap-[14px] p-2">
        <SubTitle className="text-gray-400">나의 활동 (메이커)</SubTitle>
        <div className="flex flex-col gap-[10px]">
          {makerMenu.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `text-left text-[22px] font-medium pl-[10px] transition-colors ${
                  isActive ? "text-[#5FBDFF]" : "text-black hover:text-[#5FBDFF]"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};
