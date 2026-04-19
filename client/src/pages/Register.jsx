import React, { useState } from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [ form, setForm ] = useState({});
    const nav = useNavigate();

    const submit = async () => {
        const r = await api.post('/auth/register', form);
        localStorage.setItem('token', r.data.token);
        nav('/');
    };

    return 
        <div>
            <h2>Register</h2>
            <input placeholder='Name' onChange={e => setForm({ ...form, name: e.target.value })}/><br/><br/>
            <input placeholder='Email' onChange={e => setForm({ ...form, email: e.target.value })}/><br/><br/>
            <input type='password' placeholder='Password' onChange={e => setForm({ ...form, password: e.target.value })}/><br/><br/>
            <button onClick={submit}>Register</button>
        </div>
}
