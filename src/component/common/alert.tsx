import React, { useEffect } from "react";
import { Alert, AlertProps, Fade } from "@mui/material";

// Definimos las props del componente
interface AlertCompProps {
  severity: AlertProps["severity"]; // Usamos el tipo de Material UI para asegurarnos de que sea válido
  title: string;
  message: string;
  show: boolean;
  handleShow: (show: boolean) => void;
}

const AlertComp: React.FC<AlertCompProps> = ({
  severity,
  title,
  message,
  show,
  handleShow,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        handleShow(false);
      }, 5000); // 5 segundos
      return () => clearTimeout(timer); // Limpiamos el temporizador al desmontar
    }
  }, [show, handleShow]);

  return (
    <Fade in={show}>
      <Alert
        severity={severity}
        variant="filled"
        onClose={() => handleShow(false)}
        sx={{
          position: "absolute",
          zIndex: "1000",
          left: "50%",
          top: "20%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
        }}
      >
        {title}:&nbsp;{message}
      </Alert>
    </Fade>
  );
};

export default AlertComp;
