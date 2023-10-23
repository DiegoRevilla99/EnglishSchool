import { Box, Typography } from "@mui/material";

import NoData from "@/assets/images/noSessions.jpeg";

const NoSessionCard = () => {
  return (
    <Box
      sx={{
        gap: 2,
        padding: 4,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <img
        style={{
          width: "100%",
          maxWidth: 150,
          height: "auto",
        }}
        src={NoData}
        alt="No data"
      />
      <Typography variant="h6" color="warning" fontWeight="bold">
        No hay sesiones
      </Typography>
    </Box>
  );
};

export default NoSessionCard;
