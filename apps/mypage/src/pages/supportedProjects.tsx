import { Header } from "../../../../packages/ui/components/Header";
import Sidebar from "../components/common/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 후원한 프로젝트 타입 정의
interface SupportedProject {
  id: number;
  supportDate: string;
  supportNumber: string;
  title: string;
  option: string;
  price: string;
  paymentDate: string;
  thumbnailUrl: string; // 썸네일 URL 추가
}

const SupportedProjects = () => {
  const navigate = useNavigate();

  // 페이지 진입 시 스크롤 상단 고정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 추후 API 연동 시 대체 가능
  const sampleData: SupportedProject[] = [
    {
      id: 1,
      supportDate: "2025.06.17",
      supportNumber: "12345678",
      title: "책이 쌓일수록 귀엽다, 실버 아티산 키캡",
      option: "옵션 1",
      price: "1,556,900원",
      paymentDate: "2025.06.25 결제 예정",
      thumbnailUrl: "https://picsum.photos/300/300", // 임시 썸네일
    },
    {
      id: 2,
      supportDate: "2025.06.17",
      supportNumber: "87654321",
      title: "창의력 넘치는 독서대, 북스탠드",
      option: "옵션 2",
      price: "99,000원",
      paymentDate: "2025.06.25 결제 예정",
      thumbnailUrl: "https://picsum.photos/300/300", // 임시 썸네일
    },
  ];

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="flex justify-center mt-[80px]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="mt-[-30px] ml-[480px] w-[1000px]">
          <h2 className="text-[20px] font-semibold mb-6">후원한 프로젝트</h2>

          {/* 후원한 프로젝트 리스트 */}
          <div className="flex flex-wrap gap-4">
            {sampleData.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/supported-projects/${project.id}`)} // 상세 페이지로 이동
                className="cursor-pointer flex flex-row items-center mr-[00px] p-[15px] pr-[20px] border border-[#E2E8F0] rounded-[6px] w-[440px] h-[160px] hover:shadow-md transition"
              >
                {/* 썸네일 */}
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-[120px] h-[130px] object-cover rounded-[6px] flex-shrink-0"
                />

                {/* 우측 정보 영역 */}
                <div className="flex flex-col gap-[16px] ml-[10px] w-[229px]">
                  {/* 후원일 + 후원번호 */}
                  <div className="flex flex-row gap-[10px] text-[13px] leading-[12px] text-[#7E7C7C] font-medium">
                    <p>후원일 {project.supportDate}</p>
                    <p>후원번호 {project.supportNumber}</p>
                  </div>

                  {/* 프로젝트명 + 옵션 */}
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] leading-[15px] text-black font-medium line-clamp-2">
                      {project.title}
                    </p>
                    <p className="text-[12px] leading-[12px] text-[#7E7C7C] font-medium">
                      {project.option}
                    </p>
                  </div>

                  {/* 금액 + 결제 예정일 */}
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[16px] leading-[17px] text-black font-medium">
                      {project.price}
                    </p>
                    <p className="text-[13px] leading-[12px] text-[#FF4343] font-medium">
                      {project.paymentDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportedProjects;
