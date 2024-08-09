import React, { useState, useRef } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import JsBarcode from 'jsbarcode';
import Template3 from './InvoiceTemplates/Template3';
import Template2 from './InvoiceTemplates/Template2';
import Template1 from './InvoiceTemplates/Template1';
import { UserLogin } from '../../context/AuthContext';
import generatePDF from 'react-to-pdf';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 620,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function GenerateReport() {
    const targetRef = useRef();
    let navigate = useNavigate();
    const location = useLocation();
    const {
        items,
        handleKeyPress,
        handleRemoveItem,
        handleChange,
        invoiceData
    } = UserLogin();
    const { template } = location.state || { template: 'template1' };
    const [barcodeData, setBarcodeData] = useState('');
    const [open, setOpen] = useState(false);
    const barcodeRef = useRef(null);

    const generateBarcode = () => {
        const barcodeText = `${invoiceData.invoiceNumber} - ${invoiceData.date}`;
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

    const handlePrintBarcode = () => {
        generatePDF(targetRef, { filename: "barcode.pdf" });
    };

    const handleBack = () => {
        navigate("/SelectTemplate");
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                invoiceData={invoiceData}
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
                invoiceData={invoiceData}
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
                invoiceData={invoiceData}
                handleKeyPress={handleKeyPress}
                handleRemoveItem={handleRemoveItem}
                handleChange={handleChange}
            />
        </>
    );

    return (
        <>
            <div className="invoice-button" style={{ margin: '30px 0 0 0' }}>
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
                    onClick={generateBarcode}
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
