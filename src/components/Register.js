import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { USER_AUTH } from '../Auth_Api';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

function Register() {
    const storage = getStorage();
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        password: '',
        companyName: '',
        company_logo: null,
    });
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            company_logo: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            const storageRef = ref(storage, `company_logos/${formData.company_logo.name}`);
            const uploadTask = uploadBytesResumable(storageRef, formData.company_logo);
            console.log(uploadTask, "uploadTask");

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Optional: Handle progress of upload here
                },
                (error) => {
                    setUploading(false);
                    console.error("Upload failed!", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload failed',
                        text: 'There was an error uploading the logo. Please try again.',
                    });
                },
                async () => {
                    const logoURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const userData = {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        companyName: formData.companyName,
                        address: formData.address,
                        company_logo: logoURL
                    };
                    const response = await fetch(`${USER_AUTH}/registerUser`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    });

                    const result = await response.json();
                    setUploading(false);

                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration successful',
                            text: 'User registered successfully!',
                        });
                        navigate("/");
                    } else {
                        console.log(result.errors);
                        setErrors(result.errors);
                        Swal.fire({
                            icon: 'error',
                            title: 'Registration failed',
                            text: 'Please check the form for errors and try again.',
                        });
                    }
                }
            );
        } catch (error) {
            setUploading(false);
            console.error("There was an error!", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error submitting the form. Please try again.',
            });
        }
    };

    return (
        <div className="container">
            <div className="screen my-5">
                <div className="screen__content">
                    <form className="login">
                        <h4 className="text-center">Register</h4>
                        {errors.length > 0 && (
                            <div className="alert alert-danger">
                                {errors.map((error, index) => (
                                    <p key={index}>{error.msg}</p>
                                ))}
                            </div>
                        )}
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input
                                type="text"
                                className="login__input"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-envelope"></i>
                            <input
                                type="email"
                                className="login__input"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input
                                type="password"
                                className="login__input"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-building"></i>
                            <input
                                type="text"
                                className="login__input"
                                placeholder="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-map-marker-alt"></i>
                            <input
                                type="text"
                                className="login__input"
                                placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-image"></i>
                            <input
                                type="file"
                                className="login__input"
                                placeholder="Logo"
                                name="company_logo"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button
                            className="button login__submit"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={uploading}
                        >
                            <span className="button__text">
                                {uploading ? "Processing..." : "Register Now"}
                            </span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                        <Link to="/" className='link-class mt-2'>New member? Login</Link>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
}

export default Register;