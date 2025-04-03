import React, { JSX, useState } from "react";
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
  estatus: string;
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
  garantiaTicket: (garantia: string) => void;
  cerrarTicket: (comentario: string) => void;
  comentarTicket: (comentario: string) => void;
  actualizarFolio: (folio: string) => void;
  reasignaTicket: (encargado: string, comentario: string) => void;
  asignaTicketCallcenter: (encargado: string) => void;
}

const ContModal: React.FC<{
  status: string;
  setOpen: (open: boolean) => void;
  encargado: EncargadoProps[];
  asignaTIcket: (encargado: string, procede: string) => void;
  garantiaTicket: (garantia: string) => void;
  cerrarTicket: (comentario: string) => void;
  actualizarFolio: (folio: string) => void;
  asignaTicketCallcenter: (encargado: string) => void;
}> = ({
  status,
  setOpen,
  encargado,
  asignaTIcket,
  garantiaTicket,
  cerrarTicket,
  actualizarFolio,
  asignaTicketCallcenter,
}) => {
  const statusMap: Record<string, JSX.Element> = {
    abierto: (
      <ContEstatusAbierto
        setOpen={setOpen}
        encargado={encargado}
        asignaTicket={asignaTIcket}
      />
    ),
    "en proceso": (
      <ContEstatusProceso setOpen={setOpen} garantiaTicket={garantiaTicket} />
    ),
    "en proceso - sin garantia": (
      <ContEstatusProcSinGar setOpen={setOpen} cerrarTicket={cerrarTicket} />
    ),
    "en proceso - con garantia": (
      <ContEstatusProcSinGar setOpen={setOpen} cerrarTicket={cerrarTicket} />
    ),
    garantia: (
      <ContEstatusGarantia
        setOpen={setOpen}
        actualizarFolio={actualizarFolio}
      />
    ),
    "garantia - folio actualizado": (
      <ContEstatusGarFolioAct
        setOpen={setOpen}
        encargado={encargado}
        asignaTicketCallcenter={asignaTicketCallcenter}
      />
    ),
  };

  return statusMap[status.toLowerCase()] || <></>;
};

const DetalleTicketCont: React.FC<DetalleTicketContProps> = ({
  dataDetalleTicket,
  encargado,
  asignaTIcket,
  garantiaTicket,
  cerrarTicket,
  actualizarFolio,
  comentarTicket,
  reasignaTicket,
  asignaTicketCallcenter,
}) => {
  const [modalStates, setModalStates] = useState({
    estatus: false,
    observacion: false,
    cancelar: false,
    reasignar: false,
  });

  const toggleModal = (modal: keyof typeof modalStates, value: boolean) => {
    setModalStates((prev) => ({ ...prev, [modal]: value }));
  };

  return (
    <>
      <ModalCustom
        open={modalStates.estatus}
        setOpen={() => toggleModal("estatus", false)}
      >
        <ContModal
          status={dataDetalleTicket?.status || ""}
          setOpen={() => toggleModal("estatus", false)}
          encargado={encargado}
          asignaTIcket={asignaTIcket}
          garantiaTicket={garantiaTicket}
          cerrarTicket={cerrarTicket}
          actualizarFolio={actualizarFolio}
          asignaTicketCallcenter={asignaTicketCallcenter}
        />
      </ModalCustom>
      <ModalCustom
        open={modalStates.observacion}
        setOpen={() => toggleModal("observacion", false)}
      >
        <ContAnadirObservacion
          setOpen={() => toggleModal("observacion", false)}
          comentarTicket={comentarTicket}
        />
      </ModalCustom>
      <ModalCustom
        open={modalStates.cancelar}
        setOpen={() => toggleModal("cancelar", false)}
      >
        <ContCancelar
          setOpen={() => toggleModal("cancelar", false)}
          cerrarTicket={cerrarTicket}
        />
      </ModalCustom>
      <ModalCustom
        open={modalStates.reasignar}
        setOpen={() => toggleModal("reasignar", false)}
      >
        <ContReasignar
          setOpen={() => toggleModal("reasignar", false)}
          encargado={encargado}
          reasignaTicket={reasignaTicket}
        />
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
        <Grid2 size={5} container alignItems="center" height="100%">
          <Grid2 size={12}>
            <Paper sx={{ p: 2 }} elevation={3}>
              <DetalleTicket dataDetalleTicket={dataDetalleTicket} />
            </Paper>
          </Grid2>
        </Grid2>
        <Grid2 size={6.5} sx={{ maxHeight: "90% !important" }}>
          <Paper sx={{ overflowY: "auto", p: 2 }}>
            <ComentariosTicket
              comentariosData={dataDetalleTicket?.actions_history || null}
              fechaAlta={dataDetalleTicket?.registration_date || ""}
              status={dataDetalleTicket?.status || ""}
              setOpenModalEstatus={() => toggleModal("estatus", true)}
              setOpenModalObservacion={() => toggleModal("observacion", true)}
              setOpenModalCancelar={() => toggleModal("cancelar", true)}
              setOpenModalReasignar={() => toggleModal("reasignar", true)}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default DetalleTicketCont;
