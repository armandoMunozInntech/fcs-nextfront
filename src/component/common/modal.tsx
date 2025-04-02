import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface ModalCustomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalCustom: React.FC<ModalCustomProps> = ({ open, setOpen }) => {
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
      console.log("Formulario de Formatos enviado:", values);
    },
    onReset: () => {},
  });
  console.log("values:", modalFormik.values);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
          <form
            onSubmit={modalFormik.handleSubmit}
            onReset={modalFormik.handleReset}
          >
            <Grid2 container justifyContent="space-between">
              <Grid2>
                <Typography variant="body1" sx={{ pt: 1 }}>
                  ¿Procede garantía?
                </Typography>
              </Grid2>
              <Grid2>
                <Switch
                  id="procede"
                  name="procede"
                  value={modalFormik.values.procede}
                  onChange={modalFormik.handleChange}
                />
              </Grid2>
            </Grid2>
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
                      <MenuItem value="opcion1">Opción 1</MenuItem>
                      <MenuItem value="opcion2">Opción 2</MenuItem>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Guardar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ModalCustom;
