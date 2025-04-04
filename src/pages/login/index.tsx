import React, { useState } from "react";
import { useRouter } from "next/router";
import LoginCont from "@/container/loginCont";
import AlertComp from "@/component/common/alert";
import Loader from "@/component/common/loader";
import { sha256 } from "js-sha256";
import { setCookie } from "cookies-next";
import api from "@/utils/api";
import { LoginValues } from "@/types/login";
import { AlertCompProps, ApiError } from "@/types/common";

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertCompProps>({
    severity: "success",
    title: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  console.log("API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  const onLogin = async (values: LoginValues): Promise<void> => {
    setLoading(true);
    if (!values.email || !values.password) {
      setAlertInfo({
        severity: "error",
        title: "Error",
        message: "Por favor, completa todos los campos.",
      });
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/auth/login", {
        email: values.email,
        password: sha256.hex(values?.password || "").toLocaleUpperCase(),
      });
      const userData = response.data.user;

      Object.entries(userData).forEach(([key, value]) => {
        setCookie(key, value || "", {
          maxAge: 60 * 60 * 1000,
          path: "/",
        });
      });

      router.push("/dashboard"); // Redirigir después del inicio de sesión exitoso
    } catch (error: unknown) {
      console.error(
        "Error during login:",
        (error as ApiError)?.response?.data?.message || (error as ApiError).response
      );
      setAlertInfo({
        severity: "error",
        title: "Error",
        message: (error as ApiError)?.response?.data?.message || "Error desconocido",
      });
      setShowAlert(true);
      setLoading(false);
    }
  };

  // Mientras se carga la sesión
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {showAlert && (
        <AlertComp
          severity={alertInfo.severity}
          title={alertInfo.title}
          message={alertInfo.message}
          show={showAlert}
          handleShow={setShowAlert}
        />
      )}
      <LoginCont
        onLogin={onLogin}
        setAlertInfo={setAlertInfo}
        setShowAlert={setShowAlert}
      />
    </>
  );
};

export default Login;
