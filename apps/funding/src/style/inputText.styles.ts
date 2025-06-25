import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
    flex
    flex-col
    gap-[20px]
`;

export const Label = tw.label`
    font-bold
`;

export const InputStyle = tw.input`
    border
    border-slate-200
    rounded-sm
    px-[10px]
    py-[15px]
    placeholder-slate-400
`;
