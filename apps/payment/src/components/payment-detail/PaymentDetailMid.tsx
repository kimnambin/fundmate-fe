import { MainButton } from '@repo/ui/components';
import { BoxRow, FlexCol, FlexColsm, FlexRowsm } from '../styles/layout.style';
import { BoldBigText, BoldText } from '../styles/text.style';
import { formatNum } from '../../utils/numbers';

import { useEffect, useState } from 'react';
import { useGetiInsertedId } from '../../hooks/useGetiInsertedId';
import { usePatchReservation } from '../../hooks/payment/save/usePatchSavePayment';
import { OptionModal } from '../modal/OptionModal';
import { usePriceStore } from '../../store/mock/mockUpdatePrice';

interface OptionModalProps {
  price: number;
  isOpen: boolean;
  handleOpenModal: () => void;
  onClose?: () => void;
  scheduleDate: string;
  address: string;
  addressNumber: number;
  addressInfo: string;
  onUpdatePrice: (price: number) => void;
}

const PaymentDetailMid: React.FC<OptionModalProps> = ({
  price,
  isOpen,
  handleOpenModal,
  onClose,
  scheduleDate,
  address,
  addressNumber,
  addressInfo,
  onUpdatePrice,
}) => {
  const [localPrice, setLocalPrice] = useState(price);

  useEffect(() => {
    setLocalPrice(price);
  }, [price]);

  const [, setSelectedRewardId] = useState<number | null>(null);
  const id = useGetiInsertedId();

  const patchAPI = usePatchReservation(Number(id));

  const handleSelectOption = async ({
    rewardId,
    price,
  }: {
    rewardId: number;
    price: number;
  }) => {
    const { setUpdatedPrice } = usePriceStore.getState();

    setLocalPrice(price);
    onUpdatePrice(price);
    setUpdatedPrice(price);

    const payload = {
      rewardId: rewardId,
      donateAmount: price,
      scheduleDate,
      address,
      addressNumber,
      addressInfo,
    };

    patchAPI.mutate(payload, {
      onSuccess: () => {
        setSelectedRewardId(rewardId);
        alert('선물이 변경이 완료되었습니다!');
        onClose?.();
      },
      onError: () => {
        alert('선물 변경 실패');
        setLocalPrice(price);
      },
    });
  };

  return (
    <>
      <OptionModal
        isOpen={isOpen}
        onClose={onClose}
        onSelectOption={handleSelectOption}
      />

      <FlexCol className="items-start">
        <BoldBigText>선물 정보</BoldBigText>
        <BoxRow className="justify-between items-start">
          <FlexColsm className="items-start">
            <FlexRowsm className="w-full py-2 flex justify-between items-center">
              <BoldText className="flex-1 mr-3 text-xs">선물 금액</BoldText>
              <BoldText className="text-left">
                {formatNum(localPrice)}원
              </BoldText>
            </FlexRowsm>
          </FlexColsm>
          <MainButton
            label="변경"
            className="bg-[#E2E8F0] w-16 sm:w-[10%] p-2 text-xs text-black"
            textSize={'text-base'}
            textWeight={'font-bold'}
            onClick={handleOpenModal}
          />
        </BoxRow>
      </FlexCol>
    </>
  );
};

export default PaymentDetailMid;
