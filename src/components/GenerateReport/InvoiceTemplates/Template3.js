import { Button, TextField } from '@mui/material';
import React from 'react';

function Template3({ items, handleChange, handleKeyPress, handleRemoveItem, invoiceData }) {
    return (
        <>
            <div className="invoice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="invoice-details" style={{ flex: 1, textAlign: 'left' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Invoice Number: {invoiceData?.invoiceNumber}</p>
                    <p style={{ fontSize: '14px' }}>
                        <strong>Date: </strong>
                        <TextField
                            type="date"
                            defaultValue={invoiceData?.date}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                        />
                    </p>
                </div>
                <div className="invoice-logo" style={{ textAlign: 'right' }}>
                    <p className="company-info px-2 mt-3">{invoiceData?.companyName}<br />
                        {invoiceData?.address}</p>
                    <img src={invoiceData?.logo} alt="Company Logo" />
                </div>
            </div>
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <table
                    className="invoice-table"
                    style={{
                        marginTop: "5px", borderCollapse: 'collapse', width: '100%'
                    }}
                >
                    <thead style={{ backgroundColor: '#f0f8ff', borderBottom: '2px solid #000' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px' }}>Item #</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px' }}>Name</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px' }}>Description</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px' }}>Quantity</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px' }}>Price Per Item</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px' }}>Total Price</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontSize: '14px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ height: "250px", overflowY: "auto", }}>
                        {items?.map((item, index) => (
                            <tr key={item.itemNumber} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ fontSize: '14px' }}>{item.itemNumber}</td>
                                <td style={{ fontSize: '14px' }}>
                                    <TextField
                                        variant="standard"
                                        size="small"
                                        value={item.name}
                                        InputProps={{ disableUnderline: true }}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </td>
                                <td style={{ fontSize: '14px' }}>
                                    <TextField
                                        variant="standard"
                                        size="small"
                                        value={item.description}
                                        InputProps={{ disableUnderline: true }}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </td>
                                <td style={{ fontSize: '14px' }}>
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
                                <td style={{ fontSize: '14px' }}>
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
                                <td style={{ fontSize: '14px' }}>${item.totalPrice.toFixed(2)}</td>
                                <td style={{ fontSize: '14px' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveItem(index)}
                                        sx={{ textTransform: "capitalize" }}
                                        style={{ padding: "6px", fontSize: "12px" }}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Template3;
