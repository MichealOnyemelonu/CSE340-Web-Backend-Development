
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('nav ul');

    if (!toggle || !navList) return;

    toggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

   
    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) {
            navList.classList.remove('open');
            toggle.setAttribute('aria-expanded', false);
        }
    });


    const lastModified = document.getElementById('last-modified');
    if (lastModified) {
        const d = new Date(document.lastModified);
 
        const pad = (n) => String(n).padStart(2, '0');
 
        const formatted =
            `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()} ` +
            `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
 
        lastModified.textContent = formatted;
    }
});