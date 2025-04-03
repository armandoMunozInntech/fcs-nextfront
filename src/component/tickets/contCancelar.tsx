import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Grid2,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ContEstatusProcSinGarProps {
  setOpen: (open: boolean) => void;
  cerrarTicket: (procede: string) => void;
}

const ContCancelar: React.FC<ContEstatusProcSinGarProps> = ({
  setOpen,
  cerrarTicket,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    justificacion: yup.string().required("La justificación es requerida"),
  });

  const modalFormik = useFormik({
    initialValues: {
      justificacion: "",
    },
    validationSchema,
    onSubmit: (values) => {
      cerrarTicket(values.justificacion);
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
        Cancelar Ticket
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
        <Grid2 container justifyContent="">
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
        <Button type="submit" variant="contained" color="secondary">
          cancelar
        </Button>
      </DialogActions>
    </form>
  );
};

export default ContCancelar;
