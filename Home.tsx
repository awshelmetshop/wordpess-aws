import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, Zap, Award, Shield, Star, ThumbsUp, Calendar, ArrowUpRight } from "lucide-react";
import { Product } from "../types";
import { SAMPLE_PRODUCTS } from "../data";
import ProductCard from "../components/ProductCard";

interface HomeProps {
  onTabChange: (tab: string) => void;
  onCategorySelect?: (cat: string) => void;
  onProductClick: (p: Product) => void;
  onQuickView: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (p: Product) => void;
  comparison: string[];
  onToggleCompare: (p: Product) => void;
  onAddToCart: (p: Product, size?: string, color?: string) => void;
  onBuyNow?: (p: Product, size?: string, color?: string) => void;
}

export default function Home({
  onTabChange,
  onCategorySelect,
  onProductClick,
  onQuickView,
  wishlist,
  onToggleWishlist,
  comparison,
  onToggleCompare,
  onAddToCart,
  onBuyNow
}: HomeProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    (window as any).WordPressData?.heroImage || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1449426468159-d96a6d000ea5?auto=format&fit=crop&q=80&w=2070",
  ];

  // Next / Prev slide handlers
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Auto-play interval for hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Ticking Flash Sale timer simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // reset to loop mock sale
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const bestSellers = SAMPLE_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const flashSaleProducts = SAMPLE_PRODUCTS.filter((p) => p.isFlashSale).slice(0, 4);
  const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  const categories = [
    { title: "Helmets", count: "24 Products", tag: "helmet", desc: "Full Face · Half Face · Modular · Baby", img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=400" },
    { title: "Decoration", count: "36 Products", tag: "decoration", desc: "Stickers · Lights · Chrome Accessories", img: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=400" },
    { title: "Spare Parts", count: "15 Products", tag: "spare-parts", desc: "Chains · Brakes · Performance Plugs", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400" },
    { title: "Riding Gear", count: "18 Products", tag: "riding-gear", desc: "Jackets · Mesh Gloves · Waterproof Boots", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400" }
  ];

  const testimonials = [
    { name: "Sajid Hasan", city: "Dhaka", rating: 5, review: "ProRide carbon helmet ta motopeyechi, quality brand real product. Dhaka delivery is super fast (just paid in Nagad inside 24 hours). Check list support recommended!", date: "2 days ago" },
    { name: "Rashedul Amin", city: "Chittagong", rating: 5, review: "DID gold drive chain standard absolute beauty. Highly authentic, original hologram verified standard.", date: "1 week ago" },
    { name: "Tariqul Islam", city: "Sylhet", rating: 5, review: "Summer riding gloves ordered standard directly on WhatsApp code. Quick, friendly communication and safe courier packing.", date: "2 weeks ago" }
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      {/* C. Image Carousel Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 mt-6 mb-8">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden group shadow-lg">
          {/* Carousel Images */}
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 bg-black/50 sm:bg-black/40">
            <h1 className="text-[13px] min-[360px]:text-[15px] min-[390px]:text-[17px] sm:text-[41px] sm:leading-[48px] text-center font-black text-white mb-2 sm:mb-4 mt-0 p-0 drop-shadow-lg font-sans tracking-tight whitespace-nowrap sm:whitespace-normal">
               বাংলাদেশের সেরা হেলমেট ও গিয়ার শপ
            </h1>
            <p className="text-xs sm:text-lg text-white/90 mb-5 sm:mb-8 max-w-xl drop-shadow-md">
               ১০০% অরিজিনাল পণ্য • দেশব্যাপী দ্রুত ডেলিভারি
            </p>
            <button
              onClick={() => onTabChange("shop")}
              className="bg-primary hover:bg-primary-dark text-white px-5 sm:px-8 py-2.5 sm:py-4 rounded-full font-bold text-xs sm:text-base flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 cursor-pointer"
            >
              প্রোডাক্ট দেখুন <ArrowRight size={18} />
            </button>
          </div>



          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-primary w-5" : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* D. Floating Trust Bar strip */}
      <section className="relative z-20 max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-150 dark:divide-gray-800 font-sans">
          <div className="flex items-center gap-3 p-3">
            <span className="text-2xl">🚚</span>
            <div>
              <h4 className="font-bold text-xs">সুপার ফাস্ট ডেলিভারি</h4>
              <p className="text-[10px] text-gray-400">ঢাকা সিটিতে ১-২ দিনে</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h4 className="font-bold text-xs">১০০% আসল পণ্য</h4>
              <p className="text-[10px] text-gray-400">সরাসরি ভেরিফাইড সোর্স</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <span className="text-2xl">🔄</span>
            <div>
              <h4 className="font-bold text-xs">৭ দিনের সহজ রিটার্ন</h4>
              <p className="text-[10px] text-gray-400">কোনো ল্যাটেন্সি ছাড়াই পরিবর্তন</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <span className="text-2xl">💬</span>
            <div>
              <h4 className="font-bold text-xs">২৪/৭ কাস্টমার সাপোর্ট</h4>
              <p className="text-[10px] text-gray-400">হোয়াটসঅ্যাপ চ্যাট সার্ভিস</p>
            </div>
          </div>
        </div>
      </section>

      {/* E. Shop by Category Grid section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8 font-sans">
          <div className="flex-1">
            <h2 className="text-[17px] min-[375px]:text-[19px] sm:text-2xl font-bold tracking-tight whitespace-nowrap sm:whitespace-normal">ক্যাটাগরি অনুযায়ী খুঁজুন</h2>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 line-clamp-1 sm:line-clamp-none">আপনার প্রয়োজনীয় মোটরসাইকেল এক্সেসরিজ বিভাগ সিলেক্ট করুন</p>
          </div>
          <button
            onClick={() => onTabChange("shop")}
            className="text-[10px] sm:text-xs text-primary font-bold hover:underline flex items-center gap-0.5 whitespace-nowrap shrink-0 ml-2"
          >
            সব ক্যাটাগরি ও ফিল্টার
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => {
                onTabChange("shop");
                if (onCategorySelect) onCategorySelect(cat.tag);
              }}
              className="cat-tile group relative h-32 sm:h-48 bg-dark rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-250 dark:border-gray-800"
            >
              {/* Background cover image */}
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-[1.08] transition-transform duration-500"
                loading="lazy"
              />
              {/* Black overlay drop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-left font-sans">
                <span className="text-[9px] bg-primary/95 text-white font-bold py-0.5 px-2 rounded-full uppercase tracking-wide">
                  {cat.count}
                </span>
                <h3 className="text-sm sm:text-md  font-bold text-white mt-1 sm:mt-1.5 leading-tight group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[9px] sm:text-[10px] text-gray-300 mt-0.5 line-clamp-1">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. Flash Sale/Deals with Countdown */}
      <section className="w-full bg-dark text-white py-14 px-4 overflow-hidden border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Header row details */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
            <div className="flex flex-wrap items-center gap-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-primary text-xl sm:text-2xl font-bold font-display tracking-wider uppercase">
                <Zap size={22} className="animate-pulse" />
                🔥 Flash Sale
              </div>
              
              {/* Countdowns ticking box */}
              <div className="flex items-center gap-1.5 text-xs font-mono ml-0 sm:ml-4 select-none">
                <span className="text-gray-400">ডিল শেষ হতে বাকি:</span>
                <div className="bg-primary/20 border border-primary/45 px-2 py-1.5 rounded font-extrabold text-white">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span>:</span>
                <div className="bg-primary/20 border border-primary/45 px-2 py-1.5 rounded font-extrabold text-white">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span>:</span>
                <div className="bg-primary/20 border border-primary/45 px-2 py-1.5 rounded font-extrabold text-white">
                  {formatNumber(timeLeft.seconds)}
                </div>
              </div>
            </div>

            <button
              onClick={() => onTabChange("deals")}
              className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5 text-left shrink-0 self-start md:self-auto"
            >
              সব অফার দেখুন
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Flash items grids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {flashSaleProducts.map((p) => (
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
        </div>
      </section>

      {/* All Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8 font-sans">
          <div className="flex-1">
            <h2 className="text-[17px] min-[375px]:text-[19px] sm:text-2xl font-bold tracking-tight whitespace-nowrap sm:whitespace-normal">সকল পণ্যসমুহ</h2>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 line-clamp-1 sm:line-clamp-none">আমাদের স্টকে থাকা সম্পূর্ণ আসল হেলমেট ও এক্সেসরিজসমূহ</p>
          </div>
          <button
            onClick={() => onTabChange("shop")}
            className="text-[10px] sm:text-xs text-primary font-bold hover:underline flex items-center gap-0.5 whitespace-nowrap shrink-0 ml-2"
          >
            সব পণ্য দেখুন
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {SAMPLE_PRODUCTS.map((p) => (
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
      </section>

      {/* J. Why Choose Us Section */}
      <section className="w-full bg-gray-100 dark:bg-gray-905 py-14 px-4 font-sans select-none border-t border-gray-200 dark:border-gray-900">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">কেন মটোশপ বিডি বেছে নিবেন?</h2>
            <p className="text-xs text-gray-500 mt-1.5 max-w-md mx-auto">বাংলাদেশের বাইকারদের আস্থা অর্জন করতে আমরা প্রতিটি পদক্ষেপে সেফটি এবং জেনুইন সার্ভিস নিশ্চিত করি।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-soft p-6 rounded-xl shadow-sm hover:shadow transition text-center space-y-3.5 border border-gray-150 dark:border-gray-800">
              <div className="text-3xl">🛡️</div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">ECE & DOT সার্টিফাইড হেলমেট</h3>
              <p className="text-xs text-gray-400">আমাদের সব হেলমেট আন্তর্জাতিক সেফটি স্ট্যান্ডার্ড অনুযায়ী পরীক্ষিত এবং অরিজিনাল ব্র্যান্ডের নিশ্চয়তা যুক্ত।</p>
            </div>
            <div className="bg-white dark:bg-dark-soft p-6 rounded-xl shadow-sm hover:shadow transition text-center space-y-3.5 border border-gray-150 dark:border-gray-800">
              <div className="text-3xl">🏍️</div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">রাইডারদের বিশাল বাইকার কমিউনিটি</h3>
              <p className="text-xs text-gray-400 text-gray-400">বাংলাদেশের ১০,০০০ এর বেশি বাইকার আমাদের পণ্য ব্যবহারে দারুণ সন্তুষ্টি প্রকাশ করছেন আমাদের ভেরিফাইড গ্রুপগুলোতে!</p>
            </div>
            <div className="bg-white dark:bg-dark-soft p-6 rounded-xl shadow-sm hover:shadow transition text-center space-y-3.5 border border-gray-150 dark:border-gray-800">
              <div className="text-3xl">⚙️</div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">অরিজিনাল পার্টস ও ফিটিংস গ্যারান্টি</h3>
              <p className="text-xs text-gray-400">যেকোনো বাইকের জন্য আসল স্পেয়ার পার্টস ও লাইটিং ডেকোরেশন আইটেম যা সহজে ফিটিং করা যায় ও দীর্ঘ টেকসই দেয়।</p>
            </div>
          </div>
        </div>
      </section>

      {/* K. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16 font-sans select-none">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">আমাদের প্রতি গ্রাহকদের ভালোবাসা</h2>
          <p className="text-xs text-gray-550 dark:text-gray-400 mt-1 max-w-sm mx-auto">গ্রাহকদের সরাসরি প্রদান করা জেনুইন রিভিউর কিছু সামান্য টুকরো</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div
              key={i}
              className="bg-white dark:bg-dark-soft border border-gray-150 dark:border-gray-800 p-5 rounded-xl shadow-sm space-y-3 flex flex-col text-left"
            >
              {/* Rating stars */}
              <div className="flex gap-1 text-amber-500 text-xs">
                {Array.from({ length: test.rating }).map((_, st) => (
                  <span key={st}>★</span>
                ))}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed flex-1">
                "{test.review}"
              </p>
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3 text-[10px] text-gray-400">
                <div>
                  <span className="font-bold text-gray-800 dark:text-gray-200 block">{test.name}</span>
                  <span>{test.city} · Verified Buyer</span>
                </div>
                <span className="font-mono">{test.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
