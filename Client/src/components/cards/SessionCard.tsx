import dayjs from "dayjs";

import { Box, Grid, Typography } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { capitalizeString } from "@/utils";

const SessionCard = ({
  sessionDate,
  duration,
}: {
  sessionDate: dayjs.Dayjs;
  duration: number;
}) => {
  return (
    <Box bgcolor="#61b3ea" borderRadius="3px" height="auto" mt="1rem">
      <Grid container py={2}>
        <Grid item xs={2}>
          <Box
            display="flex"
            justifyContent="center"
            height="100%"
            alignItems="center"
          >
            <EventAvailableIcon htmlColor="white" />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            alignItems="center"
            justifyItems="center"
            justifyContent="center"
          >
            <Typography variant="body1" color="white">
              {capitalizeString(
                sessionDate.locale("es").format("dddd, MMMM D, YYYY")
              )}
            </Typography>
            <Typography variant="body1" color="white">
              {capitalizeString(
                `${sessionDate.format("LT")} - ${sessionDate
                  .add(duration, "minutes")
                  .format("LT")}`
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SessionCard;
