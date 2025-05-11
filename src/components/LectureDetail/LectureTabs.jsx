// 📄 src/components/LectureDetail/LectureTabs.jsx

import { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import LectureInfo from "./LectureInfo";
import CurriculumSection from "./CurriculumSection";
import MentorProfile from "./MentorProfile";
import ReviewSection from "./ReviewSection";

// 스켈레톤 컴포넌트
import LectureInfoSkeleton from "./skeleton/LectureInfoSkeleton";
import CurriculumSectionSkeleton from "./skeleton/CurriculumSectionSkeleton";
import MentorProfileSkeleton from "./skeleton/MentorProfileSkeleton";
import ReviewSectionSkeleton from "./skeleton/ReviewSectionSkeleton";

const tabList = [
  { label: "상세정보", value: 0 },
  { label: "커리큘럼", value: 1 },
  { label: "멘토 정보", value: 2 },
  { label: "수강 후기", value: 3 },
];

export default function LectureTabs({ lecture, loading }) {
  const [tabIndex, setTabIndex] = useState(0);

  // 현재 선택된 탭 컴포넌트 렌더링
  const renderTabContent = () => {
    // 로딩 중인 경우 스켈레톤 표시
    if (loading) {
      switch (tabIndex) {
        case 0:
          return <LectureInfoSkeleton />;
        case 1:
          return <CurriculumSectionSkeleton />;
        case 2:
          return <MentorProfileSkeleton />;
        case 3:
          return <ReviewSectionSkeleton />;
        default:
          return <LectureInfoSkeleton />;
      }
    }

    // 로딩 완료된 경우 실제 컴포넌트 표시
    switch (tabIndex) {
      case 0:
        return <LectureInfo lecture={lecture} />;
      case 1:
        return (
          <CurriculumSection
            lecture={lecture}
            curriculum={lecture?.curriculum}
          />
        );
      case 2:
        return <MentorProfile mentor={lecture?.mentor} />;
      case 3:
        return <ReviewSection lecture={lecture} />;
      default:
        return <LectureInfo lecture={lecture} />;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: "var(--primary-200)",
          },
        }}
      >
        {tabList.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            sx={{
              fontWeight: 600,
              color: "var(--text-300)",
              "&.Mui-selected": {
                color: "var(--primary-200)",
              },
            }}
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 4 }}>{renderTabContent()}</Box>
    </Box>
  );
}
