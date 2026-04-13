// ========== 首页轮播图（无限循环、平滑过渡） ==========
document.addEventListener('DOMContentLoaded', function() {
    // ---------- 1. 移动端菜单（保持不变） ----------
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.getElementById('navWrapper');
    if (hamburger && navWrapper) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navWrapper.classList.toggle('show');
            hamburger.classList.toggle('open');
        });
        document.addEventListener('click', function(e) {
            if (!navWrapper.contains(e.target) && !hamburger.contains(e.target)) {
                navWrapper.classList.remove('show');
                hamburger.classList.remove('open');
            }
        });
    }

    // ---------- 2. 轮播图（无限循环） ----------
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const slides = document.querySelectorAll('.swiper-slide');
    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');
    const pagination = document.querySelector('.swiper-pagination');

    if (swiperWrapper && slides.length > 0 && prevBtn && nextBtn && pagination) {
        const slideCount = slides.length;
        // 克隆第一张和最后一张以实现无缝循环
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slideCount - 1].cloneNode(true);
        // 添加标识，方便调试（可选）
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        
        // 将克隆元素添加到 wrapper 中
        swiperWrapper.appendChild(firstClone);
        swiperWrapper.insertBefore(lastClone, slides[0]);
        
        // 重新获取所有 slide（包含克隆）
        const allSlides = document.querySelectorAll('.swiper-slide');
        const totalSlides = allSlides.length;
        let currentIndex = 1; // 初始显示原本的第一张（索引1，因为前面插入了一个克隆的最后一张）
        
        // 设置 wrapper 的初始偏移量
        swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        swiperWrapper.style.transition = 'transform 0.5s ease';
        
        // 创建分页点（基于原始 slide 数量）
        pagination.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            pagination.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');
        
        // 更新分页点高亮
        function updateDots() {
            // 计算实际对应的原始索引（取模）
            let realIndex = (currentIndex - 1 + slideCount) % slideCount;
            dots.forEach((dot, idx) => {
                if (idx === realIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
        
        // 跳转到指定原始索引（0-based）
        function goToSlide(index) {
            // 目标在克隆序列中的位置： index + 1（因为前面有一个克隆）
            let targetIndex = index + 1;
            currentIndex = targetIndex;
            swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            swiperWrapper.style.transition = 'transform 0.5s ease';
            updateDots();
            resetTimer();
        }
        
        // 下一张
        function nextSlide() {
            currentIndex++;
            swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            swiperWrapper.style.transition = 'transform 0.5s ease';
            updateDots();
            resetTimer();
        }
        
        // 上一张
        function prevSlide() {
            currentIndex--;
            swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            swiperWrapper.style.transition = 'transform 0.5s ease';
            updateDots();
            resetTimer();
        }
        
        // 过渡结束后处理无缝跳转（当到达克隆边界时瞬间跳回）
        function handleTransitionEnd() {
            // 如果当前显示的是第一张克隆（即最后一张的克隆），瞬间跳转到真正的最后一张
            if (currentIndex === 0) {
                swiperWrapper.style.transition = 'none';
                currentIndex = slideCount;
                swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                // 强制重绘
                void swiperWrapper.offsetHeight;
                swiperWrapper.style.transition = 'transform 0.5s ease';
                updateDots();
            }
            // 如果当前显示的是最后一张克隆（即第一张的克隆），瞬间跳转到真正的第一张
            else if (currentIndex === totalSlides - 1) {
                swiperWrapper.style.transition = 'none';
                currentIndex = 1;
                swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                void swiperWrapper.offsetHeight;
                swiperWrapper.style.transition = 'transform 0.5s ease';
                updateDots();
            }
        }
        
        swiperWrapper.addEventListener('transitionend', handleTransitionEnd);
        
        // 自动播放定时器
        let timer = null;
        function resetTimer() {
            if (timer) clearInterval(timer);
            timer = setInterval(nextSlide, 5000);
        }
        
        // 绑定按钮事件
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // 启动自动播放
        resetTimer();
        
        // 可选：鼠标悬停时暂停自动播放
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => {
                if (timer) clearInterval(timer);
            });
            hero.addEventListener('mouseleave', () => {
                resetTimer();
            });
        }
        
        // 初始化分页点
        updateDots();
    }

    // ---------- 3. 数字滚动动画（保持不变） ----------
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

    // ---------- 4. 浮动按钮与模态框（仅保留 Line 和回到顶部，询价按钮已删除） ----------
    const lineBtn = document.getElementById('lineBtn');
    const topBtn = document.getElementById('topBtn');
    const qrModal = document.getElementById('qrModal');
    const closeQRModal = document.getElementById('closeQRModal');
    
    if (lineBtn && qrModal) {
        lineBtn.addEventListener('click', function() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const lineId = '@your_line_id';   // 请替换为实际ID
            const lineUrl = `https://line.me/R/ti/p/${lineId}`;
            if (isMobile) {
                window.location.href = lineUrl;
                setTimeout(() => {
                    if (document.hidden === false) {
                        qrModal.style.display = 'flex';
                    }
                }, 500);
            } else {
                qrModal.style.display = 'flex';
            }
        });
    }
    
    if (closeQRModal && qrModal) {
        closeQRModal.addEventListener('click', () => { qrModal.style.display = 'none'; });
        qrModal.addEventListener('click', (e) => { if (e.target === qrModal) qrModal.style.display = 'none'; });
    }
    
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ---------- 5. 演示PDF下载 ----------
    const downloadBtns = document.querySelectorAll('.btn-secondary');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 โหมดสาธิต: กรุณาแทนที่ด้วยไฟล์ PDF จริง');
        });
    });
    
    // ---------- 6. 语言切换提示（可选） ----------
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle && !langToggle.hasListener) {
        langToggle.addEventListener('click', () => {
            alert('ฟังก์ชันเปลี่ยนภาษา (สาธิต)');
        });
        langToggle.hasListener = true;
    }
});