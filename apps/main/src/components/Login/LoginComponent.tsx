import { Images } from "@repo/ui/assets";
import { CommonButton } from "@repo/ui/CommonButton";
import googleIcon from "../../assets/icons/googleIcon.png";
import naverIcon from '../../assets/icons/naverIcon.svg';
import kakaoTalkIcon from '../../assets/icons/kakaotalkIcon.png';
import { useState, type ChangeEvent } from "react";
import { HorizonLine, UserContainer, UserInput, UserLayout, UserNaigater } from "../../styles/User/UserPage.Styles";
import { LoginContainer, SocialLoginContainer, SocialLoginIcon, SocialLoginIconContainer } from "../../styles/User/Login.style";
import { Link } from "react-router-dom";

export const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <UserLayout>
      <UserContainer>
        <LoginContainer>
          <img className="w-60 mb-12" src={Images.Fundmate} />
          <form className="flex flex-col w-full gap-5">
            <div className="flex flex-col gap-3">
              <UserInput type="text" placeholder="이메일을 입력해주세요" value={email} onChange={handleEmailChange} />
              <UserInput type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={handlePasswordChange} />
            </div>
            <CommonButton type='submit'>
              <span>로그인</span>
            </CommonButton>
          </form>
          <UserNaigater>
            <Link to='/signup'>회원가입</Link>
            <Link to='/reset'>비밀번호 재설정</Link>
          </UserNaigater>
        </LoginContainer>
        <HorizonLine />
        <SocialLoginContainer>
          <span>SNS 계정으로 간편하게 시작하기</span>
          <SocialLoginIconContainer>
            <SocialLoginIcon src={googleIcon} />
            <SocialLoginIcon src={naverIcon} />
            <SocialLoginIcon src={kakaoTalkIcon} />
          </SocialLoginIconContainer>
        </SocialLoginContainer>
      </UserContainer>
    </UserLayout>
  )
}
