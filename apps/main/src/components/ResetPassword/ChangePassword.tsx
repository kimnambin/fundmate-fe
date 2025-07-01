import { CommonButton } from "@repo/ui/CommonButton"
import { InputContainer, SignUpTitle } from "../../styles/User/SignUp.style"
import { UserInput } from "../../styles/User/UserPage.Styles"
import { useNavigate } from "react-router-dom"

export const ChangePassword = () => {
  const navigate = useNavigate();
  return (
    <form className="flex flex-col w-full gap-5">
      <SignUpTitle><span>비밀번호 재설정</span></SignUpTitle>
      <InputContainer>
        <UserInput type='password' placeholder='변경할 이메일을 입력해주세요.' />
        <UserInput type='password' placeholder='변경할 이메일을 한 번 더 입력해주세요.' />
      </InputContainer>
      <CommonButton onClick={() => { navigate('/login') }}><span>비밀번호 재설정</span></CommonButton>
    </form>
  )
}
