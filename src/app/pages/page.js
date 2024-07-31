"use client";

import { useEffect, useState } from "react";
import { db, auth } from '../../../firebase_Config'; // Firebase configuration file
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import SendMessage from '../SendMessage/page'; // Adjust the path according to your file structure
import '../../../public/css/styles.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [currentUserUid, setCurrentUserUid] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt")); //qにmessagesにアクセスしてその値をorderbyで時間順にソートした
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messagesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messagesList); //ここでメッセージリスト格納をsetmessagesに格納
        });

        if (auth.currentUser) {
            setCurrentUserUid(auth.currentUser.uid);
        }

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log("Current user UID:", currentUserUid);
    }, [currentUserUid]);

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map(({ id, text, photoURL, uid }) => (
                    //下のコードでメッセージをsentとreceivedに分けてcss適用
                    <div key={id} className={`message ${uid === currentUserUid ? 'sent' : 'received'}`}>　　
                        {photoURL && <img src={photo} alt="Avatar" className="avatar" />}
                        <div className="message-content">
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage />
        </div>
    );
};

export default Chat;
