import React, { useState } from "react";
import {
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
import { ForgotPswdProps } from "@/types/login";

const ForgotPswd: React.FC<ForgotPswdProps> = ({
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
