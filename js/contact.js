// ========== contact.js 集成 Airtable API ==========
document.addEventListener('DOMContentLoaded', function() {
    // 获取表单元素
    const inquiryForm = document.getElementById('productInquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // 获取表单字段（注意 name 属性要与 Airtable 列名一致）
            const nameInput = inquiryForm.querySelector('input[name="Name"]');
            const emailInput = inquiryForm.querySelector('input[name="Email"]');
            const phoneInput = inquiryForm.querySelector('input[name="Phone"]');
            const categorySelect = inquiryForm.querySelector('select[name="Product Category"]');
            const messageTextarea = inquiryForm.querySelector('textarea[name="Requirement Description"]');

            // 验证必填
            if (!nameInput.value.trim()) {
                alert('กรุณากรอกชื่อของคุณ');
                nameInput.focus();
                return;
            }
            if (!emailInput.value.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
                alert('กรุณากรอกอีเมลให้ถูกต้อง');
                emailInput.focus();
                return;
            }
            if (!categorySelect.value) {
                alert('กรุณาเลือกหมวดหมู่สินค้า');
                categorySelect.focus();
                return;
            }

            // 构建要发送的数据（字段名必须与 Airtable 列名完全一致）
            const fields = {
                Name: nameInput.value.trim(),
                Email: emailInput.value.trim(),
                Phone: phoneInput.value.trim(),
                "Product Category": categorySelect.value,
                "Requirement Description": messageTextarea.value.trim()
            };

            // 禁用提交按钮，防止重复提交
            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'กำลังส่ง...';

            try {
                // 调用 Vercel 代理（请确保域名正确）
                const response = await fetch('https://yue-yang.vercel.app/api/inquiry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fields })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    alert('✅ ส่งคำขอสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด');
                    inquiryForm.reset(); // 清空表单
                } else {
                    alert(`เกิดข้อผิดพลาด: ${result.error || 'กรุณาลองใหม่'}`);
                }
            } catch (err) {
                console.error('网络错误:', err);
                alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
            } finally {
                // 恢复按钮
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }
        });
    }

    // 底部 PDF 下载演示
    const pdfBtns = document.querySelectorAll('#footerPdfBtn');
    pdfBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 演示模式：实际项目中请替换为真实的公司简介PDF文件路径。\nDemo: Yueyang_Company_Profile.pdf');
        });
    });

    // 语言切换演示
    const langToggle = document.querySelector('.lang-toggle');
    if(langToggle) {
        langToggle.addEventListener('click', () => {
            alert('语言切换功能演示，正式站点可链接对应语言版本页面');
        });
    }
});