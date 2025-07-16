import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Main } from './pages/Main';
import { SearchPage } from './pages/SearchDivider';
import { Header, Loading, UserPageLayout } from '@repo/ui/components';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { PasswordReset } from './pages/PasswordReset';
import { ScrollToTop } from '@repo/ui/utils';
import { Suspense, lazy } from 'react';
import { Layout } from '@repo/ui/styles';

const CreateFundingPage = lazy(() => import('funding/CreateFundingPage'));
const AskFundiPage = lazy(() => import('funding/AskFundiPage'));
const AskFundiResultPage = lazy(() => import('funding/AskFundiResultPage'));

const ProductPage = lazy(() => import('payment/ProductPage'));
const PaymentPage = lazy(() => import('payment/PaymentPage'));
const PaymentCompleted = lazy(() => import('payment/PaymentCompleted'));
const PaymentDetail = lazy(() => import('payment/PaymentDetail'));

const StatisticsPage = lazy(() => import('statistics/Statistics'));

const Mypage = lazy(() => import('mypage/Mypage'));
const SupportedProjects = lazy(() => import('mypage/SupportedProjects'));
const LikedProjects = lazy(() => import('mypage/LikedProjects'));
const Following = lazy(() => import('mypage/Following'));
const MyReviews = lazy(() => import('mypage/MyReviews'));
const SupporterProfile = lazy(() => import('mypage/SupporterProfile'));

const ProfileSetting = lazy(() => import('mypage/ProfileSetting'));
const Withdrawal = lazy(() => import('mypage/Withdrawal'));

const MakerProfile = lazy(() => import('admin/MakerProfile'));
const StatsPage = lazy(() => import('admin/StatsPage'));
const FundingHistory = lazy(() => import('admin/FundingHistory'));
const PaymentManagement = lazy(() => import('admin/PaymentManagement'));

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
          </Route>
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/user/*" element={<Layout />}>
            <Route path="settings" element={<ProfileSetting />} />
            <Route path="withdrawal" element={<Withdrawal />} />
          </Route>
          <Route path="/mypage/*" element={<UserPageLayout />}>
            <Route index element={<Mypage />} />
            <Route path='history' element={<FundingHistory />} />
            <Route path='paymentproceed' element={<PaymentManagement />} />
            <Route path='sellstats' element={<StatsPage />} />
            <Route path="projects/*">
              <Route path="supported" element={<SupportedProjects />} />
              <Route path="liked" element={<LikedProjects />} />
              <Route path="following" element={<Following />} />
              <Route path="myreviews" element={<MyReviews />} />
            </Route>
          </Route>
          <Route path="/supporter/profile" element={<SupporterProfile />} />
          <Route path='/maker/profile' element={<MakerProfile nickname='tempdata' />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
