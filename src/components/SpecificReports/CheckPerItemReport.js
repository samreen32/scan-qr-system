import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../../context/AuthContext';

function CheckPerItemReport() {
    const navigate = useNavigate();
    const { invoiceData } = UserLogin(); 

    const handleBack = () => {
        navigate("/PerItemReport");
    };

    const handlePrint = () => {
        window.print();
    };

    if (!invoiceData) {
        return <p>Loading...</p>; 
    }

    return (
        <>
            <div className="invoice-button">
                <Button
                    variant="contained"
                    style={{ background: "#5D54A4", color: "white", fontSize: "12px" }}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{ background: "green", color: "white", marginLeft: '20px', fontSize: "12px" }}
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