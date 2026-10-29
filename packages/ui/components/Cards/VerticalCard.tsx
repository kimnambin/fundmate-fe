import ProgressBar from '@ramonak/react-progress-bar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { HeartButton } from '../Likes/HeartButton';
import { MediumFont, SubTitle } from '../../styles';
import type { CardProps } from '../../types/cardType';

/** MUI Card(세로형) 기반으로 재구현. */
export const VerticalCard = ({
  id,
  imageUrl,
  title,
  description,
  progress,
}: CardProps) => {
  const cardTitle = title ?? '이것은 상품의 제목입니다.';
  const cardDescription = description ?? '이것은 상품의 상세설명입니다.';
  const cardProgress = progress ?? 100;

  const navigate = useNavigate();

  return (
    // HeartButton은 실제 <button>이라 CardActionArea(<button>) 안에 두면 button-in-button이
    // 되어 유효하지 않은 HTML이 된다. 카드 바깥(relative)에 absolute로 겹쳐서 피한다.
    <Card variant="outlined" sx={{ height: '100%', position: 'relative' }}>
      <HeartButton />
      <CardActionArea
        onClick={() => navigate(`/product/${id}`)}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia component="img" image={imageUrl} sx={{ aspectRatio: '4 / 3', objectFit: 'cover' }} />
        </Box>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div className="w-full overflow-hidden">
            <MediumFont className="truncate">{cardTitle}</MediumFont>
            <MediumFont className="text-gray-500 truncate">{cardDescription}</MediumFont>
          </div>
          <div className="flex flex-col justify-end">
            <SubTitle className="text-[#26AAFF]">{cardProgress}% 달성</SubTitle>
            <ProgressBar completed={100} height="5px" isLabelVisible={false} bgColor="#26AAFF" />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
