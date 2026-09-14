<?php
/**
 * Rider Safety Gear BD Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Rider_Safety_Gear_BD
 */

if ( ! function_exists( 'rider_safety_gear_setup' ) ) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     */
    function rider_safety_gear_setup() {
        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and WordPress will
         * provide it for us.
         */
        add_theme_support( 'title-tag' );

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support( 'post-thumbnails' );

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(
            array(
                'menu-1' => esc_html__( 'Primary Menu', 'rider-safety-gear' ),
            )
        );

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
            )
        );
    }
endif;
add_action( 'after_setup_theme', 'rider_safety_gear_setup' );

/**
 * Enqueue scripts and styles dynamically from the Vite production bundle directory.
 */
function rider_safety_gear_scripts() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();

    // 1. Dynamic CSS Enqueue using glob
    $css_files = glob( $theme_dir . '/dist/assets/*.css' );
    if ( ! empty( $css_files ) ) {
        // Enqueue the compiled css bundle with original hash name
        $css_file_name = basename( $css_files[0] );
        wp_enqueue_style( 
            'rider-safety-gear-bundle', 
            $theme_uri . '/dist/assets/' . $css_file_name, 
            array(), 
            '1.0.0' 
        );
    } else {
        // Fallback root or dev path if any
        $css_fallbacks = glob( $theme_dir . '/dist/*.css' );
        if ( ! empty( $css_fallbacks ) ) {
            $css_file_name = basename( $css_fallbacks[0] );
            wp_enqueue_style( 'rider-safety-gear-bundle', $theme_uri . '/dist/' . $css_file_name, array(), '1.0.0' );
        }
    }

    // 2. Dynamic React JavaScript Enqueue using glob
    $js_files = glob( $theme_dir . '/dist/assets/*.js' );
    if ( ! empty( $js_files ) ) {
        // Enqueue the compiled javascript bundle with original hash name
        $js_file_name = basename( $js_files[0] );
        wp_enqueue_script( 
            'rider-safety-gear-app', 
            $theme_uri . '/dist/assets/' . $js_file_name, 
            array(), 
            '1.0.0', 
            true 
        );
    } else {
        // Fallback root or dev path if any
        $js_fallbacks = glob( $theme_dir . '/dist/*.js' );
        if ( ! empty( $js_fallbacks ) ) {
            $js_file_name = basename( $js_fallbacks[0] );
            wp_enqueue_script( 'rider-safety-gear-app', $theme_uri . '/dist/' . $js_file_name, array(), '1.0.0', true );
        }
    }

    // Get customizer values
    $hero_image   = get_theme_mod( 'rider_hero_image', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=2070' );
    $contact_email = get_theme_mod( 'rider_contact_email', 'info@motoshopbd.com' );
    $contact_phone = get_theme_mod( 'rider_contact_phone', '+880 18XX-XXXXXX' );
    $store_address = get_theme_mod( 'rider_store_address', 'MotoShop Towers, Sector 7, Jasimuddin Avenue, Dhaka' );
    
    // Get custom logo URL if set
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $logo_url = wp_get_attachment_image_url( $custom_logo_id , 'full' );

    // 3. Inject WordPress environment parameters into the React Runtime
    // This allows WordPress Site Title / Description and REST API paths to be customized on the fly
    wp_localize_script( 'rider-safety-gear-app', 'WordPressData', array(
        'siteName'        => get_bloginfo( 'name' ),
        'siteDescription' => get_bloginfo( 'description' ),
        'apiUrl'          => esc_url_raw( rest_url() ),
        'themeUri'        => $theme_uri,
        'homeUrl'         => esc_url( home_url('/') ),
        'adminAjax'       => admin_url( 'admin-ajax.php' ),
        'heroImage'       => $hero_image,
        'contactEmail'    => $contact_email,
        'contactPhone'    => $contact_phone,
        'storeAddress'    => $store_address,
        'logoUrl'         => $logo_url ? $logo_url : false
    ) );
}
add_action( 'wp_enqueue_scripts', 'rider_safety_gear_scripts' );

/**
 * Register Customizer settings
 */
function rider_safety_gear_customize_register( $wp_customize ) {
    // Section for Store Info
    $wp_customize->add_section( 'rider_store_info', array(
        'title'       => __( 'Store Settings & Info', 'rider-safety-gear' ),
        'priority'    => 30,
    ) );

    // Phone
    $wp_customize->add_setting( 'rider_contact_phone', array( 'default' => '+880 18XX-XXXXXX' ) );
    $wp_customize->add_control( 'rider_contact_phone', array(
        'label'   => __( 'Contact Phone', 'rider-safety-gear' ),
        'section' => 'rider_store_info',
        'type'    => 'text',
    ) );

    // Email
    $wp_customize->add_setting( 'rider_contact_email', array( 'default' => 'info@motoshopbd.com' ) );
    $wp_customize->add_control( 'rider_contact_email', array(
        'label'   => __( 'Contact Email', 'rider-safety-gear' ),
        'section' => 'rider_store_info',
        'type'    => 'text',
    ) );

    // Address
    $wp_customize->add_setting( 'rider_store_address', array( 'default' => 'MotoShop Towers, Sector 7, Jasimuddin Avenue, Dhaka' ) );
    $wp_customize->add_control( 'rider_store_address', array(
        'label'   => __( 'Store Address / Location', 'rider-safety-gear' ),
        'section' => 'rider_store_info',
        'type'    => 'textarea',
    ) );

    // Hero Image
    $wp_customize->add_setting( 'rider_hero_image', array( 'default' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=2070' ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'rider_hero_image', array(
        'label'    => __( 'Homepage Hero Image', 'rider-safety-gear' ),
        'section'  => 'rider_store_info',
        'settings' => 'rider_hero_image',
    ) ) );
}
add_action( 'customize_register', 'rider_safety_gear_customize_register' );

