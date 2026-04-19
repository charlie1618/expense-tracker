const r = require('express').Router();
const c = require('../controllers/budgetController');
const auth = require('../middleware/auth');

r.post('/', auth, c.setBudget);
r.get('/current', auth, c.current);

module.exports = r;