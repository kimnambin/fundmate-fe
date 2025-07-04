import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Main } from './pages/Main';
import { SearchPage } from './pages/SearchDivider';
import { Header } from '@repo/ui/components';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { PasswordReset } from './pages/PasswordReset';
import { ScrollToTop } from '@repo/ui/utils';
import { lazy } from 'react';

// const CreateFundingPage = lazy(() => import('funding/CreateFundingPage'));
// const AskFundiPage = lazy(() => import('funding/AskFundiPage'));
// const AskFundiResultPage = lazy(() => import('funding/AskFundiResultPage'));
const ProductPage = lazy(() => import('payment/ProductPage'));
const PaymentPage = lazy(() => import('payment/PaymentPage'));
const PaymentCompleted = lazy(() => import('payment/PaymentCompleted'));
const PaymentDetail = lazy(() => import('payment/PaymentDetail'));
const PaymentListPage = lazy(() => import('payment/PaymentListPage'));
// import { ProductProvider } from 'payment/ProductProvider';

// export interface ProductDataProps {
//   [key: string]: string;
// }
//
// const productData: ProductDataProps = {
//   title: '3D 미니 프런터기기',
//   '모인 금액': '1,556,900원',
//   '남은 시간': '8일',
//   후원자: '10명',
// };
//
// const productPaymentData: ProductDataProps = {
//   '목표 금액': '500,000원',
//   '펀딩 기간': '2025.06.17 ~ 2025.08.20',
//   결제: '목표 금액 달성 시 2025.08.20에 결제 진행',
//   '예상 발송 및 시작일': '2025.08.20',
// };

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<PasswordReset />} />
        {/* <Route path="/funding/create" element={<CreateFundingPage />} />
        <Route path="/ask-fundi" element={<AskFundiPage />} />
        <Route path="/ask-fundi/result" element={<AskFundiResultPage />} /> */}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-completed" element={<PaymentCompleted />} />
        <Route path="/payment-detail" element={<PaymentDetail />} />
        <Route path="/payment-list" element={<PaymentListPage />} />
      </Routes>
    </>
  );
}

export default App;
