import React, { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface ModalCustomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactElement;
}

const ModalCustom: React.FC<ModalCustomProps> = ({
  open,
  setOpen,
  children,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {children}
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ModalCustom;
