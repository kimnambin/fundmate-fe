import { Header, Footer } from '@repo/ui/components';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const CreateFunding = lazy(() => import('./pages/createFunding/createFunding'));
const FundingDetail = lazy(() => import('./pages/fundingDetail/fundingDetail'));
const AskFundi = lazy(() => import('./pages/askFundi/askFundi'));
const AskFundiResult = lazy(() => import('./pages/askFundi/askFundiResult'));

function App() {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/funding/create" element={<CreateFunding />} />
            <Route path="/funding/detail/:id" element={<FundingDetail />} />
            <Route path="/fundi">
              <Route path="request" element={<AskFundi />} />
              <Route path="response" element={<AskFundiResult />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
