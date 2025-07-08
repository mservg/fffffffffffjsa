<?php
/**
 * Single Partner Template
 */

get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

<!-- Partner Hero -->
<div class="partner-hero">
    <div class="partner-hero-bg">
        <?php if (has_post_thumbnail()) : ?>
            <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full')); ?>" alt="<?php the_title_attribute(); ?>" class="partner-hero-bg-image" />
        <?php endif; ?>
        <div class="partner-hero-overlay"></div>
    </div>
    <div class="partner-hero-content">
        <div class="container">
            <div class="partner-hero-text">
                <h1 class="partner-hero-title"><?php the_title(); ?></h1>
                <?php $partner_type = get_post_meta(get_the_ID(), '_saab_partner_type', true); ?>
                <?php if ($partner_type) : ?>
                    <p class="partner-hero-subtitle"><?php echo esc_html($partner_type); ?></p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<!-- Partner Content -->
<div class="section section-white">
    <div class="container">
        <?php if (function_exists('saab_breadcrumbs')) saab_breadcrumbs(); ?>
        <div class="grid grid-12" style="gap: 2rem;">
            <!-- Main Content -->
            <div style="grid-column: 1 / span 8;">
                <!-- Partner Description -->
                <?php if (get_the_content()) : ?>
                    <div class="partner-description">
                        <h3 class="section-title-centered"><?php esc_html_e('About This Partner', 'saab'); ?></h3>
                        <div class="content-formatted">
                            <?php the_content(); ?>
                        </div>
                    </div>
                <?php endif; ?>

                <!-- Partner Projects -->
                <?php 
                $projects = get_post_meta(get_the_ID(), '_saab_partner_projects', true);
                if ($projects) : ?>
                    <div class="partner-projects">
                        <h3 class="section-title-centered"><?php esc_html_e('Collaborative Projects', 'saab'); ?></h3>
                        <div class="content-formatted">
                            <?php echo wp_kses_post($projects); ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Sidebar -->
            <div style="grid-column: 9 / span 4;">
                <div class="partner-meta">
                    <h4><?php esc_html_e('Partner Information', 'saab'); ?></h4>
                    
                    <!-- Partner Logo -->
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="partner-logo">
                            <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'partner-logo')); ?>" alt="<?php the_title_attribute(); ?>" />
                        </div>
                    <?php endif; ?>

                    <!-- Partner Type -->
                    <?php $partner_type = get_post_meta(get_the_ID(), '_saab_partner_type', true); ?>
                    <?php if ($partner_type) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Type:', 'saab'); ?></strong>
                            <span><?php echo esc_html($partner_type); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Partner Website -->
                    <?php $website = get_post_meta(get_the_ID(), '_saab_partner_website', true); ?>
                    <?php if ($website) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Website:', 'saab'); ?></strong>
                            <a href="<?php echo esc_url($website); ?>" target="_blank" rel="noopener noreferrer">
                                <?php esc_html_e('Visit Website', 'saab'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <!-- Partnership Since -->
                    <?php $since = get_post_meta(get_the_ID(), '_saab_partner_since', true); ?>
                    <?php if ($since) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Partnership Since:', 'saab'); ?></strong>
                            <span><?php echo esc_html($since); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Partner Location -->
                    <?php $location = get_post_meta(get_the_ID(), '_saab_partner_location', true); ?>
                    <?php if ($location) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Location:', 'saab'); ?></strong>
                            <span><?php echo esc_html($location); ?></span>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Related Partners -->
<div class="section section-cream">
    <div class="container">
        <h3 class="section-title-centered"><?php esc_html_e('Other Partners', 'saab'); ?></h3>
        <div class="partner-grid grid-enhanced">
            <?php
            $related_partners = new WP_Query(array(
                'post_type' => 'partner',
                'posts_per_page' => 6,
                'post__not_in' => array(get_the_ID()),
                'orderby' => 'rand',
            ));

            if ($related_partners->have_posts()) :
                while ($related_partners->have_posts()) : $related_partners->the_post();
                    get_template_part('template-parts/partner-card');
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</div>

<?php endwhile; ?>

<?php get_footer(); ?>

