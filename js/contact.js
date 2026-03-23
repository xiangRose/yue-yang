// ========== contact.js 联系我们页面交互 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单验证
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, อีเมล, หัวข้อ)');
                return;
            }
            
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('กรุณากรอกอีเมลให้ถูกต้อง');
                return;
            }
            
            // 演示提交
            alert('✅ ข้อความของคุณถูกส่งเรียบร้อยแล้ว! (โหมดสาธิต) เราจะติดต่อกลับโดยเร็วที่สุด');
            contactForm.reset();
        });
    }
    
    // PDF 下载演示（底部按钮）
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
    
    // 浮动栏功能（复用 script.js 中的逻辑，但确保独立存在）
    // 注：因为 script.js 已经绑定了浮动栏和模态框，这里不再重复绑定，避免冲突。
    // 若需要额外功能，可在此扩展
});