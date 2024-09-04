import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { UserLogin } from '../../../context/AuthContext';

function Template1({ userDetails }) {
    const { items, handleChange, handleKeyPress, handleRemoveItem, selectedDate, handleDateChange } = UserLogin();

    return (
        <>
            <div
                className="invoice-header"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div className="invoice-logo" style={{ flex: 1 }}>
                    <img src={userDetails?.company_logo} alt="Company Logo" />
                    <p className="company-info px-2 mt-3">
                        {userDetails?.companyName || 'Company Name'}
                        <br />
                        {userDetails?.address}
                    </p>
                </div>
                <div className="invoice-details" style={{ flex: 1, textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold' }}>Invoice Number: {userDetails?.invoiceNumber}</p>
                    <p style={{ marginRight: '-110px' }}>
                        <strong>Date: </strong>
                        <TextField
                            type="text"
                            value={selectedDate}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            onChange={handleDateChange}
                        />
                    </p>
                </div>
            </div>

            <div
                className="invoice-items"
                style={{ maxHeight: '250px', overflowY: 'auto' }}
            >
                {items.map((item, index) => (
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
                            border: '1px solid #ddd',
                        }}
                    >
                        <Typography variant="body1" style={{ flex: 1, marginTop: '10px' }}>
                            <strong>Item #{item.itemNumber}</strong>
                        </Typography>
                        <TextField
                            variant="standard"
                            size="small"
                            label="Name"
                            value={item.name}
                            InputProps={{ disableUnderline: true }}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            style={{ flex: 2, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            variant="standard"
                            size="small"
                            label="Description"
                            value={item.description}
                            InputProps={{ disableUnderline: true }}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            style={{ flex: 3, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            variant="standard"
                            size="small"
                            type="number"
                            label="Quantity"
                            value={item.quantity}
                            InputProps={{ disableUnderline: true }}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                            style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            variant="standard"
                            size="small"
                            type="number"
                            label="Price Per Item"
                            value={item.pricePerItem}
                            InputProps={{ disableUnderline: true }}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => handleChange(index, 'pricePerItem', e.target.value)}
                            style={{ flex: 2, marginLeft: '10px', marginRight: '10px' }}
                        />
                        <Typography variant="body1" style={{ flex: 1, marginLeft: '10px' }}>
                            <strong>Total: {item.totalPrice}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ textTransform: 'capitalize' }}
                            style={{ padding: '4px', fontSize: '12px', marginLeft: '10px' }}
                            onClick={() => handleRemoveItem(index)}
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