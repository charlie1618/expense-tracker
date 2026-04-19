const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/budget', require('./routes/budget'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(process.env.PORT || 5000, () => console.log('Server started'));