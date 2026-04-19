const db = require('../config/db');

exports.summary = async (req, res) => {
    const r = await db.query(`
    SELECT
    COALESCE(SUM(CASE WHEN type='income' THEN amount END), 0) income,
    COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) expense
    FROM transactions WHERE user_id=$1`, [req.user.id]);
    const row = r.rows[0];
    row.balance = Number(row.income) - Number(row.expense);
    res.json(row);
};

exports.category = async (req, res) => {
    const r = await db.query(
    "SELECT category, SUM(amount) total FROM transactions WHERE user_id=$1 AND type='expense' GROUP BY category ORDER BY total DESC",
    [req.user.id]
    );
    res.json(r.rows);
};
