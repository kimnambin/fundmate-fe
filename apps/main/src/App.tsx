import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Main } from './pages/Main';
import { SearchPage } from './pages/SearchDivider';
import { Header, Loading } from '@repo/ui/components';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { PasswordReset } from './pages/PasswordReset';
import { ScrollToTop } from '@repo/ui/utils';
import { Suspense, lazy } from 'react';

const CreateFundingPage = lazy(() => import('funding/CreateFundingPage'));
const AskFundiPage = lazy(() => import('funding/AskFundiPage'));
const AskFundiResultPage = lazy(() => import('funding/AskFundiResultPage'));
const ProductPage = lazy(() => import('payment/ProductPage'));
const PaymentPage = lazy(() => import('payment/PaymentPage'));
const PaymentCompleted = lazy(() => import('payment/PaymentCompleted'));
const PaymentDetail = lazy(() => import('payment/PaymentDetail'));
const PaymentListPage = lazy(() => import('payment/PaymentListPage'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<PasswordReset />} />
          <Route path="/funding/create" element={<CreateFundingPage />} />
          <Route path="/fundi">
            <Route path="request" element={<AskFundiPage />} />
            <Route path="response" element={<AskFundiResultPage />} />
          </Route>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/payment">
            <Route index element={<PaymentPage />} />
            <Route path="completed" element={<PaymentCompleted />} />
            <Route path="detail" element={<PaymentDetail />} />
            <Route path="list" element={<PaymentListPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
