<?php
$navItems = [
    'Home' => '#hero',
    'About' => '#about',
    'Projects' => '#projects',
    'Contact' => '#contact',
];
?>
<nav class="main-nav">
    <div class="nav-surface">
        <button class="nav-toggle" type="button" aria-label="Toggle navigation">
            <span></span>
            <span></span>
        </button>
        <ul class="nav nav-list justify-content-center gap-2 gap-md-3">
            <?php foreach ($navItems as $label => $href): ?>
                <li class="nav-item">
                    <a class="nav-link fw-medium" href="<?= $href ?>">
                        <?= htmlspecialchars($label) ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</nav>