import { MainButton } from '@repo/ui/components';
import { BoxRow, FlexCol, FlexColsm, FlexRowsm } from '../styles/layout.style';
import { BoldBigText, BoldText } from '../styles/text.style';
import { formatNum } from '../../utils/numbers';

import { useEffect, useState } from 'react';
import { useGetiInsertedId } from '../../hooks/useGetiInsertedId';
import { usePatchReservation } from '../../hooks/payment/save/usePatchSavePayment';
import { OptionModal } from '../modal/OptionModal';

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
  const title = ['선물 정보', '추가 후원 정보'];
  const subTitle = ['선물 금액', '추가 후원금'];

  const [localPrice, setLocalPrice] = useState(price);

  useEffect(() => {
    setLocalPrice(price);
  }, [price]);

  const content = [`${formatNum(localPrice)}원`, '0원'];

  const [, setSelectedRewardId] = useState<number | null>(null);
  const id = useGetiInsertedId();

  const patchAPI = usePatchReservation(Number(id));

  // TODO : 낙관적 업데이트
  const handleSelectOption = async ({
    rewardId,
    price,
  }: {
    rewardId: number;
    price: number;
  }) => {
    setLocalPrice(price);

    onUpdatePrice(price);

    const payload = {
      rewardId: null,
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
      {title.map((v, idx) => (
        <FlexCol className="items-start" key={v}>
          <BoldBigText>{title[idx]}</BoldBigText>
          <BoxRow className="justify-between items-start">
            <FlexColsm className="items-start">
              <FlexRowsm className="w-full py-2 flex justify-between items-center">
                <BoldText className="flex-1 mr-3 text-xs">
                  {subTitle[idx]}
                </BoldText>
                <BoldText className="text-left">{content[idx]}</BoldText>
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
      ))}
    </>
  );
};

export default PaymentDetailMid;
