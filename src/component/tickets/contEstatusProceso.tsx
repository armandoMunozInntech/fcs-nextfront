import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid2, Switch } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

interface ContEstatusAbiertoProps {
  setOpen: (open: boolean) => void;
  garantiaTicket: (garantia: string) => void;
}

const ContEstatusProceso: React.FC<ContEstatusAbiertoProps> = ({ setOpen, garantiaTicket }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    garantia: yup.boolean().required("Procede garantía es requerida"),
  });

  const modalFormik = useFormik({
    initialValues: {
      garantia: false,
    },
    validationSchema,
    onSubmit: (values) => {
      garantiaTicket(values.garantia.toString())

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
              ¿Aplica garantía?
            </Typography>
          </Grid2>
          <Grid2>
            No
            <Switch
              id="procede"
              name="procede"
              value={modalFormik.values.garantia}
              onChange={modalFormik.handleChange}
            />
            Si
          </Grid2>
        </Grid2>
        {modalFormik.touched.garantia && modalFormik.errors.garantia && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {modalFormik.errors.garantia}
          </span>
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

export default ContEstatusProceso;
