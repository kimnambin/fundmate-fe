import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@repo/ui/components'
import StatisticsPage from './pages/Statistics'

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
