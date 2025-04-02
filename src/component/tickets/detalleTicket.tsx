import React from "react";
import {
  Divider,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

interface DetalleTicketProp {
  coordinator: string;
  category_cause: string;
  subcategory_cause: string;
  actions_history: ActionHistory[] | null;
  serial_history: SerialHistoryProps[] | null;
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
interface SerialHistoryProps {
  serie: string;
  folio: string;
  fecha: string;
}

interface ActionHistory {
  usuario: string;
  estatus: string; // Parece un error de escritura, debería ser "estatus"?
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
        <Typography
          variant="body1"
          color={
            dataDetalleTicket?.status.toLocaleLowerCase() === "cerrado"
              ? "error"
              : "success"
          }
          sx={{ textAlign: "center" }}
        >
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
      {dataDetalleTicket?.serial_history?.length !== 0 && (
        <>
          <Grid2 size={12}>
            <Divider />
          </Grid2>
          <Grid2 size={12} sx={{ pt: 1 }}>
            <Typography variant="body2">Servicios Realizados:</Typography>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "black",
                        color: "white !important",
                        fontWeight: "bold",
                      }}
                    >
                      No. de Serie
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "black",
                        color: "white !important",
                        fontWeight: "bold",
                      }}
                    >
                      No. de Folio
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "black",
                        color: "white !important",
                        fontWeight: "bold",
                      }}
                    >
                      Fecha
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataDetalleTicket?.serial_history?.map((row) => (
                    <TableRow key={row.serie}>
                      <TableCell>{row.serie}</TableCell>
                      <TableCell>{row.folio}</TableCell>
                      <TableCell>
                        {dayjs(row.fecha).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
        </>
      )}
    </Grid2>
  );
};

export default DetalleTicket;
