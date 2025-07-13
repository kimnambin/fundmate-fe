import { MainButton } from '@repo/ui/components';
import { Layout, Title, WarningText } from '@repo/ui/styles';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddedItem from '../../components/added-item/addedItem';
import CategoryGroup from '../../components/category/categoryGroup';
import CreateModal from '../../components/create-funding/createModal';
import ImageUpload from '../../components/create-funding/imageUpload';
import InfoForm from '../../components/create-funding/infoForm';
import IntroForm from '../../components/create-funding/introForm';
import ItemAddModal from '../../components/create-funding/itemAddModal';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import { Label } from '../../components/input-text/inputText.styles';
import PointButton from '../../components/point-button/pointButton';
import { CompWrapper, CreateFundingStyle } from './createFunding.styles';
import { filters } from '../../constants/categories';
import { DEFAULT_ITEM } from '../../constants/items';

function CreateFunding() {
  const navigate = useNavigate();

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

  const [itemTitle, setItemTitle] = useState('');
  const [itemContent, setItemContent] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isFundiOpen, setIsFundiOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isInvalidDate = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return false;
    return new Date(endDate) < new Date(startDate);
  };

  const isValidItem = () =>
    [itemTitle, itemContent, itemPrice].every((value) => value.trim());

  const handleAdd = () => {
    setIsAdd(true);
    if (!isValidItem()) {
      return;
    }
    if (addedItems.length >= 5) return;

    setAddedItems((prev) => [...prev, { itemPrice, itemTitle, itemContent }]);

    setItemTitle('');
    setItemContent('');
    setItemPrice('');
    setIsAddOpen(false);
    setIsAdd(false);
  };

  const isValidFunding = () =>
    [
      title.trim(),
      targetAmount.trim(),
      startDate.trim(),
      endDate.trim(),
      deliveryDate.trim(),
      intro.trim(),
      summary.trim(),
      category,
      gender,
      age,
    ].every(Boolean) && addedItems.length > 0;

  const handleSubmit = () => {
    setIsSubmit(true);
    if (!isValidFunding()) return;
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

  const handleCreate = () => {
    setIsSubmitOpen(false);
    // API 연동
    navigate('/product');
  };

  return (
    <Layout>
      <CreateFundingStyle>
        <Title>프로젝트(펀딩) 개설</Title>

        <ImageUpload />

        <InfoForm
          title={title}
          setTitle={setTitle}
          isSubmit={isSubmit}
          targetAmount={targetAmount}
          setTargetAmount={setTargetAmount}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isInvalidDate={isInvalidDate}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
        />

        <IntroForm
          intro={intro}
          setIntro={setIntro}
          isSubmit={isSubmit}
          isFundiOpen={isFundiOpen}
          setIsFundiOpen={setIsFundiOpen}
          summaryRef={summaryRef}
          copied={copied}
          handleCopy={handleCopy}
        />

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
          <CategoryGroup
            filters={filters}
            category={category}
            setCategory={setCategory}
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
          />
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
          <ItemAddModal
            isAddOpen={isAddOpen}
            setIsAddOpen={setIsAddOpen}
            isAdd={isAdd}
            itemTitle={itemTitle}
            setItemTitle={setItemTitle}
            itemContent={itemContent}
            setItemContent={setItemContent}
            itemPrice={itemPrice}
            setItemPrice={setItemPrice}
            handleAdd={handleAdd}
          />

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

        <div className="flex justify-end">
          <MainButton
            width="w-[200px]"
            label="개설하기"
            onClick={handleSubmit}
          />
          <CreateModal
            isSubmitOpen={isSubmitOpen}
            setIsSubmitOpen={setIsSubmitOpen}
            handleCreate={handleCreate}
          />
        </div>
      </CreateFundingStyle>
    </Layout>
  );
}

export default CreateFunding;
