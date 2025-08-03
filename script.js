// Enhanced scroll animations and interactions
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollTriggers();
        this.setupMagazineAnimations();
        this.setupTextRevealAnimations();
    }

    setupSmoothScrolling() {
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
    }

    setupScrollTriggers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all magazine sections
        document.querySelectorAll('.feature-story, .cover-story, .table-of-contents, .personal-essay, .projects-showcase').forEach(section => {
            observer.observe(section);
        });
    }

    animateElement(element) {
        element.classList.add('animate-in');
        
        // Stagger animations for child elements
        const children = element.querySelectorAll('.story-text p, .toc-item, .image-placeholder, .project-card');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-in-child');
            }, index * 100);
        });
    }

    setupMagazineAnimations() {
        // Parallax effect for images
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('.image-placeholder').forEach((img, index) => {
                const speed = 0.1 + (index % 3) * 0.05;
                img.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Subtle header animation
            const header = document.querySelector('.magazine-header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }

    setupTextRevealAnimations() {
        // Typewriter effect for headlines
        const headlines = document.querySelectorAll('.story-headline, .cover-headline, .essay-headline');
        
        const headlineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    this.typewriterEffect(entry.target);
                }
            });
        }, { threshold: 0.5 });

        headlines.forEach(headline => {
            headlineObserver.observe(headline);
        });
    }

    typewriterEffect(element) {
        element.classList.add('typed');
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--magazine-black)';
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50 + Math.random() * 50);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        };
        
        setTimeout(type, 200);
    }
}

// Initialize animations
const scrollAnimations = new ScrollAnimations();

// Enhanced magazine interactions
class MagazineInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupReadingProgress();
        this.setupImageEffects();
    }

    setupHoverEffects() {
        // Enhanced hover effects for magazine elements
        document.querySelectorAll('.toc-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.backgroundColor = 'var(--magazine-cream)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.backgroundColor = 'transparent';
            });
        });

        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-subtle)';
            });
        });
    }

    setupReadingProgress() {
        // Create reading progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--magazine-accent);
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    setupImageEffects() {
        // Image reveal animation on scroll
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('image-revealed');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.image-placeholder').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

const magazineInteractions = new MagazineInteractions();

// Advanced scroll-triggered animations
class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupStaggeredAnimations();
        this.setupTextAnimations();
        this.setupCounterAnimations();
    }

    setupStaggeredAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.staggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for staggered animations
        document.querySelectorAll('.story-text, .toc-columns, .heritage-story-grid, .essay-content').forEach(container => {
            observer.observe(container);
        });
    }

    staggerElementAnimation(container) {
        const children = container.querySelectorAll('p, .toc-item, .sidebar-item, h3, blockquote');
        
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupTextAnimations() {
        // Fade in words individually
        const textElements = document.querySelectorAll('.story-intro p, .heritage-intro p');
        
        textElements.forEach(element => {
            const words = element.textContent.split(' ');
            element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
            
            const wordSpans = element.querySelectorAll('.word');
            wordSpans.forEach(span => {
                span.style.opacity = '0';
                span.style.transform = 'translateY(10px)';
                span.style.transition = 'all 0.4s ease';
                span.style.display = 'inline-block';
                span.style.marginRight = '0.3em';
            });
        });

        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const words = entry.target.querySelectorAll('.word');
                    words.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.opacity = '1';
                            word.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            });
        }, { threshold: 0.5 });

        textElements.forEach(element => {
            textObserver.observe(element);
        });
    }

    setupCounterAnimations() {
        // Animate numbers in project details
        const counters = document.querySelectorAll('.sidebar-item li');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const numbers = text.match(/\d+/);
                    
                    if (numbers) {
                        const finalNumber = parseInt(numbers[0]);
                        let currentNumber = 0;
                        const increment = finalNumber / 30;
                        
                        const counter = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                entry.target.textContent = text;
                                clearInterval(counter);
                            } else {
                                entry.target.textContent = text.replace(numbers[0], Math.floor(currentNumber));
                            }
                        }, 50);
                    }
                }
            });
        }, { threshold: 0.8 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

const advancedAnimations = new AdvancedAnimations();

// Enhanced project interactions
class ProjectInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectAnimations();
        this.setupProjectCardEffects();
        this.setupProjectFilterSystem();
    }

    setupProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('project-revealed');
                        this.animateProjectHighlights(entry.target);
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });

        projectCards.forEach(card => {
            card.classList.add('project-hidden');
            projectObserver.observe(card);
        });
    }

    animateProjectHighlights(card) {
        const highlights = card.querySelectorAll('.highlight-number');
        highlights.forEach((highlight, index) => {
            const finalValue = highlight.textContent;
            const isNumber = !isNaN(parseFloat(finalValue));
            
            if (isNumber) {
                const finalNumber = parseFloat(finalValue);
                let currentNumber = 0;
                const increment = finalNumber / 30;
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        highlight.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        highlight.textContent = Math.floor(currentNumber);
                    }
                }, 50);
            }
        });
    }

    setupProjectCardEffects() {
        document.querySelectorAll('.project-card').forEach(card => {
            // Enhanced hover with 3D effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02) rotateX(2deg)';
                this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
                
                // Animate the overlay
                const overlay = this.querySelector('.project-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
                
                // Animate image scale
                const img = this.querySelector('.project-img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                this.style.boxShadow = 'var(--shadow-subtle)';
                
                const overlay = this.querySelector('.project-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                }
                
                const img = this.querySelector('.project-img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });

            // Click effect for mobile
            card.addEventListener('click', function() {
                this.classList.toggle('project-active');
            });
        });
    }

    setupProjectFilterSystem() {
        // Create filter buttons (for future enhancement)
        const projectTypes = ['Tất Cả', 'Dân Cư', 'Thương Mại', 'Văn Hóa', 'Tâm Linh'];
        const filtersContainer = document.createElement('div');
        filtersContainer.className = 'project-filters';
        filtersContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        `;

        projectTypes.forEach(type => {
            const button = document.createElement('button');
            button.textContent = type;
            button.className = 'filter-btn';
            button.style.cssText = `
                padding: 0.5rem 1.5rem;
                border: 2px solid var(--magazine-border);
                background: transparent;
                color: var(--magazine-text);
                font-family: 'Inter', sans-serif;
                font-size: 0.875rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            if (type === 'Tất Cả') {
                button.style.background = 'var(--magazine-accent)';
                button.style.color = 'white';
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                this.filterProjects(type, button);
            });

            filtersContainer.appendChild(button);
        });

        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.parentNode.insertBefore(filtersContainer, projectsGrid);
        }
    }

    filterProjects(type, activeButton) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--magazine-text)';
            btn.classList.remove('active');
        });

        activeButton.style.background = 'var(--magazine-accent)';
        activeButton.style.color = 'white';
        activeButton.classList.add('active');

        // Filter projects (for future enhancement with actual filtering)
        const projects = document.querySelectorAll('.project-card');
        projects.forEach((project, index) => {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, index * 100);
        });
    }
}

