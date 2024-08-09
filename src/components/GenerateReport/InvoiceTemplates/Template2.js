import { Button, TextField } from '@mui/material';
import React from 'react';

function Template2({ items, handleChange, handleKeyPress, handleRemoveItem, invoiceData }) {
    return (
        <>
            <div className="invoice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="invoice-logo" style={{ flex: 1 }}>
                    <img src={invoiceData?.logo} alt="Company Logo" />
                    <p className="company-info px-2 mt-3">{invoiceData?.companyName}<br />
                        {invoiceData?.address}</p>
                </div>
                <div className="invoice-details" style={{ flex: 1, textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold' }}>Invoice Number: {invoiceData?.invoiceNumber}</p>
                    <p><strong>Date: </strong>
                        <TextField type="date" defaultValue={invoiceData?.date} variant="standard"
                            InputProps={{ disableUnderline: true }} />
                    </p>
                </div>
            </div>
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <table className="invoice-table">
                    <thead style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ccc' }}>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item #</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price Per Item</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item, index) => (
                            <tr
                                key={item.itemNumber}
                                style={{ borderBottom: '1px solid #ddd' }}
                            >
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.itemNumber}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <TextField
                                        variant="standard"
                                        size="small"
                                        value={item.name}
                                        InputProps={{ disableUnderline: true }}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <TextField
                                        variant="standard"
                                        size="small"
                                        value={item.description}
                                        InputProps={{ disableUnderline: true }}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
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
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
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
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.totalPrice.toFixed(2)}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveItem(index)}
                                        sx={{ textTransform: "capitalize" }}
                                        style={{ padding: "4px", fontSize: "12px" }}
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

export default Template2;
