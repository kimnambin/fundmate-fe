import SampleItemImg from '../../assets/images/sampleItemImg.png';
import { HorizontalLine, Title } from '../createFunding/createFunding.styles';
import {
  ButtonWrapper,
  FundingDetailTab,
  InfoLabel,
  InfoWrapperHorizontal,
  InfoWrapperVertical,
  ItemTitleTextWrapper,
  ItemTitleWrapper,
  Wrapper,
} from './fundingDetail.styles';
import HeartIcon from '../../assets/icons/ic_heart.svg';
import ShareIcon from '../../assets/icons/ic_share.svg';
import MainButton from '../../components/main-button/mainButton';
import { useState } from 'react';
import FundingPlanContent from '../../components/funding-detail-tab/fundingPlanContent';
import FundingReviewContent from '../../components/funding-detail-tab/fundingReviewContent';
import { Layout } from '../../style/layout';

const FundingDetail = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'review'>('plan');

  return (
    <Layout>
      <Wrapper>
        <ItemTitleWrapper>
          <img
            src={itemData.itemImg}
            alt="itemImg"
            className="rounded-[6px] w-[508px] h-[461px]"
          />
          <ItemTitleTextWrapper>
            <Title>{itemData.title}</Title>
            <div className="flex flex-col gap-[20px]">
              <InfoWrapperVertical>
                <InfoLabel>모인 금액</InfoLabel>
                <p>{itemData.funding_amount}원</p>
              </InfoWrapperVertical>
              <InfoWrapperVertical>
                <InfoLabel>남은 시간</InfoLabel>
                <p>{itemData.funding_end_date}일</p>
              </InfoWrapperVertical>
              <InfoWrapperVertical>
                <InfoLabel>후원자</InfoLabel>
                <p>{itemData.funding_participants}명</p>
              </InfoWrapperVertical>
            </div>

            <HorizontalLine />

            <div className="flex flex-col gap-[15px]">
              <InfoWrapperHorizontal>
                <InfoLabel>목표 금액</InfoLabel>
                <p>{itemData.funding_goal}원</p>
              </InfoWrapperHorizontal>
              <InfoWrapperHorizontal>
                <InfoLabel>펀딩 기간</InfoLabel>
                <p>
                  {itemData.funding_start_date}~{itemData.funding_end_date}
                </p>
              </InfoWrapperHorizontal>
              <InfoWrapperHorizontal>
                <InfoLabel>결제</InfoLabel>
                <p>목표 금액 달성 시 {itemData.funding_pay_date}에 결제 진행</p>
              </InfoWrapperHorizontal>
              <InfoWrapperHorizontal>
                <InfoLabel>예상 발송 시작일</InfoLabel>
                <p>{itemData.funding_delivery_date}</p>
              </InfoWrapperHorizontal>
            </div>

            <ButtonWrapper>
              <div className="flex flex-col items-center">
                <img
                  src={HeartIcon}
                  alt="heartIcon"
                  className="w-[35px] h-[35px] cursor-pointer"
                />
                <p className="text-[10px]">{itemData.like}</p>
              </div>
              <img
                src={ShareIcon}
                alt="shareIcon"
                className="w-[35px] h-[35px] pt-1 cursor-pointer"
              />
              <MainButton
                label="후원하기"
                width="w-full"
                textSize="text-[20px]"
                textWeight="font-bold"
                className="ml-[10px]"
              />
            </ButtonWrapper>
          </ItemTitleTextWrapper>
        </ItemTitleWrapper>

        <FundingDetailTab>
          <button
            className={`${activeTab === 'plan' ? 'font-bold' : 'font-normal'}`}
            onClick={() => setActiveTab('plan')}
          >
            프로젝트 계획
          </button>
          <button
            className={`${activeTab === 'review' ? 'font-bold' : 'font-normal'}`}
            onClick={() => setActiveTab('review')}
          >
            후기
          </button>
        </FundingDetailTab>

        {activeTab === 'plan' && <FundingPlanContent />}
        {activeTab === 'review' && <FundingReviewContent />}
      </Wrapper>
    </Layout>
  );
};

export default FundingDetail;

// 임시 데이터
const itemData = {
  project_id: 1,
  title: '내 손 안의 작은 공장, 3D 미니 프린터기',
  itemImg: SampleItemImg,
  story: '상세 내용',
  ai_summary: '요약 내용',
  funding_amount: '1,556,900',
  funding_goal: '500,000',
  funding_start_date: '2025.06.17',
  funding_end_date: '2025.06.20',
  funding_participants: 10,
  funding_pay_date: '2025.06.21',
  funding_delivery_date: '2025.06.22',
  options: [
    {
      option_id: 1,
      option_name: '선물 없이 후원하기',
      option_price: '1,000',
      option_description: '',
    },
    {
      option_id: 2,
      option_name: '후원 A',
      option_price: '32,000',
      option_description: '혜택 상품 목록1/n혜택 상품 목록2',
    },
    {
      option_id: 3,
      option_name: '후원 B',
      option_price: '79,000',
      option_description: '혜택 상품 목록1/n혜택 상품 목록2/n혜택 상품 목록3',
    },
  ],
  like: 75,
  owner_id: 1,
  owner_name: '나는야 서포터',
  owner_description:
    'Lorem ipsum dolor sit amet consectetur. Amet mattis ligula vulputate dui dignissim tristique aliquet arcu suscipit. Aliquam feugiat nibh donec imperdiet amet id elit. In placerat convallis ut augue et at. Consequat at vulputate parturient augue praesent. Nulla bibendum vitae non magna. Id ipsum in nibh sit mi. Tellus phasellus amet enim volutpat in elementum.',
};
