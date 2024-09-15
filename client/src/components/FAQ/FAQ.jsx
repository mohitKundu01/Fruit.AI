
import React, { useEffect, useState } from 'react';
import FAQCard from './FAQCard';
import AddFAQForm from './AddFAQForm';
import styles from './FAQ.module.css';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const FAQ = () => {
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editFAQ, setEditFAQ] = useState(null);

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                const response = await fetch('http://localhost:8000/faqs');
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQ data');
                }
                const data = await response.json();
                setFaqData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQData();
    }, []);


    const handleAddFAQ = (newFAQ) => {
        setFaqData((prevData) => [...prevData, newFAQ]);
    };

    const handleEditFAQ = (updatedFAQ) => {
        setFaqData((prevData) =>
            prevData.map((faq) => (faq.id === updatedFAQ.id ? updatedFAQ : faq))
        );
    };

    const handleDeleteFAQ = async (id) => {
        try {
            await fetch(`http://localhost:8000/faqs/${id}`, {
                method: 'DELETE',
            });
            setFaqData(faqData.filter((faq) => faq.id !== id));
        } catch (err) {
            console.error('Failed to delete FAQ', err);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={styles.faqSection}>
            <h2>FAQ Section</h2>

            <div className={styles.faqAccordion}>
                {faqData.map((faq, index) => (
                    <FAQCard
                        key={faq.id}
                        heading={faq.heading}
                        question={faq.question}
                        answer={faq.answer}
                        url={faq.image_url}
                        onEdit={() => {
                            setEditFAQ(faq);
                            setShowForm(true);
                        }}
                        onDelete={() => handleDeleteFAQ(faq.id)}
                    />
                ))}
            </div>
            {showForm && (
                <AddFAQForm
                    onClose={() => {
                        setShowForm(false);
                        setEditFAQ(null);
                    }}
                    onAddFAQ={editFAQ ? handleEditFAQ : handleAddFAQ}
                    editFAQ={editFAQ}
                />
            )}

            <button onClick={() => setShowForm(true)} className={styles.addButton}>
                Add FAQ
            </button>
        </section>
    );
};

export default FAQ;
