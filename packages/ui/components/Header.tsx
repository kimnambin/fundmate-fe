import logo from '../assets/images/Fundmate.png';
import userDefaultImage from '../assets/icons/userDefault.png';
import { IoMdMenu } from 'react-icons/io';
import {
  Container,
  FundiButton,
  InputDiv,
  LoginButton,
  SpaceContainer,
} from '../styles/Header.styles';
import { IoSearch } from 'react-icons/io5';
import { CateogoryContainer } from '../styles/Category.style';
import { modalStore } from '../stores/modalStore';
import { CategoryIcons } from '../assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import fundi from '../assets/images/fundi.png';
import { MediumFont, SubTitle } from '../styles';
import { InputText } from './Inputs/Input';

const menuBar = [
  {
    name: 'home',
    menuName: '홈',
    route: '/',
  },
  {
    name: 'popular',
    menuName: '인기',
    route: '/search?popular=1',
  },
  {
    name: 'new',
    menuName: '신규',
    route: '/search?new=1',
  },
  {
    name: 'deadline',
    menuName: '마감임박',
    route: '/search?deadline=1',
  },
  {
    name: 'statistics',
    menuName: '데이터 분석',
    route: '/statistics'
  }
]

export const Header = () => {
  const isOpen = modalStore((state) => state.isOpen);
  const setIsOpen = modalStore((state) => state.setIsOpen);
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const currentFullPath = location.pathname + location.search;

  const handleClick = () => {
    navigate(`/search?query=${searchInput}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col shadow-md">
      <Container className="h-[100px] justify-between border-b border-gray-300">
        <img
          src={logo}
          alt="Logo"
          className="w-auto h-14 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <InputDiv>
          <InputText
            width="w-full"
            placeholder="검색어를 입력하세요."
            textSize="text-[18px]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-main"
          />
          <IoSearch
            className="absolute end-5 top-1/2 -translate-y-1/2 text-2xl text-[#26AAFF] cursor-pointer"
            onClick={handleClick}
          />
        </InputDiv>
        <div className="flex flex-row gap-7 h-full items-center">
          <Link to="/funding/create" className="text-lg font-semibold">
            <SubTitle>프로젝트 올리기</SubTitle>
          </Link>
          <LoginButton onClick={handleNavigate}>
            <img
              src={userDefaultImage}
              alt="default user icon"
              className="w-10 h-10"
            />
            <MediumFont>로그인/회원가입</MediumFont>
          </LoginButton>
        </div>
      </Container>
      <SpaceContainer>
        <div className=" flex flex-row items-center h-[60px] gap-7 text-lg">
          <button
            type="button"
            onClick={setIsOpen}
            className="flex flex-row items-center gap-2 relative"
          >
            <IoMdMenu />
            <SubTitle>카테고리</SubTitle>
            <CateogoryContainer $isOpen={isOpen}>
              {Object.entries(CategoryIcons).map(
                ([name, { src, menuName }], _i) => (
                  <Link
                    to={`/search?category=${menuName}`}
                    key={name}
                    className="flex flex-row items-center gap-5 rounded-lg hover:bg-gray-100 p-2"
                  >
                    <img src={src} className="w-6" />
                    <MediumFont>{menuName}</MediumFont>
                  </Link>
                ),
              )}
            </CateogoryContainer>
          </button>
          {menuBar.map((v) => {
            const isActive =
              v.route === '/'
                ? location.pathname === '/'
                : currentFullPath.includes(v.route);

            return (
              <button
                key={v.name}
                type="button"
                className={`px-3 h-full ${isActive ? 'shadow-[inset_0_-2px_0_0_#26AAFF]' : 'transition-shadow'}`}
                onClick={() => {
                  if (!isActive) navigate(v.route);
                }}
              >
                <MediumFont>{v.menuName}</MediumFont>
              </button>
            );
          })}
        </div>
        <FundiButton type="button" onClick={() => navigate('/ask-fundi')}>
          <SubTitle>펀디에게 물어보기</SubTitle>
          <img src={fundi} className="w-6" />
        </FundiButton>
      </SpaceContainer>
    </div>
  );
};
