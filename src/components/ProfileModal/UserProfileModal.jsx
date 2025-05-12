import {
  Modal,
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SecurityIcon from "@mui/icons-material/Security";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useProfileModalStore } from "../../store/useProfileModalStore";

export default function UserProfileModal() {
  const { isOpen, profileData, closeModal } = useProfileModalStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!profileData) return null;

  const {
    nickname,
    age,
    sex,
    mbti,
    profileImage,
    regionNames,
    isMentor,
    rating,
    isCertified,
    education,
    major,
    analysisComment,
    introduction,
    appealFileUrl,
  } = profileData;

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          width: isMobile ? "100vw" : 500,
          height: isMobile ? "100dvh" : "auto",
          maxHeight: isMobile ? "100dvh" : "90vh",
          overflowY: "auto",
          bgcolor: "#fefefe",
          borderRadius: isMobile ? 0 : "16px",
          p: isMobile ? 2 : 3,
          boxShadow: 6,
          // 핵심! 아래 3줄은 중앙 정렬
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* 타이틀 */}
        <Typography
          variant="h6"
          fontWeight={600}
          textAlign="center"
          mb={2}
          fontSize={isMobile ? "1rem" : "1.25rem"}
        >
          유저 프로필
        </Typography>

        {/* 프로필 이미지 */}
        <Box display="flex" justifyContent="center">
          <Avatar
            src={profileImage || "/images/default-profile.svg"}
            sx={{ width: 80, height: 80 }}
          />
        </Box>

        {/* 닉네임 + 인증 */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mt={2}
        >
          {/* 닉네임 */}
          <Typography fontWeight={600}>{nickname}</Typography>

          {/* 인증 아이콘 */}
          {isCertified && (
            <SecurityIcon
              sx={{
                fontSize: 16,
                fill: "url(#shield-gradient)",
              }}
            />
          )}
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mt={1}
        >
          {/* 별점 */}
          {isMentor && (
            <Box
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{ minWidth: "fit-content" }}
            >
              <StarIcon sx={{ fontSize: 16, color: "#FFC107" }} />
              <Typography variant="body2">{rating.toFixed(1)}</Typography>
            </Box>
          )}

          {/* MBTI */}
          <Chip
            label={mbti}
            size="small"
            sx={{
              fontWeight: 500,
              backgroundColor: "var(--action-green-bg)",
              color: "var(--action-green)",
              borderRadius: "8px",
              minWidth: "fit-content", // 줄바꿈 허용
            }}
          />
        </Box>

        {/* 학력 */}
        {isMentor && (
          <Typography
            variant="body2"
            textAlign="center"
            mt={1}
            color="var(--text-300)"
            fontSize={isMobile ? 13 : 14}
          >
            {education} {major}
          </Typography>
        )}

        {/* 나이, 성별 */}
        <Typography
          variant="body2"
          textAlign="center"
          mt={1}
          color="var(--text-300)"
          fontSize={isMobile ? 13 : 14}
        >
          {age}세 · {sex}
        </Typography>

        {/* 지역 */}
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
          mt={1}
        >
          {regionNames.map((r) => (
            <Chip
              key={r}
              label={r}
              icon={
                <LocationOnIcon
                  sx={{ fontSize: 14, color: "var(--action-yellow)" }}
                />
              }
              size="small"
              sx={{
                backgroundColor: "var(--action-yellow-bg)",
                color: "var(--action-yellow)",
                fontWeight: 500,
                borderRadius: "8px",
              }}
            />
          ))}
        </Box>

        {/* AI 멘토 분석 */}
        {isMentor && analysisComment && (
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
        {isMentor && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography
              color="var(--text-100)"
              variant="subtitle2"
              fontWeight={600}
            >
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
                {introduction}
              </Typography>
            </Box>

            {/* 포트폴리오 파일 */}
            {appealFileUrl && (
              <Box
                component="a"
                href={appealFileUrl}
                target="_blank"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.2,
                  px: 3,
                  py: 2,
                  mt: 3,
                  backgroundColor: "var(--bg-100)",
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 500,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "var(--bg-200)",
                  },
                }}
              >
                <InsertDriveFileIcon sx={{ color: "var(--primary-100)" }} />
                <Typography
                  color={"var(--text-300)"}
                  fontSize={14}
                  fontWeight={600}
                >
                  멘토가 등록한 포트폴리오 보러가기
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* 닫기 버튼 */}
        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            backgroundColor: "var(--bg-100)",
            borderRadius: "12px",
            borderColor: "var(--bg-300)",
            color: "var(--text-400)",
            fontWeight: 600,
            p: 1.5,
            ":hover": {
              backgroundColor: "var(--bg-200)",
            },
          }}
          onClick={closeModal}
        >
          닫기
        </Button>
      </Box>
    </Modal>
  );
}
