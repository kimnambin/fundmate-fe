import logo from '../assets/images/Fundmate.png';
import userDefaultImage from '../assets/icons/userDefault.png';
import { IoMdMenu } from 'react-icons/io';
import { Container, InputDiv, LoginButton } from '../styles/Header.styles';
import { IoSearch } from 'react-icons/io5';

export const Header = () => {
  return (
    <div className='flex flex-col shadow-md'>
      <Container className='h-[100px] justify-between border-b border-gray-300'>
        <img src={logo} alt="Logo" className='w-auto h-14' />
        <InputDiv>
          <input aria-label='검색' placeholder="검색어를 입력하세요." className='w-full h-full text-lg indent-2 border border-cyan-500 rounded-lg focus:outline-none focus:ring focus:ring-cyan-400' />
          <IoSearch className='absolute end-5 top-1/2 -translate-y-1/2 text-2xl' />
        </InputDiv>
        <div className="flex flex-row gap-7 h-full items-center">
          <span className='text-lg font-semibold'>프로젝트 올리기</span>
          <LoginButton>
            <img src={userDefaultImage} alt="default user icon" className='w-10 h-10' />
            <span className='text-lg font-semibold'>로그인/회원가입</span>
          </LoginButton>
        </div>
      </Container>
      <Container className='h-[60px] gap-7 text-lg'>
        <button className='flex flex-row items-center gap-2'>
          <IoMdMenu />
          <span className='font-semibold'>카테고리</span>
        </button>
        <a href='#'>홈</a>
        <a href='#'>인기</a>
        <a href='#'>신규</a>
        <a href='#'>마감임박</a>
        <a href='#'>데이터 분석</a>
      </Container>
    </div>
  )
}
