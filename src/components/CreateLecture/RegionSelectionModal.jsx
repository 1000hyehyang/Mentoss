// src/components/CreateLecture/RegionSelectionModal.jsx

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const SEOUL_DISTRICTS = [
  { id: "jongno", name: "종로구" },
  { id: "gangnam", name: "강남구" },
];

const DISTRICT_DONGS = {
  jongno: [
    { name: "종로구 효자동", code: "1111010400" },
    { name: "종로구 창성동", code: "1111010500" },
    { name: "종로구 통의동", code: "1111010600" },
  ],
  gangnam: [
    { name: "강남구 일원동", code: "1135010100" },
    { name: "강남구 수서동", code: "1135010200" },
  ],
};

export default function RegionSelectionModal({
  open,
  onClose,
  onSubmit,
  selectedRegions = [],
}) {
  const [selectedProvince, setSelectedProvince] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("gangnam");
  const [selectedDongs, setSelectedDongs] = useState([]);

  // 시/도 선택 핸들러
  const handleProvinceClick = (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedDongs([]);
  };

  // 구/군 선택 핸들러
  const handleDistrictClick = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedDongs([]);
  };

  // 동 선택 토글 핸들러
  const toggleDong = (dong) => {
    setSelectedDongs((prev) => {
      const isExist = prev.some((d) => d.code === dong.code);
      if (isExist) {
        return prev.filter((d) => d.code !== dong.code);
      } else {
        return [...prev, dong];
      }
    });
  };

  // 완료 핸들러
  const handleSubmit = () => {
    onSubmit(selectedDongs);
  };

  // 초기화 핸들러
  const handleReset = () => {
    setSelectedDongs([]);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            지역 선택
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* 시/도 선택 버튼 */}
        <Box display="flex" flexWrap="wrap" gap={1} mb={4}>
          <Chip
            label="서울"
            onClick={() => handleProvinceClick("seoul")}
            sx={{
              bgcolor:
                selectedProvince === "seoul"
                  ? "var(--action-primary-bg)"
                  : "white",
              color:
                selectedProvince === "seoul"
                  ? "var(--primary-200)"
                  : "var(--text-300)",
              border:
                selectedProvince === "seoul"
                  ? "none"
                  : "1px solid var(--bg-300)",
              "&:hover": {
                bgcolor:
                  selectedProvince === "seoul"
                    ? "var(--action-primary-bg)"
                    : "var(--bg-200)",
              },
            }}
          />
        </Box>

        {/* 구/군 선택 테이블 */}
        <Box
          display="flex"
          gap={2}
          mb={4}
          sx={{
            border: "1px solid var(--bg-300)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {/* 구/군 목록 */}
          <Box sx={{ width: "40%", borderRight: "1px solid var(--bg-300)" }}>
            {SEOUL_DISTRICTS.map((district) => (
              <Box
                key={district.id}
                onClick={() => handleDistrictClick(district.id)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  bgcolor:
                    selectedDistrict === district.id
                      ? "var(--bg-200)"
                      : "transparent",
                  color:
                    selectedDistrict === district.id
                      ? "var(--text-100)"
                      : "var(--text-300)",
                  fontWeight: selectedDistrict === district.id ? 600 : 400,
                  borderBottom: "1px solid var(--bg-300)",
                  "&:hover": {
                    bgcolor: "var(--bg-200)",
                  },
                }}
              >
                {district.name}
              </Box>
            ))}
          </Box>

          {/* 동 목록 */}
          <Box sx={{ width: "60%" }}>
            {selectedDistrict &&
              DISTRICT_DONGS[selectedDistrict]?.map((dong) => (
                <Box
                  key={dong.code}
                  onClick={() => toggleDong(dong)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid var(--bg-300)",
                    color: selectedDongs.some((d) => d.code === dong.code)
                      ? "var(--primary-200)"
                      : "var(--text-300)",
                    fontWeight: selectedDongs.some((d) => d.code === dong.code)
                      ? 600
                      : 400,
                    "&:hover": {
                      bgcolor: "var(--bg-200)",
                    },
                  }}
                >
                  <Typography>{dong.name}</Typography>
                  {selectedDongs.some((d) => d.code === dong.code) && (
                    <CheckIcon
                      sx={{ fontSize: 20, color: "var(--primary-200)" }}
                    />
                  )}
                </Box>
              ))}
          </Box>
        </Box>

        {/* 선택 항목 2 */}
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          선택 항목 {selectedDongs.length}
        </Typography>

        {/* 선택된 지역 표시 */}
        <Box display="flex" gap={1} mb={4} flexWrap="wrap">
          {selectedDongs.map((dong, index) => (
            <Chip
              key={index}
              label={dong.name}
              onDelete={() => toggleDong(dong)}
              sx={{
                bgcolor: "var(--action-primary-bg)",
                color: "var(--primary-200)",
                "& .MuiChip-deleteIcon": {
                  color: "var(--primary-200)",
                },
              }}
            />
          ))}
        </Box>

        {/* 버튼 영역 */}
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{
              borderColor: "var(--bg-300)",
              color: "var(--text-300)",
            }}
          >
            초기화
          </Button>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              background: "linear-gradient(45deg, #5B8DEF, #F57EC2)",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(45deg, #4A7BD4, #E36BAB)",
              },
            }}
          >
            선택 완료
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
