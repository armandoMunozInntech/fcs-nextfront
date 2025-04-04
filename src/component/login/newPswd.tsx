import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { newPswdProps, pswdValues } from "@/types/login";

const NewPswd: React.FC<newPswdProps> = ({
  setAlertInfo,
  setShowAlert,
  setForgotPswd,
}) => {
  const [requirements, setRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const formik = useFormik<pswdValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
        .matches(/[a-z]/, "Debe incluir al menos una letra minúscula")
        .matches(/[0-9]/, "Debe incluir al menos un número")
        .matches(
          /[!@#$%^&*-]/,
          "Debe incluir al menos un carácter especial: !@#$%^&*-"
        )
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Debe confirmar su contraseña"),
    }),
    onSubmit: async (values: pswdValues) => {
      setAlertInfo({
        severity: "success",
        title: "Exito",
        message: `Su nueva contraseña se ha guardado, ${values.password}`,
      });
      setShowAlert(true);
      setForgotPswd(false);
    },
  });

  const validatePassword = (value: string) => {
    setRequirements({
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[!@#$%^&*-]/.test(value),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Grid2 container>
        <Grid2 size={12} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            fullWidth
            id="password"
            type="password"
            label="Nueva contraseña"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={(e) => {
              validatePassword(e.target.value);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
        </Grid2>
        <Grid2 size={12}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Typography variant="caption">
              {!(
                requirements.minLength &&
                requirements.uppercase &&
                requirements.lowercase &&
                requirements.lowercase &&
                requirements.number &&
                requirements.specialChar
              ) && "Requisitos:"}
              {!requirements.uppercase && " al menos una letra mayúscula,"}
              {!requirements.lowercase && " al menos una letra minúscula,"}
              {!requirements.number && " al menos un número,"}
              {!requirements.minLength && " al menos 8 caracteres,"}
              {!requirements.specialChar &&
                " al menos un carácter especial !@#$%^&*-"}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={12} display="flex">
          <TextField
            margin="normal"
            fullWidth
            id="confirmPassword"
            type="password"
            label=" Repite la contraseña"
            autoComplete="current-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid2>
        <Grid2 size={12} display="flex">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Guardar
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default NewPswd;
