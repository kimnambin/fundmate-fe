import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Main } from './pages/Main';
import { CategorySearch } from './pages/CategorySearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/category' element={<CategorySearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
