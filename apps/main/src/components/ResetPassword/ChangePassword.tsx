import { InputContainer } from '../../styles/User/SignUp.style';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText, MainButton } from '@repo/ui/components';
import { MediumFont, Title } from '@repo/ui/styles';
import { emailVerifiedStore } from '../../stores/EmailVerifiedStore';
// import { commonApiInstance } from "@repo/ui/hooks"

const schema = yup.object({
  password: yup.string().required(),
  checkPassword: yup
    .string()
    .oneOf([yup.ref('password')])
    .required(),
});

type ChangePasswordProps = yup.InferType<typeof schema>;

export const ChangePassword = () => {
  const navigate = useNavigate();
  const email = emailVerifiedStore((state) => state.email);
  const code = emailVerifiedStore((state) => state.code);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordProps>({
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {
    const { password, checkPassword } = data;
    const finalData = {
      email,
      code,
      new_password: password,
      confirm_password: checkPassword,
    };

    // await commonApiInstance
    //   .patch('/auth/password', finalData)
    //   .then((response) => {
    //     console.log(response);
    //     window.localStorage.removeItem('auth');
    //     navigate('/login');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <form
      className="flex flex-col w-full gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title>비밀번호 재설정</Title>
      <InputContainer>
        <InputText
          type="password"
          placeholder="변경할 비밀번호를 입력해주세요."
          isError={!!errors.password}
          {...register('password')}
        />
        <InputText
          type="password"
          placeholder="변경할 비밀번호를 한 번 더 입력해주세요."
          isError={!!errors.checkPassword}
          {...register('checkPassword')}
        />
        {errors.checkPassword && (
          <MediumFont className="text-red">
            비밀번호가 동일하지 않습니다
          </MediumFont>
        )}
      </InputContainer>
      <MainButton
        type="submit"
        isError={!isValid}
        disabled={!isValid}
        width="w-full"
        label="비밀번호 재설정"
      />
    </form>
  );
};
