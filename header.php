<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <meta name="format-detection" content="telephone=no">
    <?php if (is_singular('film')) : ?>
        <meta property="og:type" content="video.movie">
        <meta property="og:title" content="<?php echo esc_attr(get_the_title()); ?>">
        <meta property="og:description" content="<?php echo esc_attr(wp_strip_all_tags(get_post_meta(get_the_ID(), '_saab_film_synopsis', true))); ?>">
        <?php if (has_post_thumbnail()) : ?>
            <meta property="og:image" content="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>">
        <?php endif; ?>
    <?php endif; ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e('Skip to content', 'saab'); ?></a>

<header class="site-header" id="site-header" role="banner">
    <div class="container">
        <div class="header-content header-flex">
            <!-- Hamburger Menu Button -->
            <div class="header-burger">
                <button class="mobile-menu-toggle" 
                        id="mobile-menu-toggle" 
                        aria-expanded="false" 
                        aria-controls="menu-overlay" 
                        aria-label="<?php esc_attr_e('Toggle Navigation Menu', 'saab'); ?>">
                    <span class="hamburger-icon" aria-hidden="true">
                        <span class="bar bar1"></span>
                        <span class="bar bar2"></span>
                        <span class="bar bar3"></span>
                    </span>
                </button>
            </div>

            <!-- Logo -->
            <div class="header-logo">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="logo-link" aria-label="<?php echo esc_attr(get_bloginfo('name')); ?> Home">
                    <div class="logo-placeholder">
                        <span class="logo-text">JS</span>
                    </div>
                </a>
            </div>

            <!-- Site Title -->
            <div class="header-title">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="site-title-link">
                    <span class="site-title-text"><?php echo esc_html(get_bloginfo('name')); ?></span>
                </a>
            </div>
        </div>
    </div>

<?php get_template_part('template-parts/overlay-menu'); ?>
</header>
<main id="main" class="site-main" role="main">