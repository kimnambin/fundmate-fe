import { MainButton } from '@repo/ui/components';
import { Layout, Title, WarningText } from '@repo/ui/styles';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddedItem from '../../components/added-item/addedItem';
import CategoryGroup from '../../components/category/categoryGroup';
import CreateModal from '../../components/create-funding-page/createModal';
import ImageUpload from '../../components/create-funding-page/imageUpload';
import InfoForm from '../../components/create-funding-page/infoForm';
import IntroForm from '../../components/create-funding-page/introForm';
import OptionAddModal from '../../components/create-funding-page/optionAddModal';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import { Label } from '../../components/input-text/inputText.styles';
import PointButton from '../../components/point-button/pointButton';
import { useCategoryConfigs } from '../../hooks/useCategoryConfigs';
import { CompWrapper, CreateFundingStyle } from './createFunding.styles';
import {
  useCreateFunding,
  useCreateOption,
  useDeleteOption,
} from '../../hooks/useCreateFunding';
import type {
  CreateFundingData,
  Option,
} from '../../types/createFunding.types';
import { isAxiosError } from 'axios';
import { formatPriceToNumber } from '../../../../../packages/ui/utils/format';
import { DEFAULT_OPTION } from '../../constants/items';
import { tempLogin } from '../../api/createFunding';

function CreateFunding() {
  const navigate = useNavigate();

  // const [imageId, setImageId] = useState(null);
  const [title, setTitle] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  const [addedOptions, setAddedOptions] = useState<Option[]>([]);
  const [optionTitle, setOptionTitle] = useState('');
  const [optionContent, setOptionContent] = useState('');
  const [optionPrice, setOptionPrice] = useState('');

  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isFundiOpen, setIsFundiOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { configs, category, gender, age } = useCategoryConfigs();
  const { mutate } = useCreateFunding();
  const { mutate: createOption } = useCreateOption();
  const { mutate: deleteOption } = useDeleteOption();

  useEffect(() => {
    // 로그인 임시 연동 코드
    const autoLogin = async () => {
      try {
        await tempLogin('a@mail.com', 'zzz111');
        console.log('임시 로그인');
      } catch (err) {
        console.log('로그인 실패: ', err);
      }
    };
    // autoLogin();

    createOption(
      {
        title: DEFAULT_OPTION.title,
        description: DEFAULT_OPTION.description,
        price: DEFAULT_OPTION.price,
      },
      {
        onSuccess: (res) => {
          console.log('기본 옵션 생성 성공: ', res);
          setAddedOptions([
            {
              id: res.option_id,
              title: DEFAULT_OPTION.title,
              description: DEFAULT_OPTION.description,
              price: DEFAULT_OPTION.price,
            },
          ]);
        },
        onError: (err) => {
          console.log('기본 옵션 생성 실패: ', err);
        },
      },
    );
  }, []);

  const isInvalidDate = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return false;
    return new Date(endDate) < new Date(startDate);
  };

  const isValidFilter = () =>
    [category, gender, age].every((value) => value !== null);

  const isValidOption = () =>
    [optionTitle, optionContent, optionPrice].every((value) => value.trim());

  const handleAdd = () => {
    setIsAdd(true);

    if (!isValidOption()) return;
    if (addedOptions.length >= 5) return;

    createOption(
      {
        title: optionTitle,
        description: optionContent,
        price: formatPriceToNumber(optionPrice),
      },
      {
        onSuccess: (res) => {
          console.log('옵션 생성 성공: ', res.option_id);

          setAddedOptions((prev) => [
            ...prev,
            {
              id: res.option_id,
              title: optionTitle,
              description: optionContent,
              price: formatPriceToNumber(optionPrice),
            },
          ]);

          setOptionTitle('');
          setOptionContent('');
          setOptionPrice('');
          setIsAddOpen(false);
          setIsAdd(false);
        },
        onError: (err) => {
          console.log('옵션 생성 실패: ', err);
        },
      },
    );
  };

  const handleDelete = (index: number, itemId: number) => {
    setAddedOptions((prev) => prev.filter((_, i) => i !== index));

    deleteOption(itemId, {
      onSuccess: (res) => {
        console.log('옵션 삭제 성공: ', res.message);
      },
      onError: (err) => {
        console.log('옵션 삭제 실패: ', err);
      },
    });
  };

  const isValidFunding = () =>
    [
      title.trim(),
      goalAmount.trim(),
      startDate.trim(),
      endDate.trim(),
      deliveryDate.trim(),
      description.trim(),
      shortDescription.trim(),
      category,
      gender,
      age,
    ].every(Boolean) && addedOptions.length > 0;

  const handleSubmit = () => {
    setIsSubmit(true);
    if (!isValidFunding()) return;
    setIsSubmitOpen(true);
  };

  const summaryRef = useRef<HTMLParagraphElement>(null);
  const handleCopy = () => {
    if (!summaryRef.current) return;

    const text = summaryRef.current.innerText.trim();
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setShortDescription(text);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleCreate = () => {
    const optionIds = addedOptions
      .filter((option) => option.id !== undefined)
      .map((option) => option.id!);

    if (category === null || gender === null || age === null) return;

    const data: CreateFundingData = {
      image_id: 1, // 임시 아이디 - 이미지 업로드 구현 후 수정 예정
      title: title,
      goal_amount: formatPriceToNumber(goalAmount),
      start_date: startDate,
      end_date: endDate,
      delivery_date: deliveryDate,
      short_description: shortDescription,
      description: description,
      category_id: category,
      option_ids: optionIds,
      gender: gender,
      age_group: age,
    };

    setIsSubmitOpen(false);

    mutate(data, {
      onSuccess: (data) => {
        console.log('펀딩 개설 성공: ', data.message);
        navigate('/product');
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          console.error(error.response?.data?.message ?? '에러 발생');
        } else {
          console.error(error.message ?? '알 수 없는 에러가 발생했습니다');
        }
      },
    });
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
          goalAmount={goalAmount}
          setGoalAmount={setGoalAmount}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isInvalidDate={isInvalidDate}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
        />

        <IntroForm
          description={description}
          setDescription={setDescription}
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
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          maxLength={50}
          width="sm:w-[350px]"
          isError={isSubmit && shortDescription.trim().length === 0}
        />

        <CompWrapper>
          <Label>분류</Label>
          <CategoryGroup configs={configs} />
          {isSubmit && (!category || !gender || !age) && (
            <WarningText>카테고리와 타켓층을 선택하세요.</WarningText>
          )}
        </CompWrapper>

        <CompWrapper>
          <div className="w-auto flex justify-between items-center">
            <Label>상품 추가</Label>
            {addedOptions.length < 5 && (
              <PointButton
                label="상품 추가하기"
                onClick={() => setIsAddOpen(true)}
              />
            )}
          </div>
          <OptionAddModal
            isAddOpen={isAddOpen}
            setIsAddOpen={setIsAddOpen}
            isAdd={isAdd}
            optionTitle={optionTitle}
            setOptionTitle={setOptionTitle}
            optionContent={optionContent}
            setOptionContent={setOptionContent}
            optionPrice={optionPrice}
            setOptionPrice={setOptionPrice}
            handleAdd={handleAdd}
          />

          <div className="flex flex-col gap-[10px]">
            {addedOptions.map((option, index) => (
              <AddedItem
                key={index}
                price={String(option.price)}
                title={option.title}
                content={option.description}
                onRemove={() => {
                  if (option.id !== undefined) {
                    handleDelete(index, option.id);
                  }
                }}
              />
            ))}
          </div>
          {isSubmit && addedOptions.length === 0 && (
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
