import React, { useEffect, useState } from 'react';
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
import { USER_AUTH } from '../../Auth_Api';

function ClientsReport() {
    let navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        const updatedClients = clients.filter((client) => client.id !== id);
        setClients(updatedClients);
    };

    const handleBack = () => {
        navigate("/home")
    }

    const paginatedClients = clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${USER_AUTH}/getAllUsers`);
                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }
                const data = await response.json();
                setClients(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClients();
    }, []);


    return (
        <div className="container">
            {loading ? (
                <Typography variant="h6" align="center">Loading...</Typography>
            ) : error ? (
                <Typography variant="h6" align="center" color="error">
                    Error: {error}
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ maxHeight: '80vh', maxWidth: '100vw', overflow: 'auto' }}>
                    <div className='px-3 mt-3'>
                        <Button
                            className='button btn btn-primary'
                            style={{ background: "#5D54A4", color: "white", fontSize: "12px" }}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    </div>
                    <Typography variant="h5" component="div" gutterBottom sx={{ padding: "0 0 2px 0", textAlign: 'center' }}>
                        Clients Report
                    </Typography>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: "center" }}>ID</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Name</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Email</TableCell>
                                {/* <TableCell style={{ textAlign: "center" }}>Phone</TableCell> */}
                                <TableCell style={{ textAlign: "center" }}>Company</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Address</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedClients.map((client, index) => (
                                <TableRow key={client.id}>
                                    <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{client.name}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{client.email}</TableCell>
                                    {/* <TableCell style={{ textAlign: "center" }}>{client.phone}</TableCell> */}
                                    <TableCell style={{ textAlign: "center" }}>{client.companyName}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{client.address}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(client.id)}
                                            sx={{ textTransform: "capitalize" }}
                                            style={{ padding: "0px", fontSize: "12px" }}
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
            )}
        </div>
    );
}

export default ClientsReport;