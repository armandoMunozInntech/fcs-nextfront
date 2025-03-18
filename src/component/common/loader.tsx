import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.8)",
      }}
    >
      <span className="loader"></span>
    </Box>
  );
};

export default Loader;
