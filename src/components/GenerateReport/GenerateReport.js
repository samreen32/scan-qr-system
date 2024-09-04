import React, { useState, useRef } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import JsBarcode from 'jsbarcode';
import Template3 from './InvoiceTemplates/Template3';
import Template2 from './InvoiceTemplates/Template2';
import Template1 from './InvoiceTemplates/Template1';
import { UserLogin } from '../../context/AuthContext';
import { INVOICE_AUTH } from '../../Auth_Api';
import generatePDF from 'react-to-pdf';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function GenerateReport() {
    const targetRef = useRef();
    const barcodeRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        items,
        handleKeyPress,
        handleRemoveItem,
        handleChange,
        userDetails,
    } = UserLogin();
    const { template } = location.state || { template: 'template1' };

    const [barcodeData, setBarcodeData] = useState('');
    const [open, setOpen] = useState(false);

    // Function to handle invoice creation with entered details
    const createInvoice = async () => {
        try {
            // Prepare the payload for the backend
            const invoiceData = {
                name: userDetails.name,
                company_name: userDetails.companyName,
                address: userDetails.address,
                items: items.map(item => ({
                    description: item.description,
                    quantity: item.quantity,
                    price_each: item.pricePerItem, // assuming `pricePerItem` is stored in each item
                }))
            };

            // Make POST request to create invoice
            const response = await fetch(`${INVOICE_AUTH}/createInvoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData), // Send the invoice data to the backend
            });

            const result = await response.json();
            console.log(result, "result");

            if (response.ok) {
                console.log('Invoice created successfully:', result);
                alert('Invoice created successfully!');
                return result; // Return the invoice result (e.g., invoice number)
            } else {
                console.error('Error creating invoice:', result.errors);
                alert('Error creating invoice. Please try again.');
                return null;
            }
        } catch (error) {
            console.error('Server error:', error);
            alert('Server error. Please try again.');
            return null;
        }
    };

    // Function to generate barcode based on invoice number and date
    const generateBarcode = (invoiceNumber, date) => {
        const barcodeText = `${invoiceNumber} - ${date}`;
        setBarcodeData(barcodeText);
        setTimeout(() => {
            if (barcodeRef.current) {
                JsBarcode(barcodeRef.current, barcodeText, {
                    format: "CODE128",
                    displayValue: true,
                    fontSize: 16,
                });
            }
        }, 100);
        handleOpen();
    };

    // Function to handle printing the barcode as PDF
    const handlePrintBarcode = () => {
        generatePDF(targetRef, { filename: "barcode.pdf" });
    };

    const handleBack = () => {
        navigate("/SelectTemplate");
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle generate invoice and barcode creation
    const handleGenerateAndCreateInvoice = async () => {
        const invoiceResult = await createInvoice();
        if (invoiceResult) {
            generateBarcode(invoiceResult.invoice_num, invoiceResult.date || new Date().toISOString().split('T')[0]);
        }
    };

    const renderTemplate = () => {
        switch (template) {
            case 'template1':
                return renderTemplate1();
            case 'template2':
                return renderTemplate2();
            case 'template3':
                return renderTemplate3();
            default:
                return renderTemplate1();
        }
    };

    const renderTemplate1 = () => (
        <>
            <Template1
                items={items}
                userDetails={userDetails}
                handleKeyPress={handleKeyPress}
                handleRemoveItem={handleRemoveItem}
                handleChange={handleChange}
            />
        </>
    );

    const renderTemplate2 = () => (
        <>
            <Template2
                items={items}
                userDetails={userDetails}
                handleKeyPress={handleKeyPress}
                handleRemoveItem={handleRemoveItem}
                handleChange={handleChange}
            />
        </>
    );

    const renderTemplate3 = () => (
        <>
            <Template3
                items={items}
                userDetails={userDetails}
                handleKeyPress={handleKeyPress}
                handleRemoveItem={handleRemoveItem}
                handleChange={handleChange}
            />
        </>
    );

    return (
        <>
            <div className="invoice-button">
                <Button
                    variant="contained"
                    style={{ background: "#5D54A4", color: "white", marginRight: '20px', fontSize: "12px" }}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{ background: "purple", color: "white", marginRight: '20px', fontSize: "12px" }}
                    onClick={handleGenerateAndCreateInvoice}
                >
                    Generate
                </Button>
            </div>
            <div className="container">
                <div className="invoice-container">
                    {renderTemplate()}
                    <div className="invoice-footer">
                        <p>Thank you for your business!</p>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <div ref={targetRef} style={{ textAlign: "center" }}>
                        <h4 id="modal-title">Barcode of Invoice</h4>
                        <svg ref={barcodeRef}></svg>
                    </div>
                    <Button
                        onClick={handlePrintBarcode}
                        variant="contained"
                        className='barcode-btn'
                    >
                        Print Barcode
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default GenerateReport;