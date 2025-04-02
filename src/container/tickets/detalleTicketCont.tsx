import ModalCustom from "@/component/common/modal";
import ComentariosTicket from "@/component/tickets/comentariosTickets";
import DetalleTicket from "@/component/tickets/detalleTicket";
import { Grid2, Paper } from "@mui/material";
import React, { useState } from "react";

interface Ticket {
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

const DetalleTicketCont: React.FC<{ dataDetalleTicket: Ticket | null }> = ({
  dataDetalleTicket,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <ModalCustom open={open} setOpen={setOpen} />
      <Grid2
        container
        gap={1}
        direction="row"
        sx={[
          () => ({
            p: 2,
            justifyContent: "space-between",
            alignItems: "stretch",
            backgroundColor: "#cfcfcf",
            height: "100%",
          }),
          (theme) =>
            theme.applyStyles("dark", {
              backgroundColor: "black",
            }),
        ]}
      >
        <Grid2 size={5}>
          <Grid2 container sx={{ alignItems: "center", height: "100%" }}>
            <Grid2 size={12}>
              <Paper sx={{ p: 2 }} elevation={3}>
                <DetalleTicket dataDetalleTicket={dataDetalleTicket} />
              </Paper>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={6.5} sx={{ alignItems: "stretch" }}>
          <Paper sx={{ overflowY: "auto", p: 2 }}>
            <ComentariosTicket
              comentariosData={dataDetalleTicket?.actions_history || null}
              fechaAlta={dataDetalleTicket?.registration_date || ""}
              setOpen={setOpen}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default DetalleTicketCont;
