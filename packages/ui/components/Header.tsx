import logo from '../assets/images/Fundmate.png';
import mobileLogo from '../assets/icons/ic_fundi.png';
import { IoMdMenu } from 'react-icons/io';
import {
  Container,
  FundiButton,
  InputDiv,
  // LoginButton,
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
// import { commonApiInstance } from '../hooks';
import { useIsMobile } from '../hooks/isMobile';
import { MdDriveFolderUpload } from 'react-icons/md';

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
    route: '/statistics',
  },
];

export const Header = () => {
  const isOpen = modalStore((state) => state.isOpen);
  const setIsOpen = modalStore((state) => state.setIsOpen);
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  // const nickname = window.localStorage.getItem('nickname');
  // const [adminToggle, setAdminToggle] = useState(false);
  const currentFullPath = location.pathname + location.search;

  const handleClick = () => {
    navigate(`/search?query=${searchInput}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  // const handleNavigate = () => {
  //   if (nickname !== null) {
  //     setAdminToggle(!adminToggle);
  //   } else {
  //     navigate('/login');
  //   }
  // };

  // const handlePortal = () => {
  //   try {
  //     navigate('/mypage');
  //   } catch (error) {
  //     alert('세션이 만료되었습니다.\n다시 로그인해주세요');
  //     window.localStorage.removeItem('nickname');
  //     navigate('/login');
  //   }
  // };

  // const handleLogout = async () => {
  //   await commonApiInstance
  //     .post('/auth/logout')
  //     .then((response) => {
  //       console.log(response);
  //       window.localStorage.removeItem('nickname');
  //       setAdminToggle(false);
  //       navigate('/');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert('다시 시도해주세요');
  //     });
  // };

  const handleCreateNavigate = () => {
    navigate('/funding/create');
    // if (nickname) {
    //   navigate('/funding/create');
    // } else {
    //   navigate('/login');
    // }
  };

  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col shadow-md">
      <Container className="h-[100px] justify-between border-b border-gray-300">
        <img
          src={isMobile ? mobileLogo : logo}
          alt="Logo"
          className="w-auto h-14 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <InputDiv className="relative w-full sm:w-auto">
          <InputText
            width="w-full"
            placeholder="검색어를 입력하세요."
            textSize="text-[16px] lg:text-[18px]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-main sm:w-64"
          />
          <IoSearch
            className="absolute end-5 top-1/2 -translate-y-1/2 text-2xl text-[#26AAFF] cursor-pointer"
            onClick={handleClick}
          />
        </InputDiv>
        <div className="flex flex-row gap-0 md:gap-7 h-full items-center">
          <button
            onClick={handleCreateNavigate}
            className="text-lg font-semibold rounded-lg sm:shadow-md p-2 bg-white border-gray-100"
          >
            {isMobile ? (
              <MdDriveFolderUpload className="w-[56px] h-[52px] text-[#26AAFF]" />
            ) : (
              <SubTitle>프로젝트 업로드</SubTitle>
            )}
          </button>
          {/* ============✔️TODO : 임시 데이터를 위한 주석=============== */}
          <div className="none md:inline-block relative">
            {/* <LoginButton onClick={handleNavigate}>
              <img
                src={userDefaultImage}
                alt="default user icon"
                className="w-10 h-10"
              />
              {nickname ? (
                <MediumFont>{nickname}</MediumFont>
              ) : (
                <MediumFont>로그인/회원가입</MediumFont>
              )}
            </LoginButton>
            {adminToggle && (
              <div className="absolute w-40 flex flex-col items-center top-full justify-center bg-white rounded-lg py-3 shadow-md">
                <button
                  type="button"
                  onClick={handlePortal}
                  className="hover:bg-gray-100 w-full h-full p-2"
                >
                  <MediumFont className="h-full">마이페이지</MediumFont>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hover:bg-gray-100 w-full h-full p-2"
                >
                  <MediumFont>로그아웃</MediumFont>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </Container>
      <SpaceContainer>
        <div className="flex flex-col items-center sm:flex-row items-center sm:h-[60px] mx-0 gap-4 md:gap-7 text-lg">
          <button
            type="button"
            onClick={setIsOpen}
            className="flex flex-row items-center gap-2 relative"
          >
            <IoMdMenu />
            <SubTitle>카테고리</SubTitle>
            <CateogoryContainer $isOpen={isOpen}>
              {Object.entries(CategoryIcons).map(
                ([name, { src, menuName }], i) => (
                  <Link
                    to={`/search?category=${i}`}
                    key={name + i}
                    className="flex flex-row items-center gap-5 rounded-lg hover:bg-gray-100 p-2"
                    state={{ menuName: menuName }}
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

            return isMobile ? (
              <></>
            ) : (
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
        <FundiButton
          type="button"
          onClick={() => navigate('/fundi/request')}
          className="my-2 md:my-4"
        >
          <SubTitle>펀디에게 물어보기</SubTitle>
          <img src={fundi} className="w-6" />
        </FundiButton>
      </SpaceContainer>
    </div>
  );
};
