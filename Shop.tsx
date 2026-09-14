import React, { useState, useEffect } from "react";
import { Filter, Grid, List, X, Search, RefreshCw, SlidersHorizontal, Zap } from "lucide-react";
import { Product } from "../types";
import { SAMPLE_PRODUCTS, BRANDS } from "../data";
import ProductCard from "../components/ProductCard";

interface ShopProps {
  initialSearchQuery?: string;
  initialCategory?: string;
  onProductClick: (p: Product) => void;
  onQuickView: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (p: Product) => void;
  comparison: string[];
  onToggleCompare: (p: Product) => void;
  onAddToCart: (p: Product, size?: string, color?: string) => void;
  onBuyNow?: (p: Product, size?: string, color?: string) => void;
}

export default function Shop({
  initialSearchQuery = "",
  initialCategory = "",
  onProductClick,
  onQuickView,
  wishlist,
  onToggleWishlist,
  comparison,
  onToggleCompare,
  onAddToCart,
  onBuyNow
}: ShopProps) {
  // Filters State
  const [innerSearch, setInnerSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSub, setSelectedSub] = useState("");
  const [maxPrice, setMaxPrice] = useState(20000); // Max possible is Alpinestars jacket 18500
  const [minPrice, setMinPrice] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [flagNew, setFlagNew] = useState(false);
  const [flagSale, setFlagSale] = useState(false);
  const [flagInStock, setFlagInStock] = useState(false);

  // Layout & Sort Status
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "rating">("name");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync initial query or category changes
  useEffect(() => {
    if (initialCategory) {
      // If initialCategory is a root category
      const rootCategories = ["helmet", "decoration", "spare-parts", "riding-gear"];
      if (rootCategories.includes(initialCategory)) {
        setSelectedCategory(initialCategory);
        setSelectedSub("");
      } else {
        // Must be a subcategory (e.g. full-face, half-face)
        // Find corresponding product category
        const p = SAMPLE_PRODUCTS.find((p) => p.subcategory === initialCategory);
        if (p) {
          setSelectedCategory(p.category);
          setSelectedSub(initialCategory);
        } else {
          setSelectedCategory("");
          setSelectedSub(initialCategory);
        }
      }
    } else {
      setSelectedCategory("");
      setSelectedSub("");
    }
  }, [initialCategory]);

  // Handle simulated reload when changing filters (Simulates WooCommerce AJAX filter and skeleton loader!)
  const triggerReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    triggerReload();
  };

  const clearAllFilters = () => {
    setInnerSearch("");
    setSelectedCategory("");
    setSelectedSub("");
    setMinPrice(0);
    setMaxPrice(20000);
    setSelectedBrands([]);
    setFlagNew(false);
    setFlagSale(false);
    setFlagInStock(false);
    triggerReload();
  };

  // Filter Data
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    // Search
    if (innerSearch) {
      const match = product.name.toLowerCase().includes(innerSearch.toLowerCase()) ||
                    product.sku.toLowerCase().includes(innerSearch.toLowerCase());
      if (!match) return false;
    }

    // Category
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // Subcategory
    if (selectedSub && product.subcategory !== selectedSub) {
      return false;
    }

    // Pricing sliders
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    // Brand Checkboxes
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Product Flags
    if (flagNew && !product.isNew) return false;
    if (flagSale && !product.isFlashSale) return false;
    if (flagInStock && product.stock === 0) return false;

    return true;
  });

  // Sort Data
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200">
      
      {/* Search results Title header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800 text-left">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-sans">
            {selectedCategory ? `${selectedCategory.toUpperCase().replace("-", " ")} কালেকশন` : "সব পণ্যের তালিকা (Shop Archive)"}
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            মোট {sortedProducts.length} টি মোটরসাইকেল এক্সেসরিজ পাওয়া গিয়েছে।
          </p>
        </div>

        {/* Mobile Filter toggle */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white font-bold rounded-lg text-xs"
        >
          <SlidersHorizontal size={14} />
          ফিল্টার করুন (Filters)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS (240px wide) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-800 p-5 rounded-2xl sticky top-24 shadow-sm text-left">
          
          {/* Inner Search Box */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Search within</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="মডেল বা কোড লিখুন..."
                aria-label="Search within"
                value={innerSearch}
                onChange={(e) => {
                  setInnerSearch(e.target.value);
                  triggerReload();
                }}
                className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-800 dark:text-white rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>

          {/* Hierarchical Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">ক্যাটাগরি</h4>
            <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedSub("");
                  triggerReload();
                }}
                className={`w-full text-left font-medium block py-0.5 ${!selectedCategory ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                All Products
              </button>
              
              {/* Helmets and its Subcategories mapping */}
              <div>
                <button
                  onClick={() => {
                    setSelectedCategory("helmet");
                    setSelectedSub("");
                    triggerReload();
                  }}
                  className={`w-full text-left font-semibold block py-0.5 ${selectedCategory === "helmet" && !selectedSub ? "text-primary font-bold" : "hover:text-primary"}`}
                >
                  🏍 Helmets
                </button>
                {selectedCategory === "helmet" && (
                  <div className="pl-4 py-1.5 text-[11px] space-y-1 bg-gray-50 dark:bg-gray-900/40 rounded mt-1">
                    {[
                      { name: "Full Face", tag: "full-face" },
                      { name: "Half Face", tag: "half-face" },
                      { name: "Modular", tag: "modular" },
                      { name: "Baby Helmet", tag: "baby" }
                    ].map((sub) => (
                      <button
                        key={sub.tag}
                        onClick={() => {
                          setSelectedSub(sub.tag);
                          triggerReload();
                        }}
                        className={`w-full text-left block ${selectedSub === sub.tag ? "text-primary font-bold" : "hover:text-primary"}`}
                      >
                        · {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedCategory("decoration");
                  setSelectedSub("");
                  triggerReload();
                }}
                className={`w-full text-left font-semibold block py-0.5 ${selectedCategory === "decoration" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                ✨ Decoration Items
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("spare-parts");
                  setSelectedSub("");
                  triggerReload();
                }}
                className={`w-full text-left font-semibold block py-0.5 ${selectedCategory === "spare-parts" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                ⚙️ Spare Parts
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("riding-gear");
                  setSelectedSub("");
                  triggerReload();
                }}
                className={`w-full text-left font-semibold block py-0.5 ${selectedCategory === "riding-gear" ? "text-primary font-bold" : "hover:text-primary"}`}
              >
                🧤 Riding Gear
              </button>
            </div>
          </div>

          {/* Dual Range Price Inputs block */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">মূল্য পরিসীমা (Price BDT)</h4>
            <div className="space-y-2 font-mono text-xs text-gray-500">
              <div className="flex justify-between items-center text-[11px] font-bold text-gray-800 dark:text-gray-200">
                <span>৳{minPrice.toLocaleString()}</span>
                <span>৳{maxPrice.toLocaleString()}</span>
              </div>
              
              {/* Simple simulated Range Slider input */}
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                aria-label="Price range filter"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(parseInt(e.target.value));
                  triggerReload();
                }}
                className="w-full accent-primary h-1 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
              />
              <div className="flex items-center gap-2 text-[11px]">
                <span className="shrink-0">Max: </span>
                <input
                  type="number"
                  aria-label="Max price range value input"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    triggerReload();
                  }}
                  className="w-full py-1 px-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-255 dark:border-gray-800 rounded font-bold text-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Brands Checkboxes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">ব্র্যান্ড</h4>
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-2">
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="rounded text-primary focus:ring-primary caret-primary"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Flags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">ফিল্টার টাইপ</h4>
            <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flagNew}
                  onChange={(e) => {
                    setFlagNew(e.target.checked);
                    triggerReload();
                  }}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>New Arrivals</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flagSale}
                  onChange={(e) => {
                    setFlagSale(e.target.checked);
                    triggerReload();
                  }}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>Flash Discount Sale</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flagInStock}
                  onChange={(e) => {
                    setFlagInStock(e.target.checked);
                    triggerReload();
                  }}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Clear Filters CTA */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={clearAllFilters}
              className="w-full py-2 bg-red-500 hover:bg-red-650 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition"
            >
              ✕ Clear All Filters
            </button>
          </div>
        </aside>

        {/* MAIN RESULTS CONTAINER (lg:col-span-9) */}
        <section className="lg:col-span-9 space-y-6">
          {/* Top Sort and Control bar */}
          <div className="bg-white dark:bg-dark-soft border border-gray-250 dark:border-gray-800 rounded-xl px-4 py-3 flex justify-between items-center text-sm font-sans">
            <div className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-800 dark:text-white font-mono">{sortedProducts.length}</span> results
            </div>

            <div className="flex items-center gap-4">
              {/* Sort selector dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 hidden sm:inline">Sort:</span>
                <select
                  aria-label="Sort product display"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as any);
                    triggerReload();
                  }}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs rounded-lg py-1 px-2.5 outline-none font-bold text-gray-700 dark:text-gray-200"
                >
                  <option value="name">Product Title</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>

              {/* Grid or List render toggle buttons */}
              <div className="hidden sm:flex items-center border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 ${viewMode === "grid" ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-400"}`}
                  title="Grid Layout"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 ${viewMode === "list" ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-400"}`}
                  title="List Layout"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips Row */}
          {(selectedCategory || selectedSub || selectedBrands.length > 0 || minPrice > 0 || maxPrice < 20000 || flagNew || flagSale || flagInStock) && (
            <div className="flex flex-wrap items-center gap-2 text-left bg-gray-150/10 dark:bg-gray-850/10 p-2 rounded-lg border border-gray-150 dark:border-gray-850">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active Chips:</span>
              
              {selectedCategory && (
                <span className="bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-bold font-mono flex items-center gap-1 uppercase">
                  {selectedCategory}
                  <button onClick={() => { setSelectedCategory(""); setSelectedSub(""); triggerReload(); }} className="hover:text-red-500 font-mono text-[10px]">✕</button>
                </span>
              )}

              {selectedSub && (
                <span className="bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-bold font-mono flex items-center gap-1 uppercase">
                  Sub: {selectedSub}
                  <button onClick={() => { setSelectedSub(""); triggerReload(); }} className="hover:text-red-500">✕</button>
                </span>
              )}

              {selectedBrands.map((brand) => (
                <span key={brand} className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 font-sans">
                  {brand}
                  <button onClick={() => handleBrandChange(brand)} className="hover:text-red-500">✕</button>
                </span>
              ))}

              {(minPrice > 0 || maxPrice < 20000) && (
                <span className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full text-xs font-mono flex items-center gap-1">
                  ৳{minPrice} - ৳{maxPrice}
                  <button onClick={() => { setMinPrice(0); setMaxPrice(20000); triggerReload(); }} className="hover:text-red-500">✕</button>
                </span>
              )}

              {flagNew && (
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  New
                  <button onClick={() => { setFlagNew(false); triggerReload(); }} className="hover:text-red-500">✕</button>
                </span>
              )}

              {flagSale && (
                <span className="bg-save/10 border border-save/20 text-save px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  On Sale
                  <button onClick={() => { setFlagSale(false); triggerReload(); }} className="hover:text-red-500">✕</button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-red-500 underline ml-auto cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {/* SKELETON LOADER PREVIEWS */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-850 rounded-xl overflow-hidden p-4 space-y-3.5">
                  <div className="skeleton h-48 w-full rounded-lg" />
                  <div className="skeleton h-3 w-1/3" />
                  <div className="skeleton h-4 w-5/6" />
                  <div className="skeleton h-3 w-1/2" />
                  <div className="skeleton h-10 w-full rounded-md mt-4" />
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            /* 19.1 Empty State: Search Zero Results design */
            <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-850 rounded-2xl py-16 px-6 text-center text-gray-550 select-none">
              <Search className="mx-auto text-gray-400 dark:text-gray-700 mb-4" size={48} />
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider font-sans">
                কোনো এক্সেসরিজ পাওয়া যায়নি (No Products Found)
              </h3>
              <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto font-sans leading-relaxed">
                অনুগ্রহ করে কিওয়ার্ডের বানান বা ফিল্টারসমূহ পরিবর্তন করে পুনরায় চেষ্টা করুন। অথবা সব পণ্য দেখতে নিচের বাটনে ক্লিক করুন।
              </p>
              
              {/* Category suggestion chips block inside empty state */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {["Helmets", "Decoration", "Spare Parts", "Riding Gear"].map((catName) => (
                  <button
                    key={catName}
                    onClick={() => {
                      setSelectedCategory(catName.toLowerCase().replace(" ", "-"));
                      setSelectedSub("");
                      triggerReload();
                    }}
                    className="px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-800 transition"
                  >
                    {catName}
                  </button>
                ))}
              </div>

              <div className="pt-8">
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold uppercase transition"
                >
                  ✕ সব ফিল্টার মুছুন
                </button>
              </div>
            </div>
          ) : (
            /* Products main render loop */
            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-6" : "space-y-4 text-left"}>
              {sortedProducts.map((p) => {
                if (viewMode === "grid") {
                  return (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onProductClick={onProductClick}
                      onQuickView={onQuickView}
                      isWishlisted={wishlist.includes(p.id)}
                      onToggleWishlist={onToggleWishlist}
                      isCompared={comparison.includes(p.id)}
                      onToggleCompare={onToggleCompare}
                      onAddToCart={onAddToCart}
                      onBuyNow={onBuyNow}
                    />
                  );
                } else {
                  return (
                    <div
                      key={p.id}
                      onClick={() => onProductClick(p)}
                      className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex gap-4 hover:shadow-lg hover:border-primary transition items-center cursor-pointer"
                    >
                      <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-lg shrink-0 border border-gray-150 dark:border-gray-855" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] text-primary uppercase font-mono font-bold">{p.brand} · {p.subcategory}</span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate mt-0.5">{p.name}</h4>
                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{p.shortDescription}</p>
                        <div className="text-xs text-amber-500 mt-2 font-mono">★ {p.rating} ({p.reviewCount} reviews)</div>
                      </div>
                      <div className="text-right shrink-0 px-4 flex flex-col justify-end">
                        <span className="block text-md font-extrabold text-primary font-mono">৳{p.price.toLocaleString()}</span>
                        {p.originalPrice && <span className="block text-xs line-through text-gray-450 font-mono">৳{p.originalPrice.toLocaleString()}</span>}
                        <div className="flex gap-2 mt-3 justify-end whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(p);
                            }}
                            className="px-3 py-1.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded text-xs tracking-wide font-bold"
                          >
                            কার্টে যোগ
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onBuyNow) {
                                const defaultSize = p.sizeOptions && p.sizeOptions.length > 0 ? p.sizeOptions[0] : undefined;
                                const defaultColor = p.colorOptions && p.colorOptions.length > 0 ? p.colorOptions[0].name : undefined;
                                onBuyNow(p, defaultSize, defaultColor);
                              } else {
                                onAddToCart(p);
                              }
                            }}
                            className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded text-xs tracking-wide font-bold flex items-center gap-1"
                          >
                            <Zap size={14} className="fill-current" />
                            অর্ডার করুন
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </section>
      </div>

      {/* MOBILE HEIGHT-RESTRICTED BOTTOM FILTER SHEET DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={() => setIsMobileFilterOpen(false)} />
          
          <div className="relative w-full max-h-[85vh] overflow-y-auto bg-white dark:bg-dark-soft rounded-t-3xl p-6 shadow-2xl z-10 transition-transform animate-modal text-left">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">ফিল্টার সেটিংস (Filters Options)</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 hover:text-primary transition" aria-label="Close filters sheet">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">ক্যাটাগরি</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["helmet", "decoration", "spare-parts", "riding-gear"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(selectedCategory === cat ? "" : cat);
                        setSelectedSub("");
                        triggerReload();
                      }}
                      className={`px-3 py-1.5 rounded-lg border font-semibold ${selectedCategory === cat ? "border-primary bg-primary/10 text-primary" : "border-gray-200 dark:border-gray-700"}`}
                    >
                      {cat.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price simple slider */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">সর্বোচ্চ বাজেট মূল্য (Max Price)</p>
                <div className="flex justify-between text-xs font-mono font-bold text-primary mb-1">
                  <span>৳০</span>
                  <span>৳{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  aria-label="Mobile price filter slider"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(parseInt(e.target.value));
                    triggerReload();
                  }}
                  className="w-full accent-primary h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Flags */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">পণ্য কুয়েরি</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => { setFlagNew(!flagNew); triggerReload(); }}
                    className={`px-3 py-1.5 rounded-lg border font-semibold ${flagNew ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-200 dark:border-gray-700"}`}
                  >
                    New Arrivals
                  </button>
                  <button
                    onClick={() => { setFlagSale(!flagSale); triggerReload(); }}
                    className={`px-3 py-1.5 rounded-lg border font-semibold ${flagSale ? "bg-save border-save text-dark" : "border-gray-200 dark:border-gray-700"}`}
                  >
                    On Sale Discount
                  </button>
                  <button
                    onClick={() => { setFlagInStock(!flagInStock); triggerReload(); }}
                    className={`px-3 py-1.5 rounded-lg border font-semibold ${flagInStock ? "bg-primary border-primary text-white" : "border-gray-200 dark:border-gray-700"}`}
                  >
                    In Stock Only
                  </button>
                </div>
              </div>

              {/* Apply/Clears buttons */}
              <div className="pt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={clearAllFilters}
                  className="py-2.5 bg-gray-105 border border-gray-200 hover:bg-gray-200 rounded-xl text-center text-xs font-semibold text-gray-700"
                >
                  Reset Play
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-center text-xs font-bold"
                >
                  ফিল্টার প্রয়োগ করুন ({sortedProducts.length})
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
