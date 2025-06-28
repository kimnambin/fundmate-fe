import { Header } from '@repo/ui/Header';
import { Footer } from '@repo/ui/Footer';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateFunding from './pages/createFunding/createFunding';
import FundingDetail from './pages/fundingDetail/fundingDetail';

function App() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex px-4 sm:px-[120px] py-[30px]">
        <Routes>
          <Route path="/funding/create" element={<CreateFunding />} />
          <Route path="/funding/detail/:id" element={<FundingDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
