import { CommonButton } from "@repo/ui/CommonButton"
import { InputContainer, SignUpSubTitle, SignUpTitle } from "../../styles/User/SignUp.style"
import { UserInput } from "../../styles/User/UserPage.Styles"
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as yup from 'yup'
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email().required(),
  verificationCode: yup.string().required()
})

type EmailVerificationProps = yup.InferType<typeof schema>

export const EmailVerificationComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const tempHandleClick = () => {
    if (!isVerified) {
      setIsVerified(true);
    } else {
      setSearchParams({ 'auth': 'done' })
    }
  }

  const { register, formState: { errors } } = useForm<EmailVerificationProps>({
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  return (
    <form className="flex flex-col w-full gap-5">
      <SignUpTitle><span>비밀번호 재설정</span></SignUpTitle>
      <InputContainer>
        <SignUpSubTitle><span>이메일</span></SignUpSubTitle>
        <UserInput
          type='text'
          placeholder='가입하신 이메일 주소를 입력해주세요.'
          {...register('email')}
          $isError={!!errors.email}
        />
        {
          !isVerified ? <span className="text-sm text-gray-400">회원가입에 사용한 이메일 주소를 입력하시면 인증번호를 보내드립니다.</span> : ''
        }
        {
          !isVerified ? '' : (
            <InputContainer>
              <SignUpSubTitle><span>인증번호</span></SignUpSubTitle>
              <UserInput
                type='text'
                placeholder='인증번호를 입력해주세요'
                {...register('verificationCode')}
              />
            </InputContainer>
          )
        }
      </InputContainer>
      <CommonButton type='button' onClick={tempHandleClick} $isError={!!errors.email} disabled={!!errors.email}>
        {
          !isVerified ? (
            <span>인증번호 발송</span>
          ) : (
            <span>인증하기</span>
          )
        }
      </CommonButton>
    </form>
  )
}

