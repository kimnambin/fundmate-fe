import { useEffect } from "react";
import type { SupportedProject } from "../../api/supportedProjects";
import { Title } from "@repo/ui/styles";
import { SupportedHorizontalCard } from "../../components/common/SupportHorizontalCard";

const SupportedProjects = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sampleData: SupportedProject[] = [
    {
      id: 1,
      supportDate: "2025.06.17",
      supportNumber: "12345678",
      title: "책이 쌓일수록 귀엽다, 실버 아티산 키캡",
      option: "옵션 1",
      price: "1,556,900원",
      paymentDate: "2025.06.25 결제 예정",
      thumbnailUrl: "https://picsum.photos/300/300",
    },
    {
      id: 2,
      supportDate: "2025.06.17",
      supportNumber: "87654321",
      title: "창의력 넘치는 독서대, 북스탠드",
      option: "옵션 2",
      price: "99,000원",
      paymentDate: "2025.06.25 결제 예정",
      thumbnailUrl: "https://picsum.photos/300/300",
    },
  ];

  return (
    <div className="flex flex-col gap-7 w-full">
      <Title>후원한 프로젝트</Title>

      {/* 후원한 프로젝트 리스트 */}
      <div className="grid grid-cols-2 gap-5">
        {sampleData.map((project) => (
          <SupportedHorizontalCard project={project} />
        ))}
      </div>
    </div>
  );
};

export default SupportedProjects;
