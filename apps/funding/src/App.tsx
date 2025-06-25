import { Header } from '@repo/ui/header';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateFunding from './pages/createFunding';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-mainColor">
      {/* <Header /> */}

      <main className="flex-grow px-4 py-8">
        <Routes>
          <Route path="/funding/create" element={<CreateFunding />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
