import { Label } from '../input-text/inputText.styles';
import PointButton from '../point-button/pointButton';
import { Wrapper } from './createFunding.styles';

const ImageUpload = () => {
  return (
    <Wrapper>
      <Label>이미지</Label>
      <div className="w-full flex gap-5 items-center">
        <div className="w-[130px] h-[130px] bg-[#D9D9D9] rounded-lg" />
        <PointButton label="대표 이미지 선택" />
      </div>
    </Wrapper>
  );
};

export default ImageUpload;
