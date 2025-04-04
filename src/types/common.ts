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