import React from "react";
import { Facebook, Instagram, Youtube, Compass, ShieldCheck, Truck, RefreshCw } from "lucide-react";

interface FooterProps {
  onTabChange: (tab: string) => void;
  onCategorySelect?: (cat: string) => void;
  onOpenWpPage?: (slug: string) => void;
}

export default function Footer({ onTabChange, onCategorySelect, onOpenWpPage }: FooterProps) {
  const handleCategoryClick = (cat: string) => {
    onTabChange("shop");
    if (onCategorySelect) onCategorySelect(cat);
  };

  return (
    <footer className="bg-dark text-white pt-12 pb-6 border-t border-gray-800 font-sans mt-auto transition-colors duration-200">
      {/* Dynamic Trust Features Strip first inside footer */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
          <div className="bg-gray-900/40 p-4 sm:p-5 rounded-xl border border-gray-800/60 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group hover:bg-gray-900/80 hover:border-primary/30 transition-all duration-300 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0 text-primary/80 group-hover:text-primary transition-all duration-300 border border-gray-800 group-hover:border-primary/30">
              <Truck size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-bold text-[11px] sm:text-xs text-gray-300 group-hover:text-white transition-colors uppercase tracking-wide">সুপার ফাস্ট ডেলিভারি</h4>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1 leading-relaxed">ঢাকা সিটিতে ১-২ দিনে এবং ঢাকার বাইরে ৩-৫ দিনে</p>
            </div>
          </div>
          <div className="bg-gray-900/40 p-4 sm:p-5 rounded-xl border border-gray-800/60 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group hover:bg-gray-900/80 hover:border-primary/30 transition-all duration-300 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0 text-primary/80 group-hover:text-primary transition-all duration-300 border border-gray-800 group-hover:border-primary/30">
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-bold text-[11px] sm:text-xs text-gray-300 group-hover:text-white transition-colors uppercase tracking-wide">১০০% অরিজিনাল পণ্য</h4>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1 leading-relaxed">প্রতিটি হেলমেট ও পার্টস সোর্স থেকে ভেরিফাইড</p>
            </div>
          </div>
          <div className="bg-gray-900/40 p-4 sm:p-5 rounded-xl border border-gray-800/60 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group hover:bg-gray-900/80 hover:border-primary/30 transition-all duration-300 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0 text-primary/80 group-hover:text-primary transition-all duration-300 border border-gray-800 group-hover:border-primary/30">
              <RefreshCw size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-bold text-[11px] sm:text-xs text-gray-300 group-hover:text-white transition-colors uppercase tracking-wide">৭ দিনের সহজ রিটার্ন</h4>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1 leading-relaxed">পণ্য অপছন্দ বা সাইজ পরিবর্তন করতে ৭ দিনের সুযোগ</p>
            </div>
          </div>
          <div className="bg-gray-900/40 p-4 sm:p-5 rounded-xl border border-gray-800/60 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group hover:bg-gray-900/80 hover:border-primary/30 transition-all duration-300 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0 text-primary/80 group-hover:text-primary transition-all duration-300 border border-gray-800 group-hover:border-primary/30">
              <Compass size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-bold text-[11px] sm:text-xs text-gray-300 group-hover:text-white transition-colors uppercase tracking-wide">২৪/৭ কাস্টমার সাপোর্ট</h4>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1 leading-relaxed">যেকোনো তথ্যের জন্য সরাসরি কল বা হোয়াটসঅ্যাপ করুন</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Description Column */}
        <div className="space-y-4">
          <span className="font-display text-xl font-bold tracking-tight text-white block">
            MOTO<span className="text-primary">SHOP</span> <span className="text-xs font-mono text-gray-500">BD</span>
          </span>
          <p className="text-[11px] leading-relaxed text-gray-400">
            মটোশপ বিডি বাংলাদেশের এক নম্বর রাইডিং গিয়ার ও হেলমেট শপ। অরিজিনাল ব্র্যান্ডের ইসিই অনুমোদিত হেলমেট এবং মোটর সাইকেল ডেকোরেশন এক ছাদের নিচে।
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://facebook.com" aria-label="Facebook Link" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-primary rounded-full text-gray-300 hover:text-white transition">
              <Facebook size={14} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram Link" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-primary rounded-full text-gray-300 hover:text-white transition">
              <Compass size={14} />
            </a>
            <a href="https://youtube.com" aria-label="Youtube Link" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-primary rounded-full text-gray-300 hover:text-white transition">
              <Youtube size={14} />
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="font-bold text-[11px] text-white mb-4 tracking-[0.1em] uppercase font-display">Shop Categories</h4>
          <ul className="space-y-2.5 text-[11px] text-gray-400 font-sans">
            <li>
              <button onClick={() => handleCategoryClick("full-face")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Full Face Helmets
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick("modular")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Modular Helmets
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick("decoration")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Motorcycle Decoration
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick("spare-parts")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Genuine Spare Parts
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryClick("riding-gear")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Rider Protection Gear
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div>
          <h4 className="font-bold text-[11px] text-white mb-4 tracking-[0.1em] uppercase font-display">Customer Support</h4>
          <ul className="space-y-2.5 text-[11px] text-gray-400 font-sans">
            <li>
              <button onClick={() => onTabChange("track-order")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Track Your Order
              </button>
            </li>
            <li>
              <button onClick={() => onTabChange("faq")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Frequently Asked Questions
              </button>
            </li>
            <li>
              <button onClick={() => onTabChange("contact")} className="hover:text-primary transition-colors text-left flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Store Location & Directions
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenWpPage && onOpenWpPage("privacy-policy")} 
                className="hover:text-primary transition-colors text-left flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Privacy Policy
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenWpPage && onOpenWpPage("terms-conditions")} 
                className="hover:text-primary transition-colors text-left flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Terms of Service
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenWpPage && onOpenWpPage("shipping")} 
                className="hover:text-primary transition-colors text-left flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-primary transition-colors"></span> Shipping & Returns
              </button>
            </li>
          </ul>
        </div>

        {/* Corporate Address & Contact Column */}
        <div>
          <h4 className="font-bold text-[11px] text-white mb-4 tracking-[0.1em] uppercase font-display">Store Address</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-sans mb-4">
            {(window as any).WordPressData?.storeAddress || "মটোশপ টাওয়ার, লেভেল ৪, সেক্টর ৭, জসিমউদ্দিন এভিনিউ, উত্তরা, ঢাকা ১২৩০।"}
          </p>
          <div className="space-y-2 text-[11px]">
            <p className="text-white font-medium flex items-center gap-2">
              <span className="text-primary w-4">📞</span> 
              {(window as any).WordPressData?.contactPhone || "+৮৮০ ১৭৮৮২২৩৩৪৪"}
            </p>
            <p className="text-gray-400 flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <span className="text-primary w-4">📧</span> 
              {(window as any).WordPressData?.contactEmail || "support@motoshopbd.com"}
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <span className="text-primary w-4">⌛</span> 
              শনি-বৃহস্পতি (সকাল ১০টা - রাত ৮টা)
            </p>
          </div>
        </div>

      </div>

      {/* Tread Pattern Accent strip across bottom */}
      <div className="tread-pattern mb-6"></div>

      {/* Row 2 — Bottom strip with bKash Nagad Payment logos */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans border-t border-gray-900 pt-6">
        <div>
          Copyright © 2026 <span className="text-gray-400 font-bold">{(window as any).WordPressData?.siteName || "MotoShop BD"}</span>. All Rights Reserved. Designed for Riders.
        </div>
        
        {/* bKash, Nagad payment visuals representation */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Payment Partners:</span>
          <div className="bg-white/5 py-1 px-2.5 rounded flex items-center gap-2 border border-white/10">
            <span className="text-pink-500 font-bold font-mono text-[10px] tracking-tight">bKash</span>
            <span className="text-orange-500 font-bold font-sans text-[10px]">Nagad</span>
            <span className="text-indigo-400 font-mono text-[9px] tracking-wider font-bold">SSLCommerz</span>
            <span className="text-gray-300 font-semibold text-[10px]">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
