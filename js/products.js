// ========== 产品页面专属交互 ==========
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductPage);
    } else {
        initProductPage();
    }

    async function handleInquirySubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;

        // 获取表单字段
        const nameInput = form.querySelector('input[name="Name"]');
        const emailInput = form.querySelector('input[name="Email"]');
        const phoneInput = form.querySelector('input[name="Phone"]');
        const categorySelect = form.querySelector('select[name="Product Category"]');
        const messageTextarea = form.querySelector('textarea[name="Requirement Description"]');

        // 验证必填
        if (!nameInput.value.trim()) {
            alert('กรุณากรอกชื่อของคุณ');
            nameInput.focus();
            return;
        }
        if (!emailInput.value.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            showAlertModal('กรุณากรอกอีเมลให้ถูกต้อง');
            emailInput.focus();
            return;
        }
        if (!categorySelect.value) {
            showAlertModal('กรุณาเลือกหมวดหมู่สินค้า');
            categorySelect.focus();
            return;
        }
        // 验证失败时
        if (!nameInput.value.trim()) {
            showAlertModal('กรุณากรอกข้อมูล', 'กรุณากรอกชื่อของคุณ', false);
            nameInput.focus();
            return;
        }

        const fields = {
            Name: nameInput.value.trim(),
            Email: emailInput.value.trim(),
            Phone: phoneInput.value.trim(),
            "Product Category": categorySelect.value,
            "Requirement Description": messageTextarea.value.trim()
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'กำลังส่ง...';

        try {
            const response = await fetch('https://yue-yang.vercel.app/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fields })
            });
            const result = await response.json();
            if (response.ok && result.success) {
                showAlertModal(' ส่งคำขอสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด');
                form.reset();
            } else {
                showAlertModal(`เกิดข้อผิดพลาด: ${result.error || 'กรุณาลองใหม่'}`);
            }
        } catch (err) {
            console.error('网络错误:', err);
            showAlertModal('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    }

    // 显示居中模态框
    function showAlertModal(title, message, isSuccess = true) {
        const modal = document.getElementById('customAlertModal');
        const iconDiv = document.getElementById('alertIcon');
        const titleEl = document.getElementById('alertTitle');
        const msgEl = document.getElementById('alertMessage');
        
        // 设置图标和样式
        if (isSuccess) {
            iconDiv.innerHTML = '<i class="fas fa-check-circle"></i>';
            iconDiv.className = 'alert-icon success';
            titleEl.style.color = '#2c7da0';
        } else {
            iconDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            iconDiv.className = 'alert-icon error';
            titleEl.style.color = '#e74c3c';
        }
        
        titleEl.textContent = title;
        msgEl.textContent = message;
        
        // 显示模态框
        modal.classList.add('show');
        
        // 绑定确认按钮事件（先移除旧的，避免重复绑定）
        const confirmBtn = document.getElementById('alertConfirmBtn');
        const closeHandler = () => {
            modal.classList.remove('show');
            confirmBtn.removeEventListener('click', closeHandler);
        };
        confirmBtn.addEventListener('click', closeHandler);
        
        // 点击背景关闭（可选）
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    function initProductPage() {
        // ---------- 1. 询价表单（Airtable 集成） ----------
        const inquiryForm = document.getElementById('productInquiryForm');
        if (inquiryForm) {
            // 移除可能已绑定的旧事件，避免重复
            inquiryForm.removeEventListener('submit', handleInquirySubmit);
            inquiryForm.addEventListener('submit', handleInquirySubmit);
        }

     

        // ---------- 3. 语言切换提示 ----------
        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle && !langToggle.hasListener) {
            langToggle.addEventListener('click', () => alert('语言切换功能演示，正式站点可链接对应语言版本'));
            langToggle.hasListener = true;
        }

        // ---------- 4. 回到顶部按钮（避免重复绑定） ----------
        const topBtn = document.getElementById('topBtn');
        if (topBtn && !topBtn._listenerAdded) {
            topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            topBtn._listenerAdded = true;
        }
    }
})();