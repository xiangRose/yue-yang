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
            alert('กรุณากรอกอีเมลให้ถูกต้อง');
            emailInput.focus();
            return;
        }
        if (!categorySelect.value) {
            alert('กรุณาเลือกหมวดหมู่สินค้า');
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
                alert('✅ ส่งคำขอสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด');
                form.reset();
            } else {
                alert(`เกิดข้อผิดพลาด: ${result.error || 'กรุณาลองใหม่'}`);
            }
        } catch (err) {
            console.error('网络错误:', err);
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    }

    function initProductPage() {
        // ---------- 1. 询价表单（Airtable 集成） ----------
        const inquiryForm = document.getElementById('productInquiryForm');
        if (inquiryForm) {
            // 移除可能已绑定的旧事件，避免重复
            inquiryForm.removeEventListener('submit', handleInquirySubmit);
            inquiryForm.addEventListener('submit', handleInquirySubmit);
        }

        // ---------- 2. 产品详情模态框 ----------
        const productDetails = {
            med1: { name:"High-Speed Medical Cable", img:"https://picsum.photos/id/177/500/350", specs:[["导体","镀锡铜绞线"],["绝缘","医疗级PP/PE"],["温度","-40°C~105°C"],["认证","ISO13485, UL"]], scene:"适用于高频手术器械、监护仪连接，信号完整性强" },
            med2: { name:"Patient Monitor Cable", img:"https://picsum.photos/id/43/500/350", specs:[["导体","裸铜"],["屏蔽","铝箔+编织"],["温度","-20°C~80°C"],["认证","UL, REACH"]], scene:"多参数监护仪，抗干扰设计，确保生命体征数据精准" },
            med3: { name:"Surgical Footswitch Cable", img:"https://picsum.photos/id/38/500/350", specs:[["护套","TPU/液体硅胶"],["耐弯曲",">20万次"],["温度","-40°C~125°C"],["认证","ISO13485"]], scene:"手术室脚踏开关，耐消毒液，防滑设计" },
            auto1: { name:"EV High Voltage Cable", img:"https://picsum.photos/id/107/500/350", specs:[["耐压","1000V DC"],["导体","镀锡铜"],["温度","-40°C~150°C"],["认证","IATF16949"]], scene:"新能源汽车电池包、电机高压连接" },
            auto2: { name:"Automotive Sensor Cable", img:"https://picsum.photos/id/91/500/350", specs:[["屏蔽","铝箔+编织"],["耐油","优异"],["温度","-40°C~125°C"],["标准","JASO D611"]], scene:"ABS轮速传感器，发动机控制单元" },
            sec1: { name:"IP68 Waterproof Combo", img:"https://picsum.photos/id/155/500/350", specs:[["结构","RG59+电源"],["防水","IP68"],["抗UV","是"],["温度","-40°C~80°C"]], scene:"户外监控，楼宇对讲，一缆传输视频+供电" },
            sec2: { name:"Armored Security Cable", img:"https://picsum.photos/id/159/500/350", specs:[["铠装","双层钢带"],["芯数","4芯+同轴"],["认证","UL13"],["应用","埋地/架空"]], scene:"周界安防，防破坏，野外长期部署" },
            ind1: { name:"Drag Chain Cable", img:"https://picsum.photos/id/124/500/350", specs:[["护套","PUR"],["弯曲寿命",">500万次"],["耐油","优异"],["速度","5m/s"]], scene:"自动化设备拖链系统，数控机床，激光切割机" },
            ind2: { name:"Robot Cable", img:"https://picsum.photos/id/102/500/350", specs:[["扭转","±180°/m"],["高柔性","class 6导体"],["屏蔽","高密度编织"],["认证","CE"]], scene:"工业机器人手臂，多轴运动设备" },
            ene1: { name:"Solar PV Cable", img:"https://picsum.photos/id/116/500/350", specs:[["额定电压","1500V DC"],["绝缘","交联PE"],["抗UV","极佳"],["认证","TÜV, UL4703"]], scene:"光伏阵列，逆变器连接，25年寿命" },
            ene2: { name:"BESS Connection Cable", img:"https://picsum.photos/id/29/500/350", specs:[["载流","300A"],["导体","软铜绞线"],["阻燃","VW-1"],["标准","UL758"]], scene:"储能柜内部连接，电池模组汇流" },
            game1: { name:"Coiled Gaming Cable", img:"https://picsum.photos/id/0/500/350", specs:[["线材","编织+弹簧"],["电流","3A"],["接口","USB 2.0/3.0"],["长度","1.5m-2m可伸缩"]], scene:"机械键盘，电竞鼠标，桌面整洁美观" },
            game2: { name:"Paracord Mouse Cable", img:"https://picsum.photos/id/175/500/350", specs:[["材质","伞绳编织"],["重量","超轻<20g"],["摩擦系数","极低"],["定制","RGB/纯色"]], scene:"专业电竞鼠标，极致顺滑，无束缚感" },
        };

        const modal = document.getElementById('productDetailModal');
        if (modal) {
            const modalTitle = document.getElementById('modalProductTitle');
            const modalImg = document.getElementById('modalImg');
            const modalSpecTable = document.getElementById('modalSpecTable');
            const modalScene = document.getElementById('modalScene');
            const closeModal = document.getElementById('closeProductModal');
            const sampleBtn = document.getElementById('sampleRequestBtn');
            const modalInquiryBtn = document.getElementById('modalInquiryBtn');

            function openProductDetail(productId) {
                const data = productDetails[productId];
                if (!data) return;
                modalTitle.innerText = data.name;
                modalImg.src = data.img;
                modalSpecTable.innerHTML = '';
                data.specs.forEach(spec => {
                    const row = ` <tr><td>${spec[0]}</td><td>${spec[1]}</td></tr> `;
                    modalSpecTable.innerHTML += row;
                });
                modalScene.innerHTML = `<strong>การประยุกต์:</strong> ${data.scene}`;
                modal.style.display = 'flex';
                // 点击模态框“询价”按钮时，关闭模态框并滚动到底部表单
                modalInquiryBtn.onclick = () => {
                    modal.style.display = 'none';
                    const inquiryFormSection = document.getElementById('inquiry-form');
                    if (inquiryFormSection) inquiryFormSection.scrollIntoView({ behavior: 'smooth' });
                };
                sampleBtn.onclick = () => alert('📦 ตัวอย่าง: กรุณาติดต่อฝ่ายขายเพื่อขอตัวอย่างฟรี (demo)');
            }

            // 绑定所有产品卡片和询价按钮
            document.querySelectorAll('.btn-inquire').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const pid = btn.getAttribute('data-product');
                    if (pid) openProductDetail(pid);
                });
            });
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.classList.contains('btn-inquire')) return;
                    const pid = card.getAttribute('data-product-id');
                    if (pid) openProductDetail(pid);
                });
            });

            // 关闭模态框
            if (closeModal) closeModal.onclick = () => modal.style.display = 'none';
            modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
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