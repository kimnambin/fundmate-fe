import ProductPage from './pages/ProductPage';
import { Header } from '@repo/ui/Header';
import PaymentPage from './pages/PaymentPage';
import { Container } from './components/styles/flex.style';
import PaymentcompletedPage from './pages/PaymentcompletedPage';
import PaymentDetail from './pages/PaymentDetail';
import PaymentListPage from './pages/PaymentListPage';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';

// TODO : 화면 구상용 더미 데이터
// interface HasProps {
//   ishas?: boolean;
// }

export interface ProductDataProps {
  [key: string]: string;
}

const productData: ProductDataProps = {
  title: '3D 미니 프런터기기',
  '모인 금액': '1,556,900원',
  '남은 시간': '8일',
  후원자: '10명',
};

const productPaymentData: ProductDataProps = {
  '목표 금액': '500,000원',
  '펀딩 기간': '2025.06.17 ~ 2025.08.20',
  결제: '목표 금액 달성 시 2025.08.20에 결제 진행',
  '예상 발송 및 시작일': '2025.08.20',
};

function App() {
  return (
    <ProductProvider
      productData={productData}
      productPaymentData={productPaymentData}
    >
      <Router>
        <div>
          <Header />
          <Container>
            <Suspense fallback={<>로딩 중...</>}>
              <Routes>
                {/* TODO : 카테고리/상품ID 로 넣어도 좋을듯 */}
                <Route path="/" element={<ProductPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route
                  path="/payment-completed"
                  element={<PaymentcompletedPage />}
                />
                <Route path="/payment-detail" element={<PaymentDetail />} />
                <Route path="/payment-list" element={<PaymentListPage />} />
              </Routes>
            </Suspense>
          </Container>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
