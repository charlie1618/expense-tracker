import React, { useEffect, useState } from 'react';
import api from '../api/client';

export default function Transactions() {
    const [ items, setItems ] = useState([]);
    const [ form, setForm ] = useState({
        type: 'expense',
        category: 'Food',
        txn_date: new Date().toISOString().slice(0, 10)
    });

    const load = async () => {
        const r = await api.get('/transactions');
        setItems(r.data);
    };

    useEffect(() => { load() }, []);

    const add = async () => {
        await api.post('/transactions', form);
        setForm({ ...form, amount: '' });
        load();
    };

    const del = async (id) => {
        await api.delete('/transactions/' + id);
        load();
    };

    return
        <div>
            <h2>Transactions</h2>

            <select value={ form.type } onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value='expense'>Expense</option>
                <option value='income'>Income</option>
            </select>

            <input placeholder='Amount' value={ form.amount || '' }
            onChange={e => setForm({ ...form, amount: e.target.value})}/>

            <input placeholder='Category' value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value})}/>

            <button onClick={add}>Add</button>

            <ul>
                {items.map(x =>
                    <li key={ x.id }>
                    {x.type} | {x.category} | ₹{x.amount}
                    <button onClick={() => del(x.id)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
}