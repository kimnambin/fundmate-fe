import {
  Box,
  GiftCard,
  GiftDesc,
  GiftItemTitle,
  GiftPrice,
  GiftSection,
  GiftTitle,
  ProfileCard,
  ProfileDesc,
  ProfileImg,
  ProfileInfo,
  ProfileInfos,
  SelectButton,
} from '../../styles/product-detail/prdouctstyle';

const PDBox = () => {
  const CreatorData: (string | boolean)[] = [
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MTBfMTY1%2FMDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute%2Fuser.png&type=sc960_832',
    '나는야 서포터',
    false,
    'dsfjkldfklsdjkvldjkljfgdfklsdjfkdskj',
  ];

  const gift = [
    {
      title: '기본 리워드',
      desc: '선물 없이 후원하기',
      price: '1,000',
    },
    {
      title: '스페셜 리워드',
      desc: '프린터 + 예비 부품 + 포스터',
      price: '75,000',
    },
    {
      title: '스페셜 리워드',
      desc: '프린터 + 예비 부품 + 포스터',
      price: '55,000',
    },
  ];

  return (
    <Box>
      <GiftCard className="w-full">
        <ProfileInfo>
          <ProfileInfos>창작자 소개</ProfileInfos>
          <ProfileCard>
            <div className="flex flex-row items-center">
              <ProfileImg src={CreatorData[0]} alt="prifile" />
              <GiftItemTitle>{CreatorData[1]}</GiftItemTitle>
            </div>

            {CreatorData[2] ? (
              <SelectButton className="bg-white">+ 팔로우</SelectButton>
            ) : (
              <SelectButton className="bg-white">팔로잉</SelectButton>
            )}
          </ProfileCard>
          <ProfileDesc>{CreatorData[3]}</ProfileDesc>
        </ProfileInfo>
      </GiftCard>

      <GiftSection>
        <GiftTitle>리워드 목록</GiftTitle>
        {gift.map((Gift, idx) => (
          <GiftCard key={idx}>
            <ProfileCard className="my-0">
              <GiftPrice>{Gift.price}원</GiftPrice>
              <SelectButton>~남음</SelectButton>
            </ProfileCard>
            <GiftItemTitle>{Gift.title}</GiftItemTitle>
            <GiftDesc>{Gift.desc}</GiftDesc>
          </GiftCard>
        ))}
      </GiftSection>
    </Box>
  );
};

export default PDBox;
