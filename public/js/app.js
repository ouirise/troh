/**
 * TROH - Tayloring Rays of Hope
 * Main Application JavaScript
 * Static HTML5 Framework - Zero Dependencies
 */

// ============================================
// Data: Resources
// ============================================
const resourcesData = [
    {
        id: 1,
        title: "Understanding Your Diagnosis",
        category: "articles",
        type: "Article",
        description: "A comprehensive guide to understanding cancer diagnosis, staging, and what to expect.",
        readTime: "8 min read",
        link: "#"
    },
    {
        id: 2,
        title: "Treatment Options Explained",
        category: "articles",
        type: "Article",
        description: "Overview of chemotherapy, radiation, immunotherapy, and surgical options.",
        readTime: "12 min read",
        link: "#"
    },
    {
        id: 3,
        title: "Nutrition During Treatment",
        category: "guides",
        type: "Guide",
        description: "Practical nutrition advice to maintain strength during cancer treatment.",
        readTime: "15 min read",
        link: "#"
    },
    {
        id: 4,
        title: "Patient Story: Maria's Journey",
        category: "videos",
        type: "Video",
        description: "Maria shares her experience battling breast cancer and finding hope.",
        readTime: "18 min watch",
        link: "#"
    },
    {
        id: 5,
        title: "Managing Side Effects",
        category: "guides",
        type: "Guide",
        description: "Strategies for coping with common treatment side effects at home.",
        readTime: "10 min read",
        link: "#"
    },
    {
        id: 6,
        title: "Caregiver Self-Care",
        category: "articles",
        type: "Article",
        description: "Essential self-care practices for those caring for loved ones with cancer.",
        readTime: "6 min read",
        link: "#"
    }
];

// ============================================
// Data: Forum Posts
// ============================================
const forumPosts = [
    {
        id: 1,
        title: "Just diagnosed - feeling overwhelmed",
        author: "HopeSeeker22",
        replies: 14,
        time: "2 hours ago",
        category: "Newly Diagnosed"
    },
    {
        id: 2,
        title: "Tips for managing nausea during chemo?",
        author: "WarriorMom",
        replies: 8,
        time: "5 hours ago",
        category: "Treatment"
    },
    {
        id: 3,
        title: "Celebrating 2 years cancer-free! 🎉",
        author: "SurvivorStrong",
        replies: 23,
        time: "1 day ago",
        category: "Survivors"
    },
    {
        id: 4,
        title: "Resources for financial assistance",
        author: "HelpingHand",
        replies: 6,
        time: "1 day ago",
        category: "Support"
    }
];

// ============================================
// Data: Testimonials
// ============================================
const testimonialsData = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "Breast Cancer Survivor",
        quote: "Thanks to TROH, I found a community that truly understands what I'm going through. The resources and support saved my life during my darkest moments.",
        avatar: "SM"
    },
    {
        id: 2,
        name: "James Thompson",
        role: "Caregiver",
        quote: "Being a caregiver is isolating, but TROH connected me with others walking the same path. I learned how to take care of myself while caring for my wife.",
        avatar: "JT"
    },
    {
        id: 3,
        name: "Maria Garcia",
        role: "Survivor & Volunteer",
        quote: "Now that I'm in remission, I give back to TROH by mentoring newly diagnosed patients. This community gave me hope; now I get to pay it forward.",
        avatar: "MG"
    }
];

// ============================================
// Data: FAQ
// ============================================
const faqData = [
    {
        id: 1,
        question: "What services does TROH provide?",
        answer: "TROH offers a comprehensive resource library, community forums, support groups, one-on-one counseling referrals, and financial assistance guidance for individuals affected by cancer and their families."
    },
    {
        id: 2,
        question: "Is TROH's support free?",
        answer: "Yes, all of TROH's core services are completely free. We believe that support should never come with a price tag, especially during such challenging times. Our operations are funded entirely by donations and grants."
    },
    {
        id: 3,
        question: "How can I join a support group?",
        answer: "You can browse our available support groups in the Community section. Simply click on the group that resonates with your situation and click 'Join Group'. Our groups meet both virtually and in-person."
    },
    {
        id: 4,
        question: "Can I volunteer with TROH?",
        answer: "Absolutely! We welcome volunteers in various capacities—from community moderators and event organizers to mentors and administrative support. Click 'Volunteer' in the footer to get started."
    },
    {
        id: 5,
        question: "How is my donation used?",
        answer: "100% of donations go directly to supporting our community. This includes maintaining our resource library, hosting support groups, providing counseling sessions, and developing new educational materials."
    }
];

