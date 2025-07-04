import { CommonButton } from "@repo/ui/CommonButton"
import { InputContainer, SignUpSubTitle, SignUpTitle } from "../../styles/User/SignUp.style"
import { UserInput } from "../../styles/User/UserPage.Styles"
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email().required(),
  verificationCode: yup.string().required()
})

type EmailVerificationProps = yup.InferType<typeof schema>

export const EmailVerificationComponent = () => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const tempCode = '000000'
  const [tempCodeCheck, setTempCodeCheck] = useState<'pass' | 'fail' | null>(null);

  const tempHandleClick = () => {
    setIsVerified(true);
  }

  const onSubmit = () => {
    if (getValues('verificationCode') !== tempCode) {
      setTempCodeCheck('fail');
      return;
    } else {
      setSearchParams({ 'auth': 'done' })
    }

  }
  const { register, getValues, trigger, formState: { errors } } = useForm<EmailVerificationProps>({
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
          autoComplete='email'
          onFocus={() => trigger('email')}
        />
        {
          !isVerified ?
            <span className="text-sm text-gray-400">회원가입에 사용한 이메일 주소를 입력하시면 인증번호를 보내드립니다.</span> :
            <span className="text-sm text-gray-400">기입하신 이메일로 인증번호가 전송되었습니다.</span>
        }
        {
          !isVerified ? '' : (
            <>
              <InputContainer>
                <SignUpSubTitle><span>인증번호</span></SignUpSubTitle>
                <UserInput
                  type='text'
                  placeholder='인증번호를 입력해주세요'
                  {...register('verificationCode')}
                  autoComplete='off'
                />
                {tempCodeCheck === 'fail' && <span className="text-base text-red-500">유효하지 않은 인증 번호입니다.</span>}
              </InputContainer>
            </>
          )
        }
      </InputContainer>
      {
        !isVerified ? (
          <CommonButton
            type='button'
            onClick={tempHandleClick}
            $isError={!!!getValues('email') || !!errors.email}
            disabled={!!!getValues('email') || !!errors.email}
          >
            <span>인증번호 발송</span>
          </CommonButton>
        ) : (
          <CommonButton
            type='button'
            onClick={onSubmit}
            $isError={!!!getValues('verificationCode')}
            disabled={!!!getValues('verificationCode')}
          >
            <span>인증하기</span>
          </CommonButton>
        )
      }
    </form>
  )
}

