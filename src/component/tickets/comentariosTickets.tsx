import React from "react";
import {
  Button,
  Divider,
  Grid2,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Cancel, Comment } from "@mui/icons-material";

interface ActionHistory {
  usuario: string;
  estatus: string;
  fecha: string;
  comentario: string;
}

interface ComentariosTicketProps {
  comentariosData: ActionHistory[] | null;
  fechaAlta: string;
  status: string;
  setOpenModalEstatus: (open: boolean) => void;
  setOpenModalObservacion: (open: boolean) => void;
  setOpenModalCancelar: (open: boolean) => void;
  setOpenModalReasignar: (open: boolean) => void;
}

const ComentariosTicket: React.FC<ComentariosTicketProps> = ({
  comentariosData,
  fechaAlta,
  setOpenModalEstatus,
  setOpenModalObservacion,
  setOpenModalCancelar,
  setOpenModalReasignar,
  status,
}) => {
  dayjs.locale("es");
  const CustomStepIcon = (estatus: string) => {
    switch (estatus.toLocaleLowerCase()) {
      case "cancelado":
        return <Cancel color="error" />;
      default:
        return <Comment color="primary" />;
    }
  };
  return (
    <Grid2 container justifyContent="center" width="100%">
      {status &&
        !(
          status.toLocaleLowerCase() == "cancelado" ||
          status.toLocaleLowerCase() == "cerrado"
        ) && (
          <Grid2 container justifyContent="space-between" width="100%">
            <Grid2 justifyContent="start">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenModalEstatus(true)}
              >
                Cambiar Estatus
              </Button>
            </Grid2>
            {(status.toLocaleLowerCase() !== "proceso - con garantia" ||
              status.toLocaleLowerCase() !== "proceso - sin garantia") && (
              <Grid2 justifyContent="center">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setOpenModalReasignar(true)}
                >
                  Reasignar
                </Button>
              </Grid2>
            )}
            <Grid2 justifyContent="center">
              <Button
                variant="contained"
                onClick={() => setOpenModalObservacion(true)}
              >
                Añadir Observación
              </Button>
            </Grid2>
            <Grid2 justifyContent="end">
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenModalCancelar(true)}
              >
                Cancelar Ticket
              </Button>
            </Grid2>
            <Grid2 size={12}>
              <Divider sx={{ my: 2 }} />
            </Grid2>
          </Grid2>
        )}
      <Grid2 container justifyContent="space-between" width="100%">
        <Grid2 size={12}>
          <Typography variant="h5" sx={{ ml: 2 }}>
            Fecha de Alta: {dayjs(fechaAlta).format("DD MMMM YYYY")}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid2>
        {comentariosData && (
          <Grid2 size={12}>
            <Stepper orientation="vertical" nonLinear activeStep={-1}>
              {comentariosData?.map((comentario, index) => {
                return (
                  <Step key={index} completed expanded>
                    <StepLabel
                      slots={{
                        stepIcon: () => CustomStepIcon(comentario?.estatus),
                      }}
                    >
                      {comentario?.estatus}
                    </StepLabel>
                    <StepContent>
                      <Typography variant="caption">
                        Modificado por:&nbsp;
                      </Typography>
                      <Typography variant="caption" color="primary">
                        {comentario?.usuario}
                      </Typography>
                      <Typography>{comentario?.comentario}</Typography>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
};

export default ComentariosTicket;
