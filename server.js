const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());



// 统一的 Airtable 请求函数
async function fetchAirtable(baseId, tableName, filter = '') {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}${filter ? '?filterByFormula=' + encodeURIComponent(filter) : ''}`;
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}` }
    });
    const data = await response.json();
    if (!response.ok) {
        // 如果 Airtable 返回错误，直接抛出，这样 catch 块就能捕捉到并返回给前端
        throw new Error(JSON.stringify(data.error || data));
    }
    return data;
}

// 1. 获取博客接口
app.get('/api/blog-posts', async (req, res) => {
    try {
        const { slug } = req.query;
        const filter = slug ? `{Slug}="${slug}"` : '';
        const data = await fetchAirtable(process.env.BLOG_BASE_ID, process.env.BLOG_TABLE_NAME, filter);
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. 提交询价接口
app.post('/api/inquiry', async (req, res) => {
    try {
        const url = `https://api.airtable.com/v0/${process.env.INQUIRY_BASE_ID}/${encodeURIComponent(process.env.INQUIRY_TABLE_NAME)}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: req.body.fields })
        });
        const data = await response.json();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = app;