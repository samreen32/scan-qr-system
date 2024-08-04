import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router';

function ClientsReport() {
    let navigate = useNavigate();

    const [clients, setClients] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', company: 'ABC Corp', address: '123 Main St, Springfield' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', company: 'XYZ Inc', address: '456 Elm St, Shelbyville' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-555-5555', company: 'Tech Solutions', address: '789 Maple St, Capital City' },
        { id: 4, name: 'Bob Brown', email: 'bob@example.com', phone: '444-444-4444', company: 'Innovate LLC', address: '321 Oak St, Metropolis' },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', phone: '333-333-3333', company: 'Digital Goods', address: '654 Pine St, Gotham' },
        { id: 6, name: 'Daisy Miller', email: 'daisy@example.com', phone: '222-222-2222', company: 'New Wave', address: '777 Cedar St, Springfield' },
        { id: 7, name: 'Evan Wright', email: 'evan@example.com', phone: '111-111-1111', company: 'Bright Ideas', address: '888 Birch St, Shelbyville' },
        { id: 8, name: 'Frank Clark', email: 'frank@example.com', phone: '999-999-9999', company: 'BuildCo', address: '999 Maple St, Capital City' },
        { id: 9, name: 'Grace Lee', email: 'grace@example.com', phone: '888-888-8888', company: 'EcoTech', address: '111 Aspen St, Metropolis' },
        { id: 10, name: 'Harry White', email: 'harry@example.com', phone: '777-777-7777', company: 'Future Works', address: '222 Spruce St, Gotham' },
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle deleting a client
    const handleDelete = (id) => {
        const updatedClients = clients.filter((client) => client.id !== id);
        setClients(updatedClients);
    };

    const handleBack = () => {
        navigate("/home")
    }

    const paginatedClients = clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="container">
            <TableContainer component={Paper} sx={{ maxHeight: '80vh', maxWidth: '100vw', overflow: 'auto' }}>
                <div className='px-3 mt-3'>
                    <Button
                        className='button btn btn-primary'
                        style={{ background: "#5D54A4", color: "white" }}
                        onClick={handleBack}
                    >
                        Back
                    </Button>

                </div>
                <Typography variant="h4" component="div" gutterBottom sx={{ padding: "0 0 2px 0", textAlign: 'center' }}>
                    Clients Report
                </Typography>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center" }}>ID</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Name</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Email</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Phone</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Company</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Address</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedClients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell style={{ textAlign: "center" }}>{client.id}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{client.name}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{client.email}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{client.phone}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{client.company}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{client.address}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(client.id)}
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table><br />
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={clients.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}

export default ClientsReport;
