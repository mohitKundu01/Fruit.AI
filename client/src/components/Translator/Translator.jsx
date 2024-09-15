import React, { useEffect } from "react";
import countries from "./data.js";
import styles from "./Translator.module.css";

const Translator = () => {
    useEffect(() => {
        const fromText = document.querySelector(`.${styles.fromText}`);
        const toText = document.querySelector(`.${styles.toText}`);
        const exchangeIcon = document.querySelector(`.${styles.exchange}`);
        const selectTag = document.querySelectorAll("select");
        const icons = document.querySelectorAll(`.${styles.icon}`);
        const translateBtn = document.querySelector(`.${styles.translateButton}`);

        selectTag.forEach((tag, id) => {
            for (let country_code in countries) {
                let selected =
                    id === 0
                        ? country_code === "en-GB"
                            ? "selected"
                            : ""
                        : country_code === "hi-IN"
                            ? "selected"
                            : "";
                let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
                tag.insertAdjacentHTML("beforeend", option);
            }
        });

        exchangeIcon.addEventListener("click", () => {
            let tempText = fromText.value;
            let tempLang = selectTag[0].value;
            fromText.value = toText.value;
            toText.value = tempText;
            selectTag[0].value = selectTag[1].value;
            selectTag[1].value = tempLang;
        });

        fromText.addEventListener("keyup", () => {
            if (!fromText.value) toText.value = "";
        });

        translateBtn.addEventListener("click", () => {
            let text = fromText.value.trim();
            let translateFrom = selectTag[0].value;
            let translateTo = selectTag[1].value;
            if (!text) return;
            toText.setAttribute("placeholder", "Translating...");
            let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
            fetch(apiUrl)
                .then((res) => res.json())
                .then((data) => {
                    toText.value = data.responseData.translatedText;
                    data.matches.forEach((data) => {
                        if (data.id === 0) {
                            toText.value = data.translation;
                        }
                    });
                    toText.setAttribute("placeholder", "Translation");
                });
        });

        icons.forEach((icon) => {
            icon.addEventListener("click", ({ target }) => {
                if (!fromText.value || !toText.value) return;
                if (target.classList.contains("fa-copy")) {
                    if (target.id === "from") {
                        navigator.clipboard.writeText(fromText.value);
                    } else {
                        navigator.clipboard.writeText(toText.value);
                    }
                } else {
                    let utterance;
                    if (target.id === "from") {
                        utterance = new SpeechSynthesisUtterance(fromText.value);
                        utterance.lang = selectTag[0].value;
                    } else {
                        utterance = new SpeechSynthesisUtterance(toText.value);
                        utterance.lang = selectTag[1].value;
                    }
                    speechSynthesis.speak(utterance);
                }
            });
        });
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.textInput}>
                        <textarea
                            spellCheck="false"
                            className={`${styles.textarea} ${styles.fromText}`}
                            placeholder="Enter text"
                        ></textarea>
                        <textarea
                            spellCheck="false"
                            readOnly
                            disabled
                            className={`${styles.textarea} ${styles.toText}`}
                            placeholder="Translation"
                        ></textarea>
                    </div>
                    <ul className={styles.controls}>
                        <li className={styles.controlRow}>
                            <div className={styles.icons}>
                                <i id="from" className={`fas fa-volume-up ${styles.icon}`}></i>
                                <i id="from" className={`fas fa-copy ${styles.icon}`}></i>
                            </div>
                            <select></select>
                        </li>
                        <li className={styles.exchange}>
                            <i className="fas fa-exchange-alt"></i>
                        </li>
                        <li className={styles.controlRow}>
                            <select></select>
                            <div className={styles.icons}>
                                <i id="to" className={`fas fa-volume-up ${styles.icon}`}></i>
                                <i id="to" className={`fas fa-copy ${styles.icon}`}></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <button className={styles.translateButton}>Translate Text</button>
            </div>
        </>
    );
};

export default Translator;
