document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.getElementById('navWrapper');

    // 点击汉堡按钮弹出/关闭菜单
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navWrapper.classList.toggle('show');
            // 汉堡动画效果（可选：点击变叉）
            hamburger.classList.toggle('open');
        });
    }

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (e) => {
        if (!navWrapper.contains(e.target) && !hamburger.contains(e.target)) {
            navWrapper.classList.remove('show');
        }
    });
});