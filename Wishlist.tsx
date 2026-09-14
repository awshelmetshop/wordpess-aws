import React from "react";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { SAMPLE_PRODUCTS } from "../data";
import ProductCard from "../components/ProductCard";

interface WishlistProps {
  wishlistIds: string[];
  onProductClick: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  comparison: string[];
  onToggleCompare: (p: Product) => void;
  onAddToCart: (p: Product, size?: string, color?: string) => void;
  onBuyNow?: (p: Product, size?: string, color?: string) => void;
  onBrowse: () => void;
}

export default function Wishlist({
  wishlistIds,
  onProductClick,
  onQuickView,
  onToggleWishlist,
  comparison,
  onToggleCompare,
  onAddToCart,
  onBuyNow,
  onBrowse
}: WishlistProps) {
  
  // Filter products that exist inside wishlist
  const wishlistedProducts = SAMPLE_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200 text-left">
      <h1 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-2">
        <Heart className="text-red-500 fill-red-500" />
        আপনার পছন্দের তালিকা (My Wishlist)
      </h1>

      {wishlistedProducts.length === 0 ? (
        /* 19.3 Empty State: Wishlist empty */
        <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-805 rounded-2xl py-16 px-6 text-center select-none shadow-sm font-sans">
          <Heart size={56} className="mx-auto text-gray-300 dark:text-gray-800 mb-4 animate-pulse" />
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
            পছন্দের তালিকা খালি! (Wishlist is Empty)
          </h3>
          <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
            কোনো মোটরসাইকেল হেলমেট বা এক্সেসরিজ পণ্য পছন্দের তালিকায় যোগ করা হয়নি। পণ্যের পাশের হার্ট (♡) আইকনে ট্যাপ করে যেকোনো পণ্য এখানে সেভ করে রাখতে পারেন।
          </p>
          <div className="pt-8">
            <button
              onClick={onBrowse}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold uppercase transition"
            >
              গ্যালারি ব্রাউজ করুন →
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlistedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onProductClick={onProductClick}
              onQuickView={onQuickView}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              isCompared={comparison.includes(p.id)}
              onToggleCompare={onToggleCompare}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}

    </div>
  );
}