const projectInteractions = new ProjectInteractions();

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const projectType = this.querySelector('input[type="text"]:nth-of-type(2)').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#22c55e';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Add typing animation to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});


// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.cursor = 'pointer';
    
    nav.appendChild(mobileMenuBtn);
    
    // Show/hide mobile menu button based on screen size
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    };
    
    mobileMenuBtn.addEventListener('click', () => {
        const isVisible = navMenu.style.display === 'flex';
        navMenu.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
};

// Initialize all magazine features
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
    
    // Initialize cursor effects
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--magazine-accent);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Cursor interactions
    document.querySelectorAll('a, button, .image-placeholder, .toc-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.backgroundColor = 'var(--magazine-accent)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
});

// Magazine-specific interactive features
class MagazineFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupMagazineReveal();
        this.setupPageFlipEffect();
        this.setupZoomEffects();
    }

    setupMagazineReveal() {
        const sections = document.querySelectorAll('section, article');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(60px) rotateX(10deg)';
            section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.transformOrigin = 'center top';
        });
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    }, 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -150px 0px'
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    setupPageFlipEffect() {
        // Add subtle page flip animation to story cards
        document.querySelectorAll('.feature-story, .personal-essay').forEach(story => {
            story.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(1000px) rotateY(-2deg)';
                this.style.boxShadow = '20px 20px 60px rgba(0, 0, 0, 0.1)';
            });
            
            story.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateY(0deg)';
                this.style.boxShadow = 'none';
            });
        });
    }

    setupZoomEffects() {
        // Image zoom on hover
        document.querySelectorAll('.image-placeholder').forEach(img => {
            img.style.overflow = 'hidden';
            img.style.cursor = 'pointer';
            
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

const magazineFeatures = new MagazineFeatures();

// Full-page projects with carousel functionality
class ProjectShowcase {
    constructor() {
        this.currentProject = 0;
        this.totalProjects = 6;
        this.init();
    }

    init() {
        this.setupCarousels();
        this.setupProjectNavigation();
        this.setupScrollTriggers();
        this.showProject(0);
    }

    setupCarousels() {
        document.querySelectorAll('.project-fullpage').forEach((project, projectIndex) => {
            const carousel = project.querySelector('.carousel-container');
            const slides = carousel ? carousel.querySelectorAll('.carousel-slide') : [];
            const prevBtn = project.querySelector('.carousel-btn.carousel-prev');
            const nextBtn = project.querySelector('.carousel-btn.carousel-next');
            const indicators = project.querySelectorAll('.carousel-indicator');
            
            if (!carousel || slides.length === 0) {
                return;
            }
            
            let currentSlide = 0;
            
            const showSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === index);
                });
            };
            
            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            };
            
            const prevSlide = () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            };
            
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                });
            });
            
            // Auto-advance carousel every 5 seconds
            setInterval(nextSlide, 5000);
        });
    }

    setupProjectNavigation() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const navItems = document.querySelectorAll('.project-nav-item');
        const currentProjectName = document.querySelector('.current-project-name');
        
        // Toggle dropdown
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdownToggle.classList.contains('open');
            
            if (isOpen) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.project-dropdown')) {
                this.closeDropdown();
            }
        });
        
        // Handle project selection
        navItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.showProject(index);
                this.closeDropdown();
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.showProject((this.currentProject - 1 + this.totalProjects) % this.totalProjects);
            } else if (e.key === 'ArrowRight') {
                this.showProject((this.currentProject + 1) % this.totalProjects);
            } else if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });
    }
    
    openDropdown() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        dropdownToggle.classList.add('open');
        dropdownMenu.classList.add('open');
    }
    
    closeDropdown() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        dropdownToggle.classList.remove('open');
        dropdownMenu.classList.remove('open');
    }

    setupScrollTriggers() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const infoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate project details with stagger
                    const details = entry.target.querySelectorAll('.project-detail');
                    details.forEach((detail, index) => {
                        setTimeout(() => {
                            detail.style.opacity = '1';
                            detail.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate story paragraphs with stagger
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, index * 300);
                    });
                }
            });
        }, observerOptions);

        // Observe all project info and story sections
        document.querySelectorAll('.project-info-section').forEach(section => {
            infoObserver.observe(section);
        });
        
        document.querySelectorAll('.project-story-section').forEach(section => {
            storyObserver.observe(section);
        });
    }

    showProject(index) {
        if (index === this.currentProject) return;
        
        const projects = document.querySelectorAll('.project-fullpage');
        const navItems = document.querySelectorAll('.project-nav-item');
        const currentProjectName = document.querySelector('.current-project-name');
        
        // Project names array
        const projectNames = [
            'Căn Hộ Vườn Trời',
            'Trung Tâm Nghệ Thuật',
            'Quán Cà Phê Nổi',
            'Chùa Thiền Tre',
            'Nhà Phố Hiện Đại',
            'Trung Tâm Cộng Đồng'
        ];
        
        // Hide current project
        projects[this.currentProject].classList.remove('active');
        navItems[this.currentProject].classList.remove('active');
        
        // Show new project with animation
        setTimeout(() => {
            projects[index].classList.add('active');
            navItems[index].classList.add('active');
            currentProjectName.textContent = projectNames[index];
            this.currentProject = index;
            
            // Reset scroll positions for new project
            const infoSection = projects[index].querySelector('.project-info-section');
            const storySection = projects[index].querySelector('.project-story-section');
            
            if (infoSection) {
                infoSection.style.opacity = '0';
                infoSection.style.transform = 'translateY(50px)';
            }
            
            if (storySection) {
                storySection.style.opacity = '0';
                storySection.style.transform = 'translateY(50px)';
            }
            
            // Reset project details animation
            const details = projects[index].querySelectorAll('.project-detail');
            details.forEach(detail => {
                detail.style.opacity = '0';
                detail.style.transform = 'translateY(20px)';
            });
            
            // Reset story paragraphs animation
            const paragraphs = projects[index].querySelectorAll('.project-story-section p');
            paragraphs.forEach(p => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
            });
        }, 300);
    }
}

// Initialize project showcase
const projectShowcase = new ProjectShowcase();