// ========== partners.js หน้าพันธมิตร ==========
document.addEventListener('DOMContentLoaded', function() {
    // ========== 1. ข้อมูลลูกค้า ==========
    const clients = [
        { name: 'Logitech', logo: '../images/logo_logitech.webp', description: 'แบรนด์อุปกรณ์ต่อพ่วงชั้นนำระดับโลก ร่วมพัฒนาสายเคเบิลสำหรับเมาส์/คีย์บอร์ดเกมมิ่ง พร้อมโซลูชันสาย USB ขดที่มีความยืดหยุ่นสูง' },
        { name: 'Huawei', logo: '../images/logo_huawei.webp', description: 'พันธมิตรเชิงกลยุทธ์ ร่วมพัฒนาสายข้อมูลโทรศัพท์มือถือตั้งแต่ปี 2013 จาก PVC สู่สาย Type-C กระแสสูง TPE ไร้ฮาโลเจน จัดส่งมีคุณภาพสม่ำเสมอ' },
        { name: 'vivo', logo: '../images/logo_vivo.webp', description: 'ซัพพลายเออร์ระดับสองระยะยาว ให้บริการสาย USB และสายชาร์จที่ผ่านการทดสอบความน่าเชื่อถืออย่างเข้มงวด' },
        { name: 'Razer', logo: '../images/logo_razer.webp', description: 'พันธมิตรอุปกรณ์เกมมิ่งมืออาชีพ ให้บริการสายขด สายถัก Paracord สายซิลิโคนเหลว และสายคุณภาพสูงอื่น ๆ' },
        { name: 'Anker', logo: '../images/logo_anker.webp', description: 'พันธมิตรอุปกรณ์อิเล็กทรอนิกส์เพื่อผู้บริโภค ให้บริการสาย TPU จากวัสดุชีวภาพ รองรับการชาร์จเร็วและการส่งข้อมูลประสิทธิภาพสูง' },
        { name: 'Tesla', logo: '../images/logo_tesla.webp', description: 'ซัพพลายเออร์สายไฟยานยนต์ไฟฟ้า ให้บริการสายไฟฟ้าแรงสูง สายชาร์จ และสายสัญญาณภายในรถ' },
        { name: 'Siemens', logo: '../images/logo_siemens.webp', description: 'พันธมิตรระบบอัตโนมัติอุตสาหกรรม ให้บริการสายเคเบิลลากจูงความยืดหยุ่นสูง สายหุ่นยนต์ ตอบสนองสภาพแวดล้อมอุตสาหกรรมที่ต้องการความทนทาน' },
        { name: 'ABB', logo: '../images/logo_Abb.webp', description: 'ซัพพลายเออร์สายเคเบิลอุปกรณ์อุตสาหกรรม ให้บริการสายควบคุมอุตสาหกรรมที่ทนน้ำมัน ทนอุณหภูมิสูง และป้องกันสัญญาณรบกวน' }
    ];

    const clientsGrid = document.getElementById('clientsGrid');
    if (clientsGrid) {
        clientsGrid.innerHTML = clients.map(client => `
            <div class="client-card">
                <img class="client-logo" src="${client.logo}" alt="${client.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'%3E%3Crect width=\'120\' height=\'120\' fill=\'%23eef2fc\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'12\' fill=\'%232c7da0\' text-anchor=\'middle\' dy=\'.3em\'%3E${client.name}%3C/text%3E%3C/svg%3E'">
                <h3>${client.name}</h3>
                <p>${client.description}</p>
            </div>
        `).join('');
    }

    // ========== 2. ข้อมูลการรับรองคุณภาพ ==========
    const certificates = [
        { name: 'การรับรอง UL', img: '../images/UL.webp', fullImg: 'images/cert-ul-full.jpg', desc: 'UL สายอิเล็กทรอนิกส์ (E230810) / สายไฟ (E230811)' },
        { name: 'ISO 9001', img: '../images/ios9001.webp', fullImg: 'images/cert-iso9001-full.jpg', desc: 'ระบบบริหารคุณภาพ' },
        { name: 'IATF 16949', img: '../images/IATF16949.webp', fullImg: 'images/cert-iatf-full.jpg', desc: 'ระบบบริหารคุณภาพอุตสาหกรรมยานยนต์' },
        { name: 'ISO 13485', img: '../images/ios13458.webp', fullImg: 'images/cert-iso13485-full.jpg', desc: 'ระบบบริหารคุณภาพอุปกรณ์การแพทย์' },
        { name: 'ISO 14001', img: '../images/ios14001.webp', fullImg: 'images/cert-iso14001-full.jpg', desc: 'ระบบบริหารสิ่งแวดล้อม' },
        { name: 'ISO 14064', img: '../images/ios14064.png', fullImg: 'images/cert-iso14064-full.jpg', desc: 'ระบบบริหารจัดการก๊าซเรือนกระจก' }
    ];

    const certGrid = document.getElementById('certGrid');
    if (certGrid) {
        certGrid.innerHTML = certificates.map(cert => `
            <div class="cert-item" data-fullimg="${cert.fullImg}">
                <img src="${cert.img}" alt="${cert.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23eef2fc\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'10\' fill=\'%232c7da0\' text-anchor=\'middle\' dy=\'.3em\'%3E${cert.name}%3C/text%3E%3C/svg%3E'">
                <p>${cert.name}</p>
                <span class="cert-hover">คลิกเพื่อดูภาพขยาย</span>
            </div>
        `).join('');
    }

    // ========== 3. ฟังก์ชันขยายใบรับรอง ==========
    const certItems = document.querySelectorAll('.cert-item');
    const certModal = document.getElementById('certModal');
    const certFullImg = document.getElementById('certFullImage');
    const closeCertModal = document.getElementById('closeCertModal');

    if (certItems.length) {
        certItems.forEach(item => {
            item.addEventListener('click', function(e) {
                let imgSrc = this.getAttribute('data-fullimg');
                if (!imgSrc) imgSrc = this.querySelector('img')?.src || '';
                certFullImg.src = imgSrc;
                certModal.style.display = 'flex';
            });
        });
    }
    if (closeCertModal) {
        closeCertModal.addEventListener('click', () => { certModal.style.display = 'none'; });
        certModal.addEventListener('click', (e) => { if(e.target === certModal) certModal.style.display = 'none'; });
    }

    // ========== 4. ขยายภาพอุปกรณ์ทดสอบ ==========
    const equipmentItems = document.querySelectorAll('.equipment-item');
    if (equipmentItems.length) {
        equipmentItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img && img.src) {
                    certFullImg.src = img.src;
                    certModal.style.display = 'flex';
                    const modalTitle = certModal.querySelector('.modal-header h3');
                    const caption = this.querySelector('.equipment-caption')?.innerText || 'อุปกรณ์ทดสอบ';
                    if (modalTitle) modalTitle.textContent = caption;
                }
            });
        });
    }

    // ========== 5. เอฟเฟกต์ตัวเลขอัตโนมัติ ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                if (isNaN(target)) return;
                let currentVal = 0;
                const step = Math.ceil(target / 40);
                const interval = setInterval(() => {
                    currentVal += step;
                    if (currentVal >= target) {
                        currentVal = target;
                        clearInterval(interval);
                    }
                    el.innerText = currentVal;
                }, 25);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => observer.observe(num));

    // ========== 6. ดาวน์โหลด PDF (ตัวอย่าง) ==========
    const pdfBtns = document.querySelectorAll('#footerPdfBtn');
    pdfBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 โหมดสาธิต: ในโปรเจกต์จริง กรุณาแทนที่ด้วยเส้นทางไฟล์ PDF จริง\nDemo: Yueyang_Partners_Catalog.pdf');
        });
    });

    // ========== 7. สาธิตการเปลี่ยนภาษา ==========
    const langToggle = document.querySelector('.lang-toggle');
    if(langToggle) {
        langToggle.addEventListener('click', () => {
            alert('ฟังก์ชันสาธิตการเปลี่ยนภาษา เว็บไซต์จริงสามารถเชื่อมโยงไปยังหน้ารุ่นภาษาอื่นได้');
        });
    }
});