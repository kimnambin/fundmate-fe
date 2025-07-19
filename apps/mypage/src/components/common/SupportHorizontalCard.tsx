import { useNavigate } from 'react-router-dom';
import type { SupportedProject } from '../../api/supportedProjects';
import { MediumFont } from '@repo/ui/styles';

type SupportedHorizontalCardProps = {
  project: SupportedProject;
};

export const SupportedHorizontalCard = ({
  project,
}: SupportedHorizontalCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={project.id}
      onClick={() => navigate(`/projects/${project.projectId}`)}
      className="cursor-pointer flex flex-row items-center gap-5 p-3 border border-[#E2E8F0] rounded-[10px] w-full hover:shadow-md transition"
    >
      {/* 썸네일 */}
      <img
        src={project.thumbnailUrl}
        alt={project.title}
        className="w-auto h-[150px] object-cover rounded-[6px]"
      />

      {/* 우측 정보 영역 */}
      <div className="flex flex-col gap-3">
        {/* 후원일 + 후원번호 */}
        <div className="flex flex-row gap-[10px] leading-[12px] text-[#7E7C7C]">
          <MediumFont>후원일 {project.supportDate}</MediumFont>
          <MediumFont>후원번호 {project.supportNumber}</MediumFont>
        </div>

        {/* 프로젝트명 + 옵션 */}
        <div className="flex flex-col gap-[10px]">
          <MediumFont className="line-clamp-2">{project.title}</MediumFont>
          <MediumFont className="leading-[4px] text-[#7E7C7C]">
            {project.option}
          </MediumFont>
        </div>

        {/* 금액 + 결제 예정일 */}
        <div className="flex mt-[10px] flex-col gap-[12px]">
          <MediumFont className="leading-[17px]">{project.price}</MediumFont>
          <MediumFont className="leading-[12px] text-[#FF4343]">
            {project.paymentDate}
          </MediumFont>
        </div>
      </div>
    </div>
  );
};
