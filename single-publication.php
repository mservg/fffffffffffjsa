<?php
/**
 * Single Publication Template
 */

get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

<!-- Publication Hero -->
<div class="publication-hero">
    <div class="publication-hero-bg">
        <?php if (has_post_thumbnail()) : ?>
            <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full')); ?>" alt="<?php the_title_attribute(); ?>" class="publication-hero-bg-image" />
        <?php endif; ?>
        <div class="publication-hero-overlay"></div>
    </div>
    <div class="publication-hero-content">
        <div class="container">
            <div class="publication-hero-text">
                <h1 class="publication-hero-title"><?php the_title(); ?></h1>
                <?php $subtitle = get_post_meta(get_the_ID(), '_saab_publication_subtitle', true); ?>
                <?php if ($subtitle) : ?>
                    <p class="publication-hero-subtitle"><?php echo esc_html($subtitle); ?></p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<!-- Publication Content -->
<div class="section section-white">
    <div class="container">
        <?php if (function_exists('saab_breadcrumbs')) saab_breadcrumbs(); ?>
        <div class="grid grid-12" style="gap: 2rem;">
            <!-- Main Content -->
            <div style="grid-column: 1 / span 8;">
                <!-- Publication Abstract -->
                <?php 
                $abstract = get_post_meta(get_the_ID(), '_saab_publication_abstract', true);
                if ($abstract) : ?>
                    <div class="publication-abstract">
                        <h3 class="section-title-centered"><?php esc_html_e('Abstract', 'saab'); ?></h3>
                        <div class="content-formatted">
                            <?php echo wp_kses_post($abstract); ?>
                        </div>
                    </div>
                <?php endif; ?>

                <!-- Publication Content -->
                <?php if (get_the_content()) : ?>
                    <div class="publication-content">
                        <h3 class="section-title-centered"><?php esc_html_e('Full Content', 'saab'); ?></h3>
                        <div class="content-formatted">
                            <?php the_content(); ?>
                        </div>
                    </div>
                <?php endif; ?>

                <!-- Publication Excerpts -->
                <?php 
                $excerpts = get_post_meta(get_the_ID(), '_saab_publication_excerpts', true);
                if ($excerpts) : ?>
                    <div class="publication-excerpts">
                        <h3 class="section-title-centered"><?php esc_html_e('Key Excerpts', 'saab'); ?></h3>
                        <div class="content-formatted">
                            <?php echo wp_kses_post($excerpts); ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Sidebar -->
            <div style="grid-column: 9 / span 4;">
                <div class="publication-meta">
                    <h4><?php esc_html_e('Publication Details', 'saab'); ?></h4>
                    
                    <!-- Publication Cover -->
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="publication-cover">
                            <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'medium')); ?>" alt="<?php the_title_attribute(); ?>" />
                        </div>
                    <?php endif; ?>

                    <!-- Publication Type -->
                    <?php $pub_type = get_post_meta(get_the_ID(), '_saab_publication_type', true); ?>
                    <?php if ($pub_type) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Type:', 'saab'); ?></strong>
                            <span><?php echo esc_html($pub_type); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Publication Date -->
                    <?php $pub_date = get_post_meta(get_the_ID(), '_saab_publication_date', true); ?>
                    <?php if ($pub_date) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Publication Date:', 'saab'); ?></strong>
                            <span><?php echo esc_html(date('F j, Y', strtotime($pub_date))); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Authors -->
                    <?php $authors = get_post_meta(get_the_ID(), '_saab_publication_authors', true); ?>
                    <?php if ($authors) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Authors:', 'saab'); ?></strong>
                            <span><?php echo esc_html($authors); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Publisher -->
                    <?php $publisher = get_post_meta(get_the_ID(), '_saab_publication_publisher', true); ?>
                    <?php if ($publisher) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Publisher:', 'saab'); ?></strong>
                            <span><?php echo esc_html($publisher); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- ISBN -->
                    <?php $isbn = get_post_meta(get_the_ID(), '_saab_publication_isbn', true); ?>
                    <?php if ($isbn) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('ISBN:', 'saab'); ?></strong>
                            <span><?php echo esc_html($isbn); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Pages -->
                    <?php $pages = get_post_meta(get_the_ID(), '_saab_publication_pages', true); ?>
                    <?php if ($pages) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Pages:', 'saab'); ?></strong>
                            <span><?php echo esc_html($pages); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Language -->
                    <?php $language = get_post_meta(get_the_ID(), '_saab_publication_language', true); ?>
                    <?php if ($language) : ?>
                        <div class="meta-item">
                            <strong><?php esc_html_e('Language:', 'saab'); ?></strong>
                            <span><?php echo esc_html($language); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- Download Link -->
                    <?php $download_url = get_post_meta(get_the_ID(), '_saab_publication_download', true); ?>
                    <?php if ($download_url) : ?>
                        <div class="meta-item">
                            <a href="<?php echo esc_url($download_url); ?>" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                <?php esc_html_e('Download PDF', 'saab'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <!-- Purchase Link -->
                    <?php $purchase_url = get_post_meta(get_the_ID(), '_saab_publication_purchase', true); ?>
                    <?php if ($purchase_url) : ?>
                        <div class="meta-item">
                            <a href="<?php echo esc_url($purchase_url); ?>" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
                                <?php esc_html_e('Purchase Book', 'saab'); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Related Publications -->
<div class="section section-cream">
    <div class="container">
        <h3 class="section-title-centered"><?php esc_html_e('Related Publications', 'saab'); ?></h3>
        <div class="publication-grid grid-enhanced">
            <?php
            $related_publications = new WP_Query(array(
                'post_type' => 'publication',
                'posts_per_page' => 6,
                'post__not_in' => array(get_the_ID()),
                'orderby' => 'date',
                'order' => 'DESC',
            ));

            if ($related_publications->have_posts()) :
                while ($related_publications->have_posts()) : $related_publications->the_post();
                    get_template_part('template-parts/publication-card');
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</div>

<?php endwhile; ?>

<?php get_footer(); ?>

