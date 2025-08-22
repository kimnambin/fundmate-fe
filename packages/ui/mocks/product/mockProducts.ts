import type { ProductType } from '../../types/productType';

export const mockProducts: ProductType[] = [
  {
    project_id: 1,
    image_url: 'https://picsum.photos/id/36/300/300',
    title: 'AI 기반 투자 플랫폼',
    short_description:
      '사용자의 투자 성향을 분석해 맞춤형 포트폴리오를 추천합니다.',
    goal_amount: 10000000,
    current_amount: 4500000,
    achievement: 45,
    remaining_day: 20,
  },
  {
    project_id: 2,
    image_url: 'https://picsum.photos/id/177/300/300',
    title: '스마트 헬스케어 앱',
    short_description:
      '걸음 수, 심박수, 수면 패턴을 추적하여 건강 관리 솔루션을 제공합니다.',
    goal_amount: 8000000,
    current_amount: 5200000,
    achievement: 65,
    remaining_day: 15,
  },
  {
    project_id: 3,
    image_url: 'https://picsum.photos/id/20/300/300',
    title: '온라인 협업 툴',
    short_description:
      '실시간 문서 편집과 채팅 기능을 갖춘 스타트업 협업 플랫폼입니다.',
    goal_amount: 5000000,
    current_amount: 5000000,
    achievement: 100,
    remaining_day: 0,
  },
];

export const mockPopularProducts: ProductType[] = [
  {
    project_id: 1,
    image_url: `https://picsum.photos/id/10/300/300`,
    title: 'AI 기반 투자 플랫폼',
    short_description:
      '사용자의 투자 성향을 분석해 맞춤형 포트폴리오를 추천합니다.',
    goal_amount: 10000000,
    current_amount: 4500000,
    achievement: 45,
    remaining_day: 20,
  },
  {
    project_id: 2,
    image_url: `https://picsum.photos/id/21/300/300`,
    title: '스마트 홈 기기',
    short_description: '에너지 효율을 높이는 스마트 홈 솔루션입니다.',
    goal_amount: 5000000,
    current_amount: 2500000,
    achievement: 50,
    remaining_day: 15,
  },
  {
    project_id: 3,
    image_url: `https://picsum.photos/id/30/300/300`,
    title: '모바일 건강 관리 앱',
    short_description: '사용자의 건강을 관리하는 맞춤형 앱입니다.',
    goal_amount: 3000000,
    current_amount: 1800000,
    achievement: 60,
    remaining_day: 10,
  },
  {
    project_id: 4,
    image_url: `https://picsum.photos/id/40/300/300`,
    title: '친환경 패키징 솔루션',
    short_description: '지속 가능한 포장재를 제공합니다.',
    goal_amount: 2000000,
    current_amount: 1200000,
    achievement: 60,
    remaining_day: 30,
  },
  {
    project_id: 5,
    image_url: `https://picsum.photos/id/50/300/300`,
    title: 'VR 여행 플랫폼',
    short_description: '가상 현실을 통해 세계 여행을 경험하세요.',
    goal_amount: 7000000,
    current_amount: 3300000,
    achievement: 47,
    remaining_day: 25,
  },
];

export const mockRecentlyProducts: ProductType[] = [
  {
    project_id: 6,
    image_url: `https://picsum.photos/id/60/300/300`,
    title: 'AI 기반 언어 학습',
    short_description: '개인 맞춤형 언어 학습 프로그램을 제공합니다.',
    goal_amount: 4000000,
    current_amount: 2000000,
    achievement: 50,
    remaining_day: 18,
  },
  {
    project_id: 7,
    image_url: `https://picsum.photos/id/70/300/300`,
    title: '디지털 아트 플랫폼',
    short_description: '아티스트와 구매자를 연결하는 플랫폼입니다.',
    goal_amount: 6000000,
    current_amount: 3300000,
    achievement: 55,
    remaining_day: 22,
  },
  {
    project_id: 8,
    image_url: `https://picsum.photos/id/80/300/300`,
    title: '자동차 공유 서비스',
    short_description: '효율적인 차량 공유 솔루션을 제공합니다.',
    goal_amount: 8000000,
    current_amount: 4000000,
    achievement: 50,
    remaining_day: 12,
  },
  {
    project_id: 9,
    image_url: `https://picsum.photos/id/90/300/300`,
    title: '온라인 교육 플랫폼',
    short_description: '전문가와 함께하는 온라인 교육을 제공합니다.',
    goal_amount: 5000000,
    current_amount: 2500000,
    achievement: 50,
    remaining_day: 14,
  },
  {
    project_id: 10,
    image_url: `https://picsum.photos/id/100/300/300`,
    title: '스마트 농업 솔루션',
    short_description: '정밀 농업 기술을 통해 생산성을 높입니다.',
    goal_amount: 9000000,
    current_amount: 4500000,
    achievement: 50,
    remaining_day: 17,
  },
];

export const mockreviewsData = [
  {
    name: '홍길동',
    date: '2025-08-10',
    content: '정말 만족스러운 서비스였습니다. 추천해요!',
  },
  {
    name: '김철수',
    date: '2025-08-12',
    content: 'UI가 깔끔하고 사용하기 편했어요.',
  },
  {
    name: '이영희',
    date: '2025-08-15',
    content: '기능이 다양해서 유용했어요. 다만 속도가 조금 느렸어요.',
  },
];
