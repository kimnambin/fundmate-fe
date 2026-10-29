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

/** MUI Card(가로형) 기반으로 재구현. */
export const HorizontalCard = ({
  id,
  number,
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
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: '100%' }}
      >
        <Box sx={{ position: 'relative', flex: '0 0 40%' }}>
          <CardMedia component="img" image={imageUrl} sx={{ height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
          <span style={{ fontWeight: 700, color: '#26AAFF' }}>{number}</span>
        </Box>
        <CardContent sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <MediumFont className="truncate whitespace-nowrap">{cardTitle}</MediumFont>
            <MediumFont className="text-gray-500 line-clamp-2">{cardDescription}</MediumFont>
          </div>
          <div className="w-full">
            <SubTitle className="text-[#26AAFF]">{cardProgress}% 달성</SubTitle>
            <ProgressBar completed={100} height="5px" isLabelVisible={false} bgColor="#26AAFF" />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
