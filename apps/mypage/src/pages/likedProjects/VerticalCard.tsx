// import ProgressBar from "@ramonak/react-progress-bar";
// import { VerticalCardContainer } from "../../components/style/_Card.style";
// import { HeartButton } from "../../../../../packages/ui/components/Likes/HeartButton";
//
// interface VerticalCardProps {
//   thumbnailUrl: string;
//   title: string;
//   description: string;
//   progress: number;
// }
//
// export const VerticalCard = ({
//   thumbnailUrl,
//   title,
//   description,
//   progress,
// }: VerticalCardProps) => {
//   return (
//     <VerticalCardContainer
//       className="
//         relative flex flex-col p-3 rounded-xl shadow 
//         hover:shadow-lg w-[395px]"
//     >
//       {/* 하트 버튼 */}
//       <div className="absolute top-2 right-2 z-10">
//         <HeartButton />
//       </div>
//
//       {/* 썸네일 */}
//       <div className="w-full h-[175px] mb-3">
//         <img
//           src={thumbnailUrl}
//           alt={title}
//           className="w-full h-full rounded-lg object-cover"
//         />
//       </div>
//
//       {/* 제목 및 설명 */}
//       <div className="flex flex-col mb-2 px-1">
//         <span className="text-[15px] font-semibold truncate">{title}</span>
//         <span className="text-[13px] text-gray-500 truncate">{description}</span>
//       </div>
//
//       {/* 진행률 */}
//       <div className="mt-auto px-1">
//         <span className="text-[13px] font-bold text-cyan-500">
//           {progress}% 달성
//         </span>
//         <ProgressBar
//           completed={progress}
//           height="5px"
//           isLabelVisible={false}
//           bgColor="#26C6DA"
//           className="mt-1"
//         />
//       </div>
//     </VerticalCardContainer>
//   );
// };
