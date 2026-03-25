// ========== partners.js 合作伙伴页面交互 ==========
document.addEventListener('DOMContentLoaded', function() {
    // ========== 1. 客户数据 ==========
    const clients = [
        { name: 'Logitech', logo: '../images/logo_logitech.png', description: '全球外设领导品牌，合作开发电竞鼠标/键盘线缆，提供高柔韧性USB弹簧线解决方案。' },
        { name: 'Huawei', logo: '../images/logo_huawei.png', description: '战略合作伙伴，自2013年起配合开发手机数据线，从PVC到无卤TPE大电流Type-C线，保质保量稳定供货。' },
        { name: 'vivo', logo: '../images/logo_vivo.png', description: '长期二级供应商，提供USB数据线及充电线，满足严苛的可靠性测试要求。' },
        { name: 'Razer', logo: '../images/logo_razer.png', description: '电竞外设专业合作伙伴，提供螺旋线、伞绳线、液态硅胶线等高端定制线材。' },
        { name: 'Anker', logo: '../images/logo_anker.png', description: '消费电子合作伙伴，提供环保生物基TPU数据线，支持快充和高效数据传输。' },
        { name: 'Tesla', logo: '../images/logo_tesla.png', description: '新能源汽车线束供应商，提供高压线缆、充电线及车内信号传输线。' },
        { name: 'Siemens', logo: '../images/logo_siemens.png', description: '工业自动化合作伙伴，提供高柔拖链电缆、机器人电缆，满足严苛工业环境需求。' },
        { name: 'ABB', logo: '../images/logo_Abb.png', description: '工业设备线缆供应商，提供耐油、耐高温、抗干扰的工业控制线缆。' }
    ];

    const clientsGrid = document.getElementById('clientsGrid');
    if (clientsGrid) {
        clientsGrid.innerHTML = clients.map(client => `
            <div class="client-card">
                <img class="client-logo" src="${client.logo}" alt="${client.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'%3E%3Crect width=\'120\' height=\'120\' fill=\'%23eef2fc\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'12\' fill=\'%232c7da0\' text-anchor=\'middle\' dy=\'.3em\'%3E${client.name}%3C/text%3E%3C/svg%3E'">
                <h3>${client.name}</h3>
                <p>${client.description}</p>
            </div>
        `).join('');
    }

    // ========== 2. 资质认证数据 ==========
    const certificates = [
        { name: 'UL 认证', img: '../images/UL.webp', fullImg: 'images/cert-ul-full.jpg', desc: 'UL 电子线 (E230810) / 电源线 (E230811)' },
        { name: 'ISO 9001', img: '../images/ios9001.webp', fullImg: 'images/cert-iso9001-full.jpg', desc: '质量管理体系认证' },
        { name: 'IATF 16949', img: '../images/IATF16949.webp', fullImg: 'images/cert-iatf-full.jpg', desc: '汽车行业质量管理体系' },
        { name: 'ISO 13485', img: '../images/ios13458.webp', fullImg: 'images/cert-iso13485-full.jpg', desc: '医疗器械质量管理体系' },
        { name: 'ISO 14001', img: '../images/ios14001.webp', fullImg: 'images/cert-iso14001-full.jpg', desc: '环境管理体系认证' },
        { name: 'ISO 14064', img: '../images/ios14064.png', fullImg: 'images/cert-iso14064-full.jpg', desc: '温室气体排放管理体系' }
    ];

    const certGrid = document.getElementById('certGrid');
    if (certGrid) {
        certGrid.innerHTML = certificates.map(cert => `
            <div class="cert-item" data-fullimg="${cert.fullImg}">
                <img src="${cert.img}" alt="${cert.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23eef2fc\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'10\' fill=\'%232c7da0\' text-anchor=\'middle\' dy=\'.3em\'%3E${cert.name}%3C/text%3E%3C/svg%3E'">
                <p>${cert.name}</p>
                <span class="cert-hover">คลิกเพื่อดูภาพขยาย</span>
            </div>
        `).join('');
    }

    // ========== 3. 证书点击放大模态框 (复用 about 页面逻辑) ==========
    const certItems = document.querySelectorAll('.cert-item');
    const certModal = document.getElementById('certModal');
    const certFullImg = document.getElementById('certFullImage');
    const closeCertModal = document.getElementById('closeCertModal');

    if (certItems.length) {
        certItems.forEach(item => {
            item.addEventListener('click', function(e) {
                let imgSrc = this.getAttribute('data-fullimg');
                if (!imgSrc) imgSrc = this.querySelector('img')?.src || '';
                certFullImg.src = imgSrc;
                certModal.style.display = 'flex';
            });
        });
    }
    if (closeCertModal) {
        closeCertModal.addEventListener('click', () => { certModal.style.display = 'none'; });
        certModal.addEventListener('click', (e) => { if(e.target === certModal) certModal.style.display = 'none'; });
    }

    // ========== 4. 设备图片点击放大 (可选增强) ==========
    const equipmentItems = document.querySelectorAll('.equipment-item');
    if (equipmentItems.length) {
        equipmentItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img && img.src) {
                    certFullImg.src = img.src;
                    certModal.style.display = 'flex';
                    const modalTitle = certModal.querySelector('.modal-header h3');
                    const caption = this.querySelector('.equipment-caption')?.innerText || 'อุปกรณ์ทดสอบ';
                    if (modalTitle) modalTitle.textContent = caption;
                }
            });
        });
    }

    // ========== 5. 数字滚动效果 (Intersection Observer) ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                if (isNaN(target)) return;
                let currentVal = 0;
                const step = Math.ceil(target / 40);
                const interval = setInterval(() => {
                    currentVal += step;
                    if (currentVal >= target) {
                        currentVal = target;
                        clearInterval(interval);
                    }
                    el.innerText = currentVal;
                }, 25);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => observer.observe(num));

    // ========== 6. PDF 下载演示 ==========
    const pdfBtns = document.querySelectorAll('#footerPdfBtn');
    pdfBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 演示模式：实际项目中请替换为真实的合作伙伴/资质文件PDF路径。\nDemo: Yueyang_Partners_Catalog.pdf');
        });
    });

    // ========== 7. 语言切换演示 ==========
    const langToggle = document.querySelector('.lang-toggle');
    if(langToggle) {
        langToggle.addEventListener('click', () => {
            alert('语言切换功能演示，正式站点可链接对应语言版本页面');
        });
    }
});