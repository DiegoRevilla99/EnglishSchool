import { useState } from "react";
import AuthCode from "react-auth-code-input";
import Countdown, { CountdownApi, zeroPad } from "react-countdown";

import { Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAppSelector } from "@/hooks/useRedux";
import { useResendCodeMutation, useVerifyMutation } from "@/slices/AuthSlice";

import Logo from "@/assets/images/logo-alt.png";

const VerifyAccount = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  const [code, setCode] = useState<string>("");
  const [time, setTime] = useState<number>(Date.now() + 10000);
  const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);

  const [verify, { isLoading }] = useVerifyMutation();
  const [resend] = useResendCodeMutation();

  function onChangeCode(value: string) {
    setCode(value);
  }

  async function submitCode() {
    await verify({ email: currentUser?.email || "", code });
  }

  async function resendCode() {
    const sent = await resend(currentUser?.email || "");
    if (countdownApi && sent) {
      setTime(Date.now() + 10000);
      countdownApi.start();
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 3,
        marginBottom: 5,
      }}
    >
      <img src={Logo} alt="Logo" />
      <Typography variant="h3" textAlign="center" gutterBottom>
        Bienvenido, <strong>{`${currentUser?.firstName}`}</strong>
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        Antes de empezar, necesitamos verificar que tu correo sea v&aacute;lido.
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        sx={{ marginBottom: 3 }}
      >
        Ingresa el c&oacute;digo que se envi&oacute; al correo
        <strong>{` ${currentUser?.email}`}</strong>
      </Typography>
      <AuthCode
        containerClassName="auth-container"
        inputClassName="auth-input"
        allowedCharacters="numeric"
        onChange={onChangeCode}
        length={4}
      />
      <Box
        sx={{
          gap: 1,
          marginY: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Typography variant="button" textTransform="initial">
          ¿No te lleg&oacute; el c&oacute;digo?
        </Typography>
        <Countdown
          key={"Countdown"}
          date={time}
          ref={(countdown) => {
            if (countdown) {
              setCountdownApi(countdown.getApi());
            }
          }}
          precision={3}
          autoStart={false}
          intervalDelay={0}
          renderer={({ minutes, seconds, total }) => (
            <Button
              disabled={
                !(Math.round(total / 1000) * 1000 === 10 * 1000 || total === 0)
              }
              sx={{ textTransform: "capitalize" }}
              onClick={resendCode}
              variant="outlined"
              color="warning"
            >
              {Math.round(total / 1000) * 1000 === 10 * 1000 || total === 0
                ? "Reenviar"
                : `${zeroPad(minutes)}:${zeroPad(seconds)}`}
            </Button>
          )}
        />
      </Box>
      <LoadingButton
        variant="contained"
        onClick={submitCode}
        loading={isLoading}
        disabled={code.length !== 4}
        sx={{ width: "300px" }}
      >
        Verificar
      </LoadingButton>
    </Box>
  );
};

export default VerifyAccount;
