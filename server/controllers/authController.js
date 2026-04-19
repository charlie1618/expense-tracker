const db = require('../config/db');
const bcrypt = require('bcryptjs');
const sign = require('../utils/token');

exports.register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const hash = await bcrypt.hash(password,10);
        const r = await db.query(
            'INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) RETURNING id,name,email',
            [name,email,hash]
        );
        res.json({user:r.rows[0], token:sign(r.rows[0])});
    }catch(e){ res.status(400).json({message:'Register failed'}); }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const r = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (!r.rows.length) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: sign(user) });
};

exports.me = async (req, res) => {
    const r = await db.query('SELECT id, name, email FROM users WHERE id=$1', [req.user.id]);
    res.json(r.rows[0]);
};
