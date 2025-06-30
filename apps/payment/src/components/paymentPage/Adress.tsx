import React, { useState } from 'react';
import { FlexCol, FlexRowsm } from '../styles/flex.style';
import { BoldBigText } from '../styles/text.style';
import { BaseButton } from '../styles/product-detail/productInfo.style';
import { InputText } from '../styles/paymentPage/Adress.style';

const Adress = () => {
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');

  const handleFind = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setPostalCode(data.zonecode);
        setAddress(data.address);
        setDetailedAddress('');
      },
    }).open();
  };

  const handleDetailed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(e.target.value);
  };

  return (
    <FlexCol className="items-start justify-start gap-4 mb-10">
      <BoldBigText>주소 입력</BoldBigText>
      <FlexRowsm className="mt-5 w-full">
        <InputText
          type="text"
          placeholder="우편번호"
          value={postalCode}
          readOnly
        />
        <BaseButton className="p-2 w-[30%]" onClick={handleFind}>
          우편번호 찾기
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

export default Adress;