// ============================================
// URL & Navigation State Management
// ============================================
const pageTitles = {
    'hero': 'TroH | Tayloring Rays of Hope',
    'about': 'About Us | TroH',
    'resources': 'Resource Library | TroH',
    'testimonials': 'Stories of Hope | TroH',
    'community': 'Community Forum | TroH',
    'faq': 'FAQ | TroH',
    'donate': 'Support the Mission | TroH'
};

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('text-white', 'bg-white/10');
        link.classList.add('text-gray-300');
        
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-white', 'bg-white/10');
        }
    });
    
    // Update page title and URL hash
    if (currentSection && pageTitles[currentSection]) {
        document.title = pageTitles[currentSection];
        
        // Only update hash if different (prevents jumpiness)
        if (window.location.hash !== `#${currentSection}`) {
            history.replaceState(null, null, `#${currentSection}`);
        }
    }
}

function initURLManager() {
    // Handle initial hash on load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            setTimeout(() => {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }, 100);
        }
    }
    
    // Update on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateActiveNavLink();
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// ============================================
// Resource Library
// ============================================
function renderResources(filter = 'all') {
    const container = document.getElementById('resource-list');
    const filterIndicator = document.getElementById('resource-filter-indicator');
    const filterName = document.getElementById('active-filter-name');
    
    if (!container) return;
    
    const filtered = filter === 'all' 
        ? resourcesData 
        : resourcesData.filter(r => r.category === filter);
    
    // Show/hide filter indicator
    if (filterIndicator && filterName) {
        if (filter === 'all') {
            filterIndicator.classList.add('hidden');
        } else {
            filterIndicator.classList.remove('hidden');
            filterName.textContent = filter;
        }
    }
    
    container.innerHTML = filtered.map(resource => `
        <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 ${getCategoryColor(resource.category)} hover:-translate-x-1">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wide">${resource.type}</span>
                        <span class="text-xs text-gray-400">${resource.readTime}</span>
                    </div>
                    <h4 class="text-lg font-semibold text-troh-dark mb-1">${resource.title}</h4>
                    <p class="text-gray-600">${resource.description}</p>
                </div>
                <a href="${resource.link}" class="inline-flex items-center px-4 py-2 text-troh-gold hover:bg-troh-gold hover:text-white font-medium rounded-lg transition-all whitespace-nowrap group">
                    Read More
                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>
    `).join('');
}

function getCategoryColor(category) {
    const colors = {
        articles: 'border-blue-500',
        videos: 'border-red-500',
        guides: 'border-green-500'
    };
    return colors[category] || 'border-gray-300';
}

function filterResources(category) {
    renderResources(category);
    
    // Update URL with resource filter
    const newHash = category === 'all' ? '#resources' : `#resources?filter=${category}`;
    history.pushState(null, null, newHash);
}

// ============================================
// Testimonials
// ============================================
function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;
    
    container.innerHTML = testimonialsData.map(testimonial => `
        <div class="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 bg-troh-gold/20 rounded-full flex items-center justify-center">
                    <span class="text-lg font-bold text-troh-gold">${testimonial.avatar}</span>
                </div>
                <div>
                    <h4 class="font-semibold text-troh-dark">${testimonial.name}</h4>
                    <p class="text-sm text-troh-gold">${testimonial.role}</p>
                </div>
            </div>
            <div class="relative">
                <svg class="absolute -top-2 -left-2 w-8 h-8 text-troh-gold/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p class="text-gray-600 italic relative z-10 pl-4">${testimonial.quote}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// FAQ Accordion
// ============================================
function renderFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;
    
    container.innerHTML = faqData.map((faq, index) => `
        <div class="border border-gray-200 rounded-xl overflow-hidden" id="faq-${faq.id}">
            <button class="faq-toggle w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left" onclick="toggleFAQ(${faq.id})">
                <span class="font-semibold text-troh-dark text-lg pr-4">${faq.question}</span>
                <svg id="faq-icon-${faq.id}" class="w-6 h-6 text-troh-gold flex-shrink-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div id="faq-content-${faq.id}" class="faq-content hidden bg-gray-50 border-t border-gray-100">
                <p class="p-6 text-gray-600">${faq.answer}</p>
            </div>
        </div>
    `).join('');
}

function toggleFAQ(id) {
    const content = document.getElementById(`faq-content-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    const faqItem = document.getElementById(`faq-${id}`);
    
    if (content && icon) {
        const isHidden = content.classList.contains('hidden');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="faq-icon-"]').forEach(el => el.style.transform = 'rotate(0deg)');
        
        // Toggle current
        if (isHidden) {
            content.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
            
            // Update URL with FAQ anchor
            history.pushState(null, null, `#faq-${id}`);
        } else {
            history.pushState(null, null, '#faq');
        }
    }
}

