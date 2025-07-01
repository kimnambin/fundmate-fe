import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mypage from './pages/Mypage';
import SupportedProjects from './pages/supportedProjects';

const App = () => (
  <BrowserRouter basename="/mypage">
    <Routes>
      <Route path="/" element={<Mypage />} />
      <Route path="/supported-projects" element={<SupportedProjects />} />
    </Routes>
  </BrowserRouter>
);

export default App;
