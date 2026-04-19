import React, { useEffect, useState } from 'react';
import api from '../api/client';

export default function Budget() {
    const [ amount, setAmount ] = useState('');
    const [ current, setCurrent ] = useState(null);

    const load = async () => {
        const r = await api.get('/budget/current');
        setCurrent(r.data);
    };

    useEffect(() => { load() }, []);

    const save = async () => {
        const d = new Date();
        await api.post('/budget', {
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            amount
        });
        setAmount('');
        load();
    };

    return
        <div>
            <h2>Budget</h2>
            <input placeholder='Monthly Budget' value={amount} onChange={e => setAmount(e.target.value)}/>
            <button onClick={save}>Save</button>
            <p>Current Budget: ₹{current ? current.amount : 'Not set'}</p>
        </div>
}
