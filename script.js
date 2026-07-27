document.addEventListener('DOMContentLoaded', () => {
    // 1. SELEÇÃO DOS ELEMENTOS
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 2. ALTERNAR MENU MOBILE
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Impede a rolagem do corpo da página quando o menu estiver aberto
            document.body.classList.toggle('menu-open');
        });
    }

    // 3. FECHAR O MENU MOBILE AUTOMATICAMENTE AO CLICAR EM UM LINK
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // 4. HIGHLIGHT AUTOMÁTICO DO MENU DE ACORDO COM O SCROLL DA PÁGINA
    function highlightNavOnScroll() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset para compensar a altura do header fixo
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink?.classList.add('active-link');
            } else {
                correspondingLink?.classList.remove('active-link');
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
});