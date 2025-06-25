import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
    flex
    flex-col
    gap-[20px]
`;

export const InputStyle = tw.textarea`
    border border-line
    rounded-sm
    px-[20px]
    py-[15px]
    placeholder-input-text
    focus:outline-none focus:border-main
`;
