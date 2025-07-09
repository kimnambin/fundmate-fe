import { Route, Routes } from 'react-router-dom';
import MyPageLayout from '../../components/common/MyPageLayout';
import MyPage from '../Mypage/Mypage';
import SupportedProjects from '../supportedProject/supportedProjects';
import LikedProjects from '../likedProjects/LikedProjects';
import Following from '../Following/Following';
import MyReviews from '../MyReviews/MyReviews';
import SupporterProfile from '../SupporterProfile/SupporterProfile';

const MypageRouter = () => {
  return (
    <Routes>
      <Route element={<MyPageLayout />}>
        <Route index element={<MyPage />} />
        <Route path="/supported/projects" element={<SupportedProjects />} />
        <Route path="/liked-projects" element={<LikedProjects />} />
        <Route path="/following" element={<Following />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/supporter/profile" element={<SupporterProfile />} />
      </Route>
    </Routes>
  )
}

export default MypageRouter;
