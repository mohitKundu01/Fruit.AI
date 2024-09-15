

import React, { useState, useEffect } from 'react';
import styles from './AddFAQForm.module.css';

const AddFAQForm = ({ onClose, onAddFAQ, editFAQ }) => {
    const [heading, setHeading] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (editFAQ) {
            setHeading(editFAQ.heading);
            setQuestion(editFAQ.question);
            setAnswer(editFAQ.answer);
            setImageUrl(editFAQ.image_url);
        }
    }, [editFAQ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFAQ = { heading, question, answer, image_url: imageUrl };

        try {
            const response = await fetch(`http://localhost:8000/faqs${editFAQ ? `/${editFAQ.id}` : ''}`, {
                method: editFAQ ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFAQ),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${editFAQ ? 'update' : 'add'} FAQ`);
            }

            const data = await response.json();
            onAddFAQ(data);
            onClose();
        } catch (error) {
            console.error(`Error ${editFAQ ? 'updating' : 'adding'} FAQ:`, error);
        }
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <h3>{editFAQ ? 'Edit FAQ' : 'Add New FAQ'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Heading</label>
                        <input
                            type="text"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Question</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Answer</label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Image URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>
                            {editFAQ ? 'Update' : 'Submit'}
                        </button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFAQForm;
