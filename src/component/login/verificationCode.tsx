import React, { useEffect, useState } from "react";
import { Button, Grid2 } from "@mui/material";
import OTPInput from "../common/OptInput";
import { VerificationCodeProps } from "@/types/login";

const VerificationCode: React.FC<VerificationCodeProps> = ({
  setAlertInfo,
  setShowAlert,
  handleNext,
}) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(60); // Tiempo inicial en segundos
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsDisabled(false);
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, isDisabled]);

  const handleResend = () => {
    setTimeLeft(60);
    setIsDisabled(true);
    setAlertInfo({
      severity: "success",
      title: "Exito",
      message: "Se ha reenviado el código",
    });
    setShowAlert(true);
  };

  return (
    <Grid2 container>
      <Grid2 sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <OTPInput onComplete={setOtp} length={5} />
      </Grid2>
      <Grid2
        size={5}
        sx={{
          mt: 1,
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleResend}
          disabled={isDisabled}
          sx={{
            fontSize: "10px",
            py: 1,
          }}
        >
          {isDisabled ? `Reenviar en ${timeLeft}s` : "Reenviar ahora"}
        </Button>
      </Grid2>
      <Grid2 size={7}>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1, mr: 1, fontSize: "12px" }}
          disabled={otp.length !== 5}
          onClick={() => {
            setAlertInfo({
              severity: "success",
              title: "Exito",
              message: "Se ha verificado el código exitosamente",
            });
            setShowAlert(true);
            handleNext();
          }}
        >
          Verificar Código
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default VerificationCode;
