import React, { useState, useRef } from "react";
import { Box, TextField } from "@mui/material";

interface OTPProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    // Validar que la entrada sea un único dígito
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Llamar a onComplete si se han completado todos los campos
      if (newOtp.join("").length === length) {
        onComplete(newOtp.join(""));
      }

      // Enfocar el siguiente input si no es el último y el valor no está vacío
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>, // Cambiado a HTMLDivElement
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");

    if (pastedData.every((char) => /^[0-9]$/.test(char))) {
      const newOtp = new Array(length).fill("");
      pastedData.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      onComplete(newOtp.join(""));
    }
  };

  return (
    <Box display="flex" gap={1} justifyContent="center">
      {new Array(length).fill(null).map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el!)}
          value={otp[index] || ""}
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "1rem",
            },
          }}
          sx={{
            width: "20%",
            "& .MuiInputBase-root": {
              padding: 0,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default OTPInput;
