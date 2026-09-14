import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, Heart, ShoppingCart, Menu, X, Sun, Moon, MapPin, Phone, HelpCircle, ChevronDown } from "lucide-react";
import { Product, CartItem } from "../types";
import { SAMPLE_PRODUCTS } from "../data";

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onCategorySelect?: (cat: string) => void;
  cartCount: number;
  wishlistCount: number;
  openCart: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  onProductSelect: (p: Product) => void;
}

export default function Header({
  currentTab,
  onTabChange,
  onCategorySelect,
  cartCount,
  wishlistCount,
  openCart,
  theme,
  toggleTheme,
  onProductSelect
}: HeaderProps) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isTickerVisible, setIsTickerVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHelmetOpen, setIsMobileHelmetOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const announcements = [
    "✅ 100% Genuine Helmets & Parts — Verified",
    "💬 Order instantly on WhatsApp: 01788223344",
    "🔄 7-Day Easy Replacement Policy"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Handle outside click for search results dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      const filtered = SAMPLE_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectSearchResult = (product: Product) => {
    onProductSelect(product);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <header className="relative w-full z-50 transition-colors duration-200">
      {/* A. Announcement bar */}
      {isTickerVisible && (
        <div id="announcement-bar" className="bg-primary text-white text-xs py-2 px-4 transition-transform relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex justify-between items-center pr-8 sm:pr-0">
            <div className="flex-1 text-center font-sans tracking-wide overflow-hidden h-4">
              <div 
                className="transition-transform duration-500 ease-in-out flex flex-col"
                style={{ transform: `translateY(-${tickerIndex * 16}px)` }}
              >
                {announcements.map((ann, idx) => (
                  <div key={idx} className="h-4 flex items-center justify-center">
                    {ann}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsTickerVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 p-0.5 z-10 bg-primary rounded"
              aria-label="Dismiss Announcement"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Main Row */}
      <div className="bg-dark text-white border-b border-gray-800 py-3 px-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile Hamburguer trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div
            onClick={() => { onTabChange("home"); }}
            className="flex items-center gap-1 cursor-pointer select-none shrink-0"
          >
            {((window as any).WordPressData?.logoUrl && (window as any).WordPressData.logoUrl !== "") ? (
              <img src={(window as any).WordPressData.logoUrl} alt="Store Logo" className="h-10 object-contain" />
            ) : (
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
                {(window as any).WordPressData?.siteName ? (
                  (window as any).WordPressData.siteName
                ) : (
                  <>
                    MOTO<span className="text-primary">SHOP</span>
                  </>
                )}
              </span>
            )}
            {!(window as any).WordPressData?.siteName && !(window as any).WordPressData?.logoUrl && (
              <span className="bg-primary hover:bg-primary-dark transition text-[10px] text-white px-1.5 py-0.5 font-mono rounded font-bold uppercase tracking-wider hidden sm:inline-block">
                BD
              </span>
            )}
          </div>

          {/* Search bar */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="হেলমেট বা পার্টস খুঁজুন..."
                value={searchQuery}
                aria-label="Search items"
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-full pl-5 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Live Search Autocomplete box */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-gray-950 border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
                <div className="p-2 border-b border-gray-800 text-xs text-gray-400 font-mono">
                  পণ্য খোঁজা হচ্ছে: max 6 results
                </div>
                <div className="divide-y divide-gray-800 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => selectSearchResult(product)}
                      className="p-3 flex items-center gap-3 hover:bg-gray-900 cursor-pointer transition-colors duration-150"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{product.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{product.brand} · {product.subcategory}</p>
                      </div>
                      <div className="text-right shrink-0 font-bold text-primary font-mono text-sm">
                        ৳{product.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => {
                    onTabChange("shop");
                    setIsSearchFocused(false);
                  }}
                  className="p-2.5 bg-gray-900 hover:bg-gray-850 text-center text-xs text-gray-300 cursor-pointer font-medium hover:text-primary transition"
                >
                  সব পণ্য দেখুনঃ {searchResults.length} Results →
                </div>
              </div>
            )}
          </div>

          {/* Quick Info & Action Badges */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Dhaka Pin */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-300">
              <MapPin size={15} className="text-primary animate-pulse" />
              <div className="text-left font-sans">
                <span className="block text-[10px] text-gray-500 uppercase font-bold">Delivery Zone</span>
                <span className="font-semibold text-white">Dhaka & Nationwide</span>
              </div>
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => onTabChange("wishlist")}
              className="relative p-2 text-gray-300 hover:text-white rounded-full bg-gray-900 hover:bg-gray-800 transition"
              aria-label="View Wishlist"
            >
              <Heart size={18} className={wishlistCount > 0 ? "fill-red-500 text-red-500 translate-y-0.5 animate-pulse" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Compare items shortcut */}
            <button
              onClick={() => onTabChange("compare")}
              className={`p-2 text-gray-300 hover:text-white rounded-full bg-gray-900 hover:bg-gray-800 transition md:inline-flex text-xs items-center gap-1.5 ${currentTab === "compare" ? "text-primary border border-primary/40" : ""}`}
            >
              <HelpCircle size={18} />
              <span className="hidden xl:inline text-[11px] font-bold">Compare</span>
            </button>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-300 hover:text-white rounded-full bg-gray-900 hover:bg-gray-800 transition"
              aria-label="Cart Drawer"
            >
              <ShoppingCart size={18} className="cart-icon" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Row 2 — Desktop Mega-Navigation */}
      <nav aria-label="Desktop Main Navigation" className="hidden lg:block bg-gray-950 text-gray-300 py-2 px-4 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 xl:gap-6 text-sm font-medium flex-wrap">
            <button
              onClick={() => onTabChange("home")}
              className={`hover:text-primary transition py-1 ${currentTab === "home" ? "text-primary border-b-2 border-primary" : ""}`}
            >
              Home
            </button>

            <div className="relative group py-1">
              <button
                onClick={() => {
                  onTabChange("shop");
                  if (onCategorySelect) onCategorySelect("helmet");
                }}
                className="hover:text-primary transition flex items-center gap-1"
              >
                Helmets
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-0 w-48 bg-dark border border-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2 overflow-hidden">
                <button 
                  onClick={() => { onTabChange("shop"); if(onCategorySelect) onCategorySelect("full-face"); }} 
                  className="text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary transition text-xs"
                >
                  Full Face Helmets
                </button>
                <button 
                  onClick={() => { onTabChange("shop"); if(onCategorySelect) onCategorySelect("modular"); }} 
                  className="text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary transition text-xs"
                >
                  Modular Helmets
                </button>
                <button 
                  onClick={() => { onTabChange("shop"); if(onCategorySelect) onCategorySelect("half-face"); }} 
                  className="text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-primary transition text-xs"
                >
                  Half Face Helmets
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                onTabChange("shop");
                if (onCategorySelect) onCategorySelect("riding-gear");
              }}
              className="hover:text-primary transition py-1"
            >
              Riding Gear
            </button>
            <button
              onClick={() => {
                onTabChange("shop");
                if (onCategorySelect) onCategorySelect("spare-parts");
              }}
              className="hover:text-primary transition py-1"
            >
              Spare Parts
            </button>
            <button
              onClick={() => {
                onTabChange("shop");
                if (onCategorySelect) onCategorySelect("decoration");
              }}
              className="hover:text-primary transition py-1"
            >
              Decoration
            </button>

            <button
              onClick={() => {
                onTabChange("shop");
                if (onCategorySelect) onCategorySelect("decoration");
              }}
              className="hover:text-primary transition"
            >
              Decoration
            </button>

            <button
              onClick={() => {
                onTabChange("shop");
                if (onCategorySelect) onCategorySelect("spare-parts");
              }}
              className="hover:text-primary transition"
            >
              Spare Parts
            </button>

            <button
              onClick={() => {
                onTabChange("shop");
                if (onCategorySelect) onCategorySelect("riding-gear");
              }}
              className="hover:text-primary transition"
            >
              Riding & Gear
            </button>

            <button
              onClick={() => onTabChange("deals")}
              className={`hover:text-primary transition inline-flex items-center gap-1 font-bold text-orange-400`}
            >
              🔥 Deals
            </button>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium">
            <button onClick={() => onTabChange("track-order")} className="hover:text-primary transition text-gray-400 hover:text-white">
              Track Order
            </button>
            <button onClick={() => onTabChange("faq")} className="hover:text-primary transition text-gray-400 hover:text-white">
              FAQ
            </button>
            <button onClick={() => onTabChange("about")} className="hover:text-primary transition text-gray-400 hover:text-white">
              About
            </button>
            <button onClick={() => onTabChange("contact")} className="hover:text-primary transition text-gray-400 hover:text-white">
              Contact
            </button>
            <a href="tel:01788223344" className="text-primary font-bold text-xs flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <Phone size={13} />
              01788-223344
            </a>
          </div>
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN SLIDE-IN DRAWER MENU */}
      {isMobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          {/* Overlay background */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 transition-opacity"
          />

          {/* Left panel */}
          <div className="relative w-full max-w-xs bg-gray-950 border-r border-gray-800 text-white h-full flex flex-col p-6 shadow-2xl overflow-y-auto leading-relaxed transform transition-transform animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-6">
              {((window as any).WordPressData?.logoUrl && (window as any).WordPressData.logoUrl !== "") ? (
                <img src={(window as any).WordPressData.logoUrl} alt="Store Logo" className="h-8 object-contain" />
              ) : (
                <span className="font-display text-2xl font-bold text-white uppercase">
                  {(window as any).WordPressData?.siteName ? (
                    (window as any).WordPressData.siteName
                  ) : (
                    <>
                      MOTO<span className="text-primary">SHOP</span>
                    </>
                  )}
                </span>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 hover:text-primary rounded"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Search block */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="পণ্য খুঁজুন..."
                  aria-label="Search items"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-full pl-4 pr-10 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-gray-400"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              </div>

              {/* Mini portable mobile search results */}
              {searchQuery.trim().length >= 2 && searchResults.length > 0 && (
                <div className="mt-2 bg-gray-950 border border-gray-800 rounded-lg p-1 space-y-1">
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        selectSearchResult(p);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 p-1.5 hover:bg-gray-900 rounded cursor-pointer"
                    >
                      <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium truncate text-white">{p.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">৳{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation links & sub-accordions */}
            <div className="flex flex-col gap-4 font-sans text-sm">
              <button
                onClick={() => {
                  onTabChange("home");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition"
              >
                🏠 Home
              </button>

              <div className="flex flex-col border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      onTabChange("shop");
                      if (onCategorySelect) onCategorySelect("helmet");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-1.5 hover:text-primary transition flex-1"
                  >
                    🪖 Helmets
                  </button>
                  <button 
                    onClick={() => setIsMobileHelmetOpen(!isMobileHelmetOpen)}
                    className="p-1.5 text-gray-500 hover:text-primary"
                    aria-label="Toggle Helmets Subcategories"
                  >
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileHelmetOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {isMobileHelmetOpen && (
                  <div className="flex flex-col pl-6 space-y-2 pb-2 text-xs text-gray-400">
                    <button 
                      onClick={() => { 
                        onTabChange("shop"); 
                        if(onCategorySelect) onCategorySelect("full-face"); 
                        setIsMobileMenuOpen(false);
                      }} 
                      className="text-left py-1 hover:text-white"
                    >
                      • Full Face Helmets
                    </button>
                    <button 
                      onClick={() => { 
                        onTabChange("shop"); 
                        if(onCategorySelect) onCategorySelect("modular"); 
                        setIsMobileMenuOpen(false);
                      }} 
                      className="text-left py-1 hover:text-white"
                    >
                      • Modular Helmets
                    </button>
                    <button 
                      onClick={() => { 
                        onTabChange("shop"); 
                        if(onCategorySelect) onCategorySelect("half-face"); 
                        setIsMobileMenuOpen(false);
                      }} 
                      className="text-left py-1 hover:text-white"
                    >
                      • Half Face Helmets
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onTabChange("shop");
                  if (onCategorySelect) onCategorySelect("riding-gear");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition"
              >
                🏍️ Riding Gear
              </button>

              <button
                onClick={() => {
                  onTabChange("shop");
                  if (onCategorySelect) onCategorySelect("spare-parts");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition"
              >
                ⚙️ Spare Parts
              </button>

              <button
                onClick={() => {
                  onTabChange("shop");
                  if (onCategorySelect) onCategorySelect("decoration");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition"
              >
                ✨ Decoration
              </button>


              <button
                onClick={() => {
                  onTabChange("shop");
                  if (onCategorySelect) onCategorySelect("decoration");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition"
              >
                ✨ Decoration Items
              </button>

              <button
                onClick={() => {
                  onTabChange("shop");
                  if (onCategorySelect) onCategorySelect("spare-parts");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition"
              >
                ⚙️ Spare Parts
              </button>

              <button
                onClick={() => {
                  onTabChange("shop");
                  if (onCategorySelect) onCategorySelect("riding-gear");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition"
              >
                🧤 Riding & Gear
              </button>

              <button
                onClick={() => {
                  onTabChange("deals");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 font-bold text-orange-400 border-b border-gray-800 hover:text-primary transition"
              >
                🔥 Flash Deals
              </button>

              <button
                onClick={() => {
                  onTabChange("track-order");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition text-gray-300"
              >
                📦 Track Order
              </button>

              <button
                onClick={() => {
                  onTabChange("wishlist");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition text-gray-300 flex justify-between items-center"
              >
                <span>❤️ Wishlist</span>
                {wishlistCount > 0 && <span className="bg-red-500 text-[10px] px-1.5 py-0.5 rounded-full">{wishlistCount}</span>}
              </button>

              <button
                onClick={() => {
                  onTabChange("about");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition text-gray-300"
              >
                About Us
              </button>
              
              <button
                onClick={() => {
                  onTabChange("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 border-b border-gray-800 hover:text-primary transition text-gray-300"
              >
                Contact
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="mt-auto pt-6 border-t border-gray-800 text-xs text-gray-400 space-y-2 font-sans">
              <p className="flex items-center gap-1 text-primary font-bold">
                📞 Hot: 01788223344
              </p>
              <p>📍 Flat 4B, Sector 7, Uttara, Dhaka</p>
              <p>🕒 Hours: Sat-Thu (10 AM — 8 PM)</p>
            </div>
          </div>
        </div>, document.body
      )}
    </header>
  );
}
