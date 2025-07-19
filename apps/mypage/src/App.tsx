import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Mypage from './pages/Mypage/Mypage';
import SupportedProjects from './pages/supportedProject/supportedProjects';
import LikedProjects from './pages/likedProjects/LikedProjects';
import Following from './pages/Following/Following';
import UserProfileSettings from './pages/UserProfileSettings/UserProfileSettings';
import Withdrawal from './pages/withdrawal/withdrawal';
import MyReviews from './pages/MyReviews/MyReviews';
import SupporterProfile from './pages/SupporterProfile/SupporterProfile';
import { Header, UserPageLayout } from '@repo/ui/components';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      {/* 사이드바가 포함된 마이페이지 관련 경로 */}
      <Route path="/mypage/*" element={<UserPageLayout />}>
        <Route index element={<Mypage />} />
        <Route path="projects">
          <Route path="supported" element={<SupportedProjects />} />
          <Route path="liked" element={<LikedProjects />} />
          <Route path="following" element={<Following />} />
          <Route path="myreviews" element={<MyReviews />} />
        </Route>
      </Route>

      {/* 사용자 설정 관련 페이지 (사이드바 없음) */}
      <Route
        path="/user/*"
        element={
          <div className="pt-20 px-16">
            <Outlet />
          </div>
        }
      >
        <Route path="settings" element={<UserProfileSettings />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="supporter/profile/:user_id" element={<SupporterProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
