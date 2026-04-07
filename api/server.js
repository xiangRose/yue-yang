const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors()); // 允许所有来源
app.use(express.json());

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;      // 可能是 'Inquiry' 表
const BLOG_TABLE_NAME = process.env.BLOG_TABLE_NAME || 'Articles';  // 博客文章表

// ---------- 已有的询价提交接口 ----------
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

// ---------- 新增：博客文章代理接口 ----------
app.get('/api/blog-posts', async (req, res) => {
    try {
        const { slug, limit } = req.query;

        // 构建 Airtable API URL
        let url = `https://api.airtable.com/v0/${BASE_ID}/${BLOG_TABLE_NAME}`;
        const filters = [];

        if (slug) {
            // 单篇文章
            filters.push(`{Slug}="${slug}"`);
        } else {
            // 列表：只显示已发布的文章，按日期倒序
            filters.push(`{Status}="published"`);
            url += `?sort%5B0%5D%5Bfield%5D=PublishedDate&sort%5B0%5D%5Bdirection%5D=desc`;
            if (limit) {
                url += `&maxRecords=${parseInt(limit)}`;
            }
        }

        if (filters.length) {
            const filterFormula = filters.join(' AND ');
            url += (url.includes('?') ? '&' : '?') + `filterByFormula=${encodeURIComponent(filterFormula)}`;
        }

        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
        });
        const data = await response.json();

        if (!response.ok) {
            console.error('Airtable error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Airtable error' });
        }

        // 如果是单篇文章且未找到，返回 404
        if (slug && (!data.records || data.records.length === 0)) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // 直接返回 Airtable 的原始数据结构（包含 records 数组）
        res.json(data);
    } catch (err) {
        console.error('Blog proxy error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;