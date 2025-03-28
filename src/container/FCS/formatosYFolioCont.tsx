import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormFormatos from "@/component/FCS/formatoYFolio/FormFormatos";
import TableFormYFolio from "@/component/FCS/formatoYFolio/TableFormatoYFolio";

const FormatosYFoliosCont: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormFormatos />
      <TableFormYFolio />
    </LocalizationProvider>
  );
};

export default FormatosYFoliosCont;
