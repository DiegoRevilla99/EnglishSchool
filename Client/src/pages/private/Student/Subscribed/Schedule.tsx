import dayjs from "dayjs";
import esMX from "dayjs/locale/es-mx";

import { useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";

import { Box, Chip, Grid, Typography, useMediaQuery } from "@mui/material";
import {
  EventAvailableOutlined,
  EventBusyOutlined,
  EventOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { esES } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";

import Session from "@/models/Session";

import SessionCard from "@/components/Cards/SessionCard";
import StudentSchedule from "@/components/Forms/Student/StudentSchedule";
import NoSessionCard from "@/components/Cards/NoSessionCard";
import HeroBannerForTables from "@/components/Template/Header/HeroBannerForTables";

import ImageBanner from "@/assets/images/hero/schedule.jpeg";

const Schedule = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [date, setDate] = useState<string>(dayjs().toString());

  const orderedSessions = [...(currentUser?.sessions || [])]
    .filter((session: Session) => {
      return dayjs(session.sessionDate).isAfter(dayjs());
    })
    .sort(function (first: Session, second: Session) {
      return (
        new Date(first.sessionDate).getTime() -
        new Date(second.sessionDate).getTime()
      );
    });

  const isInOrientationRange = useMediaQuery(
    "(min-width:520px) and (max-width:899px)"
  );
  const isInScrollRange = useMediaQuery(
    "(max-width:366px), (min-width:899px) and (max-width:1080px)"
  );

  const handleDateChange = (clickedDate: dayjs.Dayjs | null) => {
    setDate(clickedDate?.toISOString() || dayjs().toString());
  };

  const getCredits = () => {
    const activeSub = currentUser?.subscriptions.find((item) => item.status);

    if (!activeSub) {
      return 0;
    }

    return activeSub.availableCredits;
  };

  return (
    <div>
      <HeroBannerForTables
        title="Mi horario"
        image={ImageBanner}
        imagePosition="center"
      />
      <div className="main-cols-wrapper">
        <Box gap={3} padding={4} display="flex" flexDirection="column">
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Chip
                    label={`Créditos libres: ${getCredits()}`}
                    sx={{
                      backgroundColor: "#2C3D4F",
                      borderRadius: 0,
                      height: "40px",
                      color: "white",
                      width: 1,
                    }}
                    icon={<ShoppingCartOutlined color="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Chip
                    label="Spot disponible"
                    sx={{
                      backgroundColor: "#61B3EA",
                      borderRadius: 0,
                      height: "40px",
                      color: "white",
                      width: 1,
                    }}
                    icon={<EventAvailableOutlined color="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Chip
                    label="Clase tomada"
                    sx={{
                      backgroundColor: "#9703F2",
                      borderRadius: 0,
                      height: "40px",
                      color: "white",
                      width: 1,
                    }}
                    icon={<EventBusyOutlined color="inherit" />}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Chip
                    label="Clase pendiente"
                    sx={{
                      backgroundColor: "#EA583E",
                      borderRadius: 0,
                      height: "40px",
                      color: "white",
                      width: 1,
                    }}
                    icon={<EventOutlined color="inherit" />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box>
                <LocalizationProvider
                  adapterLocale={esMX.name}
                  dateAdapter={AdapterDayjs}
                  localeText={
                    esES.components.MuiLocalizationProvider.defaultProps
                      .localeText
                  }
                >
                  <StaticDatePicker
                    disablePast
                    onChange={(event) => handleDateChange(event)}
                    defaultValue={dayjs()}
                    slotProps={{ actionBar: { hidden: true } }}
                    sx={{
                      minWidth: { xs: 0 },
                      overflowX: isInScrollRange ? "scroll" : "none",
                    }}
                    orientation={
                      isInOrientationRange ? "landscape" : "portrait"
                    }
                  />
                </LocalizationProvider>
              </Box>
              <Box
                pt="2rem"
                display={{ xs: "none", md: "flex" }}
                flexDirection="column"
              >
                <Typography
                  variant="h5"
                  color="initial"
                  fontWeight="bold"
                  fontFamily="Source Serif Pro"
                >
                  Próximas clases
                </Typography>
                <Box width="100%">
                  {orderedSessions.length === 0 ? (
                    <NoSessionCard />
                  ) : (
                    orderedSessions.slice(0, 3).map((session) => {
                      return (
                        <SessionCard
                          sessionDate={dayjs(session.sessionDate)}
                          duration={session.duration}
                        />
                      );
                    })
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <StudentSchedule dateSelected={date} />
              <Box
                pt="2rem"
                display={{ xs: "flex", md: "none" }}
                flexDirection="column"
              >
                <Typography
                  variant="h5"
                  color="initial"
                  fontWeight="bold"
                  fontFamily="Source Serif Pro"
                >
                  Próximas clases
                </Typography>
                <Box>
                  {orderedSessions.length === 0 ? (
                    <NoSessionCard />
                  ) : (
                    orderedSessions.slice(0, 3).map((session) => {
                      return (
                        <SessionCard
                          sessionDate={dayjs(session.sessionDate)}
                          duration={session.duration}
                        />
                      );
                    })
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Schedule;
