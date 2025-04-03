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
  cerrarTicket: (comentario: string) => void;
}

const ContEstatusProcSinGar: React.FC<ContEstatusProcSinGarProps> = ({
  setOpen,
  cerrarTicket
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    acciones: yup.string().required("Las acciones son requeridas"),
  });

  const modalFormik = useFormik({
    initialValues: {
      acciones: "",
    },
    validationSchema,
    onSubmit: (values) => {
      cerrarTicket(values.acciones);
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
          <Grid2 size={12}>
            <TextField
              id="acciones"
              name="acciones"
              label="Acciones Realizadas"
              fullWidth
              multiline
              value={modalFormik.values.acciones}
              onChange={modalFormik.handleChange}
              maxRows={6}
            />
            {modalFormik.touched.acciones && modalFormik.errors.acciones && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {modalFormik.errors.acciones}
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

export default ContEstatusProcSinGar;
