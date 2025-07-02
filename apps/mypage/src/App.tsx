import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mypage from './pages/Mypage/Mypage';
import SupportedProjects from './pages/supportedProject/supportedProjects';
import LikedProjects from './pages/likedProjects/LikedProjects'; 
import Following from './pages/Following/Following'; 
import UserProfileSettings from './pages/UserProfileSettings/UserProfileSettings'; 
import Withdrawal from './pages/withdrawal/withdrawal'; 

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mypage />} />
      <Route path="/supported-projects" element={<SupportedProjects />} />
      <Route path="/liked-projects" element={<LikedProjects />} /> 
      <Route path="/following" element={<Following />} /> 
      <Route path="/userprofilesettings" element={<UserProfileSettings />} /> 
      <Route path="/withdrawal" element={<Withdrawal />} /> 
    </Routes>
  </BrowserRouter>
);

export default App;
