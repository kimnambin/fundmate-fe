import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    ${({ width }) => width ?? 'w-auto'}
    flex
    flex-col
    gap-[20px]
`;

export const Label = tw.label`
    font-bold text-[16px]
`;

export const InputStyle = tw.input<{ isError?: boolean }>`
    border border-line
    rounded-[5px]
    py-[10px] px-[15px]
    placeholder-input-text
    focus:outline-none focus:border-main
    ${({ isError }) => (isError ? 'border-red' : 'border-line')}
`;
