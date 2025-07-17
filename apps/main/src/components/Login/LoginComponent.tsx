import { Images } from '@repo/ui/assets';

import googleIcon from '../../assets/icons/googleIcon.png';
import naverIcon from '../../assets/icons/naverIcon.svg';
import kakaoTalkIcon from '../../assets/icons/kakaotalkIcon.png';
import {
  HorizonLine,
  UserContainer,
  UserLayout,
  UserNaigater,
} from '../../styles/User/UserPage.Styles';
import {
  LoginContainer,
  SocialLoginContainer,
  SocialLoginIcon,
  SocialLoginIconContainer,
} from '../../styles/User/Login.style';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText, MainButton } from '@repo/ui/components';
import { MediumFont, SmallFont } from '@repo/ui/styles';
import { commonApiInstance } from '@repo/ui/hooks';
import { useState } from 'react';
import { loginStore } from '@repo/ui/loginStore';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LoginProps = yup.InferType<typeof schema>;

export const LoginComponent = () => {
  const navigate = useNavigate();
  const [isError, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    console.log(data);
    await commonApiInstance
      .post('/auth/login', data)
      .then((response) => {
        window.localStorage.setItem('nickname', response.data?.nickname);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  };
  return (
    <UserLayout>
      <UserContainer>
        <LoginContainer>
          <img className="w-60 mb-12" src={Images.Fundmate} />
          <form
            className="flex flex-col w-full gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <InputText
                width="w-full"
                placeholder="이메일을 입력해주세요."
                {...register('email')}
                isError={!!errors.email}
              />
              <InputText
                width="w-full"
                placeholder="비밀번호를 입력해주세요."
                {...register('password')}
                isError={!!errors.password}
                type="password"
              />
            </div>
            <MainButton
              type="submit"
              width="w-full"
              label="로그인"
            ></MainButton>
            {isError && (
              <SmallFont className="text-red">
                아이디와 비밀번호를 확인해주세요!
              </SmallFont>
            )}
          </form>
          <UserNaigater>
            <Link to="/signup">
              <MediumFont>회원가입</MediumFont>
            </Link>
            <Link to="/reset">
              <MediumFont>비밀번호 재설정</MediumFont>
            </Link>
          </UserNaigater>
        </LoginContainer>
        <HorizonLine />
        <SocialLoginContainer>
          <MediumFont>SNS 계정으로 간편하게 시작하기</MediumFont>
          <SocialLoginIconContainer>
            <SocialLoginIcon src={googleIcon} />
            <SocialLoginIcon src={naverIcon} />
            <SocialLoginIcon src={kakaoTalkIcon} />
          </SocialLoginIconContainer>
        </SocialLoginContainer>
      </UserContainer>
    </UserLayout>
  );
};
