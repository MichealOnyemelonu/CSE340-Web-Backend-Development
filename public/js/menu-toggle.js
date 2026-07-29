console.log("Menu script loaded");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");

    const toggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('nav ul');

    console.log("Toggle:", toggle);
    console.log("Nav:", navList);

    if (!toggle || !navList) {
        console.log("Toggle or navList not found");
        return;
    }

    toggle.addEventListener('click', () => {
        console.log("Menu clicked");

        const isOpen = navList.classList.toggle('open');

        console.log("isOpen:", isOpen);

        toggle.setAttribute('aria-expanded', isOpen);
    });
});
