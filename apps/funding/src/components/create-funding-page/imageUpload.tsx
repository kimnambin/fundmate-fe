import { Label } from '../input-text/inputText.styles';
import PointButton from '../point-button/pointButton';
import { Wrapper } from './createFunding.styles';

interface Props {
  preview: string;
  onClick: () => void;
}

const ImageUpload = ({ preview, onClick }: Props) => {
  return (
    <Wrapper>
      <Label>이미지</Label>
      <div className="w-full flex gap-5 items-center">
        <div className="w-[130px] h-[130px] bg-[#D9D9D9] rounded-lg overflow-hidden flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm text-gray-500" />
          )}
        </div>
        <PointButton label="대표 이미지 선택" onClick={onClick} />
      </div>
    </Wrapper>
  );
};

export default ImageUpload;
