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

    <!-- Menu Overlay -->
    <nav id="menu-overlay" class="menu-overlay" aria-hidden="true" tabindex="-1" role="navigation" aria-label="<?php esc_attr_e('Main Navigation', 'saab'); ?>">
        <div class="menu-overlay-inner">
            <!-- Close Button -->
            <button class="menu-overlay-close" 
                    id="menu-overlay-close" 
                    aria-label="<?php esc_attr_e('Close Menu', 'saab'); ?>">
                <span class="close-icon" aria-hidden="true">
                    <span class="close-line close-line1"></span>
                    <span class="close-line close-line2"></span>
                </span>
            </button>

            <!-- Navigation Menu -->
            <div class="menu-overlay-menu animated-menu">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'container' => false,
                    'menu_class' => 'nav-menu overlay-nav-menu',
                    'fallback_cb' => 'saab_fallback_menu',
                    'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                    'walker' => new class extends Walker_Nav_Menu {
                        public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
                            $classes = empty($item->classes) ? array() : (array) $item->classes;
                            $classes[] = 'menu-item-' . $item->ID;
                            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
                            $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
                            
                            $output .= '<li' . $class_names .'>';
                            
                            $attributes = ! empty($item->attr_title) ? ' title="'  . esc_attr($item->attr_title) .'"' : '';
                            $attributes .= ! empty($item->target) ? ' target="' . esc_attr($item->target) .'"' : '';
                            $attributes .= ! empty($item->xfn) ? ' rel="'    . esc_attr($item->xfn) .'"' : '';
                            $attributes .= ! empty($item->url) ? ' href="'   . esc_attr($item->url) .'"' : '';
                            
                            $item_output = isset($args->before) ? $args->before : '';
                            $item_output .= '<a' . $attributes .'>';
                            $item_output .= '<span>' . (isset($args->link_before) ? $args->link_before : '') . apply_filters('the_title', $item->title, $item->ID) . (isset($args->link_after) ? $args->link_after : '') . '</span>';
                            $item_output .= '</a>';
                            $item_output .= isset($args->after) ? $args->after : '';
                            
                            $output .= $item_output;
                        }
                    }
                ));
                ?>
            </div>

            <!-- Language Switcher -->
            <div class="language-switcher menu-language-switcher" role="navigation" aria-label="<?php esc_attr_e('Language Selection', 'saab'); ?>">
                <?php if (function_exists('pll_the_languages')) : ?>
                    <?php pll_the_languages(array(
                        'show_flags' => 1,
                        'show_names' => 1,
                        'display_names_as' => 'slug',
                        'force_home' => 0
                    )); ?>
                <?php elseif (function_exists('icl_get_languages')) : ?>
                    <?php
                    $languages = icl_get_languages('skip_missing=0&orderby=code');
                    if (!empty($languages)) :
                        foreach ($languages as $l) : ?>
                            <a href="<?php echo esc_url($l['url']); ?>" 
                               class="<?php echo $l['active'] ? 'current-lang' : ''; ?>" 
                               hreflang="<?php echo esc_attr($l['language_code']); ?>"
                               aria-label="<?php echo esc_attr(sprintf(__('Switch to %s', 'saab'), $l['native_name'])); ?>">
                                <?php echo esc_html(strtoupper($l['language_code'])); ?>
                            </a>
                        <?php endforeach;
                    endif; ?>
                <?php else : ?>
                    <a href="<?php echo esc_url(home_url('/en/')); ?>" 
                       class="<?php echo (strpos(get_locale(), 'en') === 0) ? 'current-lang' : ''; ?>" 
                       hreflang="en"
                       aria-label="<?php esc_attr_e('Switch to English', 'saab'); ?>">EN</a>
                    <a href="<?php echo esc_url(home_url('/fr/')); ?>" 
                       class="<?php echo (strpos(get_locale(), 'fr') === 0) ? 'current-lang' : ''; ?>" 
                       hreflang="fr"
                       aria-label="<?php esc_attr_e('Switch to French', 'saab'); ?>">FR</a>
                    <a href="<?php echo esc_url(home_url('/ar/')); ?>" 
                       class="<?php echo (strpos(get_locale(), 'ar') === 0) ? 'current-lang' : ''; ?>" 
                       hreflang="ar"
                       aria-label="<?php esc_attr_e('Switch to Arabic', 'saab'); ?>">AR</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>
</header>

<main id="main" class="site-main" role="main">