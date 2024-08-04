import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CheckPerItemReport() {
    const navigate = useNavigate();

    const invoiceData = {
        logo: 'https://via.placeholder.com/100',
        companyName: 'Your Company Name',
        address: '123 Business Rd, Business City, BC 12345',
        invoiceNumber: 'INV-1001',
        date: '2024-08-04',
        items: [
            { itemNumber: 1, name: 'Laptop', description: '15 inch, 256GB SSD', quantity: 2, pricePerItem: 1200, totalPrice: 2400 },
            { itemNumber: 2, name: 'Smartphone', description: '64GB, Black', quantity: 5, pricePerItem: 800, totalPrice: 4000 },
            { itemNumber: 3, name: 'Tablet', description: '10 inch, 128GB', quantity: 3, pricePerItem: 500, totalPrice: 1500 },
        ],
    };

    const handleBack = () => {
        navigate("/PerItemReport");
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className="invoice-button">
                <Button
                    variant="contained"
                    style={{ background: "#5D54A4", color: "white" }}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{ background: "green", color: "white", marginLeft: '20px' }}
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
                            <p><strong>Date:</strong> {invoiceData.date}</p>
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
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item) => (
                                <tr key={item.itemNumber}>
                                    <td>{item.itemNumber}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.pricePerItem.toFixed(2)}</td>
                                    <td>${item.totalPrice.toFixed(2)}</td>
                                </tr>
                            ))}
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

export default CheckPerItemReport;
