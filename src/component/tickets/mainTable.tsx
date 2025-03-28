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
  Grid2,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const rows = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Alice Johnson", age: 28 },
  { id: 4, name: "Bob Brown", age: 22 },
];

const MainTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    // Filtrar datos en base a la búsqueda
    const filtered = rows.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setFilteredRows(filtered);
  };

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

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "black",
                color: "white !important",
                fontWeight: "bold",
              }}
            >
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "black",
                  color: "white !important",
                  fontWeight: "bold",
                }}
              >
                Age
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MainTable;
