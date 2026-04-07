
    // 补充证书点击放大功能 & PDF下载演示 & 全球化卡片hover原生支持(用css)
    document.addEventListener('DOMContentLoaded', function() {
        const certItems = document.querySelectorAll('.cert-item');
        const certModal = document.getElementById('certModal');
        const certFullImg = document.getElementById('certFullImage');
        const closeCertModal = document.getElementById('closeCertModal');
        
        if (certItems.length) {
            certItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    let imgSrc = this.getAttribute('data-fullimg');
                    if (!imgSrc) imgSrc = this.querySelector('img')?.src || 'https://picsum.photos/id/26/400/300';
                    certFullImg.src = imgSrc;
                    certModal.style.display = 'flex';
                });
            });
        }
        if (closeCertModal) {
            closeCertModal.addEventListener('click', () => { certModal.style.display = 'none'; });
            certModal.addEventListener('click', (e) => { if(e.target === certModal) certModal.style.display = 'none'; });
        }
        
        // PDF下载按钮提示 (演示)
        const pdfBtns = document.querySelectorAll('#companyPdfBtn, #footerPdfBtn');
        pdfBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('📄 演示模式：实际项目中请替换为真实的公司简介PDF文件路径。\nDemo: Yueyang_Company_Profile.pdf');
            });
        });
        
        // 确保所有外部链接占位合理
        const langToggle = document.querySelector('.lang-toggle');
        if(langToggle) {
            langToggle.addEventListener('click', () => {
                alert('语言切换功能演示，正式站点可链接对应语言版本页面');
            });
        }
    });
