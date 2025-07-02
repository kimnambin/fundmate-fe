import { Header, Footer } from '@repo/ui/components';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateFunding from './pages/createFunding/createFunding';

function App() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex px-4 sm:px-[120px] py-[30px]">
        <Routes>
          <Route path="/funding/create" element={<CreateFunding />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
