import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";

interface LoginValues {
  email: string;
  password: string;
}
interface IniciarSesionProps {
  onLogin: (values: LoginValues) => void; // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
  setForgotPswd: (values: boolean) => void; // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
}

const IniciarSesion: React.FC<IniciarSesionProps> = ({
  onLogin,
  setForgotPswd,
}) => {
  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          "El correo no tiene una estructura valida"
        )
        .required("El email es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),
    onSubmit: async (values: LoginValues) => {
      onLogin(values);
    },
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1, width: "100%" }}
    >
      <Grid2 container id="iniciarSesion" sx={{ display: "block !important" }}>
        <Grid2 size={12}>
          <Typography
            variant="h4"
            color="secondary"
            sx={{ textAlign: "center" }}
          >
            Iniciar Sesión
          </Typography>
        </Grid2>
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
        <Grid2 size={12}>
          <TextField
            margin="normal"
            fullWidth
            id="password"
            type="password"
            label="Contraseña"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid2>
        <Grid2 sx={{ justifyContent: "end", display: "flex" }}>
          <Typography
            variant="subtitle1"
            onClick={() => setForgotPswd(true)}
            sx={{
              textAlign: "end",
              alignContent: "end",
              alignItems: "end",
              cursor: "pointer",
            }}
          >
            Olvide la contraseña
          </Typography>
        </Grid2>
        <Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default IniciarSesion;
