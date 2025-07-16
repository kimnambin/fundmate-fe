import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MediumFont, Title } from "@repo/ui/styles";
import { InputText, MainButton } from "@repo/ui/components";
import axios from "axios"; // ✅ axios 직접 사용

const categories = [
  "예술", "의류", "디자인", "테크/가전",
  "게임", "홈/리빙", "향수/뷰티", "잡화"
];

const ageOptions = [
  "10대", "20대", "30대", "40대", "50대",
  "60대", "70대", "80대", "90대", "100대"
];

const UserProfileSetting = () => {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [intro, setIntro] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ 유저 정보 초기 세팅
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const res = await axios.get("/api/users/profile", {
          params: { project_id: "1" }, // ✅ 필수 쿼리로 에러 방지
          withCredentials: true,
        });

        const data = res.data;

        setNickname(data.nickname || "");
        setGender(data.gender || "");
        setAge(data.ageId ? `${data.ageId}대` : "");
        setEmail(data.email || "");
        setIntro(data.contents || "");
        setSelectedCategory(data.categoryName || null);
        setProfileImage(data.imageUrl || null);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    loadUserProfile();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nickname,
      gender,
      age,
      email,
      intro,
      selectedCategory,
      profileImage,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickChange = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-[600px]">
        <Title className="w-full mb-10">내 정보 설정</Title>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center gap-3 mb-10">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-[120px] h-[120px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[130px] h-[130px] rounded-full bg-slate-200" />
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <div className="flex gap-6 text-lg text-gray-500 underline cursor-pointer">
            <button type="button" onClick={handleClickChange}>
              <MediumFont>바꾸기</MediumFont>
            </button>
            <button type="button" onClick={() => setProfileImage(null)}>
              <MediumFont>삭제</MediumFont>
            </button>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[600px]">
          <div className="flex flex-col gap-3">
            <label className="text-base font-medium">닉네임</label>
            <InputText
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </div>

          {/* 성별 및 나이 */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-base font-medium">성별</label>
              <div className="flex gap-4 mt-2">
                {["여자", "남자"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-3 text-base cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-5 h-5"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-base font-medium">나이</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full mt-2 p-3 border border-slate-300 rounded-md focus:border-[#5FBDFF] focus:outline-none"
              >
                <option value="">선택</option>
                {ageOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-3">
            <label className="text-base font-medium">이메일</label>
            <InputText
              type="email"
              value={email}
              readOnly
            />
          </div>

          {/* 한줄 소개 */}
          <div>
            <label className="text-base font-medium">한줄 소개</label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="w-full mt-2 p-3 border border-slate-300 rounded-md resize-none h-[100px] focus:border-[#5FBDFF] focus:outline-none"
              placeholder="자기소개를 입력하세요"
            />
          </div>

          {/* 카테고리 선택 */}
          <div>
            <label className="text-base font-medium">카테고리 선택</label>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full h-[50px] text-sm transition ${selectedCategory === category
                    ? "bg-[#5FBDFF] text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-between gap-4 mt-6">
            <MainButton
              label="취소"
              width="w-full"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-500"
            />
            <MainButton
              type="submit"
              label="확인"
              width="w-full"
            />
          </div>

          {/* 회원탈퇴 버튼 */}
          <button
            type="button"
            className="mt-6 w-full h-[48px] flex justify-center items-center rounded-md underline text-[#7E7C7C] mb-[120px]"
            onClick={() => navigate("/user/withdrawal")}
          >
            <MediumFont>회원탈퇴</MediumFont>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSetting;
