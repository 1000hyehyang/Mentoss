// src/lib/api/lectureApi.js

import axiosInstance from "../axiosInstance";

/**
 * 강의 생성 API
 */
export const createLecture = async (lectureData) => {
  try {
    const endpoint = "/api/lectures"; //개발용 ,로그인구현되면 배포용으로 갈아끼우기

    // 개발 환경에서는 dev 엔드포인트 사용 (배포용)
    // const endpoint = import.meta.env.DEV
    //   ? "/api/lectures/dev"
    //   : "/api/lectures";
    const response = await axiosInstance.post(endpoint, lectureData);
    return response.data;
  } catch (error) {
    console.error("강의 생성 에러:", error);
    throw error;
  }
};

/**
 * 강의 필터 조회 API
 */
export const getLectures = async (params = {}) => {
  try {
    // 배열 파라미터(regions)를 처리하기 위한 axios의 paramsSerializer 옵션을 설정
    const response = await axiosInstance.get("/api/lectures", {
      params,
      paramsSerializer: {
        indexes: null, // 이렇게 설정하면 배열 파라미터가 regions=item1&regions=item2 형식으로 전송됨
      },
    });
    return response.data;
  } catch (error) {
    console.error("강의 목록 조회 에러:", error);
    throw error;
  }
};

/**
 * 특정 강의 조회 API
 */
export const getLecture = async (lectureId) => {
  try {
    const response = await axiosInstance.get(`/api/lectures/${lectureId}`);
    return response.data;
  } catch (error) {
    console.error("강의 조회 에러:", error);
    throw error;
  }
};

/**
 * 강의 수정 API
 */
export const updateLecture = async (lectureId, lectureData) => {
  try {
    const response = await axiosInstance.put(
      `/api/lectures/${lectureId}`,
      lectureData
    );
    return response.data;
  } catch (error) {
    console.error("강의 수정 에러:", error);
    throw error;
  }
};

/**
 * 강의 삭제 API
 */
export const deleteLecture = async (lectureId) => {
  try {
    const response = await axiosInstance.delete(`/api/lectures/${lectureId}`);
    return response.data;
  } catch (error) {
    console.error("강의 삭제 에러:", error);
    throw error;
  }
};
