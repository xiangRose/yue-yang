document.addEventListener('DOMContentLoaded', function() {
    // ========== 1. 移动端菜单 ==========
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.getElementById('navWrapper');

    if (hamburger && navWrapper) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navWrapper.classList.toggle('show');
            hamburger.classList.toggle('open');
        });

        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!navWrapper.contains(e.target) && !hamburger.contains(e.target)) {
                navWrapper.classList.remove('show');
                hamburger.classList.remove('open');
            }
        });
    }

    // ========== 2. 轮播图 ==========
    const slides = document.querySelectorAll('.swiper-slide');
    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');
    const pagination = document.querySelector('.swiper-pagination');

    if (slides.length > 0 && prevBtn && nextBtn && pagination) {
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
            if (wrapper) {
                wrapper.style.transform = `translateX(-${current * 100}%)`;
                dots.forEach((dot, idx) => {
                    if (idx === current) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            }
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
    }

    // ========== 3. 数字滚动动画 ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
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
    }

    // ========== 4. 浮动按钮与模态框 ==========
    const lineBtn = document.getElementById('lineBtn');
    const inquiryBtn = document.getElementById('inquiryBtn');
    const topBtn = document.getElementById('topBtn');
    const inquiryModal = document.getElementById('inquiryModal');
    const qrModal = document.getElementById('qrModal');
    const closeModal = document.getElementById('closeModal');
    const closeQRModal = document.getElementById('closeQRModal');
    const inquiryForm = document.getElementById('inquiryForm');

    // Line 按钮
    if (lineBtn) {
        lineBtn.addEventListener('click', function() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const lineId = '@your_line_id';   // 请替换为实际ID
            const lineUrl = `https://line.me/R/ti/p/${lineId}`;
            if (isMobile) {
                window.location.href = lineUrl;
                setTimeout(() => {
                    if (document.hidden === false) {
                        if (qrModal) qrModal.style.display = 'flex';
                    }
                }, 500);
            } else {
                if (qrModal) qrModal.style.display = 'flex';
            }
        });
    }

    // 关闭二维码模态框
    if (closeQRModal && qrModal) {
        closeQRModal.addEventListener('click', () => { qrModal.style.display = 'none'; });
        qrModal.addEventListener('click', (e) => { if (e.target === qrModal) qrModal.style.display = 'none'; });
    }

    // 询价按钮
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', function() {
            const inquirySection = document.getElementById('inquiry-form');
            if (inquirySection) {
                inquirySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                inquirySection.style.transition = 'box-shadow 0.3s';
                inquirySection.style.boxShadow = '0 0 0 3px #2c7da0';
                setTimeout(() => { inquirySection.style.boxShadow = ''; }, 1500);
            } else if (inquiryModal) {
                inquiryModal.style.display = 'flex';
            }
        });
    }

    // 关闭询价模态框
    if (closeModal && inquiryModal) {
        closeModal.addEventListener('click', () => { inquiryModal.style.display = 'none'; });
        inquiryModal.addEventListener('click', (e) => { if (e.target === inquiryModal) inquiryModal.style.display = 'none'; });
    }

    // 询价表单提交（演示）
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับภายใน 24 ชั่วโมง');
            inquiryModal.style.display = 'none';
            inquiryForm.reset();
        });
    }

    // 回到顶部按钮
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== 5. 演示PDF下载 ==========
    const downloadBtns = document.querySelectorAll('.btn-secondary');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('演示模式：实际项目中请替换为真实PDF文件路径。');
        });
    });
});