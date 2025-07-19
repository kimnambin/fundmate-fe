import { useEffect } from 'react';
import { tempLogin } from '../../api/user';

export const useTmpLogin = () => {
  useEffect(() => {
    // 로그인 임시 연동 코드
    const autoLogin = async () => {
      try {
        await tempLogin({ email: 'f@mail.com', password: 'zzz111' });
        console.log(`임시 로그인`);
      } catch (e) {
        console.error(e);
      }
    };
    autoLogin();
  }, []);
};
