document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.getElementById('navWrapper');

    // 点击汉堡按钮弹出/关闭菜单
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navWrapper.classList.toggle('show');
            // 汉堡动画效果（可选：点击变叉）
            hamburger.classList.toggle('open');
        });
    }

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (e) => {
        if (!navWrapper.contains(e.target) && !hamburger.contains(e.target)) {
            navWrapper.classList.remove('show');
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const lineBtn = document.getElementById('lineBtn');
    const inquiryBtn = document.getElementById('inquiryBtn');
    const topBtn = document.getElementById('topBtn');
    const inquiryModal = document.getElementById('inquiryModal');
    const qrModal = document.getElementById('qrModal');
    const closeModal = document.getElementById('closeModal');
    const closeQRModal = document.getElementById('closeQRModal');
    const inquiryForm = document.getElementById('inquiryForm');

    // 1. Line 按钮：尝试唤起客户端，失败则显示二维码
    lineBtn.addEventListener('click', function() {
        // 判断是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // 替换为您的 Line 官方 ID（例如 @abc123）
        const lineId = '@your_line_id';   // 请修改为实际 ID
        const lineUrl = `https://line.me/R/ti/p/${lineId}`;
        
        if (isMobile) {
            // 尝试打开 Line 客户端
            window.location.href = lineUrl;
            // 设置一个延迟，如果未成功跳转（如未安装Line），则显示二维码
            setTimeout(() => {
                if (document.hidden === false) {
                    showQRModal();
                }
            }, 500);
        } else {
            // PC 端直接显示二维码
            showQRModal();
        }
    });

    function showQRModal() {
        if (qrModal) {
            qrModal.style.display = 'flex';
        }
    }

    // 关闭二维码模态框
    if (closeQRModal) {
        closeQRModal.addEventListener('click', function() {
            qrModal.style.display = 'none';
        });
    }
    // 点击遮罩关闭
    qrModal.addEventListener('click', function(e) {
        if (e.target === qrModal) {
            qrModal.style.display = 'none';
        }
    });

    // 2. 询价按钮：尝试滚动到页面底部表单，否则弹出模态框
    inquiryBtn.addEventListener('click', function() {
        const inquirySection = document.getElementById('inquiry-form');
        if (inquirySection) {
            // 平滑滚动到表单
            inquirySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // 可选：高亮提示
            inquirySection.style.transition = 'box-shadow 0.3s';
            inquirySection.style.boxShadow = '0 0 0 3px #2c7da0';
            setTimeout(() => {
                inquirySection.style.boxShadow = '';
            }, 1500);
        } else {
            // 没有表单元素，弹出询价模态框
            if (inquiryModal) {
                inquiryModal.style.display = 'flex';
            }
        }
    });

    // 关闭询价模态框
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            inquiryModal.style.display = 'none';
        });
    }
    inquiryModal.addEventListener('click', function(e) {
        if (e.target === inquiryModal) {
            inquiryModal.style.display = 'none';
        }
    });

    // 询价表单提交（演示）
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的询价！我们会尽快与您联系。');
            inquiryModal.style.display = 'none';
            inquiryForm.reset();
        });
    }

    // 3. 回到顶部按钮
    topBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
(function() {
        const slides = document.querySelectorAll('.swiper-slide');
        const prevBtn = document.querySelector('.swiper-button-prev');
        const nextBtn = document.querySelector('.swiper-button-next');
        const pagination = document.querySelector('.swiper-pagination');
        let current = 0;
        let timer = null;
        const total = slides.length;

        // 创建指示点
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            pagination.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        function updateSlides() {
            const wrapper = document.querySelector('.swiper-wrapper');
            wrapper.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((dot, idx) => {
                if (idx === current) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        function goToSlide(index) {
            current = (index + total) % total;
            updateSlides();
            resetTimer();
        }

        function nextSlide() { goToSlide(current + 1); }
        function prevSlide() { goToSlide(current - 1); }
        function resetTimer() {
            if (timer) clearInterval(timer);
            timer = setInterval(nextSlide, 5000);
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        resetTimer();
        updateSlides();
    })();

    // ========== 数字滚动动画 (Intersection Observer) ==========
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
                    el.innerText = currentVal;
                }, 20);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => observer.observe(num));

    // 处理PDF下载按钮（演示，实际需替换真实路径）
    const downloadBtn = document.querySelector('.btn-secondary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('演示模式：实际项目中请替换为真实PDF文件路径。');
        });
    }