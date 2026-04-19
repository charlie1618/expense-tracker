const db = require('../config/db');

exports.setBudget = async (req, res) => {
    const { month, year, amount} = req.body;
    const r = await db.query(`
    INSERT INTO budgets(user_id, month, year, amount)
    VALUES($1, $2, $3, $4)
    ON CONFLICT(user_id, month, year)
    DO UPDATE SET amount=EXCLUDED.amount
    RETURNING *`,
    [req.user.id, month, year, amount]);
    res.json(r.rows[0]);
};

exports.current = async (req, res) => {
    const d = new Date();
    const r = await db.query(
    'SELECT * FROM budgets WHERE user_id=$1 AND month=$2 AND year=$3',
    [req.user.id, d.getMonth() + 1, d.getFullYear()]
    );
    res.json(r.rows[0] || null);
};
