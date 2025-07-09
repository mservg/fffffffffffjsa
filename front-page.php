<?php
/**
 * Front Page Template - Simplified layout
 */
get_header();
?>

<?php get_template_part('template-parts/hero'); ?>

<section id="latest-news" class="latest-news-section">
  <div class="container">
    <h2 class="section-title"><?php esc_html_e('Latest News', 'saab'); ?></h2>
    <div class="latest-news-grid">
      <?php
      $news_query = new WP_Query([
        'post_type' => 'news',
        'posts_per_page' => 3,
        'orderby' => 'date',
        'order' => 'DESC'
      ]);
      if ($news_query->have_posts()) :
        while ($news_query->have_posts()) : $news_query->the_post();
          get_template_part('template-parts/card-news');
        endwhile;
        wp_reset_postdata();
      endif;
      ?>
    </div>
  </div>
</section>

<section id="films" class="carousel-section">
  <div class="container">
    <h2 class="section-title"><?php esc_html_e('Films', 'saab'); ?></h2>
    <?php get_template_part('template-parts/carousel-film'); ?>
  </div>
</section>

<section id="screenings" class="carousel-section">
  <div class="container">
    <h2 class="section-title"><?php esc_html_e('Screenings', 'saab'); ?></h2>
    <?php get_template_part('template-parts/carousel-screening'); ?>
  </div>
</section>

<section id="workshops" class="carousel-section">
  <div class="container">
    <h2 class="section-title"><?php esc_html_e('Workshops', 'saab'); ?></h2>
    <?php get_template_part('template-parts/carousel-workshop'); ?>
  </div>
</section>
<?php get_footer(); ?>
