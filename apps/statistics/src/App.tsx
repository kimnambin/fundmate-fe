import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StatisticsPage } from './pages/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
