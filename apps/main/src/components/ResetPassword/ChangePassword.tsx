import { CommonButton } from "@repo/ui/CommonButton"
import { InputContainer, SignUpTitle } from "../../styles/User/SignUp.style"
import { UserInput } from "../../styles/User/UserPage.Styles"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup.object({
  password: yup.string().required(),
  checkPassword: yup.string().oneOf([yup.ref('password')]).required()
})

type ChangePasswordProps = yup.InferType<typeof schema>

export const ChangePassword = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ChangePasswordProps>({
    resolver: yupResolver(schema),
    shouldFocusError: false,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  return (
    <form className="flex flex-col w-full gap-5">
      <SignUpTitle><span>비밀번호 재설정</span></SignUpTitle>
      <InputContainer>
        <UserInput
          type='password'
          placeholder='변경할 이메일을 입력해주세요.'
          {...register('password')}
          $isError={!!errors.password}
        />
        <UserInput
          type='password'
          placeholder='변경할 이메일을 한 번 더 입력해주세요.'
          {...register('checkPassword')}
          $isError={!!errors.checkPassword}
        />
      </InputContainer>
      <CommonButton
        onClick={() => { navigate('/login') }}
        type='button'
        $isError={!isValid}
        disabled={!isValid}
      >
        <span>비밀번호 재설정</span>
      </CommonButton>
    </form>
  )
}
