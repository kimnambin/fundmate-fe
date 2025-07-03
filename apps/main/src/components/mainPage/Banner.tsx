import bannerImage from '../../assets/images/banner.png';
import { BannerContainer } from '../../styles/Main/MainPageComponents.style';

export const Banner = () => {
  return (
    <BannerContainer>
      <img src={bannerImage} alt="banner" className="w-full h-full" />
    </BannerContainer>
  )
}
