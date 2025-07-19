import { Modal } from '@repo/ui/components';
import { useState } from 'react';
import { useGetQueryString } from '../../hooks/useGetQueryString';
import { useGetProductInfo } from '../../hooks/product/getProductInfo';

import {
  GiftCard,
  GiftDesc,
  GiftItemTitle,
  GiftPrice,
  ProfileCard,
  SelectButton,
} from '../styles/product-detail/prdouctstyle.style';

interface OptionModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSelectOption?: (reward: { rewardId: number; price: number }) => void;
}

export const OptionModal: React.FC<OptionModalProps> = ({
  isOpen,
  onClose,
  onSelectOption,
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  const projectId = useGetQueryString();
  const { data: productData } = useGetProductInfo(Number(projectId));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-lg font-bold mb-4">선물을 선택하세요</h2>

        <div className="flex flex-row space-x-4 overflow-x-auto pb-2">
          {productData?.options.map((gift, idx) => {
            const isSelected = selectedOptionIndex === idx;

            return (
              <GiftCard
                key={idx}
                className={`min-w-[250px] cursor-pointer transition border rounded-md p-4 flex-shrink-0 ${
                  isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'
                }`}
                onClick={() => {
                  const confirmed = confirm(
                    `'${gift.title}'을 선택하시겠습니까?`
                  );
                  if (confirmed) {
                    setSelectedOptionIndex(idx);
                    onSelectOption?.({
                      rewardId: idx,
                      price: gift.price,
                    });
                  }
                }}
              >
                <ProfileCard className="my-0 justify-between items-center flex flex-row">
                  <GiftPrice className="text-lg font-semibold">
                    {gift.price.toLocaleString()}원
                  </GiftPrice>
                  <SelectButton>12개 남음</SelectButton>
                </ProfileCard>
                <GiftItemTitle className="mt-2 font-bold text-base">
                  {gift.title}
                </GiftItemTitle>
                <GiftDesc className="text-sm text-gray-600">
                  {gift.description}
                </GiftDesc>
              </GiftCard>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