// ============================================
// Forum Posts
// ============================================
function renderForumPosts() {
    const container = document.getElementById('forum-posts');
    if (!container) return;
    
    container.innerHTML = forumPosts.map(post => `
        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-troh-gold/30 group">
            <h4 class="font-medium text-troh-dark mb-2 line-clamp-1 group-hover:text-troh-gold transition-colors">${post.title}</h4>
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                    <span class="font-medium text-troh-gold bg-troh-gold/10 px-2 py-0.5 rounded">${post.author}</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-gray-500">${post.time}</span>
                </div>
                <div class="flex items-center gap-1 text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span>${post.replies}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// Animated Statistics
// ============================================
function animateStats() {
    const stats = [
        { id: 'stat-members', target: 1250 },
        { id: 'stat-resources', target: 45 },
        { id: 'stat-events', target: 28 },
        { id: 'stat-donations', target: 156 }
    ];
    
    stats.forEach(({ id, target }) => {
        const element = document.getElementById(id);
        if (!element) return;
        
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 25);
    });
}

// ============================================
// Donation Amount Selection
// ============================================
function initDonationForm() {
    const amountButtons = document.querySelectorAll('.donation-amount');
    const customInput = document.getElementById('custom-amount');
    
    amountButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            amountButtons.forEach(b => {
                b.classList.remove('border-troh-gold', 'text-troh-gold', 'bg-red-50');
                b.classList.add('border-gray-200');
            });
            
            // Add active state to clicked button
            btn.classList.remove('border-gray-200');
            btn.classList.add('border-troh-gold', 'text-troh-gold', 'bg-red-50');
            
            // Update custom input
            if (customInput) {
                customInput.value = btn.dataset.amount;
            }
        });
    });
    
    // Clear button selection when typing custom amount
    if (customInput) {
        customInput.addEventListener('input', () => {
            amountButtons.forEach(b => {
                b.classList.remove('border-troh-gold', 'text-troh-gold', 'bg-red-50');
                b.classList.add('border-gray-200');
            });
        });
    }
}

// ============================================
// Newsletter Form
// ============================================
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            // Show success message
            alert(`Thank you for subscribing! We've sent a confirmation to ${email}`);
            form.reset();
        });
    }
}

// ============================================
// Contact Modal
// ============================================
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    
    if (modal && content) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }, 10);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeContactModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', handleModalEscape);
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    
    if (modal && content) {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
        
        document.removeEventListener('keydown', handleModalEscape);
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            closeContactModal();
            form.reset();
        });
    }
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.classList.remove('opacity-0', 'invisible');
            button.classList.add('opacity-100', 'visible');
        } else {
            button.classList.add('opacity-0', 'invisible');
            button.classList.remove('opacity-100', 'visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, null, '#');
    });
}

// ============================================
// Cookie Banner
// ============================================
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    
    // Check if user has already dismissed
    if (!localStorage.getItem('cookiesDismissed')) {
        setTimeout(() => {
            banner.classList.remove('translate-y-full');
        }, 2000);
    }
}

function dismissCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('translate-y-full');
        localStorage.setItem('cookiesDismissed', 'true');
    }
}

// ============================================
// Smooth Scroll with URL Update
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, href);
            }
        });
    });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('shadow-xl', 'bg-troh-dark/95', 'backdrop-blur-sm');
        } else {
            header.classList.remove('shadow-xl', 'bg-troh-dark/95', 'backdrop-blur-sm');
        }
    });
}

// ============================================
// Intersection Observer for Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    animateStats();
                }
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initURLManager();
    initMobileMenu();
    renderResources();
    renderTestimonials();
    renderFAQ();
    renderForumPosts();
    initDonationForm();
    initNewsletterForm();
    initContactForm();
    initBackToTop();
    initCookieBanner();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
    
    // Log protocol activation
    console.log('%c🌫️🌒 TROH Protocol 67 Activated', 'color: #e94560; font-size: 16px; font-weight: bold;');
    console.log('%cTayloring Rays of Hope — Building Lanes for Black History', 'color: #16213e; font-size: 12px;');
    console.log('%cURL Router: ACTIVE', 'color: #00d632; font-size: 11px;');
});
