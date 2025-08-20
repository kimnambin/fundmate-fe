import Productinfos from '../paymentPage/ProductMiniInfo';
import useMockData from '../../hooks/mock/useMockData';

const PaymentDetailTop = () => {
  const { productData } = useMockData();

  // TODO : 후원정보뜨는거 컴포넌트 하나 더 만들어야 할 듯 수정해야 함
  return (
    <div>
      <Productinfos title={productData.title} imgUrl={productData.image_url} />
    </div>
  );
};

export default PaymentDetailTop;
