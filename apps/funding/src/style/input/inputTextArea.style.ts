import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    ${({ width }) => width ?? 'w-full'}
    flex flex-col
    gap-[20px]
`;

export const InputStyle = tw.textarea`
    border border-line
    rounded-[5px]
    py-[10px] px-[15px]
    placeholder-input-text
    focus:outline-none focus:border-main
    resize-none overflow-hidden
    box-border
`;
