import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormFormatos from "@/component/FCS/formatoYFolio/FormFormatos";

const FormTabs: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormFormatos />
    </LocalizationProvider>
  );
};

export default FormTabs;
