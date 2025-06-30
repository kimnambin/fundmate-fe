import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { Main } from './pages/Main';
import { SearchPage } from './pages/SearchDivider';
import { Footer, Header } from '@repo/ui/components';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { PasswordReset } from './pages/PasswordReset';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset' element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
