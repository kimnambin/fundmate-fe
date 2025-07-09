import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';

import Mypage from './pages/Mypage/Mypage';
import SupportedProjects from './pages/supportedProject/supportedProjects';
import LikedProjects from './pages/likedProjects/LikedProjects';
import Following from './pages/Following/Following';
import UserProfileSettings from './pages/UserProfileSettings/UserProfileSettings';
import Withdrawal from './pages/withdrawal/withdrawal';
import MyReviews from './pages/MyReviews/MyReviews';
import SupporterProfile from './pages/SupporterProfile/SupporterProfile';

function LayoutWithSidebar() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* 사이드바가 포함된 마이페이지 관련 경로 */}
      <Route element={<LayoutWithSidebar />}>
        <Route path="/" element={<Mypage />} />
        <Route path="/supported-projects" element={<SupportedProjects />} />
        <Route path="/liked-projects" element={<LikedProjects />} />
        <Route path="/following" element={<Following />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/supporter-profile" element={<SupporterProfile />} />
      </Route>
      <Route path="/userprofile-settings" element={<UserProfileSettings />} />
      <Route path="/withdrawal" element={<Withdrawal />} />
    </Routes>
  </BrowserRouter>
);

export default App;
