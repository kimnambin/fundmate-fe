import { Header } from '@repo/ui/Header';
import { Footer } from '@repo/ui/Footer';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateFunding from './pages/createFunding';

function App() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-grow px-[120px] py-[30px]">
        <Routes>
          <Route path="/funding/create" element={<CreateFunding />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
