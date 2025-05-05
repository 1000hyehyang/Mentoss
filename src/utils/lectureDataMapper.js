// src/utils/lectureDataMapper.js

/**
 * 강의 등록 폼 데이터를 서버 API 포맷으로 변환
 */
export const mapLectureFormToApi = (formData) => {
  return {
    lectureTitle: formData.title,
    description: formData.description,
    categoryId: Number(formData.category),
    curriculum: formData.curriculum,
    price: Number(formData.price),
    regions: formData.regions.map((region) => ({
      regionCode: region.regionCode,
    })),
    timeSlots: formData.timeSlots.map((slot) => {
      const formattedSlot = {
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
      // id가 있다면 제거
      delete formattedSlot.id;
      return formattedSlot;
    }),
  };
};

/**
 * API 응답 데이터를 폼 데이터 포맷으로 변환
 */
export const mapApiToLectureForm = (apiData) => {
  return {
    title: apiData.lectureTitle,
    description: apiData.description,
    category: apiData.categoryId?.toString() || "",
    curriculum: apiData.curriculum,
    price: apiData.price?.toString() || "",
    regions:
      apiData.regions?.map((region) => ({
        regionCode: region.regionCode,
        name: region.displayName || region.name || region.regionCode,
        displayName: region.displayName || region.name || region.regionCode,
      })) || [],
    timeSlots:
      apiData.timeSlots?.map((slot, index) => ({
        id: Date.now() + index, // 고유 ID 부여
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })) || [],
  };
};
