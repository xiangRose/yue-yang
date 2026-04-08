const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 写死你刚才测试成功的确切 ID
const BASE_ID = 'appmnO59myOxJm3ip';
const BLOG_TABLE_ID = 'tbliFmZlghWGR5O47';   
const INQUIRY_TABLE_ID = 'tblFioq03WevqdHEV'; 

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