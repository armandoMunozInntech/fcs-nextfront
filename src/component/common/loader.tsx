import { CircularProgress, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        my: "auto",
        height: "100%",
      }}
    >
      <CircularProgress sx={{ mt: "20%" }} />
    </Container>
  );
};

export default Loader;
