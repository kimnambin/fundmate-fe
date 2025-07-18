import { UserContainer, UserLayout, UserNaigater } from "../../styles/User/UserPage.Styles"
import {
  InputContainer,
  SignUpContainer,
  SignUpVerificationContainer,
  UserCategoryButton
} from "../../styles/User/SignUp.style"
import { CategoryIcons } from "@repo/ui/assets"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState } from "react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MediumFont, SmallFont, Title } from "@repo/ui/styles"
import { InputText, MainButton } from "@repo/ui/components"
import { commonApiInstance } from "@repo/ui/hooks"
import useTimer from "../../hooks/useTimer"

export const schema = yup.object({
  nickname: yup.string().required(),
  email: yup.string().email().required(),
  verificationCode: yup.string().required('인증 번호를 기입해주세요.'),
  password: yup.string().required(),
  checkPassword: yup.string().oneOf([yup.ref('password')]).required()
})

type SignUpProps = yup.InferType<typeof schema>;

export const SignUpComponent = () => {
  const { menu: _menu, ...categories } = CategoryIcons;
  const [userCategory, setUserCategory] = useState<number | null>(null);
  const [verificateRequested, setVerificateRequest] = useState(false);
  const [verificated, setVerificated] = useState(false);
  const [codeChecked, setCodeChecked] = useState<'pass' | 'fail' | null>(null);
  const navigate = useNavigate();

  const {
    timeLeft,
    isRunning: isTimeRunning,
    hasTimerEnded,
    startTimer,
    resetTimer,
    formatTime
  } = useTimer()

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isValid } } = useForm<SignUpProps>({
      resolver: yupResolver(schema),
      shouldFocusError: false,
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {
        email: ''
      }
    })

  const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
    const { checkPassword, verificationCode, ...cleanData } = data;
    const finalData = {
      ...cleanData,
      confirm_password: checkPassword,
      code: verificationCode,
      category_id: userCategory
    }
    console.log(finalData);
    await commonApiInstance.post('/auth/signup', finalData)
      .then(response => {
        console.log(response);
        navigate('/login')
      })
      .catch(error => {
        console.error(error);
      })
  };

  const emailVerificationHandle = async () => {
    if (errors.email) {
      return;
    } else {
      await commonApiInstance.post('/auth/codes/send', { email: getValues('email') })
        .then(response => {
          console.log(response);
          resetTimer();
          startTimer();
          setVerificateRequest(true)
          if (hasTimerEnded) {
            setVerificateRequest(false)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  const codeVerificationHandle = async () => {
    await commonApiInstance.post('/auth/codes/verify',
      {
        email: getValues('email'),
        code: getValues('verificationCode')
      })
      .then(response => {
        console.log(response);
        setCodeChecked('pass');
        setVerificated(true);
      })
      .catch(error => {
        console.error(error)
        setCodeChecked('fail');
      })
  }

  const buttonLabel: string = isTimeRunning && timeLeft > 0 ? formatTime(timeLeft) : '인증하기'

  return (
    <UserLayout>
      <UserContainer>
        <SignUpContainer>
          <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
            <Title>회원가입</Title>
            <InputContainer>
              <MediumFont>닉네임</MediumFont>
              <InputText
                type="text"
                placeholder="닉네임을 입력해주세요."
                {...register('nickname')}
                isError={!!errors.nickname}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              <MediumFont>이메일</MediumFont>
              <SignUpVerificationContainer>
                <InputText
                  type="text"
                  width="w-full"
                  placeholder="이메일을 입력해주세요."
                  {...register('email')}
                  isError={!!errors.email}
                  disabled={verificated || verificateRequested}
                  autoComplete="email"
                  onFocus={() => trigger('email')}
                />
                <MainButton
                  type="button"
                  onClick={emailVerificationHandle}
                  isError={!getValues('email')}
                  isVerificated={verificated}
                  disabled={verificateRequested || !getValues('email')}
                  width="w-28"
                  label={verificated ? '인증완료' : buttonLabel}
                />
              </SignUpVerificationContainer>
              {
                verificateRequested ?
                  (
                    <>
                      <SignUpVerificationContainer>
                        <InputText
                          type="text"
                          width="w-full"
                          placeholder="인증 코드를 입력해주세요."
                          {...register('verificationCode')}
                          isError={!!errors.verificationCode}
                          disabled={verificated}
                          onFocus={() => trigger('verificationCode')}
                          autoComplete="off"
                        />
                        <MainButton
                          type="button"
                          onClick={codeVerificationHandle}
                          width="w-28"
                          isError={!getValues('verificationCode')}
                          isVerificated={verificated}
                          disabled={verificated}
                          label="확인하기"
                        />
                      </SignUpVerificationContainer>
                      {
                        codeChecked === 'fail'
                        && <SmallFont className="text-red">유효하지 않은 인증 번호입니다.</SmallFont>
                      }
                    </>
                  ) : (
                    <></>
                  )
              }
            </InputContainer>
            <InputContainer>
              <MediumFont>비밀번호</MediumFont>
              <InputText
                type='password'
                placeholder="비밀번호를 입력해주세요."
                {...register('password')}
                isError={!!errors.password}
              />
              <InputText
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요."
                {...register('checkPassword')}
                isError={!!errors.checkPassword}
              />
            </InputContainer>
            <InputContainer>
              <MediumFont>카테고리 선택</MediumFont>
              <div className="grid grid-cols-4 gap-3">
                {
                  Object.entries(categories).map(([_, { menuName }], i) => (
                    <UserCategoryButton type="button" key={i + 1} $selected={userCategory === i + 1} onClick={() => setUserCategory(i + 1)}>
                      <MediumFont>{menuName}</MediumFont>
                    </UserCategoryButton>
                  ))
                }
              </div>
            </InputContainer>
            <MainButton
              type="submit"
              className="my-5"
              isError={!isValid || !userCategory}
              width="w-full"
              label="가입하기"
            />
          </form>
          <UserNaigater>
            <Link to='/login'>
              <MediumFont>이미 계정이 있으신가요?</MediumFont>
            </Link>
          </UserNaigater>
        </SignUpContainer>
      </UserContainer>
    </UserLayout>
  )
}
