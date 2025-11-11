window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('navMenu').classList.add('visible');
        animateOnScroll();
    }, 1500);
});

window.addEventListener('scroll', function() {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});

function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .character-card, .scene').forEach(element => {
        observer.observe(element);
    });
}

const zoomOverlay = document.getElementById('zoomOverlay');

document.querySelectorAll('.scene-image').forEach(img => {
    if (img.tagName === 'IMG') {
        img.addEventListener('click', function() {
            const zoomedImg = document.createElement('img');
            zoomedImg.src = this.src;
            zoomedImg.alt = this.alt;
            
            zoomOverlay.innerHTML = '';
            zoomOverlay.appendChild(zoomedImg);
            zoomOverlay.classList.add('active');
        });
    }
});

zoomOverlay.addEventListener('click', function() {
    this.classList.remove('active');
});

document.querySelectorAll('.character-image').forEach(img => {
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        const zoomedImg = document.createElement('img');
        zoomedImg.src = this.src;
        zoomedImg.alt = this.alt;
        
        zoomOverlay.innerHTML = '';
        zoomOverlay.appendChild(zoomedImg);
        zoomOverlay.classList.add('active');
    });
});

document.querySelectorAll('.character-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.setting-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('header');
            if (header) {
                const rate = scrolled * -0.3;
                header.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

console.log('🏴‍☠️ The Pirate Who Was Afraid of the Sea - Interactive story plan loaded successfully!');
console.log('💡 Tip: Click on any image to zoom in!');