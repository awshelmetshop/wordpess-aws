import React, { useState, useEffect } from "react";
import { Zap, Tag, ArrowRight, ShieldAlert } from "lucide-react";
import { Product } from "../types";
import { SAMPLE_PRODUCTS } from "../data";
import ProductCard from "../components/ProductCard";

interface DealsProps {
  onProductClick: (p: Product) => void;
  onQuickView: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (p: Product) => void;
  comparison: string[];
  onToggleCompare: (p: Product) => void;
  onAddToCart: (p: Product, size?: string, color?: string) => void;
  onBuyNow?: (p: Product, size?: string, color?: string) => void;
}

export default function Deals({
  onProductClick,
  onQuickView,
  wishlist,
  onToggleWishlist,
  comparison,
  onToggleCompare,
  onAddToCart,
  onBuyNow
}: DealsProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [selectedDiscountTier, setSelectedDiscountTier] = useState<number>(10); // Minimum 10% off

  // Ticking time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  // Filter flash specials or items that have matching discounts
  const dealProducts = SAMPLE_PRODUCTS.filter((product) => {
    if (!product.originalPrice) return false;
    const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return discountPct >= selectedDiscountTier;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200 text-left">
      
      {/* Deals Hero header and clock */}
      <div className="bg-dark text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-gray-800 shadow-xl mb-10 select-none">
        <div className="absolute right-0 top-0 w-1/4 h-full bg-cover opacity-10 pointer-events-none" />
        
        <div className="space-y-4 max-w-xl text-left relative z-10">
          <span className="bg-primary text-white font-mono text-[9px] uppercase font-bold py-1 px-3 rounded-full flex items-center gap-1.5 w-fit">
            <Zap size={10} className="animate-pulse" />
            LIMITED TIME CAMPAIGN
          </span>
          <h1 className="text-xl sm:text-3xl font-black font-display uppercase tracking-tight leading-none text-white">
            মহা ধামাকা অফার জোন — Flash Sale Specials
          </h1>
          <p className="text-xs sm:text-sm text-gray-350 text-gray-300">
            রানিং ডিজাইনের অরিজিনাল সার্টিফাইড হেলমেট এবং বাইক এক্সেসরিজে সর্বোচ্চ ৩০% পর্যন্ত ক্যাশ ছাড়। স্টক ফুরিয়ে যাওয়ার পূর্বেই সস্তা মূল্যে লুফে নিন!
          </p>
        </div>

        {/* Ticking Box */}
        <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-primary/30 bg-primary/10 shrink-0 select-none relative z-10 font-mono text-center">
          <p className="text-[10px] text-primary uppercase font-bold tracking-widest pl-1">ডিল শেষ হতে বাকি</p>
          <div className="flex gap-2 items-center text-white">
            <div className="bg-dark border border-gray-800 rounded px-2.5 py-1.5 text-md font-black">{formatNumber(timeLeft.hours)}</div>
            <span>:</span>
            <div className="bg-dark border border-gray-800 rounded px-2.5 py-1.5 text-md font-black">{formatNumber(timeLeft.minutes)}</div>
            <span>:</span>
            <div className="bg-dark border border-gray-800 rounded px-2.5 py-1.5 text-md font-black">{formatNumber(timeLeft.seconds)}</div>
          </div>
        </div>
      </div>

      {/* Discount Tiers Filters row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 font-sans border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h2 className="text-sm font-black text-gray-905 dark:text-white uppercase tracking-wider">রানিং ক্যাম্পেইন আইটেমস তালিকা ({dealProducts.length} ডিল)</h2>
          <p className="text-xs text-gray-500">ডিসকাউন্ট পার্সেন্টেজ থ্রেশহোল্ড সিলেক্ট করে পণ্য খুঁজুন:</p>
        </div>

        <div className="flex gap-2 text-xs font-mono">
          {[
            { label: "10% Off & Above", val: 10 },
            { label: "15% Off & Above", val: 15 },
            { label: "20% Off & Above", val: 20 }
          ].map((tier) => (
            <button
              key={tier.val}
              onClick={() => setSelectedDiscountTier(tier.val)}
              className={`py-1.5 px-3 rounded-lg border font-bold ${selectedDiscountTier === tier.val ? "bg-primary border-primary text-white" : "border-gray-200 dark:border-gray-750 text-gray-500 hover:text-black dark:hover:text-white"}`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {dealProducts.length === 0 ? (
        <div className="py-16 text-center select-none text-gray-500 font-sans border border-dashed border-gray-205 dark:border-gray-800 rounded-xl">
          <ShieldAlert className="mx-auto text-primary mb-3" size={32} />
          <p className="text-sm font-extrabold uppercase">দুঃখিত! এই থ্রেশহোল্ড অতিক্রম করার মতো কোনো অফার স্টকড নেই</p>
          <button onClick={() => setSelectedDiscountTier(10)} className="text-xs text-primary font-bold underline mt-1 block mx-auto py-1">সব কুপন অফার দেখুনঃ</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dealProducts.map((p) => (
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
          ))}
        </div>
      )}

    </div>
  );
}
