// Header/Footer가 named export일 경우
import { Header } from "../../../../packages/ui/components/Header";
import Sidebar from "../components/common/Sidebar"; // ← 추가
import UserSummary from "../components/UserSummary/UserSummary";

function App() {
  return (
    <>
      <Header />
      <div className="flex w-full max-w-[1280px] mx-auto ml-[00px] mt-[40px]">

  {/* Sidebar */}
  <Sidebar />

  {/* Main Content */}
  <div className="mt-[-20px] ml-[40px] flex flex-col gap-[40px] flex-1">
    <UserSummary />
  </div>
</div>
    </>
  );
}

export default App;
