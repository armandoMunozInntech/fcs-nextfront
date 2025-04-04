import { AlertProps } from "@mui/material";

export interface AlertCompProps {
  severity: AlertProps["severity"];
  title: string;
  message: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface ParsedUserData {
  email: string;
  name: string;
  id_perfil: string;
  id_pais: string;
  pais: string;
  sessionTime: string | number;
}

export interface UserDataItem {
  dato: string;
  valor: string | number;
}
