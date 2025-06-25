import Swiper from 'swiper';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})

export const LatestItems = () => {
  return (
    <div className='swiper w-full h-[200px] px-[120px] outline outline-amber-800'>
      aadsd
    </div>
  )
}
