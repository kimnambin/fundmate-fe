import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FundingHistory from './pages/fundingHistory/fundingHistory';
import PaymentManagement from './pages/paymentManagement/paymentManagement';
import StatsPage from './pages/stats/statsPage';
import { Header, UserPageLayout } from '@repo/ui/components';
import { Layout } from '@repo/ui/styles';

const App = () => (
  <BrowserRouter>
    <Header />

    <Routes>
      {/* 마이페이지 영역 (사이드바 포함) */}
      <Route path="/mypage/*" element={<UserPageLayout />}>
        <Route path="history" element={<FundingHistory />} />
        <Route path="paymentproceed" element={<PaymentManagement />} />
        <Route path="sellstats" element={<StatsPage />} />
      </Route>

      <Route element={<Layout />}>
        <Route
          path="/userprofile-settings"
          element={<div>유저 프로필 설정 페이지</div>}
        />
        <Route path="/withdrawal" element={<div>회원 탈퇴 페이지</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
