import React, { useState } from 'react';
import { FlexCol, FlexRowsm } from '../styles/layout.style';
import { BoldBigText } from '../styles/text.style';
import { BaseButton } from '../styles/product-detail/ProductInfo.style';
import { InputText } from '../styles/paymentPage/Address.style';
import { useIsMobile } from '@repo/ui/hooks';

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
    setAddressData(address + ' ' + postalCode + ' ' + detail);
  };

  return (
    <FlexCol className="items-start justify-start gap-4 mb-10 px-6 sm:px-0">
      <BoldBigText>주소 입력</BoldBigText>
      <FlexRowsm className="mt-5 w-full">
        <InputText
          type="text"
          placeholder="우편번호"
          value={postalCode}
          readOnly
        />
        <BaseButton className="w-[30%] p-2" onClick={handleFind}>
          {isMobile ? '찾기' : '번호 찾기'}
        </BaseButton>
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
