
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';  
import styles from './FAQCard.module.css';

const FAQCard = ({ heading, question, answer, url, onEdit, onDelete }) => {
    return (
        <div className={styles.container}>
            <section className={styles.card}>
                <div className={styles.image}>
                    <img src={url} alt={heading} />
                    <h2>{heading}</h2>
                </div>
                <div className={styles.content}>
                    <h2>{question}</h2>
                    <p>{answer}</p>
                </div>
            </section>
            <div className={styles.actions}>
                <FaEdit onClick={onEdit} className={styles.editIcon} title="Edit" />
                <FaTrash onClick={onDelete} className={styles.deleteIcon} title="Delete" />
            </div>
        </div>
    );
};

export default FAQCard;
