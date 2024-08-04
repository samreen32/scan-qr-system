import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

function GenerateReport() {
    let navigate = useNavigate();

    const invoiceData = {
        logo: 'https://via.placeholder.com/100',
        companyName: 'Your Company Name',
        address: '123 Business Rd, Business City, BC 12345',
        invoiceNumber: 'INV-1001',
        date: '2024-08-04',
    };

    const [items, setItems] = useState([
        { itemNumber: 1, name: 'Laptop', description: '15 inch, 256GB SSD', quantity: 2, pricePerItem: 1200, totalPrice: 2400 },
        { itemNumber: 2, name: 'Smartphone', description: '64GB, Black', quantity: 5, pricePerItem: 800, totalPrice: 4000 },
        { itemNumber: 3, name: 'Tablet', description: '10 inch, 128GB', quantity: 3, pricePerItem: 500, totalPrice: 1500 },
    ]);

    const handleChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;

        if (field === 'quantity' || field === 'pricePerItem') {
            newItems[index].totalPrice = newItems[index].quantity * newItems[index].pricePerItem;
        }

        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([
            ...items,
            { itemNumber: items.length + 1, name: '', description: '', quantity: 0, pricePerItem: 0, totalPrice: 0 },
        ]);
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handlePrint = () => {
        window.print();
    };

    // Function to handle adding new rows when pressing Enter
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddItem();
        }
    };

    const handleBack = () => {
        navigate("/home")
    }

    return (
        <>
            <div className="invoice-button" style={{ margin: '20px 0 -20px 0' }}>
                <Button
                    variant="contained"
                    style={{ background: "#5D54A4", color: "white", marginRight: '20px' }}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{ background: "green", color: "white", marginRight: '20px' }}
                    onClick={handlePrint}
                >
                    Print
                </Button>
            </div>
            <div className="container">
                <div className="invoice-container">
                    <div className="invoice-header">
                        <div className="invoice-logo">
                            <img src={invoiceData.logo} alt="Company Logo" />
                            <p>{invoiceData.companyName}</p>
                            <p>{invoiceData.address}</p>
                        </div>
                        <div className="invoice-details">
                            <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
                            <p><strong>Date: {" "}</strong> <TextField type="date" defaultValue={invoiceData.date} variant="standard" InputProps={{ disableUnderline: true }} /></p>
                        </div>
                    </div>
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Item #</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price Per Item</th>
                                <th>Total Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="7">
                                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {items.map((item, index) => (
                                            <tr key={item.itemNumber}>
                                                <td>{item.itemNumber}</td>
                                                <td>
                                                    <TextField
                                                        variant="standard"
                                                        size="small"
                                                        value={item.name}
                                                        InputProps={{ disableUnderline: true }}
                                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        variant="standard"
                                                        size="small"
                                                        value={item.description}
                                                        InputProps={{ disableUnderline: true }}
                                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        variant="standard"
                                                        size="small"
                                                        type="number"
                                                        value={item.quantity}
                                                        InputProps={{ disableUnderline: true }}
                                                        onChange={(e) => handleChange(index, 'quantity', parseInt(e.target.value, 10))}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        variant="standard"
                                                        size="small"
                                                        type="number"
                                                        value={item.pricePerItem}
                                                        InputProps={{ disableUnderline: true }}
                                                        onChange={(e) => handleChange(index, 'pricePerItem', parseFloat(e.target.value))}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </td>
                                                <td>${item.totalPrice.toFixed(2)}</td>
                                                <td>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => handleRemoveItem(index)}
                                                        sx={{ textTransform: "capitalize" }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="invoice-footer">
                        <p>Thank you for your business!</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GenerateReport;
