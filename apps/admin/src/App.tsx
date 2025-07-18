import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, UserPageLayout } from '@repo/ui/components';
import FundingHistory from './pages/fundingHistory/fundingHistory';
import PaymentManagement from './pages/paymentManagement/paymentManagement';
import MakerProfile from './pages/makerProfile/makerProfile';
import StatsPage from './pages/stats/statsPage';
import { Layout } from '@repo/ui/styles';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route element={<UserPageLayout />}>
        <Route path="/fundinghistory" element={<FundingHistory />} />
        <Route path="/paymentmanagement" element={<PaymentManagement />} />
        <Route path="/stats" element={<StatsPage />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/userprofile-settings" element={<div>유저 프로필 설정 페이지</div>} />
        <Route path="/withdrawal" element={<div>회원 탈퇴 페이지</div>} />
        <Route path="/makerprofile" element={<MakerProfile nickname='tempData' />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
