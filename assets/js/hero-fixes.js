/**
 * Hero Section JavaScript Fixes for Jocelyne Saab Theme
 * Handles button functionality and smooth scrolling
 * Author: Enhanced by AI Assistant
 * Date: 2025-01-27
 * Version: 2.0.0
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initHeroFunctionality();
    });

    /**
     * Initialize hero section functionality
     */
    function initHeroFunctionality() {
        console.log('Initializing hero functionality...');
        
        setupExploreButton();
        setupScrollIndicator();
        setupVideoHandling();
        setupHeroAnimations();
    }

    /**
     * Setup the "Explore Our Work" button to scroll to news section
     */
    function setupExploreButton() {
        const exploreButton = document.querySelector('.hero-cta .btn');
        
        if (!exploreButton) {
            console.warn('Explore button not found');
            return;
        }

        // Update the button's href to point to news section
        exploreButton.setAttribute('href', '#latest-news');
        
        // Add click handler for smooth scrolling
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const newsSection = document.querySelector('.section-news-carousel');
            
            if (newsSection) {
                console.log('Scrolling to news section...');
                
                // Smooth scroll to news section
                newsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add focus to the section for accessibility
                setTimeout(() => {
                    const newsTitle = newsSection.querySelector('.section-title-centered');
                    if (newsTitle) {
                        newsTitle.focus();
                    }
                }, 1000);
            } else {
                console.warn('News section not found, falling back to featured films');
                const filmsSection = document.querySelector('#featured-films');
                if (filmsSection) {
                    filmsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        console.log('Explore button functionality initialized');
    }

    /**
     * Setup scroll indicator functionality
     */
    function setupScrollIndicator() {
        const scrollButton = document.querySelector('.scroll-down-btn');
        
        if (!scrollButton) {
            console.warn('Scroll indicator button not found');
            return;
        }

        // Update scroll button to also go to news section
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const newsSection = document.querySelector('.section-news-carousel');
            
            if (newsSection) {
                console.log('Scroll indicator: scrolling to news section...');
                
                newsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback to featured films
                const filmsSection = document.querySelector('#featured-films');
                if (filmsSection) {
                    filmsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Add keyboard support
        scrollButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollButton.click();
            }
        });

        console.log('Scroll indicator functionality initialized');
    }

    /**
     * Enhanced video handling
     */
    function setupVideoHandling() {
        const heroVideo = document.querySelector('.hero-video');
        
        if (!heroVideo) {
            console.log('No hero video found');
            return;
        }

        // Add loading state
        heroVideo.setAttribute('data-loading', 'true');

        // Handle video load events
        heroVideo.addEventListener('loadstart', function() {
            console.log('Hero video loading started');
            heroVideo.setAttribute('data-loading', 'true');
        });

        heroVideo.addEventListener('canplay', function() {
            console.log('Hero video can play');
            heroVideo.setAttribute('data-loading', 'false');
            heroVideo.setAttribute('data-loaded', 'true');
        });

        heroVideo.addEventListener('error', function(e) {
            console.error('Hero video failed to load:', e);
            heroVideo.setAttribute('data-loading', 'false');
            
            // Show fallback background
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.classList.add('video-error');
            }
        });

        // Ensure video plays on mobile devices
        heroVideo.addEventListener('loadedmetadata', function() {
            if (heroVideo.paused) {
                heroVideo.play().catch(function(error) {
                    console.warn('Video autoplay failed:', error);
                });
            }
        });

        // Handle visibility change (pause/play when tab is hidden/visible)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(function(error) {
                    console.warn('Video play failed on visibility change:', error);
                });
            }
        });

        console.log('Video handling initialized');
    }

    /**
     * Setup hero animations and interactions
     */
    function setupHeroAnimations() {
        const heroSection = document.querySelector('.hero-section');
        
        if (!heroSection) {
            console.warn('Hero section not found');
            return;
        }

        // Add intersection observer for animation triggers
        if ('IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('hero-visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            heroObserver.observe(heroSection);
        }

        // Add scroll-based parallax effect (subtle)
        let ticking = false;
        
        function updateHeroParallax() {
            const scrollY = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrollY < heroHeight) {
                const parallaxSpeed = 0.5;
                const yPos = -(scrollY * parallaxSpeed);
                
                const heroVideo = heroSection.querySelector('.hero-video');
                const heroImage = heroSection.querySelector('.hero-image');
                
                if (heroVideo) {
                    heroVideo.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
                }
                
                if (heroImage) {
                    heroImage.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
                }
            }
            
            ticking = false;
        }

        function requestParallaxUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateHeroParallax);
                ticking = true;
            }
        }

        // Only add parallax on desktop to avoid performance issues on mobile
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
        }

        console.log('Hero animations initialized');
    }

    /**
     * Utility function to add smooth scroll polyfill for older browsers
     */
    function addSmoothScrollPolyfill() {
        if (!('scrollBehavior' in document.documentElement.style)) {
            // Load smooth scroll polyfill for older browsers
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@1.4.10/dist/smoothscroll.min.js';
            script.onload = function() {
                console.log('Smooth scroll polyfill loaded');
            };
            document.head.appendChild(script);
        }
    }

    // Initialize smooth scroll polyfill
    addSmoothScrollPolyfill();

    // Expose functions for debugging
    window.saabHero = {
        initHeroFunctionality,
        setupExploreButton,
        setupScrollIndicator,
        setupVideoHandling
    };

})();

