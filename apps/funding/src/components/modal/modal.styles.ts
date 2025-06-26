import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
    fixed
    inset-0
    z-50
    flex items-center justify-center
`;

export const Background = tw.div`
    absolute
    inset-0
    bg-black/40
`;

export const ModalContent = tw.div`
    relative
    py-[20px] px-[30px]
    bg-white
    border border-main rounded-[10px]
`;
