import { Box, Typography } from "@mui/material";

import NoData from "@/assets/images/no-data.jpg";

export default function NoDataCard({
  maxW = 450,
  p = 4,
}: {
  maxW?: string | number;
  p?: number;
}) {
  return (
    <Box
      sx={{
        gap: 2,
        padding: p,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          width: "100%",
          maxWidth: maxW,
          height: "auto",
        }}
        src={NoData}
        alt="No data"
      />
      <Typography variant="h6" color="warning" fontWeight="bold">
        Sin datos
      </Typography>
    </Box>
  );
}
