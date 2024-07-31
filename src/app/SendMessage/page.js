"use client";

import { useState } from "react";
import { db, auth } from "../../../firebase_Config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import '../../../public/css/styles.css';

const SendMessage = () => {
    const [message, setMessage] = useState("");
    const user = auth.currentUser;

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error("No user is authenticated");
            return;
        }

        const { uid, photoURL } = user;
        try {
            await addDoc(collection(db, "messages"), {
                text: message,
                photoURL,
                uid,
                createdAt: serverTimestamp(),
            });
            setMessage("");
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div className="send-message-container">
            <form onSubmit={sendMessage} className="send-message-form">
                <input
                    placeholder="メッセージを入力してください"
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className="message-input"
                />
                <button type="submit" className="send-button">送信</button>
            </form>
        </div>
    );
};

export default SendMessage;
