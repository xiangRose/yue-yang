const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 配置 CORS：允许所有来源（开发测试用），实际生产可限制为您的域名
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // 允许本地开发服务器
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // 处理预检请求

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
