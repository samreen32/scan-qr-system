import React from 'react';
import { useNavigate } from 'react-router-dom';
import Template1 from './InvoiceTemplates/Template1';
import Template2 from './InvoiceTemplates/Template2';
import Template3 from './InvoiceTemplates/Template3';
import { UserLogin } from '../../context/AuthContext';

function SelectTemplate() {
    let navigate = useNavigate();
    const {
        items,
        handleKeyPress,
        handleRemoveItem,
        handleChange,
        invoiceData
    } = UserLogin();

    const handleSelect = (template) => {
        navigate('/GenerateReport', {
            state: { template }
        });
    };

    return (
        <div className="container-fluid">
            <h4 className='text-center my-4 pt-4' style={{ color: "white" }}>
                Select an Invoice Template
            </h4>
            <div className='template-container my-2'>
                <div className="template h-100 my-2">
                    <div className="template-preview px-2">
                        <h5 className='my-2 pb-4 pt-2'>Template 1</h5>
                        <Template1
                            items={items}
                            invoiceData={invoiceData}
                            handleKeyPress={handleKeyPress}
                            handleRemoveItem={handleRemoveItem}
                            handleChange={handleChange}
                        />
                    </div>
                    <button className="button login__submit" onClick={() => handleSelect('template1')}>
                        <span className="button__text">Select</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="template h-100 my-2">
                    <div className="template-preview px-2">
                        <h5 className='my-2 pb-4 pt-2'>Template 2</h5>
                        <Template2
                            items={items}
                            invoiceData={invoiceData}
                            handleKeyPress={handleKeyPress}
                            handleRemoveItem={handleRemoveItem}
                            handleChange={handleChange}
                        />
                    </div>
                    <button className="button login__submit" onClick={() => handleSelect('template2')}>
                        <span className="button__text">Select</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="template h-100 my-2">
                    <div className="template-preview px-2">
                        <h5 className='my-2 pb-4 pt-2'>Template 3</h5>
                        <Template3
                            items={items}
                            invoiceData={invoiceData}
                            handleKeyPress={handleKeyPress}
                            handleRemoveItem={handleRemoveItem}
                            handleChange={handleChange}
                        />
                    </div>
                    <button className="button login__submit" onClick={() => handleSelect('template3')}>
                        <span className="button__text">Select</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectTemplate;
