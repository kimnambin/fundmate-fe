import logo from '../assets/images/Fundmate.png';
import userDefaultImage from '../assets/icons/userDefault.png';
import { IoMdMenu } from 'react-icons/io';

export const Header = () => {
  return (
    <div className='flex flex-col shadow-md'>
      <div className="w-screen h-[100px] px-[120px] flex flex-row justify-between items-center border border-b-gray-300">
        <img src={logo} alt="Logo" className='w-auto h-14' />
        <input placeholder="검색어를 입력하세요." className='w-[26rem] h-10 text-lg indent-2 border border-cyan-500 rounded-lg focus:outline-none focus:ring focus:ring-cyan-400' />
        <div className="flex flex-row gap-7 h-full items-center">
          <span className='text-lg font-semibold'>프로젝트 올리기</span>
          <button className="flex flex-row gap-5 rounded-lg items-center px-5 py-4 border border-gray-100">
            <img src={userDefaultImage} alt="#" className='w-10 h-10' />
            <span className='text-lg font-semibold'>로그인/회원가입</span>
          </button>
        </div>
      </div>
      <div className='flex flex-row items-center w-screen h-[60px] px-[120px] border-red gap-7 text-lg'>
        <button className='flex flex-row items-center gap-2'>
          <IoMdMenu />
          <span className='font-semibold'>카테고리</span>
        </button>
        <span>홈</span>
        <span>인기</span>
        <span>신규</span>
        <span>마감임박</span>
        <span>데이터 분석</span>
      </div>
    </div>
  )
}
