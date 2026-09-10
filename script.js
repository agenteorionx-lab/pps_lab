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

    // Animação de rolagem suave com velocidade média e elegante
    function smoothScrollTo(targetElement, duration = 1150) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + (distance * ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Vincula a rolagem média para links âncora internos (ex: #investimento)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    smoothScrollTo(targetElement, 1150); // Duração equilibrada: velocidade média
                }
            }
        });
    });

    // Inicialização do Carrossel de Especialistas (Swiper)
    if (typeof Swiper !== 'undefined' && document.querySelector('.specialistsSlider')) {
        new Swiper('.specialistsSlider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            speed: 600,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.specialists-carousel-wrapper .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.specialists-carousel-wrapper .swiper-button-next',
                prevEl: '.specialists-carousel-wrapper .swiper-button-prev'
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    // Inicialização do Carrossel de Depoimentos (1 vídeo por vez no mobile, 2 no desktop)
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonialsSlider')) {
        new Swiper('.testimonialsSlider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false, // Com 2 vídeos apenas, loop: true no swiper duplica ou desloca os slides de forma incorreta
            grabCursor: true,
            speed: 400,
            watchOverflow: true,
            pagination: {
                el: '.testimonials-navigation-wrapper .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.testimonials-navigation-wrapper .swiper-button-next',
                prevEl: '.testimonials-navigation-wrapper .swiper-button-prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }
        });
    }
});
