import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import LoginCont from "@/container/loginCont";
import AlertComp from "@/component/common/alert";
import { AlertProps } from "@mui/material";
import Loader from "@/component/common/loader";

interface LoginValues {
  email: string;
  password: string;
}

interface AlertCompProps {
  severity: AlertProps["severity"]; // Usamos el tipo de Material UI para asegurarnos de que sea válido
  title: string;
  message: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertCompProps>({
    severity: "success",
    title: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onLogin = async (values: LoginValues): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://test.vrt-fcs.com/api_vrt/api/login/Login",
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );
      console.log("data", data);
      setAlertInfo({
        severity: "success",
        title: "Éxito",
        message: "Inicio de sesión exitoso",
      });
      setShowAlert(true);

      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Si el error es de Axios
        setAlertInfo({
          severity: "error",
          title: "Error",
          message: error.response?.data?.message || "Error de serivcio",
        });
        setShowAlert(true);
      } else {
        // Si el error es otro tipo
        setAlertInfo({
          severity: "error",
          title: "Error",
          message: "Error desconocido",
        });
        setShowAlert(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
      )}
      ;
    </>
  );
};

export default Login;
