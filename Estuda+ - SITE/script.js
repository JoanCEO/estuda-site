/* ============================================
   EXTENSION SHOWCASE - JavaScript
   Funcionalidades interativas e animações
   ============================================ */

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observar todos os elementos com fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Adicionar efeito de hover nos botões
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Adicionar efeito de hover nos cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        this.style.transform = 'translateY(0)';
    });
});

// Sticky header com sombra ao scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Ativar link de navegação ativo
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Adicionar classe active ao nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Efeito de ripple nos botões ao clicar
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Adicionar estilos para ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Lazy loading de imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Adicionar animação de contagem para números (opcional)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Detectar modo escuro do sistema (opcional)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Você pode adicionar suporte a dark mode aqui se desejar
}

// Função para rastrear eventos (analytics)
function trackEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Rastrear cliques em CTAs
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('engagement', 'cta_click', this.textContent);
    });
});

// Rastrear navegação
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('navigation', 'nav_click', this.textContent);
    });
});

// Função para detectar suporte a WebP
function supportsWebP() {
    const webP = new Image();
    webP.onload = webP.onerror = function() {
        return webP.height === 2;
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAAA';
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Extension Showcase - Site carregado com sucesso!');
    
    // Verificar suporte a WebP
    supportsWebP();
    
    // Inicializar animações
    updateActiveNavLink();
});

// Tratamento de erros
window.addEventListener('error', function(event) {
    console.error('Erro:', event.error);
});

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Tempo de carregamento da página:', pageLoadTime + 'ms');
    });
}
