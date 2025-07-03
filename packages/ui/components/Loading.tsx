import { Wrapper } from '../styles/Loading.style';
import { FundiIcon } from '../assets';

export const Loading = () => {
  return (
    <Wrapper>
      <img
        src={FundiIcon}
        alt="Loading"
        className="w-[140px] h-[140px] animate-spin-slow origin-center"
      />
      <p className="text-[24px]">
        <span className="text-main font-bold">펀디</span>는 펀딩을 도와주는
        AI예요
      </p>
    </Wrapper>
  );
};
