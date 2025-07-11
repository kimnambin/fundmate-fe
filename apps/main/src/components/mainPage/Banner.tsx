import bannerImage from '../../assets/images/banner.png';
import { BannerContainer } from '../../styles/Main/MainPageComponents.style';

interface BannerProps {
  isLoading: boolean
}

export const Banner = ({ isLoading }: BannerProps) => {
  if (isLoading) {
    return (
      <BannerContainer className='h-[490px] w-[1232px] rounded-xl animate-pulse bg-gray-100' />
    )
  }
  return (
    <BannerContainer>
      <img src={bannerImage} alt="banner" className="w-full h-full object-cover rounded-xl" />
    </BannerContainer>
  )
}
