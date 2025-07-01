import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Main } from './pages/Main';
import { SearchPage } from './pages/SearchDivider';
import { Header } from '@repo/ui/components';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { PasswordReset } from './pages/PasswordReset';
import { lazy } from 'react';

const CreateFundingPage = lazy(() => import('funding/CreateFundingPage'));
const ProductPage = lazy(() => import('payment/ProductPage'));
const PaymentPage = lazy(() => import('payment/PaymentPage'));
const PaymentCompleted = lazy(() => import('payment/PaymentCompleted'));
const PaymentDetail = lazy(() => import('payment/PaymentDetail'));
const PaymentListPage = lazy(() => import('payment/PaymentListPage'));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset' element={<PasswordReset />} />
        <Route path='/funding/create' element={<CreateFundingPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/payment-completed' element={<PaymentCompleted />} />
        <Route path='/payment-detail' element={<PaymentDetail />} />
        <Route path='/payment-list' element={<PaymentListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
