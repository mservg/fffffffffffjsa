<?php
/* Screening Carousel */
?>
<div class="carousel-wrapper screenings-carousel">
  <div class="carousel-items">
<?php
$screenings = new WP_Query([
    'post_type' => 'screening',
    'posts_per_page' => 6,
    'orderby' => 'meta_value',
    'meta_key' => '_saab_screening_date',
    'order' => 'DESC'
]);
if ($screenings->have_posts()) :
    while ($screenings->have_posts()) : $screenings->the_post();
?>
    <div class="carousel-item">
      <?php get_template_part('template-parts/screening-card'); ?>
    </div>
<?php
    endwhile;
    wp_reset_postdata();
endif;
?>
  </div>
</div>
