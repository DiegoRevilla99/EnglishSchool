import dayjs from "dayjs";
import es from "dayjs/locale/es";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Banner from "@/assets/images/school/kids-jumping.jpg";

import { useAppSelector } from "@/hooks/useRedux";
import { useCreateTrialSessionMutation } from "@/slices/SessionSlice";

const TrialClass = () => {
  const navigate = useNavigate();
  const isWideScreen = useMediaQuery("(min-width:1200px)");
  const isSmallScreen = useMediaQuery("(max-width:450px)");

  const currentUser = useAppSelector((state) => state.auth.user);
  const firstSession = currentUser?.sessions?.find(
    (session) => session.isFirst
  );
  const [bookFreeSession, { isLoading }] = useCreateTrialSessionMutation();

  const [hasBooked, setHasBooked] = useState(firstSession !== undefined);
  const [sessionDate, setSessionDate] = useState(
    dayjs(firstSession?.sessionDate).locale(es).format("LL LT A")
  );

  async function bookTrialClass() {
    const booked = await bookFreeSession(currentUser?.studentId ?? "").unwrap();
    if (booked) {
      setSessionDate(dayjs(booked.sessionDate).locale(es).format("LL LT A"));
      setHasBooked(true);
    }
  }

  return (
    <Grid container bgcolor="#F8FEF2" paddingY={8} alignItems="center">
      <Grid item xs={12} lg={6}>
        <Box
          gap={4}
          padding={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            color="#04555C"
            fontWeight="bold"
            variant={isSmallScreen ? "h4" : "h2"}
            textAlign={isWideScreen ? "left" : "center"}
          >
            Experimente el futuro del aprendizaje de inglés
          </Typography>
          <Typography
            color="initial"
            fontWeight="light"
            variant={isSmallScreen ? "body1" : "h6"}
            textAlign={isWideScreen ? "left" : "center"}
          >
            Tendrás la oportunidad de experimentar nuestros métodos de enseñanza
            innovadores e interactuar con nuestros maestros.
          </Typography>
          <Box
            gap={2}
            display="flex"
            justifyContent={isWideScreen ? "left" : "center"}
          >
            <Tooltip
              title={
                hasBooked ? `Tu clase será el ${sessionDate}` : "Inicia ahora"
              }
              placement="bottom"
            >
              <span>
                <LoadingButton
                  size="large"
                  color="info"
                  loading={isLoading}
                  variant="contained"
                  disabled={hasBooked}
                  onClick={bookTrialClass}
                >
                  {hasBooked ? "Clase agendada" : "Agendar clase"}
                </LoadingButton>
              </span>
            </Tooltip>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => navigate("/planes")}
            >
              Elige un plan
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={Banner} alt="Kids" style={{ width: "650px" }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TrialClass;
