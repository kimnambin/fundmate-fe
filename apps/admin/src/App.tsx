import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import FundingHistory from './pages/fundingHistory/fundingHistory';
import PaymentManagement from './pages/paymentManagement/paymentManagement';
import StatsPage from './pages/stats/statsPage';
import MakerProfile from './pages/makerProfile/makerProfile';
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

      {/* 일반 유저 영역 */}
      <Route path="/user/*" element={
        <div className="pt-5 px-16">
          <Outlet />
        </div>
      }>
        <Route path="settings" element={<div>유저 프로필 설정 페이지</div>} />
        <Route path="withdrawal" element={<div>회원 탈퇴 페이지</div>} />
        <Route path="maker/profile/:user_id" element={<MakerProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
