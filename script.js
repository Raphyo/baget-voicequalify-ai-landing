// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0deg)';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0deg)';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0deg)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0deg)';
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Demo Call Transcript Animation
const playDemoBtn = document.getElementById('playDemo');
const demoTranscript = document.getElementById('demoTranscript');

const demoConversation = [
    {
        type: 'ai',
        text: "Hello! Thank you for calling ABC Solar. I'm here to help you learn about our solar solutions. May I get your name?"
    },
    {
        type: 'user',
        text: "Hi, this is Sarah Johnson."
    },
    {
        type: 'ai',
        text: "Nice to meet you, Sarah! Are you interested in solar panels for your home or business?"
    },
    {
        type: 'user',
        text: "For my home. I'm looking to reduce my electricity bills."
    },
    {
        type: 'ai',
        text: "That's great! Can you tell me approximately what your monthly electric bill is?"
    },
    {
        type: 'user',
        text: "It's usually around $180 to $200 per month."
    },
    {
        type: 'ai',
        text: "Perfect! With bills that high, solar could save you significant money. Do you own your home?"
    },
    {
        type: 'user',
        text: "Yes, I do."
    },
    {
        type: 'ai',
        text: "Excellent! You're a great candidate for solar. I'm connecting you with one of our solar specialists who can provide you with a custom quote. Please hold for just a moment."
    }
];

let demoPlaying = false;
let demoTimeout;

playDemoBtn.addEventListener('click', () => {
    if (demoPlaying) return;
    
    demoPlaying = true;
    playDemoBtn.textContent = 'Playing Demo...';
    playDemoBtn.disabled = true;
    
    // Clear existing transcript except first message
    demoTranscript.innerHTML = `
        <div class="transcript-message ai-message">
            <div class="message-avatar ai">AI</div>
            <div class="message-text">Hello! Thank you for calling ABC Solar. I'm here to help you learn about our solar solutions. May I get your name?</div>
        </div>
    `;
    
    // Play conversation
    let messageIndex = 1;
    
    function showNextMessage() {
        if (messageIndex < demoConversation.length) {
            const message = demoConversation[messageIndex];
            const messageEl = document.createElement('div');
            messageEl.className = `transcript-message ${message.type}-message`;
            
            messageEl.innerHTML = `
                <div class="message-avatar ${message.type}">${message.type === 'ai' ? 'AI' : 'Sarah'}</div>
                <div class="message-text">${message.text}</div>
            `;
            
            demoTranscript.appendChild(messageEl);
            
            // Scroll to bottom
            demoTranscript.scrollTop = demoTranscript.scrollHeight;
            
            messageIndex++;
            
            // Schedule next message
            const delay = message.type === 'ai' ? 2500 : 1800;
            demoTimeout = setTimeout(showNextMessage, delay);
        } else {
            // Demo finished
            setTimeout(() => {
                playDemoBtn.textContent = 'Play Demo Call';
                playDemoBtn.disabled = false;
                demoPlaying = false;
            }, 2000);
        }
    }
    
    // Start with first user message
    setTimeout(showNextMessage, 2000);
});

// Pricing Plan Selection (placeholder for Stripe integration)
document.querySelectorAll('[data-plan]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.getAttribute('data-plan');
        
        // This is where you would integrate with Stripe
        console.log(`Selected plan: ${plan}`);
        
        // For now, show a simple alert
        alert(`Starting free trial for ${plan} plan! (This would redirect to Stripe checkout in production)`);
        
        // In production, you would do something like:
        // window.location.href = `https://checkout.stripe.com/pay/${plan}_price_id`;
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, 16);
}

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-big');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, number);
                    
                    // Add back the suffix if there was one
                    setTimeout(() => {
                        if (text.includes('%')) {
                            statNumber.textContent = number + '%';
                        } else if (text.includes('K')) {
                            statNumber.textContent = '$' + number + 'K';
                        }
                    }, 2000);
                }
            }
        }
    });
}, observerOptions);

// Observe stat circles
document.querySelectorAll('.stat-circle').forEach(stat => {
    statsObserver.observe(stat);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Form validation for email inputs (if any are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add entrance animations with staggered delays
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Console welcome message
console.log(`
🎉 Welcome to VoiceQualify AI!
Built with ❤️ for modern lead qualification.

Interested in the code? Check out our GitHub repo!
Questions? Email us at hello@voicequalify.ai
`);