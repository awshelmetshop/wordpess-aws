========================================================================
   RIDER SAFETY GEAR BD - PREMIUM REACT-VITE WORDPRESS THEME GUIDE
========================================================================

Congratulations! Your high-performance React + Tailwind CSS Motorcycle 
Gear & Helmet Store application is now fully packaged to run as an 
active, fully functional WordPress Theme!

------------------------------------------------------------------------
1. HOW TO INSTALL THIS ZIP DIRECTLY TO WORDPRESS (AS A THEME)
------------------------------------------------------------------------
When you export/download the ZIP of this project from the settings menu:
- It includes the required "style.css" sheet in the root.
- It includes the template-entry "index.php" in the root.
- It includes the asset manager "functions.php" in the root.
- It includes the compiled high-efficiency CSS & JS bundle inside "/dist/assets".

To install:
1. Export the project from AI Studio as a ZIP file (from the Settings menu).
2. Go to your WordPress Dashboard.
3. Navigate to: Appearance -> Themes.
4. Click "Add New" -> "Upload Theme".
5. Choose the downloaded ZIP file and click "Install Now".
6. Click "Activate".

Once activated, WordPress loads index.php, which serves the root DOM 
element, and functions.php enqueues the Tailwind styles and React assets.

------------------------------------------------------------------------
2. DYNAMIC WORDPRESS INTEGRATION (AUTO-CUSTOMIZATION)
------------------------------------------------------------------------
The application is pre-bridged to integrate with WordPress's dynamic settings in real-time:
- The store name on the main header, page layout titles, and the bottom footer 
  automatically display your site's "Site Title" configured in WordPress!
- If you edit the Site Title inside your WordPress Admin Dashboard 
  (Settings -> General -> Site Title), it will instantly update live 
  across the React UI header and footer. No code redeployment required!

------------------------------------------------------------------------
3. CUSTOMIZING THE PRODUCTS & CONTENT
------------------------------------------------------------------------
You have two main paths to customize products:

METHOD A: CUSTOMIZING THE SOURCE CODE (EASY & OFFLINE)
1. Inside the theme directory, open "/src/data.ts".
2. Edit the SAMPLE_PRODUCTS array. You can define customized prices in BDT, 
   product images (using Unsplash or custom media links), specifications, 
   and categories.
3. To build the updated code, run:
   npm install
   npm run build
4. The build pipeline outputs optimized files inside "/dist/assets/". 
   WordPress's functions.php will dynamically find the new files 
   automatically, meaning you don't have to edit any enqueuing logic!

METHOD B: WORDPRESS REST API & WOOCOMMERCE ENGINE (ADVANCED DYNAMIC)
- Inside the React app, you can use `const api = (window as any).WordPressData?.apiUrl;` 
  to access the WP REST API or WooCommerce endpoints directly. 
- You can now create pages natively in WordPress (like Privacy Policy, Terms, etc.)! The React frontend accesses them dynamically under the 'wp-page' tabs via the REST API!

------------------------------------------------------------------------
4. HOW TO CUSTOMIZE IMAGES & TEXTS
------------------------------------------------------------------------
Because this is a decoupled React App running natively inside WordPress, you do not use standard block builders like Elementor. Instead, we have integrated with the **WordPress Native Customizer**!

1. Go to your WordPress Dashboard.
2. Go to **Appearance -> Customize**.
3. Under **Site Identity**, you can change your "Site Title" and "Logo". This instantly updates the Header and Mobile Menu!
4. You will see a new tab called **"Store Settings & Info"**. Here you can change:
   - Your Hero Section Background Image.
   - Your Store Address.
   - Your Phone / Hotline Number.
   - Your Contact Email.

Once published, the React App instantly grabs these values and updates the UI!

------------------------------------------------------------------------
Thank you for riding with us! Safe Riding, Team Rider Safety Gear BD.
========================================================================
