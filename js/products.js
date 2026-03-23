// ========== 产品页面专属交互（追加到 script.js 末尾） ==========
(function() {
    // 确保 DOM 加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductPage);
    } else {
        initProductPage();
    }

    function initProductPage() {
        const catBtns = document.querySelectorAll('.cat-btn');
        if (catBtns.length === 0) return;


        // 获取固定头部的高度（包括 header 和分类栏自身）
        function getHeaderOffset() {
            const header = document.querySelector('.site-header');
            const catWrapper = document.querySelector('.product-categories-wrapper');
            let offset = 0;
            if (header) offset += header.offsetHeight;
            if (catWrapper && window.scrollY > 0) offset += catWrapper.offsetHeight;
            // 增加 20px 缓冲，避免刚好贴边
            return offset + 20;
        }


        // ----- 2. 产品详情模态框 -----
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
                // 填充规格表格
                modalSpecTable.innerHTML = '';
                data.specs.forEach(spec => {
                    const row = `<tr><td>${spec[0]}</td><td>${spec[1]}</td></tr>`;
                    modalSpecTable.innerHTML += row;
                });
                modalScene.innerHTML = `<strong>การประยุกต์:</strong> ${data.scene}`;
                modal.style.display = 'flex';
                // 绑定模态框内按钮事件（防止重复绑定）
                const newInquiryHandler = () => {
                    modal.style.display = 'none';
                    const inquiryForm = document.getElementById('inquiry-form');
                    if (inquiryForm) inquiryForm.scrollIntoView({ behavior: 'smooth' });
                };
                modalInquiryBtn.onclick = newInquiryHandler;
                sampleBtn.onclick = () => alert('📦 ตัวอย่าง: กรุณาติดต่อฝ่ายขายเพื่อขอตัวอย่างฟรี (demo)');
            }

            // 绑定所有询价按钮和卡片点击
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

        // ----- 3. 询价表单提交（演示） -----
        const inquiryForm = document.getElementById('productInquiryForm');
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับภายใน 24 ชั่วโมง');
                inquiryForm.reset();
            });
        }

        // ----- 4. 语言切换提示（与首页统一）-----
        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle) {
            // 避免重复绑定
            if (!langToggle.hasListener) {
                langToggle.addEventListener('click', () => alert('语言切换功能演示，正式站点可链接对应语言版本'));
                langToggle.hasListener = true;
            }
        }

        // ----- 5. 浮窗按钮（确保回到顶部等与原有兼容，不再重复绑定）-----
        // 注意：原有 script.js 已经处理了 lineBtn, inquiryBtn, topBtn，这里无需重复，但若原有没有，可添加以下备用
        const topBtn = document.getElementById('topBtn');
        if (topBtn && !topBtn._listenerAdded) {
            topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            topBtn._listenerAdded = true;
        }
    }
})();