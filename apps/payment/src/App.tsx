import { Header } from '@repo/ui/components';
import { Loading } from '@repo/ui/components';
import { Container } from './components/styles/flex.style';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PaymentcompletedPage = lazy(() => import('./pages/PaymentcompletedPage'));
const PaymentDetail = lazy(() => import('./pages/PaymentDetail'));
const PaymentListPage = lazy(() => import('./pages/PaymentListPage'));

function App() {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* TODO : 카테고리/상품ID 로 넣어도 좋을듯 */}
            <Route path="/product" element={<ProductPage />} />
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
    </>
  );
}

export default App;
