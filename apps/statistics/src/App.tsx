import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StatisticsPage } from './pages/Statistics';
import { Header } from '@repo/ui/components'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
