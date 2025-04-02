import React from "react";
import { Divider, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";

interface DetalleTicketProp {
  coordinator: string;
  category_cause: string;
  subcategory_cause: string;
  actions_history: ActionHistory[];
  serial_history: any[]; // Puedes definirlo mejor si sabes qué datos lleva
  id: number;
  ticket: string;
  status: string;
  client: string;
  site: string;
  serial: string;
  cause: string;
  type_service: string | null;
  registration_date: string;
}

interface ActionHistory {
  usuario: string;
  estsatus: string; // Parece un error de escritura, debería ser "estatus"?
  fecha: string;
  comentario: string;
}

const DetalleTicket: React.FC<{
  dataDetalleTicket: DetalleTicketProp | null;
}> = ({ dataDetalleTicket }) => {
  dayjs.locale("es");

  return (
    <Grid2 container justifyContent="center" width="100%">
      <Grid2 justifyContent="center" size={12}>
        <Typography variant="body1" color="error" sx={{ textAlign: "center" }}>
          {dataDetalleTicket?.status}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Ticket: #{dataDetalleTicket?.ticket}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {dayjs(dataDetalleTicket?.registration_date).format("DD MMMM YYYY")}
        </Typography>
        <Divider />
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Cliente:</Typography>
        <Typography variant="body1">{dataDetalleTicket?.client}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Serie:</Typography>
        <Typography variant="body1">{dataDetalleTicket?.serial}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Causa:</Typography>
        <Typography variant="body1">{dataDetalleTicket?.cause}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Sitio:</Typography>
        <Typography variant="body1">{dataDetalleTicket?.site}</Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Categoría Causa:</Typography>
        <Typography variant="body1">
          {dataDetalleTicket?.category_cause}
        </Typography>
      </Grid2>
      <Grid2 size={6} sx={{ pt: 1 }}>
        <Typography variant="body2">Coordinador:</Typography>
        <Typography variant="body1">
          {dataDetalleTicket?.coordinator}
        </Typography>
      </Grid2>
      <Grid2 size={12} sx={{ pt: 1 }}>
        <Typography variant="body2">Subcategoria causa:</Typography>
        <Typography variant="body1">
          {dataDetalleTicket?.subcategory_cause}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Divider />
      </Grid2>
      <Grid2 size={12} sx={{ pt: 1 }}></Grid2>
    </Grid2>
  );
};

export default DetalleTicket;
