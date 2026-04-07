// ========== contact.js 集成 Airtable API ==========
document.addEventListener('DOMContentLoaded', function() {
    // ---------- 1. 定义自定义提示模态框函数 ----------
    function showAlertModal(title, message, isSuccess = true) {
        const modal = document.getElementById('customAlertModal');
        if (!modal) return;

        const iconDiv = document.getElementById('alertIcon');
        const titleEl = document.getElementById('alertTitle');
        const msgEl = document.getElementById('alertMessage');

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

        // 绑定确认按钮（先移除旧事件，避免重复绑定）
        const confirmBtn = document.getElementById('alertConfirmBtn');
        const closeHandler = () => {
            modal.classList.remove('show');
            confirmBtn.removeEventListener('click', closeHandler);
        };
        confirmBtn.removeEventListener('click', closeHandler);
        confirmBtn.addEventListener('click', closeHandler);

        // 点击背景关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // ---------- 2. 获取表单元素 ----------
    const inquiryForm = document.getElementById('productInquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // 获取表单字段
            const nameInput = inquiryForm.querySelector('input[name="Name"]');
            const emailInput = inquiryForm.querySelector('input[name="Email"]');
            const phoneInput = inquiryForm.querySelector('input[name="Phone"]');
            const categorySelect = inquiryForm.querySelector('select[name="Product Category"]');
            const messageTextarea = inquiryForm.querySelector('textarea[name="Requirement Description"]');

            // 验证必填
            if (!nameInput.value.trim()) {
                showAlertModal('กรุณากรอกข้อมูล', 'กรุณากรอกชื่อของคุณ', false);
                nameInput.focus();
                return;
            }
            if (!emailInput.value.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
                showAlertModal('กรุณากรอกข้อมูล', 'กรุณากรอกอีเมลให้ถูกต้อง', false);
                emailInput.focus();
                return;
            }
            if (!categorySelect.value) {
                showAlertModal('กรุณาเลือกหมวดหมู่', 'กรุณาเลือกหมวดหมู่สินค้า', false);
                categorySelect.focus();
                return;
            }

            const fields = {
                Name: nameInput.value.trim(),
                Email: emailInput.value.trim(),
                Phone: phoneInput.value.trim(),
                "Product Category": categorySelect.value,
                "Requirement Description": messageTextarea.value.trim()
            };

            // 禁用提交按钮
            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
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
                    showAlertModal('ส่งคำขอสำเร็จ!', 'เราจะติดต่อกลับโดยเร็วที่สุด', true);
                    inquiryForm.reset();
                } else {
                    showAlertModal('เกิดข้อผิดพลาด', result.error || 'กรุณาลองใหม่', false);
                }
            } catch (err) {
                console.error('网络错误:', err);
                showAlertModal('ไม่สามารถเชื่อมต่อ', 'กรุณาตรวจสอบเครือข่ายและลองอีกครั้ง', false);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }
        });
    }

    // ---------- 3. 底部 PDF 下载演示 ----------
    const pdfBtns = document.querySelectorAll('#footerPdfBtn');
    pdfBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showAlertModal('กำลังดาวน์โหลด', 'Demo: Yueyang_Company_Profile.pdf', true);
        });
    });

    // ---------- 4. 语言切换演示 ----------
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            showAlertModal('ภาษาที่สาธิต', 'ฟังก์ชันสาธิต สามารถเปลี่ยนเป็นภาษาจริงได้', false);
        });
    }
});