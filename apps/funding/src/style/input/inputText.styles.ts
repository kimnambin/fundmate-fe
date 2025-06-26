import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    ${({ width }) => width ?? 'w-auto'}
    flex
    flex-col
    gap-[20px]
`;

export const Label = tw.label`
    font-bold
`;

export const InputStyle = tw.input`
    border border-line
    rounded-[5px]
    py-[10px] px-[15px]
    placeholder-input-text
    focus:outline-none focus:border-main
`;
