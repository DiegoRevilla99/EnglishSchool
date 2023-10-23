import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleOpenOtherModal } from "@/reducers/ModalReducer";

import Session from "@/models/Session";
import { useGetAllSessionsByStudentQuery } from "@/slices/SessionSlice";

import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";

import BookSession from "@/components/Forms/Session/BookSession";
import ClassCard from "@/components/Cards/ClassCard";
import NoSessionCard from "@/components/Cards/NoSessionCard";
import HeroBannerForTables from "@/components/Template/Header/HeroBannerForTables";

import NoData from "@/assets/images/bookSession.png";
import ImageBanner from "@/assets/images/hero/class.png";

const LessonsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const [session, setSession] = useState<Session>();

  const { data, refetch } = useGetAllSessionsByStudentQuery(
    currentUser?.studentId || ""
  );

  const sessionsDone = [...(data || [])].filter((session: Session) => {
    return dayjs(session.sessionDate).isBefore(dayjs());
  });

  const sessionsToBe = [...(data || [])]
    .filter((session: Session) => {
      return dayjs(session.sessionDate).isAfter(dayjs());
    })
    .sort(function (first: Session, second: Session) {
      return (
        new Date(first.sessionDate).getTime() -
        new Date(second.sessionDate).getTime()
      );
    });

  useEffect(() => {
    refetch();
  }, [currentUser]);

  return (
    <div>
      <HeroBannerForTables
        title="Mis clases"
        image={ImageBanner}
        imagePosition="center"
      />
      <div className="main-cols-wrapper">
        <Box bgcolor="#f5f5f5" paddingX={4} paddingBottom={4}>
          {sessionsToBe.length === 0 ? (
            <Box
              sx={{
                gap: 2,
                padding: 4,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  width: "100%",
                  maxWidth: 250,
                  height: "auto",
                }}
                src={NoData}
                alt="No data"
              />
              <Typography variant="h6" color="warning" fontWeight="bold">
                No tienes clases agendadas
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/horario")}
              >
                Agendar ahora
              </Button>
            </Box>
          ) : (
            <Box>
              <Box pt="2rem">
                <h3 className="block-title">Próxima clase</h3>
                {sessionsToBe.slice(0, 1).map((session) => {
                  return (
                    <ClassCard
                      user="student"
                      session={session}
                      label="Unirse"
                      actionFn={() => {
                        navigate("/videosesion", { state: { session } });
                      }}
                    />
                  );
                })}
              </Box>
              <Box pt="2rem">
                <h3 className="block-title">Clases siguientes</h3>
                {sessionsToBe.slice(1).length > 0 ? (
                  sessionsToBe.slice(1).map((session) => {
                    return (
                      <ClassCard
                        user="student"
                        session={session}
                        label="Detalles"
                        actionFn={() => {
                          setSession(session);
                          dispatch(handleOpenOtherModal());
                        }}
                      />
                    );
                  })
                ) : (
                  <NoSessionCard />
                )}
              </Box>
              <Box pt="2rem">
                <h3 className="block-title">Clases pasadas</h3>
                {sessionsDone.length > 0 ? (
                  sessionsDone.map((session) => {
                    return (
                      <ClassCard
                        user="student"
                        session={session}
                        label="Resumen"
                        actionFn={() => {
                          setSession(session);
                          dispatch(handleOpenOtherModal());
                        }}
                      />
                    );
                  })
                ) : (
                  <NoSessionCard />
                )}
              </Box>
            </Box>
          )}
        </Box>

        <BookSession
          session={session}
          clicked={undefined}
          selected={undefined}
        />
      </div>
    </div>
  );
};

export default LessonsList;
