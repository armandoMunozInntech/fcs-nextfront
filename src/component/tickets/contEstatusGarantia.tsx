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
  actualizarFolio: (folio: string) => void;
}

const ContEstatusGarantia: React.FC<ContEstatusProcSinGarProps> = ({
  setOpen,
  actualizarFolio
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    folio: yup.string().required("El folio son requerido"),
  });

  const modalFormik = useFormik({
    initialValues: {
      folio: "",
    },
    validationSchema,
    onSubmit: (values) => {
      actualizarFolio(values.folio);
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
              id="folio"
              name="folio"
              label="Folio garantía"
              fullWidth
              value={modalFormik.values.folio}
              onChange={modalFormik.handleChange}
            />
            {modalFormik.touched.folio && modalFormik.errors.folio && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {modalFormik.errors.folio}
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

export default ContEstatusGarantia;
