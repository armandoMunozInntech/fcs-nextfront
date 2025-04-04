import { AlertCompProps } from "./common";

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginContProps {
  onLogin: (values: LoginValues) => void; // Función que se ejecutará al iniciar sesión
  setAlertInfo: (values: AlertCompProps) => void;
  setShowAlert: (values: boolean) => void;
}

export interface VerificationCodeProps {
  setAlertInfo: (values: AlertCompProps) => void;
  setShowAlert: (values: boolean) => void;
  handleNext: () => void;
}

export interface pswdValues {
  password: string;
  confirmPassword: string;
}

export interface newPswdProps {
  setAlertInfo: (values: AlertCompProps) => void;
  setShowAlert: (values: boolean) => void;
  setForgotPswd: (values: boolean) => void;
}

export interface IniciarSesionProps {
  onLogin: (values: LoginValues) => void;
  setForgotPswd: (values: boolean) => void;
}

export interface EmailValues {
  email: string;
}

export interface getCodeProps {
  // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
  setForgotPswd: (values: boolean) => void; // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
  setAlertInfo: (values: AlertCompProps) => void;
  setShowAlert: (values: boolean) => void;
  setEmailSend: (values: string) => void;
  handleNext: () => void;
}

export interface ForgotPswdProps {
    // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
    setForgotPswd: (values: boolean) => void; // `onLogin` es una función que recibe un objeto de tipo `LoginValues`
    setAlertInfo: (values: AlertCompProps) => void;
    setShowAlert: (values: boolean) => void;
  }