import("@/assets/css/classCard.css");

import dayjs from "dayjs";
import React from "react";

import Session from "@/models/Session";

import { capitalizeString } from "@/utils";

import { Box, Button, Grid, Typography } from "@mui/material";

const ClassCard = ({
  user = "student",
  session,
  label,
  actionFn,
}: {
  session: Session;
  user: string;
  label: string;
  actionFn: Function;
}) => {
  const now = dayjs();
  const sessionDate = dayjs(session.sessionDate);

  const daysLeft = () => {
    const total = sessionDate.diff(now, "hours");

    if (total <= 0) {
      return {
        total: 0,
        step: 0,
      };
    }

    return {
      total,
      step: total - 1,
    };
  };

  return (
    <div className="custom-class-card">
      <ol
        style={{ "--length": daysLeft().total } as React.CSSProperties}
        role="list"
      >
        <li style={{ "--i": daysLeft().step } as React.CSSProperties}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                bgcolor="#262526"
                height="70px"
                width="70px"
                borderRadius="100%"
                display="flex"
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  fontSize={18}
                  color="white"
                >
                  {sessionDate.locale("es").format("DD")}
                </Typography>
                <Typography
                  variant="body1"
                  textTransform="uppercase"
                  fontSize={12}
                  letterSpacing="0.8px"
                  color="white"
                >
                  {sessionDate.locale("es").format("MMM")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="100%"
                textAlign={{ xs: "center", sm: "left" }}
              >
                <h4>
                  {`${
                    user === "teacher"
                      ? `Alumno: ${session.student.name}`
                      : `Profesor: ${session.teacher.name}`
                  }`}
                </h4>
                <p>
                  <i className="far fa-clock" aria-hidden="true"></i>
                  {capitalizeString(
                    ` ${sessionDate.format("LT")} - ${sessionDate
                      .add(session.duration, "minutes")
                      .format("LT")}`
                  )}
                </p>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Button
                  variant="contained"
                  onClick={() => actionFn()}
                  sx={{
                    backgroundColor: "#262526",
                    border: `2px solid #262526`,
                    transition:
                      "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
                    "&:hover": {
                      background: "transparent",
                      boxShadow: 0,
                      color: "#262526",
                    },
                  }}
                >
                  {label}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </li>
      </ol>
    </div>
  );
};

export default ClassCard;
