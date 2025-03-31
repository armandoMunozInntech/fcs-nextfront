import ComentariosTicket from "@/component/tickets/comentariosTickets";
import DetalleTicket from "@/component/tickets/detalleTicket";
import { Grid2, Paper } from "@mui/material";
import React from "react";

const DetalleTicketCont: React.FC = () => {
  return (
    <Grid2
      container
      gap={1}
      direction="row"
      sx={{
        p: 2,
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: "#cfcfcf",
      }}
    >
      <Grid2 size={5}>
        <Grid2 container sx={{ alignItems: "center" }}>
          <Grid2 size={12}>
            <Paper sx={{ p: 2 }} elevation={3}>
              <DetalleTicket />
            </Paper>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 size={6.5} sx={{ alignItems: "stretch" }}>
        <Paper sx={{ overflowY: "auto", p: 2 }}>
          <ComentariosTicket />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default DetalleTicketCont;
