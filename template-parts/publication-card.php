<?php
/**
 * Template part for displaying publication cards
 */

$publication_type = get_post_meta(get_the_ID(), '_saab_publication_type', true);
$publication_date = get_post_meta(get_the_ID(), '_saab_publication_date', true);
$authors = get_post_meta(get_the_ID(), '_saab_publication_authors', true);
$publisher = get_post_meta(get_the_ID(), '_saab_publication_publisher', true);
$download_url = get_post_meta(get_the_ID(), '_saab_publication_download', true);
$purchase_url = get_post_meta(get_the_ID(), '_saab_publication_purchase', true);
?>

<div class="publication-card">
    <div class="publication-card-image">
        <?php if (has_post_thumbnail()) : ?>
            <img src="<?php the_post_thumbnail_url('medium'); ?>" alt="<?php the_title_attribute(); ?>" loading="lazy" />
        <?php else : ?>
            <div class="publication-card-placeholder">
                <i class="fas fa-book" aria-hidden="true"></i>
            </div>
        <?php endif; ?>
        
        <?php if ($publication_type) : ?>
            <span class="publication-badge"><?php echo esc_html($publication_type); ?></span>
        <?php endif; ?>
    </div>
    
    <div class="publication-card-content">
        <h3 class="publication-card-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        
        <?php if ($authors) : ?>
            <div class="publication-card-authors">
                <i class="fas fa-user" aria-hidden="true"></i>
                <?php echo esc_html($authors); ?>
            </div>
        <?php endif; ?>
        
        <?php if ($publisher) : ?>
            <div class="publication-card-publisher">
                <i class="fas fa-building" aria-hidden="true"></i>
                <?php echo esc_html($publisher); ?>
            </div>
        <?php endif; ?>
        
        <?php if ($publication_date) : ?>
            <div class="publication-card-date">
                <i class="fas fa-calendar" aria-hidden="true"></i>
                <?php echo esc_html(date('F Y', strtotime($publication_date))); ?>
            </div>
        <?php endif; ?>
        
        <div class="publication-card-excerpt">
            <?php echo wp_trim_words(get_the_excerpt(), 15, '...'); ?>
        </div>
        
        <div class="publication-card-actions">
            <a href="<?php the_permalink(); ?>" class="btn btn-sm btn-outline">
                <?php esc_html_e('Read More', 'saab'); ?>
            </a>
            
            <?php if ($download_url) : ?>
                <a href="<?php echo esc_url($download_url); ?>" class="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-download" aria-hidden="true"></i>
                    <?php esc_html_e('Download', 'saab'); ?>
                </a>
            <?php endif; ?>
            
            <?php if ($purchase_url) : ?>
                <a href="<?php echo esc_url($purchase_url); ?>" class="btn btn-sm btn-secondary" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                    <?php esc_html_e('Purchase', 'saab'); ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
    
    <a href="<?php the_permalink(); ?>" class="publication-card-link" aria-label="<?php the_title_attribute(); ?>"></a>
</div>

