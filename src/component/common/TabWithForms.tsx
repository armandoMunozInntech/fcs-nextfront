import React from "react";
import { Box, Tab, Tabs, Button, TextField, MenuItem } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const vertivOptions = [
  { label: "Opción 1", value: "opcion1" },
  { label: "Opción 2", value: "opcion2" },
  { label: "Opción 3", value: "opcion3" },
];

const validationSchema = Yup.object().shape({
  dateRange: Yup.array()
    .of(Yup.date().nullable().required("Campo requerido"))
    .required("Campo requerido"),
  vertiv: Yup.string().required("Campo requerido"),
  client: Yup.string().optional(),
  folio: Yup.string().optional(),
  srProject: Yup.string().optional(),
  task: Yup.string().optional(),
  contract: Yup.string().optional(),
});

const TabbedForms: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const initialValues = {
    dateRange: [null, null],
    vertiv: "",
    client: "",
    folio: "",
    srProject: "",
    task: "",
    contract: "",
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Formatos" />
        <Tab label="Folios" />
      </Tabs>
      <Box mt={3}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Formulario enviado:", values);
            resetForm();
          }}
        >
          {({ values, errors, touched, setFieldValue, resetForm }) => (
            <Form>
              {tabValue === 0 && (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={2}
                >
                  <DateRangePicker
                    startText="Fecha inicial"
                    endText="Fecha final"
                    value={values.dateRange}
                    onChange={(newValue) =>
                      setFieldValue("dateRange", newValue)
                    }
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField
                          {...startProps}
                          error={touched.dateRange && !!errors.dateRange}
                          helperText={touched.dateRange && errors.dateRange}
                        />
                        <TextField
                          {...endProps}
                          error={touched.dateRange && !!errors.dateRange}
                          helperText={touched.dateRange && errors.dateRange}
                        />
                      </>
                    )}
                  />
                  <Field
                    as={TextField}
                    select
                    name="vertiv"
                    label="Vertiv C.E."
                    error={touched.vertiv && !!errors.vertiv}
                    helperText={touched.vertiv && errors.vertiv}
                  >
                    {vertivOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field as={TextField} name="client" label="Cliente" />
                  <Field as={TextField} name="folio" label="Folio Pretrabajo" />
                  <Field
                    as={TextField}
                    name="srProject"
                    label="SR / Proyecto"
                  />
                  <Field as={TextField} name="task" label="Task" />
                  <Field as={TextField} name="contract" label="Contrato" />
                </Box>
              )}
              {tabValue === 1 && (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={2}
                >
                  <DateRangePicker
                    startText="Fecha inicial"
                    endText="Fecha final"
                    value={values.dateRange}
                    onChange={(newValue) =>
                      setFieldValue("dateRange", newValue)
                    }
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField
                          {...startProps}
                          error={touched.dateRange && !!errors.dateRange}
                          helperText={touched.dateRange && errors.dateRange}
                        />
                        <TextField
                          {...endProps}
                          error={touched.dateRange && !!errors.dateRange}
                          helperText={touched.dateRange && errors.dateRange}
                        />
                      </>
                    )}
                  />
                  <Field as={TextField} name="client" label="Cliente" />
                  <Field as={TextField} name="folio" label="Folio Pretrabajo" />
                  <Field
                    as={TextField}
                    name="srProject"
                    label="SR / Proyecto"
                  />
                  <Field as={TextField} name="contract" label="Contrato" />
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => resetForm()}
                >
                  Limpiar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Buscar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default TabbedForms;
