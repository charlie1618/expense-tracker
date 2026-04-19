import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';

export default function App() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return
        <div style={{ fontFamily: 'Arial', maxWidth: 900, margin: 'auto', padding: 20 }}>
            <h1>Expense Tracker</h1>
            <nav style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <Link to='/'>Dashboard</Link>
                <Link to='/transactions'>Transactions</Link>
                <Link to='/budget'>Budget</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                <button onClick={logout}>Logout</button>
            </nav>
            <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/transactions' element={<Transactions/>}/>
                <Route path='/budget' element={<Budget/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </div>
}