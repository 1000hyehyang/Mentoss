// 📄 src/components/LectureDetail/MentorProfile.jsx

import {
  Box,
  Typography,
  Chip,
  Stack,
  Avatar,
  Divider,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/VerifiedUser";
import StarIcon from "@mui/icons-material/Star";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function MentorProfile({ mentor }) {
  // Add safety checks and fallbacks
  const profileImage = mentor?.profileImage || "/images/default-profile.svg";
  const nickname = mentor?.nickname || "멘토";
  const isCertified = mentor?.isCertified || false;
  const rating = mentor?.rating || 0;
  const mbti = mentor?.mbti || "MBTI";
  const education = mentor?.education || "";
  const major = mentor?.major || "";
  const regions = Array.isArray(mentor?.regions) ? mentor.regions : [];
  const analysisComment = mentor?.analysisComment || "";
  const content = mentor?.content || "멘토 소개 내용이 없습니다.";
  const appealFileUrl = mentor?.appealFileUrl || "";

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        멘토 정보
      </Typography>

      {/* 프로필 이미지 */}
      <Box display="flex" justifyContent="center" mt={2} mb={1}>
        <Avatar src={profileImage} sx={{ width: 80, height: 80 }} />
      </Box>

      {/* 닉네임 + 인증 */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Typography fontWeight={600} fontSize="1rem" color="var(--text-100)">
          {nickname}
        </Typography>
        {isCertified && (
          <ShieldIcon fontSize="small" sx={{ color: "var(--primary-100)" }} />
        )}
      </Box>

      {/* 별점 + MBTI */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        mt={1}
      >
        <Box display="flex" alignItems="center" gap={0.5}>
          <StarIcon sx={{ fontSize: 16, color: "#FFC107" }} />
          <Typography fontSize="0.85rem">
            {typeof rating === "number" ? rating.toFixed(1) : "0.0"}
          </Typography>
        </Box>
        <Chip
          label={mbti}
          size="small"
          sx={{
            backgroundColor: "var(--action-green-bg)",
            color: "var(--action-green)",
            fontWeight: 600,
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* 학력 */}
      <Typography
        variant="body2"
        textAlign="center"
        mt={1}
        color="var(--text-300)"
      >
        {education} {major && `${major}`}
      </Typography>

      {/* 지역 */}
      {regions.length > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
          mt={1}
        >
          {regions.map((r, index) => (
            <Chip
              key={index}
              label={
                typeof r === "string"
                  ? r
                  : `${r.sido || ""} ${r.sigungu || ""}`.trim()
              }
              size="small"
              sx={{
                backgroundColor: "var(--action-primary-bg)",
                color: "var(--primary-200)",
                fontWeight: 500,
                borderRadius: "8px",
              }}
            />
          ))}
        </Box>
      )}

      {/* AI 멘토 분석 */}
      {analysisComment && (
        <Box
          mt={3}
          p={2}
          borderRadius="8px"
          sx={{
            background:
              "linear-gradient(90deg, rgba(255, 186, 208, 0.2) 0%, rgba(91, 141, 239, 0.2) 100%)",
            color: "var(--text-200)",
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <InfoOutlinedIcon fontSize="small" />
            <Typography fontWeight={600} fontSize={14}>
              AI 멘토 분석
            </Typography>
          </Box>
          <Typography fontSize={13} fontWeight={400}>
            {analysisComment}
          </Typography>
        </Box>
      )}

      {/* 멘토 소개 */}
      <Divider sx={{ my: 3 }} />
      <Typography color="var(--text-100)" variant="subtitle2" fontWeight={600}>
        멘토 소개
      </Typography>
      <Box
        sx={{
          mt: 1,
          backgroundColor: "var(--bg-100)",
          borderRadius: "12px",
          border: "1px solid var(--bg-300)",
          p: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{ whiteSpace: "pre-line", color: "var(--text-200)" }}
        >
          {content}
        </Typography>
      </Box>

      {/* 첨부파일 */}
      {appealFileUrl && (
        <Box mt={2}>
          <ListItem
            component="a"
            href={appealFileUrl}
            target="_blank"
            sx={{
              border: "1px solid var(--bg-200)",
              borderRadius: 1,
              px: 2,
              py: 1,
              backgroundColor: "#fefefe",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <ListItemIcon>
              <InsertDriveFileIcon sx={{ color: "var(--primary-300)" }} />
            </ListItemIcon>
            <ListItemText
              primary="document_file_name.pdf"
              secondary="100kb · Complete"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        </Box>
      )}
    </Box>
  );
}
