import { Header } from '@repo/ui/Header';
import { Footer } from '@repo/ui/Footer';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateFunding from './pages/createFunding/createFunding';
import FundingDetail from './pages/fundingDetail/fundingDetail';
import AskFundi from './pages/askFundi/askFundi';
import { Loading } from '@repo/ui/Loading';

function App() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex px-4 sm:px-[120px] py-[30px] min-h-[calc(100vh-216px)]">
        <Routes>
          <Route path="/funding/create" element={<CreateFunding />} />
          <Route path="/funding/detail/:id" element={<FundingDetail />} />
          <Route path="/ask-fundi" element={<AskFundi />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
