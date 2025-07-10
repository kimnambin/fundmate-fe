import { FundiIcon } from '@repo/ui/assets';
import { MainButton, Modal } from '@repo/ui/components';
import { Layout, MediumFont, Title, WarningText } from '@repo/ui/styles';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useRef, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import AddedItem from '../../components/added-item/addedItem';
import Category from '../../components/category/category';
import InputDate from '../../components/input-date/inputDate';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import { Wrapper } from '../../components/input-text-area/inputTextArea.styles';
import InputText from '../../components/input-text/inputText';
import { Label } from '../../components/input-text/inputText.styles';
import PointButton from '../../components/point-button/pointButton';
import {
  CompWrapper,
  CreateFundingStyle,
  HorizontalLine,
  InputWrapper,
} from './createFunding.styles';

function CreateFunding() {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [intro, setIntro] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<(typeof DEFAULT_ITEM)[]>([
    DEFAULT_ITEM,
  ]);

  const [hasTitle, setHasTitle] = useState(true);
  const [hasTargetAmount, setHasTargetAmount] = useState(true);
  const [hasStartDate, setHasStartDate] = useState(true);
  const [hasEndDate, setHasEndDate] = useState(true);
  const [hasDeliveryDate, setHasDeliveryDate] = useState(true);
  const [hasIntro, setHasIntro] = useState(true);
  const [hasSummary, setHasSummary] = useState(true);
  const [hasCategory, setHasCategory] = useState(true);
  const [hasGender, setHasGender] = useState(true);
  const [hasAge, setHasAge] = useState(true);
  const [hasItems, setHasItems] = useState(true);

  const [itemTitle, setItemTitle] = useState('');
  const [itemContent, setItemContent] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const [hasItemTitle, setHasItemTitle] = useState(true);
  const [hasItemContent, setHasItemContent] = useState(true);
  const [hasItemPrice, setHasItemPrice] = useState(true);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isFundiOpen, setIsFundiOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isValidItem = () =>
    [itemTitle, itemContent, itemPrice].every((value) => value.trim());

  const handleAdd = () => {
    if (!isValidItem()) {
      setHasItemTitle(!!itemTitle.trim());
      setHasItemContent(!!itemContent.trim());
      setHasItemPrice(!!itemPrice.trim());
      return;
    }
    if (addedItems.length >= 5) return;

    setAddedItems((prev) => [...prev, { itemPrice, itemTitle, itemContent }]);

    setItemTitle('');
    setHasItemTitle(true);
    setItemContent('');
    setHasItemContent(true);
    setItemPrice('');
    setHasItemPrice(true);
    setIsAddOpen(false);
  };

  const validateFunding = () => {
    const isValid = {
      title: !!title.trim(),
      targetAmount: !!targetAmount.trim(),
      startDate: !!startDate.trim(),
      endDate: !!endDate.trim(),
      deliveryDate: !!deliveryDate.trim(),
      intro: !!intro.trim(),
      summary: !!summary.trim(),
      category: !!category,
      gender: !!gender,
      age: !!age,
      items: addedItems.length > 0,
    };

    setHasTitle(isValid.title);
    setHasTargetAmount(isValid.targetAmount);
    setHasStartDate(isValid.startDate);
    setHasEndDate(isValid.endDate);
    setHasDeliveryDate(isValid.deliveryDate);
    setHasIntro(isValid.intro);
    setHasSummary(isValid.summary);
    setHasCategory(isValid.category);
    setHasGender(isValid.gender);
    setHasAge(isValid.age);
    setHasItems(isValid.items);

    return Object.values(isValid).every(Boolean);
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    if (!validateFunding()) return;
    setIsSubmitOpen(true);
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
      setSummary(text);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <Layout>
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
          <div className="flex flex-col gap-[20px]">
            <InputText
              width="sm:w-[350px]"
              label="프로젝트 제목"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isError={isSubmit && title.trim().length === 0}
            />
          </div>

          <InputText
            width="sm:w-[350px]"
            label="목표 금액"
            placeholder="목표 금액을 입력하세요."
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            isError={isSubmit && targetAmount.trim().length === 0}
          />

          <div className="flex flex-col gap-[20px]">
            <InputDate
              width="sm:w-[350px]"
              label="프로젝트 기간"
              placeholder="펀딩 시작일을 입력하세요."
              value={startDate}
              onChange={setStartDate}
              isError={isSubmit && startDate.trim().length === 0}
            />
            <InputDate
              width="sm:w-[350px]"
              placeholder="펀딩 종료일을 입력하세요."
              value={endDate}
              onChange={setEndDate}
              isError={isSubmit && endDate.trim().length === 0}
            />
          </div>

          <InputDate
            width="sm:w-[350px]"
            label="상품 배송일"
            placeholder="예상 상품 배송일을 입력하세요."
            value={deliveryDate}
            onChange={setDeliveryDate}
            isError={isSubmit && deliveryDate.trim().length === 0}
          />

          <Wrapper>
            <Label>프로젝트 소개</Label>
            <div data-color-mode="light">
              <MarkdownEditor
                value={intro}
                height="400px"
                placeholder={'프로젝트(펀딩)에 대한 설명을 작성해주세요!'}
                onChange={(value) => {
                  setIntro(value);
                }}
              />
            </div>
            {isSubmit && intro.trim().length === 0 && (
              <WarningText>프로젝트 소개를 작성해주세요.</WarningText>
            )}
          </Wrapper>
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
            <div className="flex flex-col gap-5 min-w-[400px] max-w-[80vw]">
              <div className="flex flex-col gap-[10px]">
                <Title>내가 입력한 내용</Title>
                <MediumFont className="break-words">
                  {intro ? (
                    <div data-color-mode="light">
                      <MarkdownEditor.Markdown source={intro} />
                    </div>
                  ) : (
                    <span className="text-sub-text">
                      입력한 내용이 없습니다.
                    </span>
                  )}
                </MediumFont>
              </div>
              <HorizontalLine />
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-2">
                  <Title>펀디가 추천하는 한 줄 소개</Title>
                  <img src={FundiIcon} width="20px" />
                </div>
                <MediumFont ref={summaryRef} className="break-words">
                  펀디가 요약한 내용
                </MediumFont>
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
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={50}
            width="sm:w-[350px]"
            isError={isSubmit && summary.trim().length === 0}
          />

          <CompWrapper>
            <Label>분류</Label>
            <div className="flex gap-[20px]">
              <Category
                title={filters[0].title}
                options={filters[0].options}
                selected={category}
                onSelect={setCategory}
              />
              <Category
                title={filters[1].title}
                options={filters[1].options}
                selected={gender}
                onSelect={setGender}
              />
              <Category
                title={filters[2].title}
                options={filters[2].options}
                selected={age}
                onSelect={setAge}
              />
            </div>
            {isSubmit && (!category || !gender || !age) && (
              <WarningText>카테고리와 타켓층을 선택하세요.</WarningText>
            )}
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
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                />
                {!hasItemTitle && (
                  <WarningText>상품명을 입력하세요</WarningText>
                )}
                <InputTextArea
                  placeholder="상품 내용을 입력하세요."
                  rows={5}
                  value={itemContent}
                  onChange={(e) => setItemContent(e.target.value)}
                />
                {!hasItemContent && (
                  <WarningText>상품 내용을 입력하세요</WarningText>
                )}
                <InputText
                  placeholder="상품 금액을 입력하세요."
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
                {!hasItemPrice && (
                  <WarningText>상품 금액을 입력하세요</WarningText>
                )}
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
                  price={item.itemPrice}
                  title={item.itemTitle}
                  content={item.itemContent}
                  onRemove={() => handleRemove(index)}
                />
              ))}
            </div>
            {isSubmit && addedItems.length === 0 && (
              <WarningText>상품을 추가해주세요.</WarningText>
            )}
          </CompWrapper>
        </InputWrapper>

        <div className="flex justify-end">
          <MainButton
            width="w-[200px]"
            label="개설하기"
            onClick={handleSubmit}
          />
          <Modal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)}>
            <div className="flex flex-col gap-5 justify-center py-[20px] px-[30px] w-[70vw] sm:w-auto">
              <div className="text-center flex flex-col gap-[10px]">
                <Title>개설 시 수정이 불가능합니다.</Title>
                <MediumFont>개설하시겠습니까?</MediumFont>
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
    </Layout>
  );
}

export default CreateFunding;

// 임시 데이터
export const filters = [
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
    options: ['10대', '20대', '30대', '40대', '50대 이상', '모든 연령'],
  },
];

const DEFAULT_ITEM = {
  itemPrice: '1,000',
  itemTitle: '선물 없이 후원하기',
  itemContent: '혜택 상품 없음',
};
