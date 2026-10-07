document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. TEMA DARK / LIGHT
    ========================================= */

    const themeToggle = document.querySelector(".theme-toggle");

    if (themeToggle) {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
            updateThemeIcon();
        }

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");

            const isLight = document.body.classList.contains("light-theme");

            localStorage.setItem(
                "portfolio-theme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (document.body.classList.contains("light-theme")) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        } else {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }


    /* =========================================
       2. EFEITO DE DIGITAÇÃO
    ========================================= */

    const typingElement = document.querySelector("#typing-text");

    const typingTexts = [
        "Analista de Dados",
        "Automação de Processos",
        "Backend Java",
        "Dados + Tecnologia"
    ];

    let textIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentText = typingTexts[textIndex];

        if (!deleting) {

            typingElement.textContent =
                currentText.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentText.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);
                return;
            }

        } else {

            typingElement.textContent =
                currentText.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                textIndex++;

                if (textIndex >= typingTexts.length) {
                    textIndex = 0;
                }
            }
        }

        const speed = deleting ? 45 : 85;

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    /* =========================================
       3. ANIMAÇÃO AO ROLAR A PÁGINA
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".section, .card, .result-card, .project-card, .skill-card, .cert-card, .timeline-item"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================================
       4. HEADER AO ROLAR
    ========================================= */

    const header = document.querySelector("header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================================
       5. LINK ATIVO DO MENU
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================================
       6. SCROLL SUAVE
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       7. CONTADOR DOS RESULTADOS
    ========================================= */

    const counters = document.querySelectorAll("[data-counter]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                const target = parseInt(
                    element.getAttribute("data-counter")
                );

                let current = 0;

                const increment = Math.max(
                    1,
                    Math.ceil(target / 40)
                );

                const counter = setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(counter);
                    }

                    element.textContent = current;

                }, 35);

                counterObserver.unobserve(element);
            });

        },
        {
            threshold: 0.7
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =========================================
       8. EFEITO PARALLAX SUTIL
    ========================================= */

    const floatingCards = document.querySelectorAll(
        ".floating-card"
    );

    window.addEventListener("scroll", () => {

        const scrollPosition = window.scrollY;

        floatingCards.forEach((card, index) => {

            const movement =
                scrollPosition * (0.03 + index * 0.01);

            card.style.transform =
                `translateY(${movement}px)`;

        });

    });


    /* =========================================
       9. ANO AUTOMÁTICO NO FOOTER
    ========================================= */

    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       10. BOTÕES DE PROJETOS
    ========================================= */

    const projectButtons =
        document.querySelectorAll(".project-card a");

    projectButtons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-2px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translateY(0)";

        });

    });

});