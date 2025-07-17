import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MediumFont, Title } from "@repo/ui/styles";
import { InputText, MainButton } from "@repo/ui/components";
import axios from "axios";

const categories = [
  "예술", "의류", "디자인", "테크/가전",
  "게임", "홈/리빙", "향수/뷰티", "잡화"
];

const categoryMap: Record<string, string> = {
  "예술": "예술",
  "의류": "의류",
  "디자인": "디자인",
  "테크": "테크/가전",
  "테크/가전": "테크/가전",
  "가전": "테크/가전",
  "게임": "게임",
  "홈리빙": "홈/리빙",
  "홈/리빙": "홈/리빙",
  "뷰티": "향수/뷰티",
  "향수/뷰티": "향수/뷰티",
  "잡화": "잡화",
};

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
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      console.log("유저 프로필 불러오기 실행됨");

      try {
        const res = await axios.get(`/api/users/mypage/profile?ts=${Date.now()}`, {
          withCredentials: true,
        });

        const data = res.data;
        console.log("응답 받은 유저 데이터:", data);

        setNickname(data.nickname || "");
        setGender(data.gender || "");

        const ageString = `${data.ageId * 10}대`;
        setAge(ageOptions.includes(ageString) ? ageString : "");

        setEmail(data.email || "");
        setIntro(data.contents || "");

        const mappedCategory = categoryMap[data.categoryName];
        if (mappedCategory && categories.includes(mappedCategory)) {
          setSelectedCategory(mappedCategory);
        } else {
          console.warn("알 수 없는 카테고리 이름:", data.categoryName);
          setSelectedCategory(categories[0]);
        }

        setProfileImage(data.imageUrl || null);
        setIsLoaded(true);
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
    navigate("/mypage");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmUpdate = window.confirm("프로필을 변경하시겠습니까?");
    if (!confirmUpdate) return;

    const ageId = parseInt(age.replace("대", ""), 10) / 10;
    const categoryIndex = categories.findIndex(c => c === selectedCategory);
    if (categoryIndex === -1) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    const categoryId = categoryIndex + 1;

    const payload = {
      image_url: profileImage,
      nickname,
      gender,
      age_id: ageId,
      contents: intro,
      category_id: categoryId,
    };

    try {
      const res = await axios.put("/api/users/mypage/profile", payload, {
        withCredentials: true,
      });

      console.log("프로필 수정 성공:", res.data);
      alert("프로필이 저장되었습니다!");
      window.location.href = "/mypage";
    } catch (err) {
      console.error("프로필 수정 실패:", err);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
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

          <div className="flex flex-col gap-3">
            <label className="text-base font-medium">이메일</label>
            <InputText
              type="email"
              value={email}
              readOnly
            />
          </div>

          <div>
            <label className="text-base font-medium">한줄 소개</label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="w-full mt-2 p-3 border border-slate-300 rounded-md resize-none h-[100px] focus:border-[#5FBDFF] focus:outline-none"
              placeholder="자기소개를 입력하세요"
            />
          </div>

          <div>
            <label className="text-base font-medium">카테고리 선택</label>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full h-[50px] text-sm transition ${
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

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full h-[48px] bg-gray-300 text-gray-500 rounded-md"
            >
              취소
            </button>
            <MainButton
              type="submit"
              label="확인"
              width="w-full"
            />
          </div>

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
