import { CommonButton } from "@repo/ui/CommonButton"
import { InputContainer, SignUpSubTitle, SignUpTitle } from "../../styles/User/SignUp.style"
import { UserInput } from "../../styles/User/UserPage.Styles"
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const EmailVerificationComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempswitch, setTempSwitch] = useState(true);
  const tempHandleClick = () => {
    if (tempswitch) {
      setTempSwitch(false);
    } else {
      setSearchParams({ 'auth': 'done' })
    }
  }

  return (
    <form className="flex flex-col w-full gap-5">
      <SignUpTitle><span>비밀번호 재설정</span></SignUpTitle>
      <InputContainer>
        <SignUpSubTitle><span>이메일</span></SignUpSubTitle>
        <UserInput type='text' placeholder='가입하신 이메일 주소를 입력해주세요.' />
        {
          tempswitch ? <span className="text-sm text-gray-400">회원가입에 사용한 이메일 주소를 입력하시면 인증번호를 보내드립니다.</span> : ''
        }
        {
          tempswitch ? '' : (
            <InputContainer>
              <SignUpSubTitle><span>인증번호</span></SignUpSubTitle>
              <UserInput type='text' placeholder='인증번호를 입력해주세요' />
            </InputContainer>
          )
        }
      </InputContainer>
      <CommonButton type='button' onClick={tempHandleClick}>
        {
          tempswitch ? (
            <span>인증번호 발송</span>
          ) : (
            <span>인증하기</span>
          )
        }
      </CommonButton>
    </form>
  )
}

