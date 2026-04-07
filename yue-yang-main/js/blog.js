// ========== blog.js - 通过后端代理获取数据 ==========
document.addEventListener('DOMContentLoaded', async function() {
    // 判断当前语言（根据 html lang 属性）
    const isThai = document.documentElement.lang === 'th';

    // ---------- 通过后端代理获取文章列表 ----------
    async function fetchArticles() {
        try {
            const response = await fetch('/api/blog-posts');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            return data.records;   // 直接返回 Airtable 的记录数组
        } catch (error) {
            console.error('获取文章失败:', error);
            return [];
        }
    }

    // ---------- 渲染文章列表（博客首页） ----------
    function renderArticles(records) {
        const grid = document.getElementById('postGrid');
        if (!grid) return;

        if (!records || records.length === 0) {
            grid.innerHTML = '<p style="text-align:center; padding:40px;">暂无文章，请稍后再来。</p>';
            return;
        }

        const articlesHtml = records.map(record => {
            const f = record.fields;
            const title = isThai ? f.Title_TH : f.Title_EN;
            const excerpt = isThai ? f.Excerpt_TH : f.Excerpt_EN;
            const category = isThai ? f.Category_TH : f.Category_EN;
            const imageUrl = (f.FeaturedImage && f.FeaturedImage.length > 0) ? f.FeaturedImage[0].url : '../images/placeholder.jpg';
            const slug = f.Slug;
            const date = f.PublishedDate;

            return `
                <div class="post-card" onclick="window.location.href='blog-post.html?slug=${slug}'">
                    <div class="post-img">
                        <img src="${imageUrl}" alt="${title || 'Blog post'}">
                    </div>
                    <div class="post-content">
                        <div class="post-meta">
                            <span class="post-category">${category || ''}</span>
                            <span class="post-date"><i class="far fa-calendar-alt"></i> ${formatDate(date)}</span>
                        </div>
                        <h3 class="post-title">${title || ''}</h3>
                        <p class="post-excerpt">${(excerpt || '').substring(0, 120)}${(excerpt || '').length > 120 ? '...' : ''}</p>
                        <a href="blog-post.html?slug=${slug}" class="read-more">${isThai ? 'อ่านต่อ' : 'Read More'} <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        }).join('');

        grid.innerHTML = articlesHtml;
    }

    // ---------- 渲染热门文章（按阅读量降序，取前4篇） ----------
    function renderPopularPosts(records) {
        const popularList = document.getElementById('popularList');
        if (!popularList) return;

        // 按 Views 字段排序（若无 Views 则默认为0）
        const sorted = [...records].sort((a, b) => (b.fields.Views || 0) - (a.fields.Views || 0)).slice(0, 4);
        if (sorted.length === 0) {
            popularList.innerHTML = '<li>暂无热门文章</li>';
            return;
        }

        popularList.innerHTML = sorted.map(record => {
            const f = record.fields;
            const title = isThai ? f.Title_TH : f.Title_EN;
            const imageUrl = (f.FeaturedImage && f.FeaturedImage.length > 0) ? f.FeaturedImage[0].url : '../images/placeholder.jpg';
            const slug = f.Slug;
            const date = f.PublishedDate;
            return `
                <li onclick="window.location.href='blog-post.html?slug=${slug}'">
                    <img src="${imageUrl}" alt="${title}">
                    <div>
                        <div class="popular-title">${title || ''}</div>
                        <div class="popular-date">${formatDate(date)}</div>
                    </div>
                </li>
            `;
        }).join('');
    }

    // ---------- 渲染分类列表（从所有文章中提取唯一分类） ----------
    function renderCategories(records) {
        const categoryList = document.getElementById('categoryList');
        if (!categoryList) return;

        const categoriesSet = new Set();
        records.forEach(record => {
            const cat = isThai ? record.fields.Category_TH : record.fields.Category_EN;
            if (cat) categoriesSet.add(cat);
        });

        if (categoriesSet.size === 0) {
            categoryList.innerHTML = '<li>暂无分类</li>';
            return;
        }

        const categories = Array.from(categoriesSet);
        categoryList.innerHTML = categories.map(cat => `<li><a href="blog.html?category=${encodeURIComponent(cat)}">${cat}</a></li>`).join('');
    }

    // ---------- 渲染标签云（静态标签，也可改为动态） ----------
    function renderTagCloud() {
        const tagCloud = document.getElementById('tagCloud');
        if (!tagCloud) return;
        // 您可以根据实际需要修改这个数组，或者从 Airtable 动态获取
        const tags = ["ISO13485", "EV Charging", "IP68", "UL认证", "IATF16949", "USB4", "HDMI 2.1", "拖链电缆", "医疗线缆", "汽车线束"];
        tagCloud.innerHTML = tags.map(tag => `<a href="blog.html?tag=${encodeURIComponent(tag)}">${tag}</a>`).join('');
    }

    // ---------- 格式化日期 ----------
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleDateString(isThai ? 'th-TH' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // ---------- 订阅表单提交 ----------
    function initNewsletterForm() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]')?.value;
            if (email) {
                alert(`ขอบคุณที่สมัครรับข่าวสาร! (${email})`);
                this.reset();
            } else {
                alert('กรุณากรอกอีเมลของคุณ');
            }
        });
    }

    // ---------- 搜索表单提交 ----------
    function initSearchForm() {
        const form = document.querySelector('.search-form');
        if (!form) return;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const keyword = this.querySelector('input')?.value;
            alert(`กำลังค้นหาบทความ: ${keyword || ''}`);
        });
    }

    // ========== 主流程 ==========
    const records = await fetchArticles();
    renderArticles(records);
    renderPopularPosts(records);
    renderCategories(records);   // 动态生成分类列表
    renderTagCloud();            // 静态标签云
    initNewsletterForm();
    initSearchForm();
});