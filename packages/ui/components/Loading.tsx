import { Wrapper } from '../styles/Loading.style';
import LogoIcon from '../assets/icons/ic_fundi.svg';

export const Loading = () => {
  return (
    // <div className="flex justify-center items-center">
    <Wrapper>
      <img
        src={LogoIcon}
        alt="Loading"
        className="w-[140px] h-[140px] animate-spin-slow origin-center"
      />
      <p className="text-[24px]">
        <span className="text-main font-bold">펀디</span>는 펀딩을 도와주는
        AI예요
      </p>
    </Wrapper>
    // </div>
  );
};
