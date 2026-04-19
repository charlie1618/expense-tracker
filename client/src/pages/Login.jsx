import React, { useState } from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [ email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const nav = useNavigate();

    const submit = async () => {
        const r = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', r.data.token);
        nav('/');
    };

    return 
        <div>
            <h2>Login</h2>
            <input placeholder='Email' onChange={e => setEmail(e.target.value)}/><br/><br/>
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/><br/><br/>
            <button onClick={submit}>Login</button>
        </div>
}
