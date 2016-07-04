<?php 
function theme_enqueue_child_style(){
	wp_enqueue_style('theme-child-style', get_stylesheet_directory_uri(). '/style.css',array('theme-style','theme-skin'),false,'all');
}
add_action('wp_print_styles', 'theme_enqueue_child_style', 20);

function striking_child_name() {
    global $wp_admin_bar;
    $current_theme = wp_get_theme();
    $wp_admin_bar->add_menu( array(
        'id' => 'your_menu_id',
        'title' => 'Standard Child Theme'
    ) );   
}
add_action('admin_bar_menu', 'striking_child_name',82);