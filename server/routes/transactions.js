const r = require('express').Router();
const c = require('../controllers/transactionController');
const auth = require('../middleware/auth');

r.get('/', auth, c.list);
r.post('/', auth, c.create);
r.put('/:id', auth, c.update);
r.delete('/:id', auth, c.remove);

module.exports = r;