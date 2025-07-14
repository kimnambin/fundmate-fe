import bannerImage from '../../assets/images/banner.png';

interface BannerProps {
  isLoading: boolean
}

export const Banner = ({ isLoading }: BannerProps) => {
  if (isLoading) {
    return (
      <div className='h-[430px] w-full rounded-xl animate-pulse bg-gray-100' />
    )
  }
  return (
    <div>
      <img src={bannerImage} alt="banner" className="w-full h-full object-cover rounded-xl" />
    </div>
  )
}
