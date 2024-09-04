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
import { useNavigate } from 'react-router-dom'; 

function PerItemReport() {
    let navigate = useNavigate();

    // Sample data for items
    const [items, setItems] = useState([
        { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, stock: 10, supplier: 'Tech Distributors' },
        { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 15, supplier: 'Mobile Solutions' },
        { id: 3, name: 'Tablet', category: 'Electronics', price: 500, stock: 20, supplier: 'Gadget World' },
        { id: 4, name: 'Monitor', category: 'Electronics', price: 300, stock: 12, supplier: 'Screen Suppliers' },
        { id: 5, name: 'Keyboard', category: 'Accessories', price: 50, stock: 50, supplier: 'Accessory Hub' },
        { id: 6, name: 'Mouse', category: 'Accessories', price: 25, stock: 70, supplier: 'Accessory Hub' },
        { id: 7, name: 'Printer', category: 'Office Supplies', price: 200, stock: 5, supplier: 'Office Essentials' },
        { id: 8, name: 'Router', category: 'Networking', price: 100, stock: 25, supplier: 'Network Gear' },
        { id: 9, name: 'Headphones', category: 'Audio', price: 150, stock: 30, supplier: 'Audio Experts' },
        { id: 10, name: 'Camera', category: 'Photography', price: 600, stock: 8, supplier: 'Photo Supplies' },
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
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    };

    const handleView = (item) => {
       navigate("/CheckPerItemReport")
    };

    const handleBack = () => {
        navigate("/home");
    };

    const paginatedItems = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="container">
            <TableContainer component={Paper} sx={{ maxHeight: '80vh', maxWidth: '100vw', overflow: 'auto' }}>
                <div className='px-3 mt-3'>
                    <Button
                        variant="contained"
                        style={{ background: "#5D54A4", color: "white", fontSize: "12px" }}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </div>
                <Typography variant="h5" component="div" gutterBottom sx={{ padding: "0 0 2px 0", textAlign: 'center' }}>
                    Per Item Report
                </Typography>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center" }}>ID</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Item Name</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Category</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Price</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Stock Quantity</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Supplier</TableCell>
                            <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell style={{ textAlign: "center" }}>{item.id}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{item.name}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{item.category}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>${item.price}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{item.stock}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>{item.supplier}</TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleView(item)}
                                        sx={{ marginRight: 1, textTransform: "capitalize" }}
                                        style={{ padding: "0px", fontSize: "12px" }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(item.id)}
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
                    count={items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}

export default PerItemReport;