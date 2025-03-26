import React from "react";
import { TextField, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

const FormFolio: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = !useMediaQuery(theme.breakpoints.down("md"));
  // Formik para el formulario de Folios
  const foliosFormik = useFormik({
    initialValues: {
      fechaInicial: null,
      fechaFinal: null,
      cliente: "",
      folio: "",
      srProyecto: "",
      contrato: "",
    },
    validationSchema: yup.object({
      fechaInicial: yup.date().required("La fecha inicial es requerida"),
      fechaFinal: yup
        .date()
        .min(
          yup.ref("fechaInicial"),
          "La fecha final debe ser posterior a la fecha inicial"
        )
        .required("La fecha final es requerida"),
    }),
    onSubmit: (values) => {
      console.log("Formulario de Folios enviado:", values);
    },
    onReset: () => {
      console.log("Formulario limpio");
    },
  });

  return (
    <form
      onSubmit={foliosFormik.handleSubmit}
      onReset={foliosFormik.handleReset}
      style={{ padding: 8 }}
    >
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={
          !isSmallScreen ? "repeat(2, 1fr)" : "repeat(5, 1fr)"
        }
      >
        <DatePicker
          label="Fecha Inicial"
          value={foliosFormik.values.fechaInicial}
          disableFuture
          onChange={(value) =>
            foliosFormik.setFieldValue("fechaInicial", value)
          }
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
              error:
                foliosFormik.touched.fechaInicial &&
                Boolean(foliosFormik.errors.fechaInicial),
              helperText:
                foliosFormik.touched.fechaInicial &&
                foliosFormik.errors.fechaInicial,
            },
          }}
        />
        <DatePicker
          label="Fecha Final"
          value={foliosFormik.values.fechaFinal}
          disableFuture
          minDate={foliosFormik.values.fechaInicial || undefined}
          onChange={(value) => foliosFormik.setFieldValue("fechaFinal", value)}
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
              error:
                foliosFormik.touched.fechaFinal &&
                Boolean(foliosFormik.errors.fechaFinal),
              helperText:
                foliosFormik.touched.fechaFinal &&
                foliosFormik.errors.fechaFinal,
            },
          }}
        />
        <TextField
          label="Cliente"
          name="cliente"
          size="small"
          value={foliosFormik.values.cliente}
          onChange={foliosFormik.handleChange}
          error={
            foliosFormik.touched.cliente && Boolean(foliosFormik.errors.cliente)
          }
          helperText={
            foliosFormik.touched.cliente && foliosFormik.errors.cliente
          }
        />
        <TextField
          label="Folio"
          name="folio"
          size="small"
          value={foliosFormik.values.folio}
          onChange={foliosFormik.handleChange}
          error={
            foliosFormik.touched.folio && Boolean(foliosFormik.errors.folio)
          }
          helperText={foliosFormik.touched.folio && foliosFormik.errors.folio}
        />
        <TextField
          label="Contrato"
          name="contrato"
          size="small"
          value={foliosFormik.values.contrato}
          onChange={foliosFormik.handleChange}
        />
        <TextField
          label="SR / Proyecto"
          name="srProyecto"
          size="small"
          value={foliosFormik.values.srProyecto}
          onChange={foliosFormik.handleChange}
        />
      </Box>
      <Box display="flex" justifyContent="end" gap={2} mt={3}>
        <Button type="reset" variant="contained" color="secondary">
          Limpiar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
      </Box>
    </form>
  );
};

export default FormFolio;


