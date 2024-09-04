import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { USER_AUTH } from '../Auth_Api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors([]);
        try {
            const response = await fetch(`${USER_AUTH}/loginUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const result = await response.json();
            console.log(result, "result");
            setProcessing(false);
            if (response.ok) {
                localStorage.setItem("token", result.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    text: 'You have logged in successfully!',
                });
                navigate("/home");
            } else {
                setErrors([{ msg: result.msg }]);
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: result.msg,
                });
            }
        } catch (error) {
            setProcessing(false);
            console.error("There was an error!", error);
            setErrors([{ msg: "There was an error logging in. Please try again." }]);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error logging in. Please try again.',
            });
        }
    };

    return (
        <div className="container">
            <div className="screen my-5">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <h4 className="text-center">Login</h4>
                        {errors.length > 0 && (
                            <div className="alert alert-danger">
                                {errors.map((error, index) => (
                                    <p key={index}>{error.msg}</p>
                                ))}
                            </div>
                        )}

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
                        <button
                            className="button login__submit"
                            type="submit"
                            disabled={processing}
                        >
                            <span className="button__text">
                                {processing ? "Processing..." : "Login"}
                            </span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                        <Link to="/register" className='link-class mt-2'>New member? Register</Link>
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

export default Login;