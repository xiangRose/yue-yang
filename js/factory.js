// ========== factory.js 工厂页面专属交互 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 地图高亮与点击切换详情
    const regions = document.querySelectorAll('[data-region]');
    const tooltip = document.getElementById('mapTooltip');
    const detailDiv = document.getElementById('factoryDetail');

    const factoryInfo = {
        dongguan: {
            title: '🏭 东莞总部基地',
            desc: '主要研发基地 | 无卤线材生产 | PVC线材集中生产 | 月产能超300万米',
            address: '广东省东莞市虎门镇路东管理区新园北五路7号'
        },
        sichuan: {
            title: '🏭 四川广安基地',
            desc: '服务内地市场 | 工业线缆与汽车线束专业生产 | 占地10,000㎡',
            address: '四川省广安市前锋区XX大道'
        },
        thailand: {
            title: '🏭 泰国春武里工厂',
            desc: '2023年新建 | 规避关税风险 | 服务东南亚及全球客户',
            address: '123 Moo 4, Chonburi, Thailand'
        },
        usa: {
            title: '🏭 美国服务中心',
            desc: '全球终端品牌服务中心 | 快速响应北美市场 | 本地仓储支持',
            address: 'Newark, New Jersey, US'
        }
    };

    regions.forEach(region => {
        // 鼠标悬浮显示 tooltip
        region.addEventListener('mouseenter', (e) => {
            const id = region.getAttribute('data-region');
            const info = factoryInfo[id];
            if (info) {
                const rect = region.getBoundingClientRect();
                const containerRect = document.getElementById('mapContainer').getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width/2 - containerRect.left) + 'px';
                tooltip.style.top = (rect.top - containerRect.top - 30) + 'px';
                tooltip.textContent = info.title.replace(/[🏭]/g, '').trim();
                tooltip.style.display = 'block';
                // 高亮当前区域 (改变填充色)
                region.setAttribute('fill', '#ffaa66');
            }
        });
        region.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
            region.setAttribute('fill', '#b0d4f0');
        });
        // 点击区域，更新详情卡片并滚动到视图
        region.addEventListener('click', () => {
            const id = region.getAttribute('data-region');
            const info = factoryInfo[id];
            if (info) {
                detailDiv.innerHTML = `
                    <h3><i class="fas fa-building"></i> ${info.title}</h3>
                    <p>${info.desc}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${info.address}</p>
                `;
                detailDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 数字滚动效果 (Intersection Observer)
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                if (isNaN(target)) return;
                let currentVal = 0;
                const step = Math.ceil(target / 50);
                const interval = setInterval(() => {
                    currentVal += step;
                    if (currentVal >= target) {
                        currentVal = target;
                        clearInterval(interval);
                    }
                    // 数字格式化（千分位）
                    el.innerText = currentVal.toLocaleString();
                }, 25);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => observer.observe(num));

    // PDF 下载按钮演示（与 about 保持一致）
    const pdfBtns = document.querySelectorAll('#footerPdfBtn');
    pdfBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 演示模式：实际项目中请替换为真实的公司简介PDF文件路径。\nDemo: Yueyang_Company_Profile.pdf');
        });
    });

    // 语言切换演示（与 about 一致）
    const langToggle = document.querySelector('.lang-toggle');
    if(langToggle) {
        langToggle.addEventListener('click', () => {
            alert('语言切换功能演示，正式站点可链接对应语言版本页面');
        });
    }
});