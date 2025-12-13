const NAV_ITEMS = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

function renderNavbar(options = {}) {
    const {
        targetId = 'navbar-root',
        items = NAV_ITEMS,
    } = options;

    const target = document.getElementById(targetId);
    if (!target) return;

    const navItemsMarkup = items.map(item => `
        <li class="nav-item">
            <a class="nav-link fw-medium" href="${item.href}">
                ${item.label}
            </a>
        </li>
    `).join('');

    target.innerHTML = `
        <nav class="main-nav">
            <div class="nav-surface">
                <button class="nav-toggle" type="button" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav nav-list justify-content-center gap-2 gap-md-3">
                    ${navItemsMarkup}
                </ul>
            </div>
        </nav>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
});
