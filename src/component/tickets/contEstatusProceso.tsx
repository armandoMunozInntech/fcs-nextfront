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
  asignaTicket?: (procede: string) => void;
}

const ContEstatusProceso: React.FC<ContEstatusAbiertoProps> = ({ setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = yup.object({
    procede: yup.boolean().required("Procede garantía es requerida"),
  });

  const modalFormik = useFormik({
    initialValues: {
      procede: false,
      encargado: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

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
