// api/blog-posts.js
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { slug, limit } = req.query;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const TABLE_NAME = 'Articles';

    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
        return res.status(500).json({ error: 'Missing Airtable credentials' });
    }

    let url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;
    const filters = [];

    if (slug) {
        filters.push(`{Slug}="${slug}"`);
    } else {
        filters.push(`{Status}="published"`);
        url += `?sort%5B0%5D%5Bfield%5D=PublishedDate&sort%5B0%5D%5Bdirection%5D=desc`;
        if (limit) url += `&maxRecords=${parseInt(limit)}`;
    }

    if (filters.length) {
        const filterFormula = filters.join(' AND ');
        url += (url.includes('?') ? '&' : '?') + `filterByFormula=${encodeURIComponent(filterFormula)}`;
    }

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` }
        });
        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message });
        }
        if (slug && (!data.records || data.records.length === 0)) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}