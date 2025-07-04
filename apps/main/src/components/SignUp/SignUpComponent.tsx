import { CommonButton } from "@repo/ui/CommonButton"
import { UserContainer, UserInput, UserLayout, UserNaigater } from "../../styles/User/UserPage.Styles"
import { InputContainer, SignUpContainer, SignUpSubTitle, SignUpTitle, SignUpVerificationContainer, UserCategoryButton } from "../../styles/User/SignUp.style"
import { CategoryIcons } from "@repo/ui/assets"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState } from "react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  nickname: yup.string().required(),
  email: yup.string().email().required(),
  verificationCode: yup.string().required('인증 번호를 기입해주세요.'),
  password: yup.string().required(),
  checkPassword: yup.string().oneOf([yup.ref('password')]).required()
})

type SignUpProps = yup.InferType<typeof schema>;

export const SignUpComponent = () => {
  const { menu, ...categories } = CategoryIcons;
  const [userCategory, setUserCategory] = useState<number | null>(null);
  const [verificateRequested, setVerificateRequest] = useState(false);
  const [tempVerificated, setTempVerificated] = useState(false);
  const [tempCodeCheck, setTempCodeCheck] = useState<'pass' | 'fail' | null>(null);
  const navigate = useNavigate();

  const tempCode = '000000';

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isValid } } = useForm<SignUpProps>({
      resolver: yupResolver(schema),
      shouldFocusError: false,
      mode: 'onChange',
      reValidateMode: 'onChange'
    })

  const onSubmit: SubmitHandler<SignUpProps> = (data) => {
    const { checkPassword, verificationCode, ...cleanData } = data;
    const finalData = {
      ...cleanData,
      category_id: userCategory
    }

    console.log(finalData);
    navigate('/login')
  };

  const emailVerificationHandle = () => {
    if (errors.email) {
      return;
    } else {
      setVerificateRequest(true);
    }
  }

  const codeVerificationHandle = () => {
    if (getValues('verificationCode') !== tempCode) {
      setTempCodeCheck('fail');
      return;
    } else {
      setTempCodeCheck('pass');
      setTempVerificated(true);
    }
  }

  return (
    <UserLayout>
      <UserContainer>
        <SignUpContainer>
          <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
            <SignUpTitle><span>회원가입</span></SignUpTitle>
            <InputContainer>
              <SignUpSubTitle>닉네임</SignUpSubTitle>
              <UserInput
                type='text'
                {...register('nickname')}
                placeholder='닉네임을 입력해주세요.'
                $isError={!!errors.nickname}
                autoComplete='off'
              />
            </InputContainer>
            <InputContainer>
              <SignUpSubTitle>이메일</SignUpSubTitle>
              <SignUpVerificationContainer>
                <UserInput type='text'
                  {...register('email')}
                  placeholder='이메일을 입력해주세요.'
                  $isError={!!errors.email}
                  disabled={tempVerificated}
                  autoComplete='email'
                  onFocus={() => trigger('email')}
                />
                <CommonButton
                  type='button'
                  $isError={!!!getValues('email')}
                  $isVerificated={tempVerificated}
                  disabled={!!!getValues('email')}
                  onClick={emailVerificationHandle}
                >
                  <span className='whitespace-nowrap'>인증하기</span>
                </CommonButton>
              </SignUpVerificationContainer>
              {
                verificateRequested ?
                  (
                    <>
                      <SignUpVerificationContainer>
                        <UserInput
                          type='text'
                          {...register('verificationCode')}
                          $isError={!!errors.verificationCode}
                          placeholder='인증 코드를 입력해주세요.'
                          disabled={tempVerificated}
                          onFocus={() => trigger('verificationCode')}
                          autoComplete='off'
                        />
                        <CommonButton
                          type='button'
                          $isError={!!!getValues('verificationCode')}
                          $isVerificated={tempVerificated}
                          disabled={!!!getValues('verificationCode')}
                          onClick={codeVerificationHandle}
                        >
                          <span className="whitespace-nowrap">확인하기</span>
                        </CommonButton>
                      </SignUpVerificationContainer>
                      {
                        tempCodeCheck === 'fail'
                        && <span className="text-base text-red-500">유효하지 않은 인증 번호입니다.</span>}
                    </>
                  ) : (
                    <></>
                  )
              }
            </InputContainer>
            <InputContainer>
              <SignUpSubTitle>비밀번호</SignUpSubTitle>
              <UserInput
                type='password'
                {...register('password')}
                placeholder='비밀번호를 입력해주세요.'
                $isError={!!errors.password}
              />
              <UserInput
                type='password'
                {...register('checkPassword')}
                placeholder='비밀번호를 한 번 더 입력해주세요.'
                $isError={!!errors.checkPassword}
              />
            </InputContainer>
            <InputContainer>
              <SignUpSubTitle>카테고리 선택</SignUpSubTitle>
              <div className="grid grid-cols-4 gap-3">
                {
                  Object.entries(categories).map(([_name, { menuName }], i) => (
                    <UserCategoryButton type="button" key={i + 1} $selected={userCategory === i + 1} onClick={() => setUserCategory(i + 1)}>
                      <span>{menuName}</span>
                    </UserCategoryButton>
                  ))
                }
              </div>
            </InputContainer>
            <CommonButton type='submit' className='my-5' $isError={!isValid || !userCategory}><span>가입하기</span></CommonButton>
          </form>
          <UserNaigater>
            <Link to='/login'>이미 계정이 있으신가요?</Link>
          </UserNaigater>
        </SignUpContainer>
      </UserContainer>
    </UserLayout>
  )
}
