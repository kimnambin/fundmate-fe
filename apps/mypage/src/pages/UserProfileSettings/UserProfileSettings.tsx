import { useState, useRef, ChangeEvent } from "react";
import { Header } from "../../../../../packages/ui/components/Header";

const UserProfileSetting = () => {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [intro, setIntro] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "예술", "의류", "디자인", "테크/가전",
    "게임", "홈/리빙", "향수/뷰티", "잡화"
  ];

  const ageOptions = [
    "10대", "20대", "30대", "40대", "50대",
    "60대", "70대", "80대", "90대", "100대"
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  const handleCancel = () => {
    setNickname("");
    setGender("");
    setAge("");
    setEmail("");
    setIntro("");
    setSelectedCategory(null);
    setProfileImage(null);
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
    // TODO: API 연동 시 POST/PUT 연결
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
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex flex-col items-center mt-[60px]">
        <h2 className="mr-[400px] text-xl font-semibold mb-5">내 정보 설정</h2>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center gap-3 mb-8">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-slate-200" />
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <div className="flex gap-4 text-sm text-gray-500 underline cursor-pointer">
            <button type="button" onClick={handleClickChange}>바꾸기</button>
            <button type="button" onClick={() => setProfileImage(null)}>삭제</button>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[506px]">

          {/* 닉네임 */}
          <div>
            <label className="text-sm font-medium">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:border-[#5FBDFF] focus:outline-none"
              placeholder="닉네임을 입력하세요"
            />
          </div>

          {/* 성별 및 나이 */}
          <div className="flex justify-between">
            <div className="flex flex-col w-[234px]">
              <label className="text-sm font-medium">성별</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="여자"
                    checked={gender === "여자"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  여자
                </label>
                <label className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="남자"
                    checked={gender === "남자"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  남자
                </label>
              </div>
            </div>

            <div className="flex flex-col w-[234px]">
              <label className="text-sm font-medium">나이</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:border-[#5FBDFF] focus:outline-none"
              >
                <option value="">선택</option>
                {ageOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 이메일 */}
          <div>
            <label className="text-sm font-medium">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:border-[#5FBDFF] focus:outline-none"
              placeholder="이메일을 입력하세요"
            />
          </div>

          {/* 한줄 소개 */}
          <div>
            <label className="text-sm font-medium">한줄 소개</label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="w-full mt-1 p-2 border border-slate-300 rounded-md resize-none h-[80px] focus:border-[#5FBDFF] focus:outline-none"
              placeholder="자기소개를 입력하세요"
            />
          </div>

          {/* 카테고리 선택 */}
          <div>
            <label className="text-sm font-medium">카테고리 선택</label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selectedCategory === category
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
          <div className="flex justify-between mt-4 mb-[15px]">
            <button
              type="button"
              onClick={handleCancel}
              className="w-[245px] py-2 bg-gray-100 text-gray-500 rounded-md border"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-[245px] py-2 bg-[#5FBDFF] text-white rounded-md"
            >
              확인
            </button>
          </div>

          {/* 회원탈퇴 버튼 */}
          <button
            type="button"
            className="mt-4 w-[506px] h-[40px] flex justify-center items-center rounded-md text-[16px] mb-[100px] font-medium underline text-[#7E7C7C]"
            onClick={() => {
              const confirmDelete = window.confirm(
                "⚠️ 정말 회원 탈퇴하시겠습니까?"
              );
              if (confirmDelete) {
                // TODO: 회원탈퇴 API 연동 및 로그아웃/리다이렉트 처리
                console.log("회원탈퇴 진행");
              } else {
                console.log("회원탈퇴 취소");
              }
            }}
          >
            회원탈퇴
          </button>
        </form>
      </main>
    </div>
  );
};

export default UserProfileSetting;
