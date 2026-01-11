function showPage(pageId) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostrar la página seleccionada
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Actualizar navbar activo
    updateActiveNavLink(pageId);
    
    // Cerrar menú móvil si está abierto
    closeMenu();
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return false;
}

/**
 * Actualiza el enlace activo en la navegación
 * @param {string} pageId - ID de la página activa
 */
function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

/**
 * Alterna la visibilidad del menú móvil
 */
function toggleMenu() {
    const nav = document.getElementById('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

/**
 * Cierra el menú móvil
 */
function closeMenu() {
    const nav = document.getElementById('nav');
    if (nav) {
        nav.classList.remove('active');
    }
}

/**
 * Configura el Intersection Observer para animaciones
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, { threshold: 0.1 });

    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.app-card, .app-detail, .info-section');
    elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    setupIntersectionObserver();
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('nav');
        const hamburger = document.querySelector('.hamburger');
        
        if (nav && hamburger && 
            !nav.contains(e.target) && 
            !hamburger.contains(e.target) && 
            nav.classList.contains('active')) {
            closeMenu();
        }
    });
});
