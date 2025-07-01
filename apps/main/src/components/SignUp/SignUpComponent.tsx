import { CommonButton } from "@repo/ui/CommonButton"
import { UserContainer, UserInput, UserLayout, UserNaigater } from "../../styles/User/UserPage.Styles"
import { InputContainer, SignUpContainer, SignUpSubTitle, SignUpTitle, SignUpVerificationContainer } from "../../styles/User/SignUp.style"
import { CategoryIcons } from "@repo/ui/assets"
import { Link } from "react-router-dom"

export const SignUpComponent = () => {
  const { menu, ...categories } = CategoryIcons;

  return (
    <UserLayout>
      <UserContainer>
        <SignUpContainer>
          <form className="flex flex-col w-full gap-5">
            <SignUpTitle><span>회원가입</span></SignUpTitle>
            <InputContainer>
              <SignUpSubTitle>닉네임</SignUpSubTitle>
              <UserInput type='text' placeholder='닉네임을 입력해주세요.' />
            </InputContainer>
            <InputContainer>
              <SignUpSubTitle>이메일</SignUpSubTitle>
              <SignUpVerificationContainer>
                <UserInput type='email' placeholder='이메일을 입력해주세요.' />
                <CommonButton>
                  <span className='whitespace-nowrap'>인증하기</span>
                </CommonButton>
              </SignUpVerificationContainer>
              <SignUpVerificationContainer>
                <UserInput type='text' placeholder='인증 코드를 입력해주세요.' />
                <CommonButton>
                  <span className="whitespace-nowrap">확인하기</span>
                </CommonButton>
              </SignUpVerificationContainer>
            </InputContainer>
            <InputContainer>
              <SignUpSubTitle>비밀번호</SignUpSubTitle>
              <UserInput type='text' placeholder='비밀번호를 입력해주세요.' />
              <UserInput type='text' placeholder='비밀번호를 한 번 더 입력해주세요.' />
            </InputContainer>
            <InputContainer>
              <SignUpSubTitle>카테고리 선택</SignUpSubTitle>
              <div className="grid grid-cols-4 gap-3">
                {
                  Object.entries(categories).map(([name, { menuName, src }]) => (
                    <button className="bg-slate-200 rounded-full py-2">
                      <span>{menuName}</span>
                    </button>
                  ))
                }
              </div>
            </InputContainer>
            <CommonButton className='my-5'><span>가입하기</span></CommonButton>
          </form>
          <UserNaigater>
            <Link to='/login'>이미 계정이 있으신가요?</Link>
          </UserNaigater>
        </SignUpContainer>
      </UserContainer>
    </UserLayout>
  )
}
