<?php
/**
 * Template part for displaying the homepage hero section
 * Enhanced with proper video handling and improved accessibility
 * @package Saab
 */

// Get hero background options from customizer
$hero_bg_type = get_theme_mod('hero_bg_type', 'video');
$hero_bg_image = get_theme_mod('hero_bg_image');
$hero_bg_video = get_theme_mod('hero_bg_video', 'https://jocelynesaab.org/wp-content/uploads/2025/04/header_beyrouth_ma_ville_2_1.mp4');
$hero_cta_text = get_theme_mod('hero_cta_text', __('Explore Our Work', 'saab'));
$hero_cta_url = get_theme_mod('hero_cta_url', '#latest-news');

// Fallback to featured image from a page called "Home" if no customizer settings
if (!$hero_bg_image) {
    $home_page_query = new WP_Query(array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'posts_per_page' => 1,
        's' => 'Home',
        'exact' => true
    ));
    
    if ($home_page_query->have_posts()) {
        $home_page_query->the_post();
        if (has_post_thumbnail()) {
            $hero_bg_image = get_the_post_thumbnail_url(get_the_ID(), 'full');
        }
        wp_reset_postdata();
    }
}

// Get site info
$site_name = get_bloginfo('name');
$site_description = get_bloginfo('description');
?>

<section class="hero-section" id="hero" role="banner" aria-label="<?php esc_attr_e('Hero section', 'saab'); ?>">
    <div class="hero-background">
        <?php if ($hero_bg_type === 'video' && $hero_bg_video) : ?>
            <video class="hero-video" 
                   autoplay 
                   muted 
                   loop 
                   playsinline 
                   preload="metadata"
                   data-loading="true"
                   aria-hidden="true"
                   onloadeddata="this.setAttribute('data-loaded', 'true'); this.setAttribute('data-loading', 'false');">
                <source src="<?php echo esc_url($hero_bg_video); ?>" type="video/mp4">
                <?php if ($hero_bg_image) : ?>
                    <img src="<?php echo esc_url($hero_bg_image); ?>" 
                         alt="<?php echo esc_attr($site_name); ?>"
                         class="hero-image">
                <?php endif; ?>
                <div class="hero-fallback"></div>
            </video>
            <div class="hero-video-loading" aria-hidden="true"></div>
        <?php elseif ($hero_bg_image) : ?>
            <img class="hero-image" 
                 src="<?php echo esc_url($hero_bg_image); ?>" 
                 alt="<?php echo esc_attr($site_name); ?>"
                 loading="eager"
                 decoding="async">
        <?php else : ?>
            <div class="hero-fallback" aria-hidden="true"></div>
        <?php endif; ?>
        
        <div class="hero-overlay" aria-hidden="true"></div>
    </div>
    
    <div class="hero-content">
        <div class="container">
            <div class="hero-text">
                <h1 class="hero-title">
                    <?php echo esc_html($site_name ?: 'Jocelyne Saab Association'); ?>
                </h1>
                
                <?php if ($site_description) : ?>
                    <div class="hero-subtitle">
                        <?php echo esc_html($site_description); ?>
                    </div>
                <?php endif; ?>
                
                <?php if ($hero_cta_text && $hero_cta_url) : ?>
                    <div class="hero-cta">
                        <a href="<?php echo esc_url($hero_cta_url); ?>" 
                           class="btn btn-outline-white"
                           data-scroll-target="latest-news"
                           aria-describedby="hero-cta-description">
                            <span><?php echo esc_html($hero_cta_text); ?></span>
                        </a>
                        <div id="hero-cta-description" class="sr-only">
                            <?php esc_html_e('Scroll down to view our latest news and updates', 'saab'); ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="hero-scroll-indicator" aria-hidden="true">
        <button class="scroll-down-btn" 
                onclick="scrollToSection('latest-news')" 
                aria-label="<?php esc_attr_e('Scroll down to latest news section', 'saab'); ?>"
                type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</section>

<script>
// Enhanced scroll functionality for hero buttons
function scrollToSection(targetId) {
    const target = document.getElementById(targetId) || 
                  document.querySelector('.section-news-carousel') || 
                  document.querySelector('[id*="news"]');
    
    if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize hero CTA button functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroCtaBtn = document.querySelector('.hero-cta a[data-scroll-target]');
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-target');
            scrollToSection(targetId);
        });
    }
    
    // Video loading optimization
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('canplaythrough', function() {
            this.setAttribute('data-loaded', 'true');
            this.setAttribute('data-loading', 'false');
        });
        
        heroVideo.addEventListener('error', function() {
            console.warn('Hero video failed to load, falling back to image/background');
            this.style.display = 'none';
        });
    }
});
</script>