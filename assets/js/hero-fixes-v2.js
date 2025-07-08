/**
 * Hero Section Fixes for Jocelyne Saab Theme - Version 2
 * Enhanced video handling and smooth scrolling functionality
 * Author: Enhanced by AI Assistant
 * Date: 2025-01-27
 * Version: 2.1.0
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initHeroFixes();
    });

    /**
     * Initialize all hero section fixes
     */
    function initHeroFixes() {
        console.log('Initializing hero fixes...');
        initEnhancedHeroVideo();
        initSmoothScrolling();
        initHeroResponsiveness();
        initHeroAccessibility();
    }

    /**
     * Enhanced hero video functionality with better error handling
     */
    function initEnhancedHeroVideo() {
        const heroVideo = document.querySelector('.hero-video');
        const heroBackground = document.querySelector('.hero-background');
        
        if (!heroVideo) {
            console.log('No hero video found');
            return;
        }

        console.log('Initializing hero video...');

        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'hero-video-loading';
        heroBackground.appendChild(loadingIndicator);

        // Set initial loading state
        heroVideo.setAttribute('data-loading', 'true');

        // Handle video load success
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Hero video loaded successfully');
            heroVideo.setAttribute('data-loaded', 'true');
            heroVideo.setAttribute('data-loading', 'false');
            heroVideo.style.opacity = '1';
            
            // Remove loading indicator
            if (loadingIndicator.parentNode) {
                loadingIndicator.parentNode.removeChild(loadingIndicator);
            }
        });

        // Handle video load errors
        heroVideo.addEventListener('error', function(e) {
            console.error('Hero video failed to load:', e);
            handleVideoError();
        });

        // Handle video stall/timeout
        heroVideo.addEventListener('stalled', function() {
            console.warn('Hero video stalled, falling back...');
            setTimeout(handleVideoError, 5000); // Fallback after 5 seconds
        });

        // Handle video loading timeout
        setTimeout(function() {
            if (heroVideo.getAttribute('data-loaded') !== 'true') {
                console.warn('Hero video loading timeout, falling back...');
                handleVideoError();
            }
        }, 10000); // 10 second timeout

        function handleVideoError() {
            console.log('Switching to fallback background');
            
            // Hide video
            heroVideo.style.display = 'none';
            
            // Remove loading indicator
            if (loadingIndicator.parentNode) {
                loadingIndicator.parentNode.removeChild(loadingIndicator);
            }
            
            // Add fallback class
            heroBackground.classList.add('hero-fallback');
            heroBackground.classList.remove('hero-video');
            
            // Create fallback background
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'hero-fallback';
            heroBackground.appendChild(fallbackDiv);
        }

        // Intersection Observer for performance optimization
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is visible, ensure it's playing
                    heroVideo.play().catch(e => {
                        console.log('Video autoplay prevented or failed:', e);
                        // Don't fallback here, just log the issue
                    });
                } else {
                    // Video is not visible, pause for performance
                    heroVideo.pause();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(heroVideo);

        // Handle autoplay restrictions
        heroVideo.addEventListener('pause', function() {
            if (heroVideo.currentTime === 0 && heroVideo.getAttribute('data-loaded') === 'true') {
                // Video was paused at start, try to play again
                heroVideo.play().catch(e => {
                    console.log('Video play failed, this is normal for autoplay restrictions:', e);
                });
            }
        });

        // Ensure video loops properly
        heroVideo.addEventListener('ended', function() {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(e => {
                console.log('Video replay failed:', e);
            });
        });

        // Handle video metadata
        heroVideo.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded, duration:', heroVideo.duration);
        });

        // Preload video
        heroVideo.preload = 'metadata';
        
        // Try to load video immediately
        heroVideo.load();
    }

    /**
     * Enhanced smooth scrolling functionality
     */
    function initSmoothScrolling() {
        console.log('Initializing smooth scrolling...');

        // Handle "Explore Our Work" button
        const exploreButton = document.querySelector('.hero-cta .btn');
        if (exploreButton) {
            exploreButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                let targetElement = null;
                
                if (targetId && targetId.startsWith('#')) {
                    targetElement = document.querySelector(targetId);
                }
                
                // Fallback targets if the specified target doesn't exist
                if (!targetElement) {
                    const fallbackSelectors = [
                        '#latest-news',
                        '#featured-films',
                        '.latest-news',
                        '.featured-films',
                        '.section:nth-of-type(2)'
                    ];
                    
                    for (const selector of fallbackSelectors) {
                        targetElement = document.querySelector(selector);
                        if (targetElement) {
                            console.log('Using fallback target:', selector);
                            break;
                        }
                    }
                }
                
                if (targetElement) {
                    scrollToElement(targetElement);
                } else {
                    console.warn('No target element found for smooth scroll');
                    // Fallback: scroll down by viewport height
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Handle scroll down button
        const scrollDownBtn = document.querySelector('.scroll-down-btn');
        if (scrollDownBtn) {
            scrollDownBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Find the next section after hero
                const heroSection = document.querySelector('.hero-section');
                let nextSection = null;
                
                if (heroSection) {
                    nextSection = heroSection.nextElementSibling;
                    
                    // Skip any non-section elements
                    while (nextSection && !nextSection.classList.contains('section') && nextSection.tagName !== 'SECTION') {
                        nextSection = nextSection.nextElementSibling;
                    }
                }
                
                if (nextSection) {
                    scrollToElement(nextSection);
                } else {
                    // Fallback: scroll down by viewport height
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Handle all anchor links for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    scrollToElement(targetElement);
                }
            });
        });
    }

    /**
     * Scroll to element with proper offset calculation
     */
    function scrollToElement(element) {
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 80;
        const additionalOffset = 20; // Extra spacing
        
        const elementTop = element.offsetTop;
        const targetPosition = elementTop - headerHeight - additionalOffset;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });

        // Update URL hash if element has an ID
        if (element.id) {
            history.pushState(null, null, '#' + element.id);
        }

        // Focus element for accessibility
        element.focus({ preventScroll: true });
    }

    /**
     * Hero responsiveness enhancements
     */
    function initHeroResponsiveness() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        function updateHeroHeight() {
            const viewportHeight = window.innerHeight;
            const minHeight = 500; // Minimum height in pixels
            
            // Ensure hero section is at least viewport height but not less than minimum
            const targetHeight = Math.max(viewportHeight, minHeight);
            heroSection.style.height = targetHeight + 'px';
        }

        // Update on load and resize
        updateHeroHeight();
        window.addEventListener('resize', debounce(updateHeroHeight, 250));

        // Handle orientation change on mobile
        window.addEventListener('orientationchange', function() {
            setTimeout(updateHeroHeight, 500);
        });
    }

    /**
     * Hero accessibility enhancements
     */
    function initHeroAccessibility() {
        const heroVideo = document.querySelector('.hero-video');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        // Add proper ARIA labels
        if (heroVideo) {
            heroVideo.setAttribute('aria-hidden', 'true');
            heroVideo.setAttribute('role', 'presentation');
        }
        
        // Ensure hero content is properly announced
        if (heroTitle) {
            heroTitle.setAttribute('role', 'heading');
            heroTitle.setAttribute('aria-level', '1');
        }
        
        if (heroSubtitle) {
            heroSubtitle.setAttribute('role', 'text');
        }
        
        // Handle reduced motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable video autoplay for users who prefer reduced motion
            if (heroVideo) {
                heroVideo.autoplay = false;
                heroVideo.pause();
            }
            
            // Remove animations
            document.documentElement.style.setProperty('--hero-animation-duration', '0s');
        }
        
        // Handle high contrast preferences
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.classList.add('high-contrast');
        }
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
    window.heroFixes = {
        initHeroFixes,
        initEnhancedHeroVideo,
        initSmoothScrolling,
        scrollToElement
    };

})();

