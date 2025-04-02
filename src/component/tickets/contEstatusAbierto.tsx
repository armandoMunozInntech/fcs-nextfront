import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

interface EncargadoProps {
  id: string;
  valor: string;
}

interface ContEstatusAbiertoProps {
  setOpen: (open: boolean) => void;
  encargado: EncargadoProps[];
  asignaTicket: (encargado: string, procede: string) => void;
}

const ContEstatusAbierto: React.FC<ContEstatusAbiertoProps> = ({
  setOpen,
  encargado,
  asignaTicket,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    procede: yup.boolean().required("Procede garantía es requerida"),
    encargado: yup.string(),
  });

  const modalFormik = useFormik({
    initialValues: {
      procede: false,
      encargado: "",
    },
    validationSchema,
    onSubmit: (values) => {
      asignaTicket(values.encargado, values.procede.toString());
      setOpen(false);
    },
    onReset: () => {},
  });

  return (
    <form onSubmit={modalFormik.handleSubmit} onReset={modalFormik.handleReset}>
      <DialogTitle
        sx={{ m: 0, p: 2, minWidth: "350px" }}
        id="customized-dialog-title"
      >
        Cambio Estatus
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid2 container justifyContent="space-between">
          <Grid2>
            <Typography variant="body1" sx={{ pt: 1 }}>
              ¿Procede garantía?
            </Typography>
          </Grid2>
          <Grid2>
            No
            <Switch
              id="procede"
              name="procede"
              value={modalFormik.values.procede}
              onChange={modalFormik.handleChange}
            />
            Si
          </Grid2>
        </Grid2>
        {modalFormik.touched.procede && modalFormik.errors.procede && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {modalFormik.errors.procede}
          </span>
        )}
        {modalFormik.values.procede && (
          <Grid2 container>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel id="encargadoLabel" size="small">
                  Encargado
                </InputLabel>
                <Select
                  size="small"
                  fullWidth
                  labelId="encargado"
                  id="encargado"
                  label="Encargado"
                  value={modalFormik.values.encargado}
                  onChange={modalFormik.handleChange}
                  name="encargado"
                  sx={{ width: "100%" }}
                  error={
                    modalFormik.touched.encargado &&
                    Boolean(modalFormik.errors.encargado)
                  }
                >
                  <MenuItem value="" disabled>
                    Seleccionar...
                  </MenuItem>
                  {encargado &&
                    encargado?.map((enc) => {
                      return (
                        <MenuItem key={enc.id} value={enc.id}>
                          {enc.valor}
                        </MenuItem>
                      );
                    })}
                </Select>
                {modalFormik.touched.encargado &&
                  modalFormik.errors.encargado && (
                    <span style={{ color: "red", fontSize: "0.8rem" }}>
                      {modalFormik.errors.encargado}
                    </span>
                  )}
              </FormControl>
            </Grid2>
          </Grid2>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </form>
  );
};

export default ContEstatusAbierto;
