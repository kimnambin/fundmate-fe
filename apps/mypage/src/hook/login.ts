import { useEffect } from "react";
import { tempLogin, settings } from "../api/mypage";

export const useTmpLogin = () => {
  useEffect(() => {
    // 로그인 임시 연동 코드
    const autoLogin = async () => {
      try {
        await tempLogin({ email: 'd@mail.com', password: 'zzz111' });
        console.log('임시 로그인');
      } catch (e) {
        console.error(e);
      }
    };
    autoLogin();
  }, []);
};
export const useSettings = () => {
  useEffect(() => {
    // 로그인 임시 연동 코드
    const Settings = async () => {
      try {
        await settings({
                "image_url": "hi",                      // 이미지 url string
                "nickname": "tester2",                  // 닉네임 string
                "gender": "남자",                       // 성별 string
                "age_id": 2,                            // 나이 id 값 number
                "contents": "이것은 한 줄 소개인데요.",  // 소개글 string
                "category_id": 7  
          });
        console.log('데이터');
      } catch (e) {
        console.error(e);
      }
    };
    Settings();
  }, []);
};