import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mypage from './pages/Mypage';
import SupportedProjects from './pages/supportedProjects';
import LikedProjects from './pages/LikedProjects'; // 경로는 맞게 사용

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mypage />} />
      <Route path="/supported-projects" element={<SupportedProjects />} />
      <Route path="/liked-projects" element={<LikedProjects />} /> {/* 수정 완료 */}
    </Routes>
  </BrowserRouter>
);

export default App;
