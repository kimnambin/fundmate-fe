import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    ${({ width }) => width ?? 'w-auto'}
    relative
    flex
    flex-col
    gap-[20px]
`;

export const DatePickerWrapper = tw.div`
    relative
    w-full
`;

export const DatePickerField = tw.input`
    w-full
    bg-white
    border border-line
    rounded-[5px]
    py-[10px] px-[15px]
    pr-12
    text-text-active
    placeholder-input-text
    focus:outline-none focus:border-main
`;
