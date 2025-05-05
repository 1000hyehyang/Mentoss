// src/utils/lectureDataMapper.js

/**
 * 강의 폼 데이터를 API 요청 형식으로 변환
 */
export const mapFormDataToApiRequest = (formData) => {
  // TipTap 에디터의 HTML 내용을 일반 텍스트로 변환
  const getTextFromHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return {
    lectureTitle: formData.title,
    description: getTextFromHTML(formData.description), // TipTap 에디터 내용
    categoryId: parseInt(formData.categoryId), // 카테고리 ID는 숫자로 변환
    curriculum: getTextFromHTML(formData.curriculum), // TipTap 에디터 내용
    price: parseInt(formData.price),
    regions: formData.regions.map((region) => ({
      regionCode: region.regionCode,
    })),
    timeSlots: formData.timeSlots.map((slot) => ({
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
  };
};

/**
 * 지역 문자열을 지역 코드로 변환하는 매핑
 * 실제로는 지역 API를 통해 가져와야 할 데이터이지만,
 * 현재는 하드코딩된 예시입니다.
 */
export const REGION_CODE_MAP = {
  // export 추가!
  // 서울 강남구
  "강남구 전체": "1111010400",
  "강남구 개포동": "1111010401",
  "강남구 논현동": "1111010402",
  "강남구 대치동": "1111010403",
  // 다른 지역들도 추가...
};
