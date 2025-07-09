<?php
/* Film Carousel */
?>
<div class="carousel-wrapper films-carousel">
  <div class="carousel-items">
<?php
$films = new WP_Query([
    'post_type' => 'film',
    'posts_per_page' => 6,
    'orderby' => 'date',
    'order' => 'DESC'
]);
if ($films->have_posts()) :
    while ($films->have_posts()) : $films->the_post();
?>
    <div class="carousel-item">
      <?php get_template_part('template-parts/film-card'); ?>
    </div>
<?php
    endwhile;
    wp_reset_postdata();
endif;
?>
  </div>
</div>
