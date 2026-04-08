const express = require('express');
const app = express();

// --- 终极 CORS 防弹中间件 ---
app.use((req, res, next) => {
    // 允许任何域名跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许的请求方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // 允许的请求头
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    
    // 关键点：如果是 OPTIONS 预检请求，直接返回 200 成功！
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());

const BASE_ID = 'appmnO59myOxJm3ip';
const BLOG_TABLE_ID = 'tbliFmZlghWGR5O47';   // 博客表 ID
const INQUIRY_TABLE_ID = 'tblFioq03WevqdHEV'; // 询价表 ID

// 统一请求函数
async function fetchAirtable(tableId, method = 'GET', body = null) {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}`;
    const options = {
        method: method,
        headers: { 
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
        console.error("Airtable Error:", data);
        throw new Error(JSON.stringify(data.error || data));
    }
    return data;
}

// 1. 获取博客文章
app.get('/api/blog-posts', async (req, res) => {
    try {
        const data = await fetchAirtable(BLOG_TABLE_ID, 'GET');
        res.json(data);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// 2. 提交客户询价
app.post('/api/inquiry', async (req, res) => {
    try {
        const payload = { fields: req.body.fields };
        const data = await fetchAirtable(INQUIRY_TABLE_ID, 'POST', payload);
        res.json(data);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

module.exports = app;