import { Header } from '@repo/ui/components';
import { Container } from './components/styles/flex.style';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PaymentcompletedPage = lazy(() => import('./pages/PaymentcompletedPage'));
const PaymentDetail = lazy(() => import('./pages/PaymentDetail'));
const PaymentListPage = lazy(() => import('./pages/PaymentListPage'));
// const ProductInfo = lazy(() => import('./components/productPage/ProductInfo'));

function App() {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<>로딩 중...</>}>
          <Routes>
            {/* TODO : 카테고리/상품ID 로 넣어도 좋을듯 */}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/payment" element={<PaymentPage />} /> {/* CSS이상 */}
            <Route
              path="/payment-completed"
              element={<PaymentcompletedPage />}
            />
            <Route path="/payment-detail" element={<PaymentDetail />} />{' '}
            {/* 잘됨 */}
            <Route path="/payment-list" element={<PaymentListPage />} />{' '}
            {/* 잘됨 */}
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
