/**
 * Carousel Fixes for Jocelyne Saab Theme - Version 2
 * Enhanced carousel functionality with improved performance and accessibility
 * Author: Enhanced by AI Assistant
 * Date: 2025-01-27
 * Version: 2.1.0
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initCarouselFixes();
    });

    /**
     * Initialize all carousel fixes
     */
    function initCarouselFixes() {
        console.log('Initializing carousel fixes...');
        initEnhancedCarousels();
        initCarouselAccessibility();
        initCarouselPerformance();
        initCarouselResponsiveness();
    }

    /**
     * Enhanced carousel initialization with better configuration
     */
    function initEnhancedCarousels() {
        // Common Swiper configuration
        const commonConfig = {
            slidesPerView: 'auto',
            spaceBetween: 20,
            grabCursor: true,
            watchOverflow: true,
            observer: true,
            observeParents: true,
            speed: 600,
            loop: false,
            centeredSlides: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            a11y: {
                enabled: true,
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
                paginationBulletMessage: 'Go to slide {{index}}',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 25,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1400: {
                    slidesPerView: 3.5,
                    spaceBetween: 30,
                }
            }
        };

        // Films carousel configuration
        const filmsConfig = {
            ...commonConfig,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 1.3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 25,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        };

        // Workshops carousel configuration
        const workshopsConfig = {
            ...commonConfig,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 1.8,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.3,
                    spaceBetween: 25,
                },
                1200: {
                    slidesPerView: 2.8,
                    spaceBetween: 30,
                }
            }
        };

        // News carousel configuration
        const newsConfig = {
            ...commonConfig,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 1.1,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 25,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        };

        // Gallery carousel configuration (for image galleries)
        const galleryConfig = {
            ...commonConfig,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            effect: 'slide',
            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                },
                480: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 25,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            }
        };

        // Initialize carousels
        initCarousel('.films-carousel', filmsConfig);
        initCarousel('.workshops-carousel', workshopsConfig);
        initCarousel('.news-carousel', newsConfig);
        initCarousel('.featured-carousel', commonConfig);
        initCarousel('.stories-swiper', commonConfig);
        initCarousel('.film-stills-swiper', galleryConfig);
        initCarousel('.workshop-gallery-swiper', galleryConfig);
    }

    /**
     * Initialize individual carousel with error handling
     */
    function initCarousel(selector, config) {
        const carouselElement = document.querySelector(selector);
        if (!carouselElement) {
            console.log(`Carousel ${selector} not found`);
            return;
        }

        try {
            // Add loading state
            carouselElement.classList.add('carousel-loading');

            // Initialize Swiper
            const swiper = new Swiper(selector, {
                ...config,
                on: {
                    init: function() {
                        console.log(`Carousel ${selector} initialized`);
                        carouselElement.classList.remove('carousel-loading');
                        carouselElement.classList.add('carousel-ready');
                        
                        // Trigger custom event
                        carouselElement.dispatchEvent(new CustomEvent('carouselReady', {
                            detail: { swiper: this }
                        }));
                    },
                    slideChange: function() {
                        // Update ARIA labels
                        updateAriaLabels(this);
                        
                        // Lazy load images in upcoming slides
                        lazyLoadUpcomingImages(this);
                    },
                    reachEnd: function() {
                        // Handle end of carousel
                        this.el.classList.add('carousel-at-end');
                    },
                    reachBeginning: function() {
                        // Handle beginning of carousel
                        this.el.classList.add('carousel-at-beginning');
                    },
                    fromEdge: function() {
                        // Remove edge classes when moving from edge
                        this.el.classList.remove('carousel-at-end', 'carousel-at-beginning');
                    },
                    resize: function() {
                        // Handle responsive updates
                        this.update();
                    }
                }
            });

            // Store swiper instance for later use
            carouselElement.swiperInstance = swiper;

            // Add touch/mouse interaction enhancements
            enhanceCarouselInteraction(carouselElement, swiper);

        } catch (error) {
            console.error(`Error initializing carousel ${selector}:`, error);
            carouselElement.classList.remove('carousel-loading');
            carouselElement.classList.add('carousel-error');
        }
    }

    /**
     * Enhance carousel interaction with touch and mouse events
     */
    function enhanceCarouselInteraction(element, swiper) {
        // Pause autoplay on hover
        if (swiper.autoplay) {
            element.addEventListener('mouseenter', () => {
                swiper.autoplay.stop();
            });

            element.addEventListener('mouseleave', () => {
                swiper.autoplay.start();
            });
        }

        // Add keyboard navigation
        element.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                swiper.slidePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                swiper.slideNext();
            }
        });

        // Add focus management
        const slides = element.querySelectorAll('.swiper-slide');
        slides.forEach((slide, index) => {
            slide.setAttribute('tabindex', index === 0 ? '0' : '-1');
            
            slide.addEventListener('focus', () => {
                swiper.slideTo(index);
            });
        });
    }

    /**
     * Update ARIA labels for accessibility
     */
    function updateAriaLabels(swiper) {
        const slides = swiper.slides;
        const activeIndex = swiper.activeIndex;
        
        slides.forEach((slide, index) => {
            const isActive = index === activeIndex;
            slide.setAttribute('aria-hidden', !isActive);
            slide.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        // Update pagination bullets
        const bullets = swiper.pagination?.bullets;
        if (bullets) {
            bullets.forEach((bullet, index) => {
                const isActive = index === activeIndex;
                bullet.setAttribute('aria-pressed', isActive);
                bullet.setAttribute('aria-label', `Go to slide ${index + 1}`);
            });
        }
    }

    /**
     * Lazy load images in upcoming slides
     */
    function lazyLoadUpcomingImages(swiper) {
        const activeIndex = swiper.activeIndex;
        const slidesToLoad = 2; // Load 2 slides ahead
        
        for (let i = activeIndex; i < activeIndex + slidesToLoad && i < swiper.slides.length; i++) {
            const slide = swiper.slides[i];
            const lazyImages = slide.querySelectorAll('img[data-src]');
            
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
            });
        }
    }

    /**
     * Enhanced accessibility features
     */
    function initCarouselAccessibility() {
        // Add ARIA labels to carousel containers
        document.querySelectorAll('.swiper-container').forEach(container => {
            container.setAttribute('role', 'region');
            container.setAttribute('aria-label', 'Content carousel');
        });

        // Improve navigation button accessibility
        document.querySelectorAll('.swiper-button-next, .swiper-button-prev').forEach(button => {
            button.setAttribute('role', 'button');
            button.setAttribute('tabindex', '0');
            
            // Add keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Improve pagination accessibility
        document.querySelectorAll('.swiper-pagination').forEach(pagination => {
            pagination.setAttribute('role', 'tablist');
            pagination.setAttribute('aria-label', 'Carousel pagination');
        });

        // Handle reduced motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable autoplay for all carousels
            document.querySelectorAll('.swiper-container').forEach(container => {
                if (container.swiperInstance && container.swiperInstance.autoplay) {
                    container.swiperInstance.autoplay.stop();
                }
            });
        }
    }

    /**
     * Performance optimizations
     */
    function initCarouselPerformance() {
        // Intersection Observer for lazy initialization
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const carousel = entry.target;
                    
                    // Initialize carousel if not already done
                    if (!carousel.swiperInstance && !carousel.classList.contains('carousel-ready')) {
                        // Re-initialize carousel when it comes into view
                        const selector = '.' + carousel.className.split(' ')[0];
                        // This would need to be called with appropriate config
                        console.log(`Lazy initializing carousel: ${selector}`);
                    }
                    
                    // Start autoplay if available
                    if (carousel.swiperInstance && carousel.swiperInstance.autoplay) {
                        carousel.swiperInstance.autoplay.start();
                    }
                } else {
                    const carousel = entry.target;
                    
                    // Pause autoplay when not visible
                    if (carousel.swiperInstance && carousel.swiperInstance.autoplay) {
                        carousel.swiperInstance.autoplay.stop();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observe all carousels
        document.querySelectorAll('.swiper-container').forEach(carousel => {
            carouselObserver.observe(carousel);
        });

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                document.querySelectorAll('.swiper-container').forEach(container => {
                    if (container.swiperInstance) {
                        container.swiperInstance.update();
                    }
                });
            }, 250);
        });
    }

    /**
     * Responsive behavior enhancements
     */
    function initCarouselResponsiveness() {
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                document.querySelectorAll('.swiper-container').forEach(container => {
                    if (container.swiperInstance) {
                        container.swiperInstance.update();
                    }
                });
            }, 500);
        });

        // Handle dynamic content changes
        const contentObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    const carousel = mutation.target.closest('.swiper-container');
                    if (carousel && carousel.swiperInstance) {
                        carousel.swiperInstance.update();
                    }
                }
            });
        });

        // Observe carousel content changes
        document.querySelectorAll('.swiper-wrapper').forEach(wrapper => {
            contentObserver.observe(wrapper, {
                childList: true,
                subtree: true
            });
        });
    }

    /**
     * Utility function for debouncing
     */
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Utility function for throttling
     */
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Expose functions globally for debugging
    window.carouselFixes = {
        initCarouselFixes,
        initEnhancedCarousels,
        initCarousel
    };

})();

