import React from "react";
import { Eye, Heart, ShoppingCart, Check, RefreshCw, Zap } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: any;
  product: Product;
  onProductClick: (p: Product) => void;
  onQuickView: (p: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  isCompared: boolean;
  onToggleCompare: (p: Product) => void;
  onAddToCart: (p: Product, size?: string, color?: string) => void;
  onBuyNow?: (p: Product, size?: string, color?: string) => void;
}

export default function ProductCard({
  product,
  onProductClick,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onAddToCart,
  onBuyNow
}: ProductCardProps) {
  const [isAdded, setIsAdded] = React.useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    
    // Choose default variant options if available
    const defaultSize = product.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions[0] : undefined;
    const defaultColor = product.colorOptions && product.colorOptions.length > 0 ? product.colorOptions[0].name : undefined;
    
    onAddToCart(product, defaultSize, defaultColor);
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <article
      onClick={() => onProductClick(product)}
      className="group relative bg-[#ffffff] dark:bg-dark-soft border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:border-primary dark:hover:border-primary transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full cursor-pointer"
    >
      {/* Badge Top Left Overlay */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 font-sans pointer-events-none">
        {isOutOfStock ? (
          <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow uppercase">
            Out of Stock
          </span>
        ) : (
          <>
            {product.isFlashSale && (
              <span className="bg-save text-dark text-[10px] font-bold px-2 py-0.5 rounded-md shadow uppercase tracking-wide">
                🔥 Flash Sale
              </span>
            )}
            {product.isNew && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow uppercase">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow uppercase">
                Best Seller
              </span>
            )}
          </>
        )}
      </div>

      {/* Compare Checkbox & Wishlist Top Right controls */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
        <button
          title="Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`p-2 rounded-full shadow-md bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:scale-105 active:scale-95 transition-all`}
          aria-label="Add to Wishlist"
        >
          <Heart
            size={15}
            className={isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-gray-400"}
          />
        </button>

        <button
          title="Compare Product"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`p-2 rounded-full shadow-md bg-white dark:bg-gray-800 hover:scale-105 active:scale-95 transition-all ${isCompared ? "text-primary border border-primary/50" : "text-gray-400 hover:text-primary"}`}
          aria-label="Add to Compare"
        >
          <RefreshCw size={15} className={isCompared ? "rotate-45" : ""} />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="aspect-square w-full relative bg-gray-100 dark:bg-gray-900 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-500 ease-out"
        />

        {/* Hover Quick View Panel overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white hover:bg-primary hover:text-white text-dark text-xs font-semibold py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye size={14} />
            Quick View
          </button>
        </div>
      </div>

      {/* Detail Block */}
      <div className="p-4 flex flex-col flex-1 font-sans">
        {/* Brand Label */}
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-mono mb-1">
          {product.brand} · <span className="text-primary capitalize">{product.category.replace("-", " ")}</span>
        </p>

        {/* Product Title */}
        <h3 className="line-clamp-2 text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug group-hover:text-primary transition-colors min-h-[40px] mb-2 font-sans">
          {product.name}
        </h3>

        {/* Rating Stars row */}
        <div className="flex items-center gap-1.5 mb-3 select-none shrink-0 text-amber-500 fill-amber-500 text-xs">
          <span className="font-bold text-[11px] text-gray-500 mr-0.5">({product.rating})</span>
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300 dark:text-gray-700"}>★</span>
            ))}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount})</span>
        </div>

        {/* Price & Discount block */}
        <div className="mt-auto pt-2 flex flex-col gap-1 shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] sm:text-[17px] font-extrabold text-primary font-mono tracking-tight">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-mono">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <span className="text-[10px] text-save font-bold flex items-center gap-1">
              Save ৳{(product.originalPrice! - product.price).toLocaleString()} ({discountPercent}%)
            </span>
          )}
        </div>

        {/* Add to Cart & Buy Now Footer Triggers */}
        <div className="mt-4 shrink-0 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isOutOfStock) return;
              if (onBuyNow) {
                // Determine default size/color if applicable
                const defaultSize = product.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions[0] : undefined;
                const defaultColor = product.colorOptions && product.colorOptions.length > 0 ? product.colorOptions[0].name : undefined;
                onBuyNow(product, defaultSize, defaultColor);
              } else {
                handleAddToCart(e);
              }
            }}
            disabled={isOutOfStock}
            className={`w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
              isOutOfStock
                ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark text-white shadow-sm"
            }`}
          >
            {!isOutOfStock && <Zap size={16} className="fill-current" />}
            অর্ডার করুন
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
            }}
            disabled={isOutOfStock}
            className={`w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm transition-colors duration-200 border ${
              isOutOfStock
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed"
                : isAdded
                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200"
                : "bg-white dark:bg-dark text-primary border-primary hover:bg-primary hover:text-white"
            }`}
          >
            {isOutOfStock ? (
               "Out of Stock"
            ) : isAdded ? (
              <>
                <Check size={16} className="animate-pulse" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                কার্টে যোগ করুন
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
