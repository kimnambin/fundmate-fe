import { GiNothingToSay } from 'react-icons/gi';
import { Title } from '../../styles';

export const NotFound = () => {
  return (
    <div className="col-span-4 row-span-2 h-[600px] w-full flex flex-col items-center justify-center gap-7 opacity-20">
      <GiNothingToSay className="text-[70px]" />
      <Title>프로젝트가 없습니다</Title>
    </div>
  );
};
