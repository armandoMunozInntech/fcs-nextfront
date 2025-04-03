import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Grid2,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

interface EncargadoProps {
  id: string;
  valor: string;
}

interface ContEstatusProcSinGarProps {
  setOpen: (open: boolean) => void;
  reasignaTicket: (encargado: string, comentario: string) => void;
  encargado: EncargadoProps[];
}

const ContReasignar: React.FC<ContEstatusProcSinGarProps> = ({
  setOpen,
  encargado,
  reasignaTicket,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    coordinador: yup.string().required("El coordinador es requerido"),
    justificacion: yup.string().required("La justificación es requerida"),
  });

  const modalFormik = useFormik({
    initialValues: {
      coordinador: "",
      justificacion: "",
    },
    validationSchema,
    onSubmit: (values) => {
      reasignaTicket(values.coordinador, values.justificacion);
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
        Reasignar Ticket
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
        <Grid2 container>
          <Grid2 size={12} sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="coordinadorLabel" size="small">
                Coordinador
              </InputLabel>
              <Select
                size="small"
                fullWidth
                labelId="coordinadorLabel"
                id="coordinador"
                label="Coordinador"
                value={modalFormik.values.coordinador}
                onChange={modalFormik.handleChange}
                name="coordinador"
                sx={{ width: "100%" }}
                error={
                  modalFormik.touched.coordinador &&
                  Boolean(modalFormik.errors.coordinador)
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
              {modalFormik.touched.coordinador &&
                modalFormik.errors.coordinador && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {modalFormik.errors.coordinador}
                  </span>
                )}
            </FormControl>
          </Grid2>
          <Grid2 size={12}>
            <TextField
              id="justificacion"
              name="justificacion"
              label="Justificación"
              fullWidth
              multiline
              value={modalFormik.values.justificacion}
              onChange={modalFormik.handleChange}
              maxRows={6}
            />
            {modalFormik.touched.justificacion &&
              modalFormik.errors.justificacion && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {modalFormik.errors.justificacion}
                </span>
              )}
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </form>
  );
};

export default ContReasignar;
