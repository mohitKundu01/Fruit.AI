import React from 'react';
import styles from './Home.module.css';
import About from "../../assets/About.png"
import Chat from "../../assets/Chat..png"
import FAQ from "../../assets/FAQs.png"
import g_translate from "../../assets/g_translate.png"
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Fruit.Ai</h1>
            <p className={styles.subtitle}>Be Healthy!</p>
            <div className={styles.gridContainer}>
                <div onClick={() => navigate("/welcome")} className={styles.box}><img src={Chat} /></div>
                <div className={styles.box}></div>
                <div onClick={() => navigate("/translator")} className={styles.box}><img src={g_translate} /></div>
                <div className={styles.box}></div>
                <div onClick={() => navigate("/faq")} className={styles.box}><img src={FAQ} /></div>
                <div onClick={() => navigate("/about")} className={styles.box}><img src={About} /></div>
            </div>
        </div>
    );
};

export default Home;
