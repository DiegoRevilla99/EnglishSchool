import React from "react";

import Session from "@/models/Session";

import ModalContainer from "../../Modals";
import SessionDetails from "@/components/Forms/Session/SessionDetails";

import { Box, Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseOtherModal } from "@/reducers/ModalReducer";
import { addSession, updateSubscriptions } from "@/reducers/AuthReducer";

import { DateClickArg } from "@fullcalendar/interaction";
import { IScheduleItem } from "@/interfaces/ICalendar";
import { useCreateSessionMutation } from "@/slices/SessionSlice";
import { errorToast } from "@/utils";

export default function BookSession({
  session,
  selected,
  clicked,
}: {
  session: Session | undefined;
  selected: IScheduleItem | undefined;
  clicked: DateClickArg | undefined;
}) {
  const dispatch = useAppDispatch();
  const [createSession, { isLoading }] = useCreateSessionMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const { openOther } = useAppSelector((state) => state.modal);

  const getCredits = () => {
    const activeSub = currentUser?.subscriptions.find((item) => item.status);

    if (!activeSub) {
      return 0;
    }

    return activeSub.availableCredits;
  };

  function closeModal() {
    dispatch(handleCloseOtherModal());
  }

  async function bookSession() {
    const credits = getCredits();

    if (credits <= 0) {
      errorToast({
        error: "BadRequestException",
        message: "No cuentas con créditos suficientes",
        statusCode: 500,
      });
      return;
    }

    if (selected && clicked) {
      const teachers = selected.teachers;

      const { session, subscriptions } = await createSession({
        duration: 60,
        sessionDate: clicked.date.toISOString(),
        studentId: currentUser?.studentId || "",
        isFirst: currentUser?.sessions.length === 0,
        teacherId: teachers[teachers.length - 1].teacherId,
        sessionNumber: currentUser?.sessions.length,
        availableCredits: credits,
      }).unwrap();

      if (session) {
        dispatch(addSession(session));
        dispatch(updateSubscriptions(subscriptions));
        closeModal();
      }
    }
  }

  return (
    <ModalContainer
      maxWidth="xs"
      title={clicked ? "Confirmar sesión" : "Detalles de sesión"}
      open={openOther}
      closeFn={closeModal}
    >
      {session && (
        <React.Fragment>
          <SessionDetails sessionDate={session.sessionDate} isBooked />
          <Box sx={{ width: 1, display: "flex" }}>
            <Button
              type="submit"
              color="error"
              variant="contained"
              onClick={closeModal}
              sx={{ marginTop: 3, marginX: "auto", width: 0.65 }}
            >
              Cerrar
            </Button>
          </Box>
        </React.Fragment>
      )}

      {selected && clicked && (
        <React.Fragment>
          <SessionDetails sessionDate={clicked.dateStr} />
          <Box sx={{ width: 1, display: "flex" }}>
            <LoadingButton
              color="success"
              variant="contained"
              loading={isLoading}
              onClick={bookSession}
              sx={{ marginTop: 3, marginX: "auto", width: 0.65 }}
            >
              Agendar
            </LoadingButton>
          </Box>
        </React.Fragment>
      )}
    </ModalContainer>
  );
}
