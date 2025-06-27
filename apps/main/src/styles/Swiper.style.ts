import tw from "tailwind-styled-components";

interface NavProps {
  $role: 'prev' | 'next';
  $id?: string;
}

export const NavigationContainer = tw.div<NavProps>`
  absolute
  top-1/2
  -translate-y-1/2
  ${(p) => (p.$role === 'prev' ? '-left-8' : '-right-8')}
  z-10
`

export const NavButton = tw.button<NavProps>`
  ${(p) => (p.$role === 'prev' ? `custom-prev-${p.$id}` : `custom-next-${p.$id}`)}
  flex
  justify-center
  items-center
  bg-white
  rounded-full
  w-16
  h-16
  shadow-md
`
