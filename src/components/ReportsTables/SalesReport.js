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
import { useNavigate } from 'react-router-dom'; // Correct import for react-router-dom

function SalesReport() {
    let navigate = useNavigate();

    // Sample data for sales
    const [sales, setSales] = useState([
        { id: 1, product: 'Laptop', quantity: 2, price: 1200, total: 2400, customer: 'John Doe', date: '2024-08-01' },
        { id: 2, product: 'Smartphone', quantity: 5, price: 800, total: 4000, customer: 'Jane Smith', date: '2024-08-02' },
        { id: 3, product: 'Tablet', quantity: 3, price: 500, total: 1500, customer: 'Alice Johnson', date: '2024-08-03' },
        { id: 4, product: 'Monitor', quantity: 4, price: 300, total: 1200, customer: 'Bob Brown', date: '2024-08-04' },
        { id: 5, product: 'Keyboard', quantity: 10, price: 50, total: 500, customer: 'Charlie Davis', date: '2024-08-05' },
        { id: 6, product: 'Mouse', quantity: 8, price: 25, total: 200, customer: 'Daisy Miller', date: '2024-08-06' },
        { id: 7, product: 'Printer', quantity: 1, price: 200, total: 200, customer: 'Evan Wright', date: '2024-08-07' },
        { id: 8, product: 'Router', quantity: 2, price: 100, total: 200, customer: 'Frank Clark', date: '2024-08-08' },
        { id: 9, product: 'Headphones', quantity: 5, price: 150, total: 750, customer: 'Grace Lee', date: '2024-08-09' },
        { id: 10, product: 'Camera', quantity: 2, price: 600, total: 1200, customer: 'Harry White', date: '2024-08-10' },
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

    const handleDelete = (id) => {
        const updatedSales = sales.filter((sale) => sale.id !== id);
        setSales(updatedSales);
    };

    const handleBack = () => {
        navigate("/home");
    };

    // Calculate total amount
    const totalAmount = sales.reduce((sum, sale) => sum + sale.total, 0);

    const paginatedSales = sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="container">
            <TableContainer component={Paper} sx={{ maxHeight: '80vh', maxWidth: '100vw', overflow: 'auto' }}>
                <div className='px-3 mt-3'>
                    <Button
                        variant="contained"
                        style={{ background: "#5D54A4", color: "white" }}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </div>
                <Typography variant="h4" component="div" gutterBottom sx={{ padding: "0 0 2px 0", textAlign: 'center' }}>
                    Sales Report
                </Typography>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center" }}>ID</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Product</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Quantity</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Price</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Total</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Customer</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Date</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedSales.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell style={{ textAlign: "center" }}>{sale.id}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{sale.product}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{sale.quantity}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>${sale.price}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>${sale.total}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{sale.customer}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{sale.date}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(sale.id)}
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={6} />
                            <TableCell style={{ textAlign: "center", fontWeight: 'bold' }}>Total:</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: 'bold' }}>${totalAmount}</TableCell>
                            <TableCell colSpan={2} />
                        </TableRow>
                    </TableBody>
                </Table><br />
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={sales.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}

export default SalesReport;
