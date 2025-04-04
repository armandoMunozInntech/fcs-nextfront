import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid2, TextField } from "@mui/material";
import { EmailValues, getCodeProps } from "@/types/login";

const GetCode: React.FC<getCodeProps> = ({
  setForgotPswd,
  setAlertInfo,
  setShowAlert,
  handleNext,
  setEmailSend,
}) => {
  const formik = useFormik<EmailValues>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          "El correo no tiene una estructura valida"
        )
        .required("El email es requerido"),
    }),
    onSubmit: async (values: EmailValues) => {
      console.log(values);
      setAlertInfo({
        severity: "info",
        title: "Informacion",
        message: "Se ha enviado un codigo al correo electrónico proporcionado",
      });
      setEmailSend(values.email);
      setShowAlert(true);
      handleNext();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1, width: "100%" }}
    >
      <Grid2 container>
        <Grid2 size={12}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Correo electrónico"
            autoComplete="emal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid2>
        <Grid2 size={6} sx={{ alignContent: "center", alignItems: "center" }}>
          <Button
            variant="text"
            onClick={() => setForgotPswd(false)}
            sx={{ mt: 1, mr: 1, pt: 2 }}
          >
            Iniciar sesión
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 1, mr: 1, pt: 1.5 }}
          >
            Obtener Código
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default GetCode;
