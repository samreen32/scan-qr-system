import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Template1 from './InvoiceTemplates/Template1';
import Template2 from './InvoiceTemplates/Template2';
import Template3 from './InvoiceTemplates/Template3';
import { UserLogin } from '../../context/AuthContext';
import { USER_AUTH } from '../../Auth_Api';

function SelectTemplate() {
    let navigate = useNavigate();
    const {
        items,
        handleKeyPress,
        handleRemoveItem,
        handleChange,
        userDetails,
        setUserDetails
    } = UserLogin();

    const handleSelect = (template) => {
        navigate('/GenerateReport', {
            state: { template }
        });
    };

    const handleBack = () => {
        navigate("/home")
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        fetch(`${USER_AUTH}/getUserInfo`, {
            method: 'GET',
            headers: {
                'token': token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.msg === 'Token is not valid' || data.msg === 'No token, authorization denied') {
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    localStorage.setItem("userData", data);
                    setUserDetails(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
                navigate('/');
            });
    }, []);

    return (
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-center pt-4">
                <button
                    onClick={handleBack}
                    className="btn btn-link"
                    style={{ color: "white", textDecoration: "none", fontSize: "20px", marginRight: "10px" }}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h4 className='text-center' style={{ color: "white", margin: 0 }}>
                    Select an Invoice Template
                </h4>
            </div>
            <div className='template-container mb-5'>
                <div className="template h-100 my-2">
                    <div className="template-preview px-2 mt-2">
                        <h5 className='my-2'>Template 1</h5>
                        <Template1
                            items={items}
                            userDetails={userDetails}
                            handleKeyPress={handleKeyPress}
                            handleRemoveItem={handleRemoveItem}
                            handleChange={handleChange}
                        />
                    </div>
                    <button className="button login__submit"
                        style={{ marginTop: "5px" }}
                        onClick={() => handleSelect('template1')}>
                        <span className="button__text">Select</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="template h-100 my-2">
                    <div className="template-preview px-2 mt-2">
                        <h5 className='my-2'>Template 2</h5>
                        <Template2
                            items={items}
                            userDetails={userDetails}
                            handleKeyPress={handleKeyPress}
                            handleRemoveItem={handleRemoveItem}
                            handleChange={handleChange}
                        />
                    </div>
                    <button className="button login__submit"
                        style={{ marginTop: "5px" }}
                        onClick={() => handleSelect('template2')}>
                        <span className="button__text">Select</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="template h-100 my-2">
                    <div className="template-preview px-2 mt-2">
                        <h5 className='my-2'>Template 3</h5>
                        <Template3
                            items={items}
                            userDetails={userDetails}
                            handleKeyPress={handleKeyPress}
                            handleRemoveItem={handleRemoveItem}
                            handleChange={handleChange}
                        />
                    </div>
                    <button className="button login__submit"
                        style={{ marginTop: "5px" }}
                        onClick={() => handleSelect('template3')}>
                        <span className="button__text">Select</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectTemplate;