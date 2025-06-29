import tw from 'tailwind-styled-components';

export const ProductInfo = tw.div`
    flex
    flex-row
    items-center
    mb-7
`;
export const ProdusctImg = tw.img`
    w-24
    h-24
  bg-slate-400
    rounded-md
    mr-6
    ${({ ishas }) => (ishas ? 'border border-main-color' : '')}
`;
export const Title = tw.h3`
    text-base
`;
