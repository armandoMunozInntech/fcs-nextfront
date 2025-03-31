import React from "react";
import { Button, Divider, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Assignment } from "@mui/icons-material";
import dayjs from "dayjs";

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
};
const DetalleTicket: React.FC = () => {
  const router = useRouter();
  dayjs.locale("es");

  return (
    <Grid2 container justifyContent="center" width="100%">
      <Grid2 justifyContent="center" size={12}>
        <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
          {detalleData.estatus}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Ticket: #{router.query.slug}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {dayjs(detalleData.fechaAlta).format("DD MMMM YYYY")}
        </Typography>
        <Divider />
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Cliente:</Typography>
        <Typography variant="body1">{detalleData.cliente}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Contacto:</Typography>
        <Typography variant="body1">{detalleData.contacto}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Sitio:</Typography>
        <Typography variant="body1">{detalleData.sitio}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Correo:</Typography>
        <Typography variant="body1">{detalleData.correo}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Comuna:</Typography>
        <Typography variant="body1">{detalleData.comuna}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Encargado:</Typography>
        <Typography variant="body1">{detalleData.encargado}</Typography>
      </Grid2>
      <Grid2 size={12} sx={{ pt: 1 }}>
        <Typography variant="body2">Región:</Typography>
        <Typography variant="body1">{detalleData.region}</Typography>
      </Grid2>
      <Grid2 size={12} sx={{ pt: 1 }}>
        <Typography variant="body2">Dirección:</Typography>
        <Typography variant="body1">{detalleData.direccion}</Typography>
      </Grid2>
      <Grid2 size={12}>
        <Divider />
      </Grid2>
      <Grid2 size={12} sx={{ pt: 1 }}>
        <Typography variant="body2">Detalle del problema:</Typography>
        <Typography variant="body1">{detalleData.problema}</Typography>
      </Grid2>
      {detalleData.documentosIniciales && (
        <>
          <Grid2 size={12}>
            <Divider />
          </Grid2>
          <Grid2 size={12} sx={{ pt: 1 }} justifyContent="flex-start">
            <Typography variant="body2">Documentos Iniciales:</Typography>
            {detalleData.documentosIniciales.map((doc, index) => {
              return (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  fullWidth
                  key={index}
                  startIcon={<Assignment />}
                  sx={{
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  {doc}
                </Button>
              );
            })}
          </Grid2>
        </>
      )}
    </Grid2>
  );
};

export default DetalleTicket;
