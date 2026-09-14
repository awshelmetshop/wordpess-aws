import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Product, CartItem, Order } from "./types";
import { SAMPLE_PRODUCTS } from "./data";

// Component imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import ComparisonBar from "./components/ComparisonBar";

// Page imports
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import Wishlist from "./pages/Wishlist";
import Deals from "./pages/Deals";
import Compare from "./pages/Compare";
import AboutContactFAQ from "./pages/AboutContactFAQ";
import WordPressPage from "./pages/WordPressPage";

type ActiveTab =
  | "home"
  | "shop"
  | "product-detail"
  | "cart"
  | "checkout"
  | "track-order"
  | "wishlist"
  | "deals"
  | "compare"
  | "support"
  | "wp-page";

export default function App() {
  // Products dynamic synchronization (for WordPress WooCommerce Support)
  const [productsList, setProductsList] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [isLoadingWoo, setIsLoadingWoo] = useState(false);
  const [wpPageSlug, setWpPageSlug] = useState<string>("");

  useEffect(() => {
    const loadWooCommerceProducts = async () => {
      try {
        const wpApiUrl = (window as any).WordPressData?.apiUrl;
        if (wpApiUrl) {
          setIsLoadingWoo(true);
          const response = await fetch(`${wpApiUrl}rider-gear/v1/products`);
          const data = await response.json();
          if (data && data.status === "success" && data.products && data.products.length > 0) {
            // Safely update the in-memory shared array reference by deleting current contents and pushing new fetched products
            SAMPLE_PRODUCTS.length = 0;
            SAMPLE_PRODUCTS.push(...data.products);
            // Trigger state change to re-render React components
            setProductsList([...SAMPLE_PRODUCTS]);
          }
          setIsLoadingWoo(false);
        }
      } catch (error) {
        console.error("WooCommerce Dynamic Integration Fetch Error:", error);
        setIsLoadingWoo(false);
      }
    };
    loadWooCommerceProducts();
  }, []);

  // Navigation & Page State
  const [currentTab, setCurrentTab] = useState<ActiveTab>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [supportSubTab, setSupportSubTab] = useState<"about" | "contact" | "faq">("faq");

  // Global E-commerce States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [comparison, setComparison] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Search & Global Filter Props
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");

  // Overlay state managers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<{show: boolean, message: string}>({show: false, message: ""});

  // Promo/Coupon calculations
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Appearance theme
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Sync dark class to document body
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Sync Cart Drawer state if we navigate directly to Cart page
  useEffect(() => {
    if (currentTab === "cart") {
      setIsCartOpen(false);
    }
  }, [currentTab]);

  // Recalculate discount if coupon applied matches
  useEffect(() => {
    if (couponCode === "RIDE10") {
      const sub = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setDiscount(Math.round(sub * 0.1));
    } else {
      setDiscount(0);
    }
  }, [couponCode, cartItems]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // E-commerce logic handlers
  const handleAddToCart = (product: Product, size?: string, color?: string, qty: number = 1) => {
    if (product.stock === 0) return;
    setCartItems((prevItems) => {
      // Find matching item in cart check
      const matchIdx = prevItems.findIndex(
        (it) =>
          it.product.id === product.id &&
          it.selectedSize === size &&
          it.selectedColor === color
      );

      if (matchIdx > -1) {
        const next = [...prevItems];
        const updatedQty = next[matchIdx].quantity + qty;
        next[matchIdx].quantity = Math.min(product.stock, updatedQty);
        return next;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          product,
          quantity: Math.min(product.stock, qty),
          selectedSize: size,
          selectedColor: color
        };
        return [...prevItems, newItem];
      }
    });

    // Show toast message instead of opening the cart
    setToastMessage({ show: true, message: "আপনার প্রোডাক্টটি কার্টে যোগ করা হয়েছে, আপনি উপরের কার্ট আইকনে ট্যাপ করলে রোরডাক্টগটি পেয়ে যাবেন" });
    setTimeout(() => {
      setToastMessage({ show: false, message: "" });
    }, 4000);
  };

  const handleUpdateCartQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((it) => {
        if (it.id === itemId) {
          const clampedQty = Math.min(it.product.stock, qty);
          return { ...it, quantity: clampedQty };
        }
        return it;
      })
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  const handleApplyCoupon = (code: string) => {
    if (code.trim().toUpperCase() === "RIDE10") {
      setCouponCode("RIDE10");
      return true;
    }
    return false;
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleToggleCompare = (product: Product) => {
    setComparison((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 4) {
        alert("আপনি সর্বোচ্চ ৪টি প্রোডাক্ট একসাথে তুলনা বোর্ডে যুক্ত করতে পারবেন।");
        return prev;
      }
      return [...prev, product.id];
    });
  };

  const handleClearCompareAll = () => {
    setComparison([]);
  };

  const handleActionBuyNowDirect = (product: Product, size?: string, color?: string, qty: number = 1) => {
    if (product.stock === 0) return;
    // Overwrite/Set single cart items trigger for quick checking out
    const matchingItem: CartItem = {
      id: `cart-buy-${Date.now()}`,
      product,
      quantity: qty,
      selectedSize: size,
      selectedColor: color
    };
    setCartItems([matchingItem]);
    setCurrentTab("checkout");
  };

  // Route back helpers
  const handleBackToShop = () => {
    setCurrentTab("shop");
  };

  const handleProductDetailTrigger = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab("product-detail");
  };

  const handleGlobalSearchAction = (query: string) => {
    setSearchQuery(query);
    setCurrentTab("shop");
  };

  const handleOrderSubmittedCheckout = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleClearCartAndCoupon = () => {
    setCartItems([]);
    setCouponCode("");
  };

  return (
    <div className="min-h-screen flex flex-col text-white transition-colors duration-205">

      {/* 1. Header Navigation elements */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setSearchQuery("");
          setCurrentTab(tab as ActiveTab);
        }}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          setSearchQuery("");
          setCurrentTab("shop");
        }}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlist.length}
        openCart={() => setIsCartOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        onProductSelect={handleProductDetailTrigger}
      />

      {/* 2. Main screen viewport body */}
      <main className="flex-1 pb-16">
        {currentTab === "home" && (
          <Home
            onTabChange={(tab) => setCurrentTab(tab as ActiveTab)}
            onCategorySelect={(cat) => {
              setActiveCategory(cat);
              setSearchQuery("");
              setCurrentTab("shop");
            }}
            onProductClick={handleProductDetailTrigger}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            comparison={comparison}
            onToggleCompare={handleToggleCompare}
            onAddToCart={(p, sz, clr) => handleAddToCart(p, sz, clr, 1)}
            onBuyNow={handleActionBuyNowDirect}
          />
        )}

        {currentTab === "shop" && (
          <Shop
            initialSearchQuery={searchQuery}
            initialCategory={activeCategory}
            onProductClick={handleProductDetailTrigger}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            comparison={comparison}
            onToggleCompare={handleToggleCompare}
            onAddToCart={(p, sz, clr) => handleAddToCart(p, sz, clr, 1)}
            onBuyNow={handleActionBuyNowDirect}
          />
        )}

        {currentTab === "product-detail" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToShop}
            onAddToCart={handleAddToCart}
            onBuyNow={handleActionBuyNowDirect}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onProductClick={handleProductDetailTrigger}
          />
        )}

        {currentTab === "cart" && (
          <Cart
            cartItems={cartItems}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onApplyCoupon={handleApplyCoupon}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discount={discount}
            onCheckout={() => setCurrentTab("checkout")}
            onBrowse={() => setCurrentTab("shop")}
          />
        )}

        {currentTab === "checkout" && (
          <Checkout
            cartItems={cartItems}
            discount={discount}
            couponCode={couponCode}
            onOrderPlaced={handleOrderSubmittedCheckout}
            onClearCart={handleClearCartAndCoupon}
            onUpdateQty={handleUpdateCartQty}
          />
        )}

        {currentTab === "track-order" && <TrackOrder orders={orders} />}

        {currentTab === "wishlist" && (
          <Wishlist
            wishlistIds={wishlist}
            onProductClick={handleProductDetailTrigger}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            comparison={comparison}
            onToggleCompare={handleToggleCompare}
            onAddToCart={(p, sz, clr) => handleAddToCart(p, sz, clr, 1)}
            onBuyNow={handleActionBuyNowDirect}
            onBrowse={() => setCurrentTab("shop")}
          />
        )}

        {currentTab === "deals" && (
          <Deals
            onProductClick={handleProductDetailTrigger}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            comparison={comparison}
            onToggleCompare={handleToggleCompare}
            onAddToCart={(p, sz, clr) => handleAddToCart(p, sz, clr, 1)}
            onBuyNow={handleActionBuyNowDirect}
          />
        )}

        {currentTab === "compare" && (
          <Compare
            compareIds={comparison}
            onRemove={(p) => handleToggleCompare(p)}
            onClearAll={handleClearCompareAll}
            onAddToCart={(p) => handleAddToCart(p, undefined, undefined, 1)}
            onProductClick={handleProductDetailTrigger}
            onBrowse={() => setCurrentTab("shop")}
          />
        )}

        {currentTab === "support" && <AboutContactFAQ initialSubTab={supportSubTab} />}
        {currentTab === "wp-page" && (
          <WordPressPage 
            slug={wpPageSlug} 
            fallbackTitle={wpPageSlug.replace('-', ' ')} 
            fallbackContent={`<p>This page is linked to your WordPress installation. To edit this content, go to the <strong>WordPress Admin -> Pages -> Add New</strong>, create a page with the slug <code>${wpPageSlug}</code>, and add your content.</p>`} 
          />
        )}
      </main>

      {/* 3. Footer branding coordinates */}
      <Footer
        onTabChange={(tab) => setCurrentTab(tab as ActiveTab)}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          setSearchQuery("");
          setCurrentTab("shop");
        }}
        onOpenWpPage={(slug) => {
          setWpPageSlug(slug);
          setCurrentTab("wp-page");
        }}
      />

      {/* 4. Sliding Shopping Bag Cart Drawer panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentTab("checkout");
        }}
        onViewCartPage={() => {
          setIsCartOpen(false);
          setCurrentTab("cart");
        }}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        discount={discount}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* 5. Quick View previews overlay popup modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleActionBuyNowDirect}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* 6. Dynamic floats bar comparing parameters */}
      <ComparisonBar
        compareList={SAMPLE_PRODUCTS.filter((p) => comparison.includes(p.id))}
        onRemove={handleToggleCompare}
        onClearAll={handleClearCompareAll}
        onTriggerComparePage={() => setCurrentTab("compare")}
      />

      {/* 7. Toast Notification */}
      {toastMessage.show && (
        <div className="fixed top-20 right-4 z-[200] bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl animate-fade-in flex items-start gap-3 text-sm sm:max-w-sm ml-4">
          <Check size={20} className="shrink-0 mt-0.5" />
          <p className="flex-1 font-sans">{toastMessage.message}</p>
          <button onClick={() => setToastMessage({show: false, message: ""})} className="shrink-0 p-1 hover:bg-emerald-700 rounded-md transition">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
