/* eslint-disable @typescript-eslint/no-explicit-any */
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
  InputAdornment,
  IconButton,
  TableSortLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid2,
  Button,
} from "@mui/material";
import { Search, Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import _ from "lodash";

interface Ticket {
  id: number;
  ticket: string;
  status: string;
  site: string;
  client: string;
  serial: string;
  cause: string;
  type_service: string | null;
  registration_date: string | Date;
}

interface columnProps {
  id: string;
  label: string;
  stickyLeft?: boolean;
  stickyRight?: boolean;
}

const columnHeaders: columnProps[] = [
  { id: "ticket", label: "No. ticket", stickyLeft: true },
  { id: "status", label: "Estatus" },
  { id: "client", label: "Cliente" },
  { id: "site", label: "Sitio" },
  { id: "serial", label: "No. de Serie" },
  { id: "cause", label: "Causa" },
  { id: "type_service", label: "Tipo de servicio" },
  { id: "registration_date", label: "Fecha Alta" },
];

const MainTable: React.FC<{ dataTickets: Ticket[] }> = ({ dataTickets }) => {
  const router = useRouter();
  dayjs.locale("es");
  const [search, setSearch] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<Ticket[]>(dataTickets);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<keyof Ticket>("registration_date");
  const [filters, setFilters] = useState({
    status: "",
    client: "",
    cause: "",
    type_service: "",
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    applyFilters(value, filters);
  };

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    applyFilters(search, newFilters);
  };

  const applyFilters = (searchValue: string, filterValues: any) => {
    let filtered = dataTickets.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(searchValue)
      )
    );

    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key]) {
        filtered = filtered.filter(
          (row) => row[key as keyof Ticket] === filterValues[key]
        );
      }
    });

    setFilteredRows(filtered);
  };

  const handleSort = (property: keyof Ticket) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const statusOptions = _.uniq(_.map(dataTickets, "status"));
  const clientOptions = _.uniq(_.map(dataTickets, "client"));
  const causeOptions = _.uniq(_.map(dataTickets, "cause"));
  const typeServiceOptions = _.uniq(_.map(dataTickets, "type_service"));

  return (
    <Paper sx={{ m: 2, p: 2, pt: 0 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={2}>
          <TextField
            label="Buscar"
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
        {[
          { label: "Estatus", key: "status", options: statusOptions },
          { label: "Cliente", key: "client", options: clientOptions },
          { label: "Causa", key: "cause", options: causeOptions },
          {
            label: "Tipo de servicio",
            key: "type_service",
            options: typeServiceOptions,
          },
        ].map(({ label, key, options }) => (
          <Grid2 key={key} size={2}>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>{label}</InputLabel>
              <Select
                label={label}
                value={filters[key as keyof typeof filters] || ""}
                onChange={(e) => handleFilterChange(key, e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {options.map((option, index) => {
                  return (
                    option && (
                      <MenuItem key={option || index} value={option}>
                        {option}
                      </MenuItem>
                    )
                  );
                })}
              </Select>
            </FormControl>
          </Grid2>
        ))}
        <Grid2 size={2} sx={{ pt: 2, textAlign: "end" }} justifyContent="end">
          <Button variant="contained" color="secondary">
            Exportar XLS
          </Button>
        </Grid2>
      </Grid2>
      <TableContainer sx={{ maxHeight: "100%", overflow: "auto" }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columnHeaders.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={() => handleSort(column.id as keyof Ticket)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold" }}>Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id}>
                {columnHeaders.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === "registration_date" &&
                    row[column.id as keyof Ticket]
                      ? dayjs(row[column.id as keyof Ticket] as string).format(
                          "DD/MM/YYYY"
                        ) // Formatea la fecha
                      : String(row[column.id as keyof Ticket] || "")}
                  </TableCell>
                ))}
                <TableCell>
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
