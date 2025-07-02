import tw from "tailwind-styled-components";

export const SignUpTitle = tw.div`
  text-xl
  font-semibold
`

export const SignUpSubTitle = tw.div`
  text-lg
`

export const SignUpContainer = tw.div`
flex
flex-col
gap-5
justify-center
items-start
w-full
`

export const InputContainer = tw.div`
flex
flex-col
justify-center
items-stretch
w-full
gap-3
`

export const SignUpVerificationContainer = tw.div`
flex
flex-row
gap-3
`

export const UserCategoryButton = tw.button<{ $selected: boolean }>`
  rounded-full
  py-2
  flex
  flex-row
  justify-center
  items-center
  ${(p) => p.$selected ? 'bg-cyan-400 font-semibold text-white' : 'bg-slate-200'}
`
