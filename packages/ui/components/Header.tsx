import logo from '../assets/images/Fundmate.png';
import userDefaultImage from '../assets/icons/userDefault.png';
import { IoMdMenu } from 'react-icons/io';
import { Container, InputDiv, LoginButton } from '../styles/Header.styles';
import { IoSearch } from 'react-icons/io5';
import categoryData from '../utils/headerCategoryData.json';
import { CateogoryContainer } from '../styles/Category.style';
import { modalStore } from '../stores/modalStore';

const icons = import.meta.glob('../assets/icons/categoryIcons/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const Header = () => {
  const isOpen = modalStore((state) => state.isOpen);
  const setIsOpen = modalStore((state) => state.setIsOpen);

  return (
    <div className="flex flex-col shadow-md">
      <Container className="h-[100px] justify-between border-b border-gray-300">
        <img src={logo} alt="Logo" className="w-auto h-14" />
        <InputDiv>
          <input
            aria-label="검색"
            placeholder="검색어를 입력하세요."
            className="w-full h-full text-lg indent-2 border border-cyan-500 rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
          />
          <IoSearch className="absolute end-5 top-1/2 -translate-y-1/2 text-2xl text-cyan-400" />
        </InputDiv>
        <div className="flex flex-row gap-7 h-full items-center">
          <a href='#' className="text-lg font-semibold">프로젝트 올리기</a>
          <LoginButton>
            <img
              src={userDefaultImage}
              alt="default user icon"
              className="w-10 h-10"
            />
            <span className="text-lg">로그인/회원가입</span>
          </LoginButton>
        </div>
      </Container>
      <Container className="h-[60px] gap-7 text-lg">
        <button type='button' onClick={setIsOpen} className="flex flex-row items-center gap-2 relative">
          <IoMdMenu />
          <span className="font-semibold">카테고리</span>
          <CateogoryContainer $isOpen={isOpen}>
            {
              categoryData.map((v, i) => {
                const imgPath = icons[`../assets/icons/categoryIcons/${v.imgName}`]

                return (
                  <div className='flex flex-row items-center gap-5 rounded-lg hover:bg-gray-100 p-2'>
                    <img src={imgPath} className='w-8' />
                    <span>{v.name}</span>
                  </div>
                )
              })
            }
          </CateogoryContainer>
        </button>
        <a href="#">홈</a>
        <a href="#">인기</a>
        <a href="#">신규</a>
        <a href="#">마감임박</a>
        <a href="#">데이터 분석</a>
      </Container>
    </div>
  );
};
