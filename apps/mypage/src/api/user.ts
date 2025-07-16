// apps/mypage/src/api/user.ts
import axios from "axios";

// /api/users/profile → 백엔드에서 유저 프로필 정보를 반환
export const fetchUserProfile = async () => {
  const response = await axios.get("/api/users/profile", {
    withCredentials: true, // 쿠키 기반 인증 시 필요
  });
  return response.data;
};
