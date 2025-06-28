import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Main } from './pages/Main';
import { SearchPage } from './pages/SearchDivider';
import { Footer, Header } from '@repo/ui/components';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
