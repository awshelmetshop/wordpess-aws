<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Rider_Safety_Gear_BD
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Google Fonts for premium automotive, bengali display and text -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500;600&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">

    <?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-gray-950 text-white min-h-screen font-sans antialiased' ); ?>>
    <?php wp_body_open(); ?>

    <!-- React Mount Root -->
    <div id="root">
        <!-- Fallback loading skeleton for seamless user experience while JS loads -->
        <div style="display: flex; flex-direction: column; align-items: center; justify-center: center; min-height: 100vh; background-color: #030712; color: #ffffff; font-family: 'Hind Siliguri', sans-serif;">
            <div style="margin: auto; text-align: center; padding: 20px;">
                <div style="width: 50px; height: 50px; border: 4px solid #10b981; border-top-color: transparent; border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
                <h1 style="font-size: 24px; font-weight: 700; color: #10b981; margin-bottom: 10px; text-transform: uppercase;">Rider Safety Gear</h1>
                <p style="color: #9ca3af; font-size: 14px;">লোড হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।</p>
            </div>
        </div>
    </div>

    <!-- Spin keyframes injection for fallback loader -->
    <style>
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>

    <?php wp_footer(); ?>
</body>
</html>
