import React, { useEffect, useState } from 'react';
import api from '../api/client';

export default function Dashboard() {
    const [ sum, setSum ] = useState({ income: 0, expense: 0, balance: 0 });
    const [ cats, setCats ] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const a = await api.get('/dashboard/summary');
        const b = await api.get('/dashboard/category');
        setSum(a.data);
        setCats(b.data);
    };

    return 
        <div>
            <h2>Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                <div>Income ₹{sum.income}</div>
                <div>Expense ₹{sum.expense}</div>
                <div>Balance ₹{sum.balance}</div>
            </div>

            <h3>Category Expenses</h3>
            <ul>{cats.map((x, i) => <li key={i}>{x.category} - ₹{x.total}</li>)}</ul>
        </div>
}
