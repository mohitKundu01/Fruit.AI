import React, { useState } from 'react';
import styles from './Login.module.css';
import { FaFacebook, FaInstagram, FaPinterest, FaLinkedin, FaFingerprint, FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';  // Import specific icons
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/home")
        // Add your form submission logic here
    };


    const goToSignup = () => {
        navigate('/'); // Navigate to the signup page
    };


    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <p>
                    By signing in you are agreeing to our <span><a href="#">Terms and privacy policy</a></span>
                </p>
                <div className={styles.tabs}>
                    <button type="button" className={styles.active}>Login</button>
                    <button type="button" onClick={goToSignup}>Register</button>
                </div>


                <div className={styles.inputGroup}>
                    <span className={styles.icon}><FaEnvelope size={24} /></span>
                    <input className={styles.input} type="email" placeholder="Email Address" />
                </div>

                {/* Password Input */}
                <div className={styles.inputGroup}>
                    <span className={styles.iconLeft}><FaLock size={24} /></span>
                    <input
                        className={styles.input}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        required
                    />
                    <span className={styles.iconRight} onClick={togglePasswordVisibility}>
                        {passwordVisible ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                    </span>
                </div>



                <div className={styles.options}>
                    <div style={{ display: "flex ", gap: "3px" }}>
                        <input style={{ width: "20px" }} type="checkbox" />
                        <label>
                            Remember password
                        </label>
                    </div>
                    <a href="#" className={styles.forgotPassword}>Forget password</a>
                </div>

                <button type="submit" className={styles.loginButton}>Login</button>

                <div className={styles.socialText}>or connect with</div>
                <div className={styles.socialIcons}>
                    <FaFacebook size={24} style={{ color: '#3b5998' }} />
                    <FaInstagram size={24} style={{ color: '#E1306C' }} />
                    <FaPinterest size={24} style={{ color: '#E60023' }} />
                    <FaLinkedin size={24} style={{ color: '#0077B5' }} />
                </div>

                <div className={styles.fingerprint}>
                    <FaFingerprint size={50} style={{ color: '#007bff' }} />
                </div>
            </form>
        </div>
    );
};

export default Login;
