import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Mypage from './pages/Mypage/Mypage';
import SupportedProjects from './pages/supportedProject/supportedProjects';
import LikedProjects from './pages/likedProjects/LikedProjects';
import Following from './pages/Following/Following';
import UserProfileSettings from './pages/UserProfileSettings/UserProfileSettings';
import Withdrawal from './pages/withdrawal/withdrawal';
import MyReviews from './pages/MyReviews/MyReviews';
import SupporterProfile from './pages/SupporterProfile/SupporterProfile';
import MyPageLayout from './components/common/MyPageLayout';
import CommonLayout from './components/common/CommonLayout';
import { Header } from '@repo/ui/components';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      {/* 사이드바가 포함된 마이페이지 관련 경로 */}
      <Route path='/mypage/*' element={<MyPageLayout />}>
        <Route index element={<Mypage />} />
        <Route path='projects'>
          <Route path="supported" element={<SupportedProjects />} />
          <Route path="liked" element={<LikedProjects />} />
          <Route path="following" element={<Following />} />
          <Route path="myreviews" element={<MyReviews />} />
        </Route>
      </Route>
      <Route path='/user/*' element={<CommonLayout />}>
        <Route path="settings" element={<UserProfileSettings />} />
        <Route path="withdrawal" element={<Withdrawal />} />
      </Route>
      <Route path="supporter/profile" element={<SupporterProfile />} />
    </Routes>
  </BrowserRouter>
);

export default App;
