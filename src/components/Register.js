import React from 'react';
import { useNavigate } from 'react-router';

function Register() {
    let navigate = useNavigate();

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <h4 className='text-center'>Scan and Generate</h4>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="Name" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-envelope"></i>
                            <input type="email" className="login__input" placeholder="Email" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-building"></i>
                            <input type="text" className="login__input" placeholder="Company Name" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-image"></i>
                            <input type="file" className="login__input" placeholder="Logo" accept="image/*" />
                        </div>
                        <button className="button login__submit" onClick={() => {
                            navigate("/home")
                        }}>
                            <span className="button__text">Register Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
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
