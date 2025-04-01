import MainTable from "@/component/tickets/mainTable";
import React from "react";
interface Ticket {
  id: number;
  ticket: string;
  status: string;
  site: string;
  client: string;
  serial: string;
  cause: string;
  type_service: string | "";
  registration_date: string | Date; // Puede ser un string o un Date
}
const TicketsCont: React.FC<{ dataTickets: Ticket[] }> = ({dataTickets}) => {
  return <MainTable dataTickets={dataTickets}/>;
};

export default TicketsCont;
