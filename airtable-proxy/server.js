const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors()); // 允许所有来源，简化调试
app.use(express.json());

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

app.post('/api/inquiry', async (req, res) => {
    try {
        const { fields } = req.body;
        if (!fields) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields })
        });

        const data = await response.json();
        if (response.ok) {
            res.json({ success: true, id: data.id });
        } else {
            console.error('Airtable error:', data);
            res.status(response.status).json({ error: data.error?.message || 'Airtable error' });
        }
    } catch (err) {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Proxy server running on port ${process.env.PORT || 3000}`);
});