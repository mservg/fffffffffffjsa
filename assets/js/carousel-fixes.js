/**
 * Enhanced Carousel Functionality for Jocelyne Saab Theme
 * Fixes scoping issues and improves carousel initialization
 * Author: Enhanced by AI Assistant
 * Date: 2025-01-27
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initEnhancedCarousels();
    });

    /**
     * Initialize all carousels with proper scoping
     */
    function initEnhancedCarousels() {
        console.log('Initializing enhanced carousels...');
        
        // Check if Swiper is loaded
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper library not loaded, falling back to basic carousel functionality');
            initBasicCarousels();
            return;
        }

        // Initialize each carousel type
        initFilmsCarousel();
        initWorkshopsCarousel();
        initNewsCarousel();
        initStoriesCarousel();
        initFilmStillsCarousel();
        initWorkshopGalleryCarousel();
    }

    /**
     * Initialize Films carousel with proper scoping
     */
    function initFilmsCarousel() {
        const filmsCarousel = document.querySelector('.films-carousel');
        if (!filmsCarousel) return;

        try {
            new Swiper('.films-carousel', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                navigation: {
                    nextEl: '.films-carousel .swiper-button-next',
                    prevEl: '.films-carousel .swiper-button-prev',
                },
                pagination: {
                    el: '.films-carousel .swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                breakpoints: {
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                },
                keyboard: {
                    enabled: true,
                },
                a11y: {
                    enabled: true,
                    prevSlideMessage: 'Previous film',
                    nextSlideMessage: 'Next film',
                    firstSlideMessage: 'This is the first film',
                    lastSlideMessage: 'This is the last film',
                },
                on: {
                    init: function() {
                        console.log('Films carousel initialized');
                    },
                    slideChange: function() {
                        // Pause any videos in non-active slides
                        this.slides.forEach(slide => {
                            const videos = slide.querySelectorAll('video');
                            videos.forEach(video => video.pause());
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing films carousel:', error);
        }
    }

    /**
     * Initialize Workshops carousel with proper scoping
     */
    function initWorkshopsCarousel() {
        const workshopsCarousel = document.querySelector('.workshops-carousel');
        if (!workshopsCarousel) return;

        try {
            new Swiper('.workshops-carousel', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                navigation: {
                    nextEl: '.workshops-carousel .swiper-button-next',
                    prevEl: '.workshops-carousel .swiper-button-prev',
                },
                pagination: {
                    el: '.workshops-carousel .swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                breakpoints: {
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
                keyboard: {
                    enabled: true,
                },
                a11y: {
                    enabled: true,
                    prevSlideMessage: 'Previous workshop',
                    nextSlideMessage: 'Next workshop',
                },
                on: {
                    init: function() {
                        console.log('Workshops carousel initialized');
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing workshops carousel:', error);
        }
    }

    /**
     * Initialize Stories carousel
     */
    function initStoriesCarousel() {
        const storiesCarousel = document.querySelector('.stories-swiper');
        if (!storiesCarousel) return;

        try {
            new Swiper('.stories-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.stories-swiper .swiper-button-next',
                    prevEl: '.stories-swiper .swiper-button-prev',
                },
                pagination: {
                    el: '.stories-swiper .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },
                keyboard: {
                    enabled: true,
                },
                a11y: {
                    enabled: true,
                },
                on: {
                    init: function() {
                        console.log('Stories carousel initialized');
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing stories carousel:', error);
        }
    }

    /**
     * Initialize Film Stills carousel
     */
    function initFilmStillsCarousel() {
        const filmStillsCarousel = document.querySelector('.film-stills-swiper');
        if (!filmStillsCarousel) return;

        try {
            new Swiper('.film-stills-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: '.film-stills-swiper .swiper-button-next',
                    prevEl: '.film-stills-swiper .swiper-button-prev',
                },
                pagination: {
                    el: '.film-stills-swiper .swiper-pagination',
                    clickable: true,
                },
                keyboard: { enabled: true },
                a11y: { enabled: true },
                rtl: document.dir === 'rtl',
                on: {
                    init: function() {
                        console.log('Film stills carousel initialized');
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing film stills carousel:', error);
        }
    }

    /**
     * Initialize Workshop Gallery carousel
     */
    function initWorkshopGalleryCarousel() {
        const workshopGalleryCarousel = document.querySelector('.workshop-gallery-swiper');
        if (!workshopGalleryCarousel) return;

        try {
            new Swiper('.workshop-gallery-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: '.workshop-gallery-swiper .swiper-button-next',
                    prevEl: '.workshop-gallery-swiper .swiper-button-prev',
                },
                pagination: {
                    el: '.workshop-gallery-swiper .swiper-pagination',
                    clickable: true,
                },
                keyboard: { enabled: true },
                a11y: { enabled: true },
                rtl: document.dir === 'rtl',
                on: {
                    init: function() {
                        console.log('Workshop gallery carousel initialized');
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing workshop gallery carousel:', error);
        }
    }

    /**
     * Enhanced News carousel (non-Swiper implementation)
     */
    function initNewsCarousel() {
        const newsCarousel = document.getElementById('news-carousel');
        const leftArrow = document.querySelector('.carousel-arrow-left');
        const rightArrow = document.querySelector('.carousel-arrow-right');
        
        if (!newsCarousel || !leftArrow || !rightArrow) return;

        console.log('Initializing news carousel...');

        function scrollCarousel(direction) {
            const card = newsCarousel.querySelector('.news-card');
            if (!card) return;
            
            const scrollAmount = card.offsetWidth + 32; // Card width + gap
            const newScrollLeft = newsCarousel.scrollLeft + (direction * scrollAmount);
            
            newsCarousel.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
            
            // Update arrow states after scroll
            setTimeout(updateArrowStates, 300);
        }

        function updateArrowStates() {
            const isAtStart = newsCarousel.scrollLeft <= 0;
            const isAtEnd = newsCarousel.scrollLeft + newsCarousel.clientWidth >= newsCarousel.scrollWidth - 1;
            
            leftArrow.style.opacity = isAtStart ? '0.5' : '1';
            rightArrow.style.opacity = isAtEnd ? '0.5' : '1';
            leftArrow.disabled = isAtStart;
            rightArrow.disabled = isAtEnd;
            
            leftArrow.setAttribute('aria-disabled', isAtStart);
            rightArrow.setAttribute('aria-disabled', isAtEnd);
        }

        // Event listeners
        leftArrow.addEventListener('click', () => scrollCarousel(-1));
        rightArrow.addEventListener('click', () => scrollCarousel(1));
        
        // Keyboard navigation
        leftArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollCarousel(-1);
            }
        });
        
        rightArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollCarousel(1);
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let scrollLeft = 0;

        newsCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - newsCarousel.offsetLeft;
            scrollLeft = newsCarousel.scrollLeft;
        });

        newsCarousel.addEventListener('touchmove', (e) => {
            if (!startX) return;
            e.preventDefault();
            const x = e.touches[0].pageX - newsCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            newsCarousel.scrollLeft = scrollLeft - walk;
        });

        newsCarousel.addEventListener('touchend', () => {
            startX = 0;
            updateArrowStates();
        });

        // Update arrow states on scroll
        newsCarousel.addEventListener('scroll', updateArrowStates);
        
        // Initial state
        updateArrowStates();
        
        console.log('News carousel initialized successfully');
    }

    /**
     * Fallback for when Swiper is not available
     */
    function initBasicCarousels() {
        console.log('Initializing basic carousel fallbacks...');
        
        // Basic carousel functionality for films and workshops
        const carousels = document.querySelectorAll('.films-carousel, .workshops-carousel');
        
        carousels.forEach(carousel => {
            const wrapper = carousel.querySelector('.swiper-wrapper');
            const slides = carousel.querySelectorAll('.swiper-slide');
            const nextBtn = carousel.querySelector('.swiper-button-next');
            const prevBtn = carousel.querySelector('.swiper-button-prev');
            
            if (!wrapper || !slides.length) return;
            
            let currentSlide = 0;
            const totalSlides = slides.length;
            
            function updateSlides() {
                slides.forEach((slide, index) => {
                    slide.style.display = index === currentSlide ? 'block' : 'none';
                });
                
                if (prevBtn) prevBtn.disabled = currentSlide === 0;
                if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentSlide < totalSlides - 1) {
                        currentSlide++;
                        updateSlides();
                    }
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentSlide > 0) {
                        currentSlide--;
                        updateSlides();
                    }
                });
            }
            
            // Initialize
            updateSlides();
        });
    }

    // Expose functions for debugging
    window.saabCarousels = {
        initEnhancedCarousels,
        initFilmsCarousel,
        initWorkshopsCarousel,
        initNewsCarousel
    };

})();

