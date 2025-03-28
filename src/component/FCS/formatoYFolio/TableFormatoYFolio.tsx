import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Typography,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Download, Preview } from "@mui/icons-material";

const TableFormYFolio: React.FC = () => {
  function createData(
    folio: string,
    cliente: string,
    fechaInicio: string,
    vertivCE: string
  ) {
    return {
      folio,
      cliente,
      fechaInicio,
      vertivCE,
      formatos: [
        {
          SRProyecto: "debug5",
          task: "11091700",
          formato: "Formato Agua Helada",
          vertivCE: "SOPORTE FCS",
          estatus: "",
        },
        {
          SRProyecto: "edición2025",
          task: "11091710",
          formato: "Formato Encuesta de Calidad",
          vertivCE: "ADMINISTRADOR",
          estatus: "Respondido",
        },
      ],
    };
  }

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.folio}
          </TableCell>
          <TableCell>{row.cliente}</TableCell>
          <TableCell>{row.fechaInicio}</TableCell>
          <TableCell>{row.vertivCE}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            <IconButton color="primary">
              <Download />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              borderTop: "1 solid !important",
            }}
            colSpan={6}
          >
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                backgroundColor: "rgba(0, 0, 0, .04)",
                borderTop: "1 solid !important",
              }}
            >
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" component="div" fontWeight="500">
                  Formatos
                </Typography>
                <Table size="small" aria-label="detail" sx={{}}>
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "rgba(244, 98, 0, 1)",
                      }}
                    >
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        SR/Proyecto
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Task
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Formato
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        VertivCE
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Estatus
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        PDF
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.formatos.map((formatos) => (
                      <TableRow key={formatos.SRProyecto}>
                        <TableCell component="th" scope="row">
                          {formatos.SRProyecto}
                        </TableCell>
                        <TableCell>{formatos.task}</TableCell>
                        <TableCell>{formatos.formato}</TableCell>
                        <TableCell>{formatos.vertivCE}</TableCell>
                        <TableCell>{formatos.estatus}</TableCell>
                        <TableCell
                          sx={{ textAlign: "center", color: "rgb(0, 0, 0)" }}
                        >
                          <IconButton color="secondary">
                            <Preview />
                          </IconButton>
                          <IconButton color="secondary">
                            <Download />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  const rows = [
    createData(
      "VRTMX00008957",
      "ACCIONA SERVICIOS URBANOS Y MEDIOAMBIENTALES MEXICO",
      "11/5/2024",
      "TEST APP	"
    ),
    createData("VRTMX00008958", "BANCO DE MEXICO", "11/6/2024", "COORDINADOR"),
    createData(
      "VRTMX00008959",
      "ASCENTY MEXICO S DE RL DE CV",
      "11/6/2024",
      "COORDINADOR"
    ),
    createData(
      "VRTMX00008960",
      "CLARO SERVICIOS EMPRESARIALES SA",
      "11/7/2024",
      "ADMINISTRADOR"
    ),
    createData(
      "VRTMX00008961",
      "CITIBANK COLOMBIA SA",
      "11/8/2024",
      "ADMINISTRADOR"
    ),
  ];

  return (
    <Box display="grid" sx={{ p: 2, pl: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "black",
                color: "white !important",
                fontWeight: "bold",
              }}
            >
              <TableCell sx={{ width: "30px" }} />
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                }}
              >
                Folio
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                }}
              >
                Cliente
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                }}
              >
                Fecha Inicio
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                }}
              >
                Vertice C.E.
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Zip
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.folio} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableFormYFolio;
