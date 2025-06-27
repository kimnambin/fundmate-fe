import { useRef, useState } from 'react';
import AddedItem from '../../components/added-item/addedItem';
import Category from '../../components/category/category';
import InputDate from '../../components/input-date/inputDate';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import InputText from '../../components/input-text/inputText';
import { Label } from '../../components/input-text/inputText.styles';
import MainButton from '../../components/main-button/mainButton';
import PointButton from '../../components/point-button/pointButton';
import {
  CompWrapper,
  CreateFundingStyle,
  HorizontalLine,
  InputWrapper,
  Title,
  WarningText,
} from './createFunding.styles';
import Modal from '../../components/modal/modal';
import { IoClose } from 'react-icons/io5';
import { FiCopy, FiCheck } from 'react-icons/fi';
import FundiIcon from '../../assets/icons/ic_fundi.svg';

function CreateFunding() {
  const [isFundiOpen, setIsFundiOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addedItems, setAddedItems] = useState<(typeof DEFAULT_ITEM)[]>([
    DEFAULT_ITEM,
  ]);
  const [intro, setIntro] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const [hasTitle, setHasTitle] = useState(true);
  const [hasContent, setHasContent] = useState(true);
  const [hasPrice, setHasPrice] = useState(true);

  const isValidItem = () =>
    [title, content, price].every((value) => value.trim());

  const handleAdd = () => {
    if (!isValidItem()) {
      setHasTitle(!!title.trim());
      setHasContent(!!content.trim());
      setHasPrice(!!price.trim());
      return;
    }
    if (addedItems.length >= 5) return;

    setAddedItems((prev) => [...prev, { price, title, content }]);

    setTitle('');
    setHasTitle(true);
    setContent('');
    setHasContent(true);
    setPrice('');
    setHasPrice(true);
    setIsAddOpen(false);
  };

  const handleRemove = (index: number) => {
    setAddedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const summaryRef = useRef<HTMLParagraphElement>(null);
  const handleCopy = () => {
    if (!summaryRef.current) return;

    const text = summaryRef.current.innerText.trim();
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <CreateFundingStyle>
      <Title>프로젝트(펀딩) 개설</Title>

      <div className="flex flex-col gap-5">
        <Label>이미지</Label>
        <div className="w-full flex gap-5 items-center">
          <div className="w-[130px] h-[130px] bg-[#D9D9D9] rounded-lg" />
          <PointButton label="대표 이미지 선택" />
        </div>
      </div>

      <InputWrapper>
        <InputText
          width="sm:w-[350px]"
          label="프로젝트 제목"
          placeholder="제목을 입력하세요."
        />

        <InputText
          width="sm:w-[350px]"
          label="목표 금액"
          placeholder="목표 금액을 입력하세요."
        />

        <div className="flex flex-col gap-[20px]">
          <InputDate
            width="sm:w-[350px]"
            label="프로젝트 기간"
            placeholder="펀딩 시작일을 입력하세요."
          />
          <InputDate
            width="sm:w-[350px]"
            placeholder="펀딩 종료일을 입력하세요."
          />
        </div>

        <InputDate
          width="sm:w-[350px]"
          label="상품 배송일"
          placeholder="예상 상품 배송일을 입력하세요."
        />

        <InputTextArea
          label="프로젝트 소개"
          placeholder="프로젝트(펀딩)에 대한 설명을 작성해 주세요!"
          rows={10}
          width="w-full"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
        <div className="w-auto flex justify-end">
          <MainButton
            width="w-[200px]"
            label="AI 요약"
            onClick={() => setIsFundiOpen(true)}
          />
        </div>

        <Modal isOpen={isFundiOpen} onClose={() => setIsFundiOpen(false)}>
          <div className="flex justify-end">
            <IoClose
              size={24}
              className="cursor-pointer"
              onClick={() => setIsFundiOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-5 w-[70vw] sm:w-[315px]">
            <div className="flex flex-col gap-[10px]">
              <Title>내가 입력한 내용</Title>
              <p className="break-words">
                {intro ? (
                  intro
                ) : (
                  <span className="text-sub-text">입력한 내용이 없습니다.</span>
                )}
              </p>
            </div>
            <HorizontalLine />
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-2">
                <Title>펀디 요약</Title>
                <img src={FundiIcon} width="20px" />
              </div>
              <p ref={summaryRef} className="break-words">
                펀디가 요약한 내용
              </p>
            </div>
            <div className="flex justify-end">
              {copied ? (
                <FiCheck size={24} className="text-main" />
              ) : (
                <FiCopy
                  size={24}
                  className=" text-main cursor-pointer hover:opacity-50"
                  onClick={handleCopy}
                />
              )}
            </div>
          </div>
        </Modal>

        <InputTextArea
          label="한 줄 소개"
          placeholder="한 줄 소개를 입력하세요."
          maxLength={50}
          width="sm:w-[350px]"
        />

        <CompWrapper>
          <Label>분류</Label>
          <div className="flex gap-[20px]">
            {filters.map((filter) => (
              <Category
                key={filter.title}
                title={filter.title}
                options={filter.options}
              />
            ))}
          </div>
        </CompWrapper>

        <CompWrapper>
          <div className="w-auto flex justify-between items-center">
            <Label>상품 추가</Label>
            {addedItems.length < 5 && (
              <PointButton
                label="상품 추가하기"
                onClick={() => setIsAddOpen(true)}
              />
            )}
          </div>
          <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
            <div className="flex justify-end">
              <IoClose
                size={24}
                className="cursor-pointer"
                onClick={() => setIsAddOpen(false)}
              />
            </div>
            <div className="flex flex-col gap-5  w-[70vw] sm:w-[440px]">
              <Title>상품 추가</Title>
              <InputText
                placeholder="상품명을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {!hasTitle && <WarningText>상품명을 입력하세요</WarningText>}
              <InputTextArea
                placeholder="상품 내용을 입력하세요."
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {!hasContent && <WarningText>상품 내용을 입력하세요</WarningText>}
              <InputText
                placeholder="상품 금액을 입력하세요."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {!hasPrice && <WarningText>상품 금액을 입력하세요</WarningText>}
              <div className="flex justify-end">
                <MainButton
                  label="상품 추가하기"
                  width="w-[200px]"
                  className="cursor-pointer hover:opacity-50"
                  onClick={handleAdd}
                />
              </div>
            </div>
          </Modal>
          <div className="flex flex-col gap-[10px]">
            {addedItems.map((item, index) => (
              <AddedItem
                key={index}
                price={item.price}
                title={item.title}
                content={item.content}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </div>
        </CompWrapper>
      </InputWrapper>

      <div className="flex justify-end">
        <MainButton
          width="w-[200px]"
          label="개설하기"
          onClick={() => setIsSubmitOpen(true)}
        />
        <Modal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)}>
          <div className="flex flex-col gap-5 justify-center py-[20px] px-[30px] w-[70vw] sm:w-auto">
            <div className="text-center flex flex-col gap-[10px]">
              <Title>개설 시 수정이 불가능합니다.</Title>
              <p>개설하시겠습니까?</p>
            </div>

            <div className="flex gap-[20px] justify-center">
              <PointButton
                label="아니오"
                width="w-[200px]"
                onClick={() => setIsSubmitOpen(false)}
              />
              <MainButton
                label="예"
                width="w-[200px]"
                onClick={() => setIsSubmitOpen(false)}
              />
            </div>
          </div>
        </Modal>
      </div>
    </CreateFundingStyle>
  );
}

export default CreateFunding;

// 임시 데이터
const filters = [
  {
    title: '카테고리',
    options: [
      '게임',
      '홈/리빙',
      '테크/가전',
      '향수/뷰티',
      '의류',
      '잡화',
      '디자인',
      '예술',
    ],
  },
  { title: '성별', options: ['남성', '여성', '관계없음'] },
  {
    title: '연령',
    options: ['10대', '20대', '30대', '40대', '50대 이상'],
  },
];

const DEFAULT_ITEM = {
  price: '1,000원',
  title: '선물 없이 후원하기',
  content: '혜택 상품 없음',
};
