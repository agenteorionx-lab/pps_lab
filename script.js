// Interatividade PPS LAB
document.addEventListener('DOMContentLoaded', () => {
    // Acordeão do FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha os outros
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherBtn = otherItem.querySelector('.faq-question');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
                if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            });

            // Alterna o clicado
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                questionBtn.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                questionBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Animação suave para links âncora internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
