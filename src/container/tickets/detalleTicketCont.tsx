import React, { useState } from "react";
import ModalCustom from "@/component/common/modal";
import ComentariosTicket from "@/component/tickets/comentariosTickets";
import DetalleTicket from "@/component/tickets/detalleTicket";
import { Grid2, Paper } from "@mui/material";
import ContEstatusAbierto from "@/component/tickets/contEstatusAbierto";
import ContEstatusProceso from "@/component/tickets/contEstatusProceso";
import ContEstatusProcSinGar from "@/component/tickets/contEstatusProcSinGar";
import ContEstatusGarantia from "@/component/tickets/contEstatusGarantia";
import ContEstatusGarFolioAct from "@/component/tickets/contEstatusGarFolioAct";
import ContAnadirObservacion from "@/component/tickets/contAnadirObservacion";
import ContCancelar from "@/component/tickets/contCancelar";
import ContReasignar from "@/component/tickets/contReasignar";

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

interface EncargadoProps {
  id: string;
  valor: string;
}

interface DetalleTicketContProps {
  dataDetalleTicket: Ticket | null;
  encargado: EncargadoProps[];
  asignaTIcket: (encargado: string, procede: string) => void;
}

const DetalleTicketCont: React.FC<DetalleTicketContProps> = ({
  dataDetalleTicket,
  encargado,
  asignaTIcket,
}) => {
  const [openModalEstatus, setOpenModalEstatus] = useState<boolean>(false);
  const [openModalObservacion, setOpenModalObservacion] =
    useState<boolean>(false);
  const [openModalCancelar, setOpenModalCancelar] = useState<boolean>(false);
  const [openModalReasignar, setOpenModalReasignar] = useState<boolean>(false);

  const ContModal: React.FC<{ status: string }> = ({ status }) => {
    switch (status.toLocaleLowerCase()) {
      case "abierto":
        return (
          <ContEstatusAbierto
            setOpen={setOpenModalEstatus}
            encargado={encargado}
            asignaTicket={asignaTIcket}
          />
        );
      case "en proceso":
        return <ContEstatusProceso setOpen={setOpenModalEstatus} />;
      case "en proceso - sin garantia":
      case "en proceso - con garantia":
        return <ContEstatusProcSinGar setOpen={setOpenModalEstatus} />;
      case "garantia":
        return <ContEstatusGarantia setOpen={setOpenModalEstatus} />;
      case "garantia - folio actualizado":
        return (
          <ContEstatusGarFolioAct
            setOpen={setOpenModalEstatus}
            encargado={encargado}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <ModalCustom open={openModalEstatus} setOpen={setOpenModalEstatus}>
        <ContModal status={dataDetalleTicket?.status as string} />
      </ModalCustom>
      <ModalCustom
        open={openModalObservacion}
        setOpen={setOpenModalObservacion}
      >
        <ContAnadirObservacion setOpen={setOpenModalObservacion} />
      </ModalCustom>
      <ModalCustom open={openModalCancelar} setOpen={setOpenModalCancelar}>
        <ContCancelar setOpen={setOpenModalCancelar} />
      </ModalCustom>
      <ModalCustom open={openModalReasignar} setOpen={setOpenModalReasignar}>
        <ContReasignar setOpen={setOpenModalReasignar} encargado={encargado} />
      </ModalCustom>
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
              status={dataDetalleTicket?.status || ""}
              setOpenModalEstatus={setOpenModalEstatus}
              setOpenModalObservacion={setOpenModalObservacion}
              setOpenModalCancelar={setOpenModalCancelar}
              setOpenModalReasignar={setOpenModalReasignar}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default DetalleTicketCont;
