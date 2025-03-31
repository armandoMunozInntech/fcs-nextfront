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
// import { Cancel, Comment } from "@mui/icons-material";

interface comentariosProps {
  proceso: string;
  modificadoPor: string;
  actFechaEstimadoTermino: string;
  mensaje: string;
  docAnadido: [
    {
      label: string;
      link: string;
    }
  ];
}

interface Ticket {
  noTicket: string;
  cliente: string;
  sitio: string;
  correo: string;
  comuna: string;
  contacto: string;
  encargado: string;
  estatus: string;
  fechaAlta: string;
  region: string;
  direccion: string;
  problema: string;
  documentosIniciales?: string[];
  comentarios: comentariosProps[];
}

const detalleData: Ticket = {
  noTicket: "CL-000015",
  cliente: "SOLUTION BOX",
  sitio: "CDMX",
  correo: "correo@prueba.com",
  comuna: "SAN JOSÉ",
  contacto: "CARLOS APARICIO",
  encargado: "BANDA RETAMAL CLAUDIO ANDRES",
  estatus: "CANCELADO",
  fechaAlta: "02/01/2025",
  region: "NORTE",
  direccion: "CAMARONES NUM 3, AZCAPOTZALCO",
  problema:
    "MANTENIMIENTO PROGRAMADO PARA EL SITE DEL CLIENTE. SE ADJUNTA LA ORDEN DE VENTA DEL CLIENTE.",
  documentosIniciales: [
    "documento 1",
    "documento 2",
    "documento 2",
    "documento 2",
    "documento 2",
  ],
  comentarios: [
    {
      proceso: "EN PROCESO",
      modificadoPor: "JORGE HEBRAYN LEFINAO DONOSO",
      actFechaEstimadoTermino: "04/01/2025",
      mensaje: "mensaje de prueba",
      docAnadido: [
        {
          label: "Doc 1",
          link: "doc1.pdf",
        },
      ],
    },
  ],
};

const ComentariosTicket: React.FC = () => {
  /* const CustomStepIcon = (props: { proceso: string }) => {
    const { proceso } = props;

    switch (proceso.toLocaleLowerCase()) {
      case "cancelado":
        return <Cancel color="error" />;
      default:
        return <Comment color="primary" />;
    }
  }; */
  return (
    <Grid2 container justifyContent="center" width="100%">
      <Grid2 container justifyContent="space-between" width="100%">
        <Grid2 justifyContent="start">
          <Button variant="outlined" color="secondary">
            Cambiar Estatus
          </Button>
        </Grid2>
        <Grid2 justifyContent="center">
          <Button variant="outlined">Añadir Observación</Button>
        </Grid2>
        <Grid2 justifyContent="end">
          <Button variant="outlined" color="error">
            Cancelar Ticket
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid2>
        <Grid2 size={12}>
          <Typography variant="h5" sx={{ ml: 2 }}>
            Fecha de Alta: {dayjs(detalleData.fechaAlta).format("DD MMMM YYYY")}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid2>
        {detalleData.comentarios && (
          <Grid2 size={12}>
            <Stepper orientation="vertical">
              {detalleData.comentarios.map((comentario, index) => {
                return (
                  <Step key={index}>
                    <StepLabel>{comentario.proceso}</StepLabel>
                    <StepContent>
                      <Typography variant="caption">
                        Modificado por:&nbsp;
                      </Typography>
                      <Typography variant="caption" color="primary">
                        {comentario.modificadoPor}
                      </Typography>
                      <Typography>{comentario.mensaje}</Typography>
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
