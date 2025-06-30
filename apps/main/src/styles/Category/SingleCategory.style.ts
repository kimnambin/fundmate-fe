type CategoryImageSize = {
  $location: 'main' | 'bar'
}

import tw from "tailwind-styled-components";

export const SingleCategoryContainer = tw.div`
  flex
  flex-col
  items-center
  gap-3
  cursor-pointer
`

export const CategoryImage = tw.img<CategoryImageSize>`
  ${p => p.$location === 'main' ? 'w-16' : 'w-8'}
`

export const CategoryText = tw.span<CategoryImageSize>`
  text-lg
  ${p => p.$location === 'main' ? 'font-semibold' : 'font-base'}
`
