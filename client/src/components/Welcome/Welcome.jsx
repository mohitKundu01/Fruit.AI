import React, { useEffect } from 'react'
import msgIcon from "../../assets/msgIcon.png"
import styles from "./Welcome.module.css"
import { useNavigate } from 'react-router-dom'
const Welcome = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/chatbot');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className={styles.container}>
            <img src={msgIcon} />
            <h1 className={styles.hello}>Hello</h1>
            <h1>Chat.</h1>
            <p>The last chat app you’ll ever need.</p>
        </div>
    )
}

export default Welcome
