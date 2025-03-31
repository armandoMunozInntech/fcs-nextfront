import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  TableSortLabel,
  Grid2,
} from "@mui/material";
import { Search, Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
interface Ticket {
  id: number;
  ticket: string;
  status: string;
  site: string;
  client: string;
  serial: string;
  cause: string;
  type_service: string | "";
  registration_date: string | Date; // Puede ser un string o un Date
}

const rows: Ticket[] = [
  {
    id: 1,
    ticket: "MX10001",
    status: "ABIERTO",
    client: "ACCIONA SERVICIOS URBANOS Y MEDIOAMBIENTALES MEXICO",
    site: "OTRO",
    serial: "NMZ1020304050",
    cause: "CLIENTE",
    type_service: null,
    registration_date: "2025-03-31T00:00:00",
  },
  {
    id: 2,
    ticket: "NA10002",
    status: "ABIERTO",
    client: "CLIENTE DE PRUEBA SA DE CV",
    site: "OTRO",
    serial: "8yxd47s",
    cause: "Cliente",
    type_service: null,
    registration_date: "2025-03-31T11:41:03.967",
  },
  {
    id: 3,
    ticket: "NA10003",
    status: "ABIERTO",
    client: "ACCIONA SERVICIOS URBANOS Y MEDIOAMBIENTALES MEXICO",
    site: "Otro",
    serial: "ehehe",
    cause: "Vertiv",
    type_service: null,
    registration_date: "2025-03-31T12:03:47.073",
  },
  {
    id: 4,
    ticket: "NA10004",
    status: "ABIERTO",
    client: "VERTIV",
    site: "Otro",
    serial: "x75d36s64",
    cause: "Cliente",
    type_service: "Servicio Puntual (205)",
    registration_date: "2025-03-31T12:47:13.44",
  },
];

const columnHeaders = [
  { id: "ticket", label: "No. ticket", stickyLeft: true },
  { id: "status", label: "Estatus" },
  { id: "client", label: "Cliente" },
  { id: "site", label: "Sitio" },
  { id: "serial", label: "No. de Serie" },
  { id: "causa", label: "Causa" },
  { id: "type_service", label: "Tipo de servicio" },
  { id: "registration_date", label: "Fecha Alta" },
  { id: "proceso", label: "Proceso", stickyRight: true },
];

const MainTable: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<Ticket[]>(rows);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Ticket>("ticket");

  // Maneja la búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = rows.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setFilteredRows(filtered);
  };

  // Función para manejar el cambio de orden
  const handleSort = (property: keyof Ticket) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Función para ordenar los datos
  const sortedRows = [...filteredRows].sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return 0;
  });

  return (
    <Paper sx={{ m: 2, p: 2, pt: 0 }}>
      <Grid2 container justifyContent="space-between">
        <Grid2 size={3}>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            margin="normal"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        <Grid2
          size={3}
          gap={2}
          direction="row"
          sx={{ pt: 2, textAlign: "end" }}
          justifyContent="end"
        >
          <Button variant="contained" color="secondary">
            Exportar XLS
          </Button>
        </Grid2>
      </Grid2>
      <TableContainer sx={{ maxHeight: "100%", overflow: "auto" }}>
        <Table size="small" stickyHeader>
          <TableHead color="secondary">
            <TableRow color="secondary">
              {columnHeaders.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    position: column.stickyLeft
                      ? "sticky"
                      : column.stickyRight
                      ? "sticky"
                      : "relative",
                    left: column.stickyLeft ? 0 : undefined,
                    right: column.stickyRight ? 0 : undefined,
                    zIndex: column.stickyLeft || column.stickyRight ? 2 : 1,
                    fontWeight: "bold",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id as keyof Ticket)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                sx={{
                  position: "sticky",
                  right: 0,
                  zIndex: 2,
                  fontWeight: "bold",
                }}
              >
                Detalle
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id}>
                {columnHeaders.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      position: column.stickyLeft
                        ? "sticky"
                        : column.stickyRight
                        ? "sticky"
                        : "relative",
                      left: column.stickyLeft ? 0 : undefined,
                      right: column.stickyRight ? 0 : undefined,
                      zIndex: column.stickyLeft || column.stickyRight ? 1 : 0,
                    }}
                  >
                    {column.id === "registration_date" && row[column.id]
                      ? dayjs(row.registration_date).format("DD / MM / YYYY") // Formatea la fecha
                      : row[column.id] || ""}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    position: "sticky",
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    color="secondary"
                    onClick={() => router.push(`/tickets/detalle/${row.id}`)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MainTable;
