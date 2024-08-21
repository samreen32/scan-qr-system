import { Button, TextField, Typography } from '@mui/material';
import React from 'react';

function Template1({ items, handleChange, handleKeyPress, handleRemoveItem, invoiceData }) {
    return (
        <>
            <div
                className="invoice-header"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div className="invoice-logo" style={{ flex: 1 }}>
                    <img src={invoiceData?.logo} alt="Company Logo" />
                    <p className="company-info px-2 mt-3">
                        {invoiceData?.companyName}<br />
                        {invoiceData?.address}
                    </p>
                </div>
                <div className="invoice-details" style={{ flex: 1, textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold' }}>Invoice Number: {invoiceData?.invoiceNumber}</p>
                    <p><strong>Date: </strong>
                        <TextField
                            type="date"
                            defaultValue={invoiceData?.date}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                        />
                    </p>
                </div>
            </div>
            <div
                className="invoice-items"
                style={{
                    marginTop: "0px",
                    overflowY: "auto"
                }}
            >
                {items?.map((item, index) => (
                    <div
                        key={item.itemNumber}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            marginBottom: '10px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '5px',
                            border: '1px solid #ddd'
                        }}
                    >
                        <Typography variant="body1" style={{ flex: 1 }}>
                            <strong>Item #{item.itemNumber}</strong>
                        </Typography>
                        <TextField
                            variant="standard"
                            size="small"
                            value={item.name}
                            label="Name"
                            InputProps={{ disableUnderline: true }}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            onKeyPress={handleKeyPress}
                            style={{ flex: 2, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            variant="standard"
                            size="small"
                            value={item.description}
                            label="Description"
                            InputProps={{ disableUnderline: true }}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            onKeyPress={handleKeyPress}
                            style={{ flex: 3, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            variant="standard"
                            size="small"
                            type="number"
                            value={item.quantity}
                            label="Quantity"
                            InputProps={{ disableUnderline: true }}
                            onChange={(e) => handleChange(index, 'quantity', parseInt(e.target.value, 10))}
                            onKeyPress={handleKeyPress}
                            style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            variant="standard"
                            size="small"
                            type="number"
                            value={item.pricePerItem}
                            label="Price Per Item"
                            InputProps={{ disableUnderline: true }}
                            onChange={(e) => handleChange(index, 'pricePerItem', parseFloat(e.target.value))}
                            onKeyPress={handleKeyPress}
                            style={{ flex: 2, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <Typography variant="body1" style={{ flex: 1, marginLeft: '10px' }}><strong>${item.totalPrice.toFixed(2)}</strong></Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleRemoveItem(index)}
                            sx={{ textTransform: "capitalize" }}
                            style={{ padding: "4px", fontSize: "12px", marginLeft: '10px' }}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Template1;