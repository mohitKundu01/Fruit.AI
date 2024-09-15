import React from 'react';
import styles from './about.module.css';
import vector from "../../assets/Vector.png"
const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.imgs}>
                <img src={vector} />
                <img src={vector} />
                <img src={vector} />
            </div>
            <div className={styles.aboutContent}>
                <h2>Fruit.Ai</h2>
                <p>
                    Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
                </p>
                <button className={styles.aboutButton}>About</button>
            </div>
        </div>
    );
};

export default About;
