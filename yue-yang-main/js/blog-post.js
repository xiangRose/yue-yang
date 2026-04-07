// ========== blog-post.js - 通过后端代理加载文章内容 ==========
document.addEventListener('DOMContentLoaded', async function() {
    // 获取 URL 参数中的 slug
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) {
        window.location.href = 'blog.html';
        return;
    }
    
    const isThai = document.documentElement.lang === 'th';
    
    async function fetchArticle() {
        try {
            // 调用自己的后端代理，传入 slug
            const response = await fetch(`/api/blog-posts?slug=${encodeURIComponent(slug)}`);
            
            if (response.status === 404) {
                // 文章不存在，跳转到博客列表
                window.location.href = 'blog.html';
                return null;
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            if (!data.records || data.records.length === 0) {
                window.location.href = 'blog.html';
                return null;
            }
            return data.records[0].fields;
        } catch (error) {
            console.error('加载文章失败:', error);
            return null;
        }
    }
    
    const article = await fetchArticle();
    if (!article) return;
    
    // 渲染文章内容（增加空值保护）
    document.title = `${isThai ? article.Title_TH : article.Title_EN} | YueYang Cable`;
    
    const titleElem = document.getElementById('articleTitle');
    if (titleElem) titleElem.innerText = isThai ? article.Title_TH : article.Title_EN;
    
    const breadcrumbElem = document.getElementById('breadcrumbTitle');
    if (breadcrumbElem) breadcrumbElem.innerText = isThai ? article.Title_TH : article.Title_EN;
    
    const categoryElem = document.getElementById('articleCategory');
    if (categoryElem) categoryElem.innerHTML = `<span>${isThai ? article.Category_TH : article.Category_EN}</span>`;
    
    const dateElem = document.getElementById('articleDate');
    if (dateElem && article.PublishedDate) {
        dateElem.innerHTML = `<i class="far fa-calendar-alt"></i> ${new Date(article.PublishedDate).toLocaleDateString()}`;
    }
    
    const authorElem = document.getElementById('articleAuthor');
    if (authorElem) authorElem.innerHTML = `<i class="far fa-user"></i> ${article.Author || 'YueYang Team'}`;
    
    const viewsElem = document.getElementById('articleViews');
    if (viewsElem) viewsElem.innerHTML = `<i class="far fa-eye"></i> ${article.Views || 0} views`;
    
    const imageElem = document.getElementById('articleImage');
    if (imageElem) {
        imageElem.src = (article.FeaturedImage && article.FeaturedImage[0]) ? article.FeaturedImage[0].url : '../images/placeholder.jpg';
    }
    
    const contentElem = document.getElementById('articleContent');
    if (contentElem) contentElem.innerHTML = isThai ? article.Content_TH : article.Content_EN;
    
    // 渲染标签
    if (article.Tags) {
        const tagsArray = article.Tags.split(',');
        const tagsContainer = document.getElementById('articleTags');
        if (tagsContainer) {
            tagsContainer.innerHTML = tagsArray.map(tag => `<a href="blog.html?tag=${encodeURIComponent(tag.trim())}">${tag.trim()}</a>`).join('');
        }
    }
});