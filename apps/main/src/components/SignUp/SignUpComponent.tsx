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

const schema = yup.object({
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
    const { checkPassword: _cp, verificationCode: _vc, ...cleanData } = data;
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
                  disabled={tempVerificated}
                  autoComplete="email"
                  onFocus={() => trigger('email')}
                />
                <MainButton
                  type="button"
                  onClick={emailVerificationHandle}
                  isError={!getValues('email')}
                  isVerificated={tempVerificated}
                  disabled={!getValues('email')}
                  width="w-28"
                  label="인증하기"
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
                          disabled={tempVerificated}
                          onFocus={() => trigger('verificationCode')}
                          autoComplete="off"
                        />
                        <MainButton
                          type="button"
                          onClick={codeVerificationHandle}
                          width="w-28"
                          isError={!getValues('verificationCode')}
                          isVerificated={tempVerificated}
                          disabled={tempVerificated}
                          label="확인하기"
                        />
                      </SignUpVerificationContainer>
                      {
                        tempCodeCheck === 'fail'
                        && <SmallFont className="text-red-500">유효하지 않은 인증 번호입니다.</SmallFont>
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
