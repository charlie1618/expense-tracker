const db = require('../config/db');

exports.list = async (req, res) => {
    let q = 'SELECT * FROM transactions WHERE user_id=$1';
    let vals = [req.user.id];
    if (req.query.type) {
        vals.push(req.query.type);
        q += ' AND type=$' + vals.length;
    }
    if (req.query.category) {
        vals.push(req.query.category);
        q += ' AND category=$' + vals.length;
    }
    if (req.query.search) {
        vals.push('%'+req.query.search+'%');
        q += ' AND (note ILIKE $' + vals.length + ' OR category ILIKE $' + vals.length + ')';
    }
    q += ' ORDER BY txn_date DESC, id DESC';
    const r = await db.query(q, vals);
    res.json(r.rows);
};

exports.create = async (req, res) => {
    const { type, amount, category, note, txn_date } = req.body;
    const r = await db.query(
    'INSERT INTO transactions(user_id, type, amount, category, note, txn_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [req.user.id, type, amount, category, note, txn_date]
    );
    res.json(r.rows[0]);
};

exports.update = async (req, res) => {
    const { type, amount, category, note, txn_date} = req.body;
    const r = await db.query(
    'UPDATE transactions SET type=$1, amount=$2, category=$3, note=$4, txn_date=$5 WHERE id=$6 AND user_id=$7 RETURNING *',
    [type, amount, category, note, txn_date, req.params.id, req.user.id]
    );
    res.json(r.rows[0] || null);
};

exports.remove = async (req, res) => {
    await db.query('DELETE FROM transactions WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
    res.json({ ok: true });
};
