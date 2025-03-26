import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  fechaInicial: yup.date().required("La fecha inicial es requerida"),
  fechaFinal: yup
    .date()
    .min(
      yup.ref("fechaInicial"),
      "La fecha final debe ser posterior a la fecha inicial"
    )
    .required("La fecha final es requerida"),
});

const FormFormatos: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = !useMediaQuery(theme.breakpoints.down("md"));
  const [moreFilters, setMoreFilters] = useState(false);
  // Formik para el formulario de Formatos
  const formatosFormik = useFormik({
    initialValues: {
      fechaInicial: null,
      fechaFinal: null,
      vertivCE: "",
      cliente: "",
      folioPretrabajo: "",
      srProyecto: "",
      task: "",
      contrato: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulario de Formatos enviado:", values);
    },
    onReset: () => {
      console.log("Formulario limpio");
    },
  });

  return (
    <form
      onSubmit={formatosFormik.handleSubmit}
      onReset={formatosFormik.handleReset}
      style={{ padding: 8, marginTop: "10px" }}
    >
      <Box
        display="grid"
        gap={1}
        justifyContent="end"
        gridTemplateColumns={
          !isSmallScreen ? "repeat(2, 1fr)" : "repeat(4, 5fr)"
        }
        sx={{ width: "100% !important" }}
      >
        <DatePicker
          label="Fecha Inicial"
          value={formatosFormik.values.fechaInicial}
          disableFuture
          onChange={(value) =>
            formatosFormik.setFieldValue("fechaInicial", value)
          }
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
              error:
                formatosFormik.touched.fechaInicial &&
                Boolean(formatosFormik.errors.fechaInicial),
              helperText:
                formatosFormik.touched.fechaInicial &&
                formatosFormik.errors.fechaInicial,
            },
          }}
        />
        <DatePicker
          label="Fecha Final"
          value={formatosFormik.values.fechaFinal}
          disableFuture
          minDate={formatosFormik.values.fechaInicial || undefined}
          onChange={(value) =>
            formatosFormik.setFieldValue("fechaFinal", value)
          }
          slotProps={{
            textField: {
              variant: "outlined",
              size: "small",
              error:
                formatosFormik.touched.fechaFinal &&
                Boolean(formatosFormik.errors.fechaFinal),
              helperText:
                formatosFormik.touched.fechaFinal &&
                formatosFormik.errors.fechaFinal,
            },
          }}
        />

        {!moreFilters && (
          <>
            <TextField
              label="Cliente"
              name="cliente"
              size="small"
              value={formatosFormik.values.cliente}
              onChange={formatosFormik.handleChange}
            />
            <TextField
              label="Folio Pretrabajo"
              name="folioPretrabajo"
              size="small"
              value={formatosFormik.values.folioPretrabajo}
              onChange={formatosFormik.handleChange}
            />
            <FormControl>
              <InputLabel id="vertivCE" size="small">
                Vertiv C.E.
              </InputLabel>
              <Select
                size="small"
                labelId="vertivCE"
                id="vertivCE"
                label="Vertiv C.E."
                value={formatosFormik.values.vertivCE}
                onChange={formatosFormik.handleChange}
                name="vertivCE"
                error={
                  formatosFormik.touched.vertivCE &&
                  Boolean(formatosFormik.errors.vertivCE)
                }
              >
                <MenuItem value="" disabled>
                  Seleccionar...
                </MenuItem>
                <MenuItem value="opcion1">Opción 1</MenuItem>
                <MenuItem value="opcion2">Opción 2</MenuItem>
              </Select>
              {formatosFormik.touched.vertivCE &&
                formatosFormik.errors.vertivCE && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {formatosFormik.errors.vertivCE}
                  </span>
                )}
            </FormControl>
            <TextField
              label="SR / Proyecto"
              name="srProyecto"
              size="small"
              value={formatosFormik.values.srProyecto}
              onChange={formatosFormik.handleChange}
            />
            <TextField
              label="Task"
              name="task"
              size="small"
              value={formatosFormik.values.task}
              onChange={formatosFormik.handleChange}
            />
            <TextField
              label="Contrato"
              name="contrato"
              size="small"
              value={formatosFormik.values.contrato}
              onChange={formatosFormik.handleChange}
            />
          </>
        )}
        <Box
          display="flex"
          justifyContent="end"
          gap={2}
          sx={{
            width: "300px",
            height: "40px",
            gridColumn: !moreFilters ? "5/5" : 3 / 5,
          }}
        >
          <Button
            variant="text"
            color="secondary"
            onClick={() => setMoreFilters(!moreFilters)}
          >
            {moreFilters ? "Más Filtros" : "Menos Filtros"}
          </Button>

          <Button type="reset" variant="contained" color="secondary">
            Limpiar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Buscar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FormFormatos;
