import React, { useState } from 'react';
import { FlexCol, FlexRowsm } from '../styles/layout.style';
import { BoldBigText } from '../styles/text.style';
import { InputText } from '../styles/paymentPage/Address.style';
import { MainButton } from '@repo/ui/components';
import { useIsMobile } from '../../hooks/useMobile';

const Address = ({
  setAddressData,
}: {
  setAddressData: (address: string) => void;
}) => {
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const isMobile = useIsMobile();

  const handleFind = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setPostalCode(data.zonecode);
        setAddress(data.address);
        setDetailedAddress('');
        setAddressData(data.address);
      },
    }).open();
  };

  const handleDetailed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const detail = e.target.value;
    setDetailedAddress(detail);
    setAddressData(address + ' ' + detail);
  };

  return (
    <FlexCol className="items-start justify-start gap-4 mb-10 px-6 sm:px-0">
      <BoldBigText>주소 입력</BoldBigText>
      <FlexRowsm className="w-full justify-between gap-3">
        <InputText
          type="text"
          placeholder="우편번호"
          value={postalCode}
          readOnly
        />
        <MainButton
          label={isMobile ? '찾기' : '번호찾기'}
          className="p-2 w-[20%]"
          textSize={'text-base'}
          textWeight={'font-bold'}
          onClick={handleFind}
        />
      </FlexRowsm>
      <InputText type="text" placeholder="주소" value={address} readOnly />
      <InputText
        type="text"
        placeholder="상세주소"
        value={detailedAddress}
        onChange={handleDetailed}
      />
    </FlexCol>
  );
};

export default Address;
