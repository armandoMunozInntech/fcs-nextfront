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

interface Ticket {
  noTicket: string;
  cliente: string;
  sitio: string;
  categoria: string;
  contacto: string;
  encargado: string;
  estatus: string;
  fechaAlta: string;
  fechaEstimadaTermino: string;
  fechaConfirmadaTermino: string;
  proceso: string;
}

const rows: Ticket[] = [
  {
    noTicket: "CL-000015",
    cliente: "SOLUTION BOX",
    sitio: "CDMX",
    categoria: "MANTENIMIENTO PREVENTIVO",
    contacto: "CARLOS APARICIO",
    encargado: "BANDA RETAMAL CLAUDIO ANDRES",
    estatus: "CANCELADO",
    fechaAlta: "02/01/2025",
    fechaEstimadaTermino: "30/01/2025",
    fechaConfirmadaTermino: "N/A",
    proceso: "Solicitud en proceso",
  },
  {
    noTicket: "CL-000016",
    cliente: "bSOLUTION BOX",
    sitio: "CDMX",
    categoria: "MANTENIMIENTO PREVENTIVO",
    contacto: "CARLOS APARICIO",
    encargado: "BANDA RETAMAL CLAUDIO ANDRES",
    estatus: "CANCELADO",
    fechaAlta: "02/01/2025",
    fechaEstimadaTermino: "30/01/2025",
    fechaConfirmadaTermino: "N/A",
    proceso: "Solicitud en proceso",
  },
  {
    noTicket: "CL-000017",
    cliente: "cSOLUTION BOX",
    sitio: "CDMX",
    categoria: "MANTENIMIENTO PREVENTIVO",
    contacto: "CARLOS APARICIO",
    encargado: "BANDA RETAMAL CLAUDIO ANDRES",
    estatus: "CANCELADO",
    fechaAlta: "02/01/2025",
    fechaEstimadaTermino: "30/01/2025",
    fechaConfirmadaTermino: "N/A",
    proceso: "Solicitud en proceso",
  },
];

const columnHeaders = [
  { id: "noTicket", label: "No. ticket", stickyLeft: true },
  { id: "cliente", label: "Cliente" },
  { id: "sitio", label: "Sitio" },
  { id: "categoria", label: "Categoría" },
  { id: "contacto", label: "Contacto" },
  { id: "encargado", label: "Encargado" },
  { id: "estatus", label: "Estatus" },
  { id: "fechaAlta", label: "Fecha Alta" },
  { id: "fechaEstimadaTermino", label: "Fecha estimada término" },
  { id: "fechaConfirmadaTermino", label: "Fecha confirmada término" },
  { id: "proceso", label: "Proceso", stickyRight: true },
];

const MainTable: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<Ticket[]>(rows);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Ticket>("noTicket");

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
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Nuevo Ticket
          </Button>
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
              <TableRow key={row.noTicket}>
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
                    {row[column.id as keyof Ticket]}
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
                    onClick={() =>
                      router.push(`/tickets/detalle/${row.noTicket}`)
                    }
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
