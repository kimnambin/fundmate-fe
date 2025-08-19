import { Header } from '@repo/ui/components';
import { Loading } from '@repo/ui/components';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PaymentcompletedPage = lazy(() => import('./pages/PaymentcompletedPage'));
const PaymentDetail = lazy(() => import('./pages/PaymentDetail'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/product/:projectId" element={<ProductPage />} />
          <Route path="/payment/:projectId">
            <Route index element={<PaymentPage />} />
            <Route path="completed" element={<PaymentcompletedPage />} />
            <Route path="detail" element={<PaymentDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
