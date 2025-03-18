import React, { useState } from "react";
import {
  AlertProps,
  Grid2,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import GetCode from "./getCode";
import VerificationCode from "./verificationCode";
import NewPswd from "./newPswd";

interface AlertCompProps {
  severity: AlertProps["severity"]; // Usamos el tipo de Material UI para asegurarnos de que sea válido
  title: string;
  message: string;
}

interface IniciarSesionProps {
  // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
  setForgotPswd: (values: boolean) => void; // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
  setAlertInfo: (values: AlertCompProps) => void;
  setShowAlert: (values: boolean) => void;
}

const ForgotPswd: React.FC<IniciarSesionProps> = ({
  setForgotPswd,
  setAlertInfo,
  setShowAlert,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [emailSend, setEmailSend] = useState<string>("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const steps = [
    {
      label: "Obtener codigo verificador",
      optional: emailSend ? `Se envio el codigo al correo: ${emailSend}` : "",
      description: (
        <GetCode
          setForgotPswd={setForgotPswd}
          setAlertInfo={setAlertInfo}
          setShowAlert={setShowAlert}
          handleNext={handleNext}
          setEmailSend={setEmailSend}
        />
      ),
    },
    {
      label: "Verificación de código",
      optional: "",
      description: (
        <VerificationCode
          setAlertInfo={setAlertInfo}
          setShowAlert={setShowAlert}
          handleNext={handleNext}
        />
      ),
    },
    {
      label: "Nueva contraseña",
      optional: "",
      description: (
        <NewPswd
          setForgotPswd={setForgotPswd}
          setAlertInfo={setAlertInfo}
          setShowAlert={setShowAlert}
        />
      ),
    },
  ];
  return (
    <Grid2 container>
      <Grid2 size={12} justifyContent="center">
        <Typography variant="h4" color="secondary" sx={{ textAlign: "center" }}>
          Recuperar contraseña
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  step.optional !== "" ? (
                    <Typography variant="caption">{step.optional}</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Grid2 container sx={{ mb: 2, width: "100%" }}>
                  {step.description}
                </Grid2>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid2>
    </Grid2>
  );
};

export default ForgotPswd;
