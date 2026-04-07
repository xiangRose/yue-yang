document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.getElementById('mapTooltip');
    const tooltipImg = document.getElementById('tooltipImg');
    const tooltipTitle = document.getElementById('tooltipTitle');
    const tooltipDesc = document.getElementById('tooltipDesc');

    const markers = document.querySelectorAll('.map-marker');

    let hideTimer = null;

    function showTooltip(marker, event) {
        // 清除隐藏定时器
        if (hideTimer) clearTimeout(hideTimer);

        const name = marker.getAttribute('data-name');
        const imgSrc = marker.getAttribute('data-img');
        const desc = marker.getAttribute('data-desc');

        if (!name || !imgSrc) return;

        tooltipImg.src = imgSrc;
        tooltipTitle.innerText = name;
        tooltipDesc.innerText = desc;

        // 计算位置
        const rect = marker.getBoundingClientRect();
        let left = rect.right + 10;
        let top = rect.top;

        // 边界检测
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left + tooltipRect.width > viewportWidth) {
            left = rect.left - tooltipRect.width - 10;
        }
        if (top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - tooltipRect.height - 10;
        }
        if (top < 0) top = 10;

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.display = 'flex';
    }

    function hideTooltip() {
        hideTimer = setTimeout(() => {
            tooltip.style.display = 'none';
        }, 150);
    }

    markers.forEach(marker => {
        // 鼠标移入显示
        marker.addEventListener('mouseenter', (e) => {
            showTooltip(marker, e);
        });
        marker.addEventListener('mouseleave', () => {
            hideTooltip();
        });
        // 移动端触摸
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            if (tooltip.style.display === 'flex') {
                hideTooltip();
            } else {
                showTooltip(marker, e);
            }
        });
    });

    // 点击地图其他区域隐藏提示框
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.map-marker') && !e.target.closest('.map-tooltip')) {
            tooltip.style.display = 'none';
        }
    });
});