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

    // 4. HIGHLIGHT AUTOMÁTICO DO NAV
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

document.addEventListener('DOMContentLoaded', () => {
    // 5. EFEITO DE DIGITAÇÃO AUTOMÁTICA
    async function initTypewriter() {
        const codeElement = document.querySelector('.code-body code');
        if (!codeElement) return;

        // Captura o HTML
        let rawHtml = codeElement.innerHTML;
        let lines = rawHtml.split('\n');

        // Remove linhas em branco no início ou no fim
        if (lines.length > 0 && lines[0].trim() === '') lines.shift();
        if (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

        // Encontra a menor quantidade de espaços
        const nonBlankLines = lines.filter(line => line.trim().length > 0);
        if (nonBlankLines.length > 0) {
            const indents = nonBlankLines.map(line => {
                const match = line.match(/^\s*/);
                return match ? match[0].length : 0;
            });

            // O menor valor de espaços é a indentação do 'class Developer'
            const minIndent = Math.min(...indents);

            // Remove essa quantidade exata de espaços de cada linha
            rawHtml = lines.map(line => line.slice(minIndent)).join('\n');
        }

        // Limpa o bloco antes de começar a digitar
        codeElement.innerHTML = '';

        // Animação de digitação caractere por caractere
        let i = 0;
        let currentHtml = '';
        const typingSpeed = 20; // velocidade

        while (i < rawHtml.length) {
            // Se for uma tag HTML, insere instantaneamente
            if (rawHtml[i] === '<') {
                let tag = '';
                while (i < rawHtml.length && rawHtml[i] !== '>') {
                    tag += rawHtml[i];
                    i++;
                }
                if (i < rawHtml.length) {
                    tag += '>';
                    i++;
                }
                currentHtml += tag;
            } else {
                // Se for texto/código visível, digita com delay
                currentHtml += rawHtml[i];
                i++;

                codeElement.innerHTML = currentHtml + '<span class="typing-cursor">|</span>';
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }
        }
    }

    initTypewriter();
});