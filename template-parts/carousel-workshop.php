<?php
/* Workshop Carousel */
?>
<div class="carousel-wrapper workshops-carousel">
  <div class="carousel-items">
<?php
$workshops = new WP_Query([
    'post_type' => 'training_workshop',
    'posts_per_page' => 6,
    'orderby' => 'date',
    'order' => 'DESC'
]);
if ($workshops->have_posts()) :
    while ($workshops->have_posts()) : $workshops->the_post();
?>
    <div class="carousel-item">
      <?php get_template_part('template-parts/workshop-card'); ?>
    </div>
<?php
    endwhile;
    wp_reset_postdata();
endif;
?>
  </div>
</div>
