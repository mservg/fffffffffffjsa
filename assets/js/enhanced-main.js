/**
 * Enhanced JavaScript for Jocelyne Saab Theme
 * Complete functionality for header, hero, carousels, and interactions
 * Author: Karl Serag (karlserag) - Enhanced by AI Assistant
 * Date: 2025-01-27
 * Version: 2.0.0
 */

(function() {
    'use strict';

    // Global variables
    let isMenuOpen = false;
    let scrollTimeout = null;
    let resizeTimeout = null;

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();
    });

    /**
     * Initialize all theme functionality
     */
    function initializeTheme() {
        console.log('Initializing enhanced Jocelyne Saab theme...');
        
        initHeader();
        initHamburgerMenu();
        initHeroSection();
        initSmoothScrolling();
        initCarousels();
        initAccessibility();
        initPerformanceOptimizations();
        
        console.log('Theme initialization complete.');
    }

    /**
     * Header functionality with scroll effects
     */
    function initHeader() {
        const header = document.getElementById('site-header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for background changes
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Optional: Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }

        function requestHeaderUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        // Use passive listeners for better performance
        window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
        
        // Handle window resize
        window.addEventListener('resize', debounce(function() {
            updateHeader();
        }, 250));
    }

    /**
     * Enhanced hamburger menu functionality
     */
    function initHamburgerMenu() {
        console.log('Initializing hamburger menu...');
        
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const menuOverlay = document.getElementById('menu-overlay');
        const menuClose = document.getElementById('menu-overlay-close');
        const body = document.body;

        if (!menuToggle || !menuOverlay) {
            console.warn('Menu elements not found!');
            return;
        }

        // Focus management for accessibility
        const focusableElements = menuOverlay.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        function openMenu() {
            console.log('Opening menu...');
            isMenuOpen = true;
            
            menuOverlay.setAttribute('aria-hidden', 'false');
            menuOverlay.classList.add('open');
            menuToggle.setAttribute('aria-expanded', 'true');
            body.classList.add('menu-open');
            
            // Prevent body scroll
            body.style.overflow = 'hidden';
            
            // Focus first element
            setTimeout(() => {
                if (firstFocusableElement) {
                    firstFocusableElement.focus();
                }
            }, 300);
        }

        function closeMenu() {
            console.log('Closing menu...');
            isMenuOpen = false;
            
            menuOverlay.setAttribute('aria-hidden', 'true');
            menuOverlay.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.classList.remove('menu-open');
            
            // Restore body scroll
            body.style.overflow = '';
            
            // Return focus to toggle button
            menuToggle.focus();
        }

        function toggleMenu() {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Event listeners
        menuToggle.addEventListener('click', toggleMenu);
        
        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }

        // Close menu when clicking overlay background
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!isMenuOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeMenu();
                    break;
                case 'Tab':
                    // Trap focus within menu
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                    break;
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', debounce(function() {
            if (isMenuOpen && window.innerWidth > 768) {
                closeMenu();
            }
        }, 250));
    }

    /**
     * Hero section enhancements
     */
    function initHeroSection() {
        const heroVideo = document.querySelector('.hero-video');
        const heroSection = document.querySelector('.hero-section');
        
        if (heroVideo) {
            initHeroVideo(heroVideo);
        }
        
        if (heroSection) {
            initHeroAnimations();
        }
    }

    /**
     * Hero video functionality
     */
    function initHeroVideo(video) {
        const loadingIndicator = document.querySelector('.hero-video-loading');
        
        // Handle video loading states
        video.addEventListener('loadstart', function() {
            this.setAttribute('data-loading', 'true');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'block';
            }
        });

        video.addEventListener('canplaythrough', function() {
            this.setAttribute('data-loaded', 'true');
            this.setAttribute('data-loading', 'false');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        });

        video.addEventListener('error', function() {
            console.warn('Hero video failed to load');
            this.style.display = 'none';
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        });

        // Optimize video playback
        video.addEventListener('loadedmetadata', function() {
            // Ensure video maintains aspect ratio
            this.style.opacity = '1';
        });

        // Pause video when not in viewport (performance optimization)
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.warn('Video autoplay failed:', e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }

    /**
     * Hero animations
     */
    function initHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta, .hero-scroll-indicator');
        
        // Add intersection observer for animations
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.3 });

        heroElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Smooth scrolling functionality
     */
    function initSmoothScrolling() {
        // Global scroll function
        window.scrollToSection = function(targetId) {
            const target = document.getElementById(targetId) || 
                          document.querySelector('.section-news-carousel') || 
                          document.querySelector('[id*="news"]') ||
                          document.querySelector('.section-news-carousel');
            
            if (target) {
                const headerHeight = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close menu if open
                if (isMenuOpen) {
                    const menuOverlay = document.getElementById('menu-overlay');
                    const body = document.body;
                    const menuToggle = document.getElementById('mobile-menu-toggle');
                    
                    if (menuOverlay) {
                        menuOverlay.setAttribute('aria-hidden', 'true');
                        menuOverlay.classList.remove('open');
                        body.classList.remove('menu-open');
                        body.style.overflow = '';
                        if (menuToggle) {
                            menuToggle.setAttribute('aria-expanded', 'false');
                        }
                        isMenuOpen = false;
                    }
                }
            }
        };

        // Handle all scroll-to links
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"], a[data-scroll-target]');
            if (!link) return;

            const targetId = link.getAttribute('data-scroll-target') || 
                           link.getAttribute('href').substring(1);
            
            if (targetId && targetId !== '#') {
                e.preventDefault();
                window.scrollToSection(targetId);
            }
        });

        // Handle hero CTA specifically
        const heroCtaBtn = document.querySelector('.hero-cta a[data-scroll-target]');
        if (heroCtaBtn) {
            heroCtaBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-scroll-target');
                window.scrollToSection(targetId);
            });
        }
    }

    /**
     * Carousel enhancements
     */
    function initCarousels() {
        // News carousel scroll functionality
        const newsCarousel = document.getElementById('news-carousel');
        const leftArrow = document.querySelector('.carousel-arrow-left');
        const rightArrow = document.querySelector('.carousel-arrow-right');

        if (newsCarousel && leftArrow && rightArrow) {
            initNewsCarousel(newsCarousel, leftArrow, rightArrow);
        }

        // Initialize Swiper carousels if available
        if (typeof Swiper !== 'undefined') {
            initSwiperCarousels();
        }

        // Generic carousel touch support
        initCarouselTouchSupport();
    }

    /**
     * News carousel functionality
     */
    function initNewsCarousel(carousel, leftArrow, rightArrow) {
        let isScrolling = false;

        function scrollCarousel(direction) {
            if (isScrolling) return;
            isScrolling = true;

            const scrollAmount = 350;
            const currentScroll = carousel.scrollLeft;
            const targetScroll = direction === 'left' 
                ? currentScroll - scrollAmount 
                : currentScroll + scrollAmount;

            carousel.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isScrolling = false;
                updateArrowStates();
            }, 300);
        }

        function updateArrowStates() {
            const isAtStart = carousel.scrollLeft <= 0;
            const isAtEnd = carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth);

            leftArrow.style.opacity = isAtStart ? '0.5' : '1';
            rightArrow.style.opacity = isAtEnd ? '0.5' : '1';
            leftArrow.style.pointerEvents = isAtStart ? 'none' : 'auto';
            rightArrow.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        leftArrow.addEventListener('click', () => scrollCarousel('left'));
        rightArrow.addEventListener('click', () => scrollCarousel('right'));

        // Update arrow states on scroll
        carousel.addEventListener('scroll', debounce(updateArrowStates, 100));

        // Initial state
        updateArrowStates();
    }

    /**
     * Swiper carousel initialization
     */
    function initSwiperCarousels() {
        // Films carousel
        const filmsCarousel = document.querySelector('.films-carousel');
        if (filmsCarousel) {
            new Swiper(filmsCarousel, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: false,
                navigation: {
                    nextEl: '.films-carousel .swiper-button-next',
                    prevEl: '.films-carousel .swiper-button-prev',
                },
                pagination: {
                    el: '.films-carousel .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
                accessibility: {
                    enabled: true,
                    prevSlideMessage: 'Previous film',
                    nextSlideMessage: 'Next film',
                }
            });
        }

        // Workshops carousel
        const workshopsCarousel = document.querySelector('.workshops-carousel');
        if (workshopsCarousel) {
            new Swiper(workshopsCarousel, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: false,
                navigation: {
                    nextEl: '.workshops-carousel .swiper-button-next',
                    prevEl: '.workshops-carousel .swiper-button-prev',
                },
                pagination: {
                    el: '.workshops-carousel .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
                accessibility: {
                    enabled: true,
                    prevSlideMessage: 'Previous workshop',
                    nextSlideMessage: 'Next workshop',
                }
            });
        }
    }

    /**
     * Touch support for carousels
     */
    function initCarouselTouchSupport() {
        const carousels = document.querySelectorAll('.news-carousel');
        
        carousels.forEach(carousel => {
            let startX = 0;
            let scrollStart = 0;
            let isDragging = false;

            carousel.addEventListener('touchstart', function(e) {
                startX = e.touches[0].pageX;
                scrollStart = this.scrollLeft;
                isDragging = true;
            }, { passive: true });

            carousel.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                
                const x = e.touches[0].pageX;
                const walk = (x - startX) * 2;
                this.scrollLeft = scrollStart - walk;
            }, { passive: true });

            carousel.addEventListener('touchend', function() {
                isDragging = false;
            }, { passive: true });
        });
    }

    /**
     * Accessibility enhancements
     */
    function initAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Keyboard navigation for custom elements
        document.addEventListener('keydown', function(e) {
            // Handle Enter and Space for custom buttons
            if ((e.key === 'Enter' || e.key === ' ') && 
                e.target.classList.contains('scroll-down-btn')) {
                e.preventDefault();
                e.target.click();
            }
        });

        // Announce page changes for screen readers
        const pageTitle = document.title;
        if (pageTitle && 'speechSynthesis' in window) {
            // Announce page load
            setTimeout(() => {
                const announcement = `Page loaded: ${pageTitle}`;
                announceToScreenReader(announcement);
            }, 1000);
        }
    }

    /**
     * Performance optimizations
     */
    function initPerformanceOptimizations() {
        // Lazy loading for images
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }

        // Preload critical resources
        preloadCriticalResources();
        
        // Optimize scroll performance
        optimizeScrollPerformance();
    }

    /**
     * Preload critical resources
     */
    function preloadCriticalResources() {
        // Preload fonts
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800;900&display=swap',
            'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            link.onload = function() { this.rel = 'stylesheet'; };
            document.head.appendChild(link);
        });
    }

    /**
     * Optimize scroll performance
     */
    function optimizeScrollPerformance() {
        // Throttle scroll events
        let ticking = false;

        function updateOnScroll() {
            // Perform scroll-based updates here
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * Utility functions
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-9999px';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Export functions for global access
    window.SaabTheme = {
        scrollToSection: window.scrollToSection,
        openMenu: function() {
            const menuToggle = document.getElementById('mobile-menu-toggle');
            if (menuToggle) menuToggle.click();
        },
        closeMenu: function() {
            const menuClose = document.getElementById('menu-overlay-close');
            if (menuClose) menuClose.click();
        }
    };

    // Handle page visibility changes for performance
    document.addEventListener('visibilitychange', function() {
        const videos = document.querySelectorAll('video');
        if (document.hidden) {
            videos.forEach(video => video.pause());
        } else {
            videos.forEach(video => {
                if (video.classList.contains('hero-video')) {
                    video.play().catch(e => console.warn('Video play failed:', e));
                }
            });
        }
    });

    // Initialize theme on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }

})();