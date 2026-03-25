const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 允许跨域（生产环境可限制具体域名）
app.use(cors());
app.use(express.json());

// 从环境变量读取敏感信息
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

// 接收前端表单数据并转发到 Airtable
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

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});