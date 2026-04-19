const r = require('express').Router();
const c = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

r.get('/summary', auth, c.summary);
r.get('/category', auth, c.category);

module.exports = r;