/**
 * Register Custom WooCommerce REST API endpoint for the React frontend
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'rider-gear/v1', '/products', array(
        'methods'             => 'GET',
        'callback'            => 'rider_safety_gear_get_products_endpoint',
        'permission_callback' => '__return_true', // Publicly readable
    ) );
} );

function rider_safety_gear_get_products_endpoint() {
    // If WooCommerce is not active, return empty list or fallback
    if ( ! class_exists( 'WooCommerce' ) ) {
        return new WP_REST_Response( array( 'status' => 'success', 'woocommerce_active' => false, 'products' => array() ), 200 );
    }

    $args = array(
        'limit'  => 50,
        'status' => 'publish',
    );

    $products = wc_get_products( $args );
    $output = array();

    foreach ( $products as $product ) {
        $id = $product->get_id();
        $image_id = $product->get_image_id();
        $image_url = $image_id ? wp_get_attachment_image_url( $image_id, 'large' ) : '';
        if ( ! $image_url ) {
            $image_url = 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600'; // fallback
        }

        // Get additional gallery images
        $attachment_ids = $product->get_gallery_image_ids();
        $gallery_images = array( $image_url );
        foreach ( $attachment_ids as $attachment_id ) {
            $img = wp_get_attachment_image_url( $attachment_id, 'large' );
            if ( $img ) {
                $gallery_images[] = $img;
            }
        }

        // Map categories
        $categories = $product->get_category_ids();
        $cat_names = array();
        foreach ( $categories as $cat_id ) {
            $term = get_term( $cat_id, 'product_cat' );
            if ( $term && ! is_wp_error( $term ) ) {
                $cat_names[] = $term->slug;
            }
        }
        $category = ! empty( $cat_names ) ? $cat_names[0] : 'helmet';
        if ( strpos( strtolower( $category ), 'helmet' ) !== false ) {
            $category = 'helmet';
        } elseif ( strpos( strtolower( $category ), 'gear' ) !== false || strpos( strtolower( $category ), 'glove' ) !== false ) {
            $category = 'gear';
        } else {
            $category = 'helmet'; // fallback category slug match
        }

        // Ratings & review counts
        $rating = (float) $product->get_average_rating();
        if ( ! $rating ) { $rating = 4.7; }
        $review_count = (int) $product->get_review_count();
        if ( ! $review_count ) { $review_count = rand( 12, 85 ); }

        // Mapped attributes
        $weight = $product->get_weight() ? $product->get_weight() . ' ' . get_option('woocommerce_weight_unit') : '1.35 kg ± 50g';
        
        $output[] = array(
            'id'            => (string) $id,
            'name'          => $product->get_name(),
            'sku'           => $product->get_sku() ? $product->get_sku() : 'HL-' . $id,
            'category'      => $category,
            'subcategory'   => ! empty( $cat_names ) ? $cat_names[0] : 'full-face',
            'price'         => (float) $product->get_price(),
            'originalPrice' => (float) $product->get_regular_price() ? (float) $product->get_regular_price() : (float) $product->get_price() * 1.25,
            'stock'         => $product->get_manage_stock() ? $product->get_stock_quantity() : 12,
            'description'   => $product->get_description() ? wp_strip_all_tags( $product->get_description() ) : $product->get_short_description(),
            'shortDescription' => $product->get_short_description() ? wp_strip_all_tags( $product->get_short_description() ) : $product->get_name(),
            'image'         => $image_url,
            'additionalImages' => $gallery_images,
            'rating'        => $rating,
            'reviewCount'   => $review_count,
            'brand'         => 'WooCommerce',
            'sizeOptions'   => array( 'M', 'L', 'XL' ),
            'colorOptions'  => array(
                array( 'name' => 'Default Color', 'hex' => '#10B981' )
            ),
            'attributes'    => array(
                'weight'        => $weight,
                'material'      => 'High-Strength Carbon / ABS Composite',
                'certification' => 'DOT & ECE 22.06 Certified',
                'ventilation'   => 'Active Multi-Channel Exhaust Vents',
                'visor'         => 'Anti-scratch Panoramic Clear Visor'
            ),
            'isFlashSale'   => $product->is_on_sale(),
            'isBestSeller'  => rand( 0, 10 ) > 6,
            'isNew'         => rand( 0, 10 ) > 5,
            'hasFreeDelivery' => (float) $product->get_price() > 2000,
            'reviews'       => array(
                array(
                    'id'      => 'r-wc-1',
                    'name'    => 'Rider Shakib',
                    'date'    => date('Y-m-d'),
                    'rating'  => 5,
                    'comment' => 'Excellent quality product. Strongly recommended for motor safety!',
                    'verified'=> true
                )
            )
        );
    }

    return new WP_REST_Response( array( 'status' => 'success', 'woocommerce_active' => true, 'products' => $output ), 200 );
}
