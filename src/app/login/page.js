'use client'

import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../../../firebase_Config';
import {router} from "next/client";
import {useRouter} from "next/navigation";

const auth = getAuth(app);

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // FirebaseのsignInWithEmailAndPasswordメソッドを使用してログイン
            await signInWithEmailAndPassword(auth, email, password);
             router.push('/pages'); // ログイン成功後、ダッシュボードページにリダイレクト
            console.log('ok');
        } catch (error) {
            console.log('Login Error', error);
        }
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f0f0f0', // 背景色を少しグレーに
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                width: '498px',
                height: '275px',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px', // 角を丸くする
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 軽い影を付ける
                padding: '20px'
            }}>
                <h1 style={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'black',
                    fontSize: '1.25rem',
                    marginBottom: '20px'
                }}>
                    ユーザーログイン
                </h1>
                <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
                    <div style={{
                        marginBottom: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <label style={{ color: 'black', fontSize: '1rem' }}>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                        </label>
                    </div>
                    <div style={{
                        marginBottom: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <label style={{ color: 'black', fontSize: '1rem' }}>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                        </label>
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        maxWidth: '150px',
                        height: '40px',
                        backgroundColor: '#f36d6d',
                        border: 'none',
                        borderRadius: '20px',
                        color: 'white',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
