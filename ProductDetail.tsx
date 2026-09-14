import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ShoppingCart, MessageSquare, Phone, Truck, ShieldCheck, RefreshCw, Star, Heart, Check, HelpCircle } from "lucide-react";
import { Product, Review } from "../types";
import { SAMPLE_PRODUCTS } from "../data";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, size?: string, color?: string, qty?: number) => void;
  onBuyNow: (p: Product, size?: string, color?: string, qty?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onProductClick: (p: Product) => void;
}

export default function ProductDetail({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onProductClick
}: ProductDetailProps) {
  // Gallery swapper
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews" | "shipping">("description");
  
  // Size Guide overlay
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Custom reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviewFormSuccess, setReviewFormSuccess] = useState(false);
  
  // Feedback popup notification
  const [addFeedback, setAddFeedback] = useState("");
  
  // Sticky bottom Mobile ATC visibility ref
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions[0] : "");
    setSelectedColor(product.colorOptions && product.colorOptions.length > 0 ? product.colorOptions[0].name : "");
    setQuantity(1);
    setReviewsList(product.reviews || []);
    setReviewFormSuccess(false);
    setAddFeedback("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  // Hook scroll to reveal sticky mobile ATC
  useEffect(() => {
    const handleScroll = () => {
      if (triggerButtonRef.current) {
        const rect = triggerButtonRef.current.getBoundingClientRect();
        // If the main ATC button is scrolled past, display sticky mobile ATC
        setIsStickyVisible(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [product]);

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    onAddToCart(product, selectedSize || undefined, selectedColor || undefined, quantity);
    setAddFeedback("ব্যাগ কার্টে পণ্য যুক্ত করা হয়েছে! 🎉");
    setTimeout(() => setAddFeedback(""), 2000);
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    onBuyNow(product, selectedSize || undefined, selectedColor || undefined, quantity);
  };

  const handleWhatsAppOrder = () => {
    const variantStr = [
      selectedSize ? `Size: ${selectedSize}` : "",
      selectedColor ? `Color: ${selectedColor}` : ""
    ].filter(Boolean).join(", ");

    const text = `আসসালামু আলাইকুম মটোশপ বিডি, আমি এই পণ্যটি সরাসরি অর্ডার করতে ইচ্ছুক:\n\n📦 পণ্য: ${product.name}\n🔖 স্কু কোড: ${product.sku}\n💰 মূল্য: ৳${product.price}\n⚙️ ভ্যারিয়েন্ট: ${variantStr || "Default"}\n🔢 পরিমাণ: ${quantity}\n🔗 লিংক: ${window.location.origin}/product/${product.id}\n\nঅনুগ্রহ করে আমার অর্ডারটি কনফার্ম করুন।`;
    window.open(`https://wa.me/8801788223344?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("দয়া করে নাম ও রিভিউ বিবরণটি পূরণ করুন।");
      return;
    }
    const newlyCreated: Review = {
      id: "rev-" + Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      verified: true
    };
    setReviewsList([newlyCreated, ...reviewsList]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setReviewFormSuccess(true);
    setTimeout(() => setReviewFormSuccess(false), 2500);
  };

  const isOutOfStock = product.stock === 0;

  // Find related products in same category
  const related = SAMPLE_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200">
      
      {/* Breadcrumb row & Back button */}
      <div className="flex justify-between items-center mb-6 font-sans select-none">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary font-bold tracking-tight py-1 px-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-dark-soft shadow-sm shrink-0 uppercase"
        >
          <ArrowLeft size={14} />
          Back to List
        </button>
        <span className="text-[10px] text-gray-400 truncate hidden sm:block">
          Home · Shop · {product.category} · <span className="font-semibold text-gray-600 dark:text-gray-300">{product.name}</span>
        </span>
      </div>

      {/* Main Single Product Row (2 columns grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
        
        {/* LEFTSIDE IMAGE MATRIX & GALLERY SWITCHER */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative shadow-md">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
            {product.isFlashSale && (
              <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-mono font-bold tracking-wider py-1 px-3 rounded-full shadow uppercase">
                🔥 Hot Deal
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500 shadow-md transform hover:scale-105 active:scale-95 transition"
              aria-label="Add to Wishlist"
            >
              <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>

          {/* Multiple thumbnails strip */}
          <div className="flex gap-2.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveImage(product.image)}
              className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-white shrink-0 ${activeImage === product.image ? "border-primary ring-2 ring-primary/20" : "border-gray-200 dark:border-gray-800 hover:border-gray-400"}`}
            >
              <img src={product.image} alt="thumb-main" className="w-full h-full object-cover" />
            </button>
            {product.additionalImages && product.additionalImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-white shrink-0 ${activeImage === img ? "border-primary ring-2 ring-primary/20" : "border-gray-200 dark:border-gray-800 hover:border-gray-400"}`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Professional warranty stamp columns */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl flex items-start gap-2.5">
              <ShieldCheck className="text-primary shrink-0" size={18} />
              <div className="text-left">
                <h5 className="text-[11px] font-bold text-gray-800 dark:text-gray-200 uppercase">১০০% আসল পন্য</h5>
                <p className="text-[9px] text-gray-400">ডায়েরেক্ট জেনুইন ব্র্যান্ড ওয়ারেন্টি</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl flex items-start gap-2.5">
              <Truck className="text-primary shrink-0" size={18} />
              <div className="text-left">
                <h5 className="text-[11px] font-bold text-gray-800 dark:text-gray-200 uppercase">ফাস্ট ডেলিভারি</h5>
                <p className="text-[9px] text-gray-400">উত্তরা হাউজ থেকে খুব দ্রুত শিফ্ট</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHTSIDE PRODUCT DOCUMENTATION DETAILS SHEET */}
        <div className="text-left flex flex-col space-y-6">
          <div>
            <span className="text-[10px] bg-primary/10 border border-primary/20 px-2.5 py-1 rounded font-mono font-bold text-primary inline-block uppercase tracking-wider mb-2">
              {product.brand} · Code: {product.sku}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mt-1 mb-2 font-sans">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 select-none text-xs text-amber-500 font-bold">
              <Star size={16} className="fill-amber-500 text-amber-500" />
              <span className="text-sm font-extrabold">{product.rating}</span>
              <span className="text-gray-400 font-medium">({reviewsList.length} Customer Reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-emerald-600 font-semibold uppercase text-[10px] tracking-wide">ECE Cert Approved</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-gray-50 dark:bg-dark-soft border border-gray-200 dark:border-gray-800 rounded-xl space-y-1.5">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">Best Price in Bangladesh</p>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl sm:text-3xl font-black text-primary font-mono tracking-tight">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm sm:text-base text-gray-400 line-through font-mono">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-save/20 text-save text-xs font-black py-0.5 px-3 rounded-full font-mono">
                    Save ৳{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Sizing swatches */}
          {product.sizeOptions && product.sizeOptions.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800 dark:text-gray-200">
                <span>সাইজ রানিং অপশন (Helmet Size):</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-primary hover:underline flex items-center gap-1 font-bold text-[11px] shrink-0"
                >
                  <HelpCircle size={13} />
                  📏 সাইজ তালিকা (Size Guide)
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {product.sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 font-mono font-bold rounded-lg border-2 transition ${selectedSize === sz ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "border-gray-200 dark:border-gray-850 hover:border-gray-400"}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors Selection options */}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">কালার ভ্যারিয়েন্ট:</p>
              <div className="flex flex-wrap gap-3">
                {product.colorOptions.map((clr) => (
                  <button
                    key={clr.name}
                    onClick={() => setSelectedColor(clr.name)}
                    className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold flex items-center gap-2 transition ${selectedColor === clr.name ? "border-primary bg-primary/10 text-primary" : "border-gray-200 dark:border-gray-800 hover:border-gray-400"}`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: clr.hex }} />
                    {clr.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & Real Stock count indicators */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-2 border-y border-gray-150 dark:border-gray-800">
            <div className="flex items-center shrink-0">
              <span className="text-xs font-bold text-gray-400 mr-2 uppercase">Quantity:</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-750 bg-white dark:bg-dark-soft rounded-lg shrink-0 overflow-hidden shadow-sm">
                <button onClick={decreaseQty} className="px-3 py-1.5 hover:text-primary transition" aria-label="Decrease item count">
                  -
                </button>
                <span className="px-4 font-bold font-mono text-xs">{quantity}</span>
                <button onClick={increaseQty} className="px-3 py-1.5 hover:text-primary transition" aria-label="Increase item count">
                  +
                </button>
              </div>
            </div>

            {/* In stock live diagnosis info */}
            <div className="ml-0 sm:ml-auto">
              {isOutOfStock ? (
                <span className="bg-red-500/10 text-red-500 font-bold text-xs py-1.5 px-3 rounded-full">
                  ⚠️ আউট অব স্টক (Out of Stock)
                </span>
              ) : product.stock <= 5 ? (
                <span className="bg-amber-500/15 text-amber-500 font-extrabold text-xs py-1.5 px-3 rounded-full animate-pulse">
                  🚨 মাত্র {product.stock} টি স্টক স্টোরে আছে!
                </span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-600 font-bold text-xs py-1.5 px-3 rounded-full">
                  🟢 পণ্যটি স্টকে আছে (ইনস্ট্যান্ট ডেলিভারি)
                </span>
              )}
            </div>
          </div>

          {/* Message feedback indicator */}
          {addFeedback && (
            <p className="p-3 bg-emerald-50 text-emerald-600 font-extrabold text-center rounded-xl text-xs border border-emerald-250 animate-bounce">
              {addFeedback}
            </p>
          )}

          {/* Primary Shopping ActionButtons block */}
          <div className="flex flex-col gap-3 font-sans pt-2">
            
            {/* Split row: Add to cart & Buy now */}
            <div className="grid grid-cols-2 gap-4">
              <button
                ref={triggerButtonRef}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="btn-primary py-3 px-4 bg-dark hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-750 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={15} />
                কার্টে যুক্ত করুন (Cart)
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-primary/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                ⚡ অর্ডার করুন (Order Now)
              </button>
            </div>

            {/* WhatsApp order trigger */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer pulse-whatsapp"
            >
              <MessageSquare size={16} />
              হোয়াটসঅ্যাপে অর্ডার করুন (01788223344)
            </button>

            {/* Immediate Call line link */}
            <a
              href="tel:+8801788223344"
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-850 text-gray-700 dark:text-gray-300 font-semibold text-xs rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <Phone size={14} />
              কাস্টমার কেয়ার প্রতিনিধির সাথে কথা বলতে: +৮৮০ ১৭৮৮২২৩৩৪৪
            </a>
          </div>

          {/* Quick Zone delivery info summary */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl space-y-2 text-xs text-gray-500 font-sans leading-relaxed select-none">
            <p>🚚 <span className="font-bold text-gray-800 dark:text-gray-200">ডেলিভারি খরচ:</span> ঢাকা সিটিতে ৳৬০ এবং ঢাকার বাইরে ৳১২০।</p>
            <p>⌛ <span className="font-bold text-gray-800 dark:text-gray-200">ডেলিভারি সময়সীমা:</span> ঢাকা সিটিতে ২৪-৪৮ ঘন্টা, ঢাকার বাইরে ৩-৫ দিন।</p>
            <p>✅ <span className="font-bold text-gray-800 dark:text-gray-200 font-mono">Steadfast Courier</span> এর মাধ্যমে ক্যাশ অন ডেলিভারি দেওয়া হয়।</p>
          </div>

        </div>
      </div>

      {/* COMPACT DETAILED INFORMATION TABS ACCORDIONS */}
      <section className="mb-16 font-sans">
        <div className="border-b border-gray-250 dark:border-gray-800 flex justify-center sm:justify-start gap-4 md:gap-8 overflow-x-auto text-xs py-1.5 font-bold mb-6 select-none">
          {[
            { tag: "description", label: "Description" },
            { tag: "specifications", label: "Specifications" },
            { tag: "reviews", label: `Reviews (${reviewsList.length})` },
            { tag: "shipping", label: "Shipping Info" }
          ].map((tb) => (
            <button
              key={tb.tag}
              onClick={() => setActiveTab(tb.tag as any)}
              className={`pb-2.5 uppercase border-b-2 px-1 transition whitespace-nowrap cursor-pointer ${activeTab === tb.tag ? "border-primary text-primary font-black" : "border-transparent text-gray-400 hover:text-black dark:hover:text-white"}`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* Tab Cards Panels */}
        <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 text-left leading-relaxed">
          
          {/* 1. Description Tab */}
          {activeTab === "description" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wide">পণ্য পরিচিতি ও ডিটেইলস</h3>
              <p className="text-xs text-text-muted text-gray-600 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                {product.description}
              </p>
              
              <h4 className="text-sm font-bold text-primary pt-2 uppercase">মূল বৈশিষ্ট্যসমুহ (Key Features):</h4>
              <ul className="text-xs text-gray-655 dark:text-gray-300 space-y-2 list-none pl-1">
                <li className="flex items-center gap-2">🟢 ✓ ১০০% আসল আন্তর্জাতিক রাইডিং জেনুইন কোয়ালিটি সার্টিফাইড।</li>
                <li className="flex items-center gap-2">🟢 ✓ উচ্চমানের টেকসই ABS বা ফাইবারগ্লাস বডি টেকনোলজি।</li>
                <li className="flex items-center gap-2">🟢 ✓ চমৎকার এয়ার ভেন্টিলেশন সিস্টেম যা গরমেও মাথা ঠান্ডা রাখে।</li>
                <li className="flex items-center gap-2">🟢 ✓ আরামদায়ক ও ঘাম-প্রতিরোধী ইনার লাইনার প্যাড যা সহজে খুলে ধোয়া যায়।</li>
              </ul>
            </div>
          )}

          {/* 2. Specifications Tab */}
          {activeTab === "specifications" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Technical Specifications</h3>
              <div className="border border-gray-150 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
                <table className="w-full border-collapse divide-y divide-gray-150 dark:divide-gray-800 font-sans">
                  <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                    {/* Render attributes map */}
                    {Object.entries(product.attributes).map(([key, val]) => (
                      <tr key={key} className="even:bg-gray-50 dark:even:bg-gray-900/35">
                        <td className="p-3.5 font-bold uppercase w-1/3 text-gray-500 capitalize">{key.replace("-", " ")}</td>
                        <td className="p-3.5 font-semibold text-gray-800 dark:text-white">{val || "N/A"}</td>
                      </tr>
                    ))}
                    <tr className="even:bg-gray-50 dark:even:bg-gray-900/35">
                      <td className="p-3.5 font-bold uppercase w-1/3 text-gray-500">Official Brand</td>
                      <td className="p-3.5 font-semibold text-gray-800 dark:text-white font-mono">{product.brand}</td>
                    </tr>
                    <tr className="even:bg-gray-50">
                      <td className="p-3.5 font-bold uppercase w-1/3 text-gray-500">SKU Code Reference</td>
                      <td className="p-3.5 font-semibold text-gray-800 dark:text-white font-mono">{product.sku}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Reviews Tab Panel withaggregate Star rating chart + Write Review form */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Aggregate average */}
                <div className="md:col-span-4 text-center p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-150 dark:border-gray-800">
                  <h3 className="text-3xl font-black text-primary font-mono">{product.rating}</h3>
                  <div className="flex justify-center text-amber-500 text-sm mt-1 mb-1 bg-transparent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Aggregate Rating ({reviewsList.length} Customer reviews)</p>
                </div>

                {/* Rating bars */}
                <div className="md:col-span-8 space-y-2 text-xs font-mono font-bold text-gray-500">
                  {[
                    { stars: 5, pct: "84%" },
                    { stars: 4, pct: "12%" },
                    { stars: 3, pct: "4%" },
                    { stars: 2, pct: "0%" },
                    { stars: 1, pct: "0%" }
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="w-12 text-right">{row.stars} Star</span>
                      <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-850 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: row.pct }} />
                      </div>
                      <span className="w-8 text-left">{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual reviews list */}
              <div className="space-y-4 pt-6 border-t border-gray-150 dark:border-gray-850">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">গ্রাহকদের মন্তব্যসমুহ (Reviews list)</h4>
                
                {reviewsList.length === 0 ? (
                  <p className="text-xs text-gray-450 italic py-4">এই পণ্যে এখনো কোনো রিভিও দেওয়া হয়নি। প্রথম কাস্টমার হিসেবে আপনার রিভিউটি যুক্ত করুন!</p>
                ) : (
                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-4 bg-gray-55/30 dark:bg-gray-900/20 border border-gray-150 dark:border-gray-800 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-extrabold text-gray-800 dark:text-gray-200 block">{rev.name}</span>
                            {rev.verified && <span className="text-[10px] bg-emerald-100 text-emerald-600 font-semibold px-2 py-0.5 rounded-full uppercase">Verified Buyer</span>}
                          </div>
                          <div className="text-right">
                            <span className="text-amber-500 font-extrabold mr-2">{"★".repeat(rev.rating)}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-650 dark:text-gray-350 leading-relaxed font-sans">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Write review form block */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-850">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase">রিভিউ লিখুন (Write a Review)</h4>
                {reviewFormSuccess && (
                  <p className="p-3 mb-4 bg-emerald-50 text-emerald-600 font-extrabold text-xs text-center rounded-lg">
                    ধন্যবাদ! আপনার রিভিওটি সফলভাবে প্রকাশিত করা হয়েছে।
                  </p>
                )}
                
                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700 dark:text-gray-300 block">আপনার নাম:</label>
                      <input
                        type="text"
                        placeholder="রিভিউ দাতার সম্পূর্ণ নাম..."
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-750 text-xs rounded-lg uppercase font-bold focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700 dark:text-gray-300 block">স্টার রেটিং (Rating):</label>
                      <select
                        aria-label="Star rating value selector"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-750 rounded-lg text-xs font-bold text-gray-800 dark:text-white"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                        <option value={3}>⭐⭐⭐ (3 Stars)</option>
                        <option value={2}>⭐⭐ (2 Stars)</option>
                        <option value={1}>⭐ (1 Star)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 dark:text-gray-300 block">রিভিউ বিবরণ:</label>
                    <textarea
                      placeholder="পণ্যের ফিনিশিং, কোয়ালিটি বা সাইজের অভিজ্ঞতা সম্পর্কে মন্তব্য লিখুন..."
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-750 text-xs rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-lg uppercase tracking-wider transition cursor-pointer"
                  >
                    রিভিউ সাবমিট করুন (Submit)
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* 4. Shipping tab panel info table */}
          {activeTab === "shipping" && (
            <div className="space-y-4 font-sans text-xs">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Shipping Policy & Delivery Rates</h3>
              <p className="text-gray-655 dark:text-gray-300 leading-relaxed font-sans">
                মটোশপ বিডি গ্রাহকদের নিরাপদ উপায়ে কুরিয়ার পৌঁছাতে দেশের এক নম্বর লজিস্টিক পার্টনারদের সাথে কো-অর্ডিনেট করে থাকে। আমরা স্টিডফাস্ট কুরিয়ার সার্ভিস (Steadfast Courier) এর মাধ্যমে ১০০% পেমেন্ট গ্যারান্টি ক্যাশ অন ডেলিভারি সার্ভিস নিশ্চিত করি।
              </p>
              
              <div className="border border-gray-150 dark:border-gray-850 rounded-xl overflow-hidden mt-4">
                <table className="w-full divide-y divide-gray-150 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr className="font-bold text-left text-gray-500 uppercase">
                      <th className="p-3">ডেলিভারি জোন (Zone)</th>
                      <th className="p-3">খরচ (Cost)</th>
                      <th className="p-3">সময়সীমা (Time Frame)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                    <tr>
                      <td className="p-3.5 font-bold text-gray-800 dark:text-white">ঢাকা সিটি কর্পোরেশন এর ভিতরে</td>
                      <td className="p-3.5 font-bold font-mono text-primary">৳৬০</td>
                      <td className="p-3.5">২৪ থেকে ৪৮ ঘন্টা (১-২ দিন)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-gray-800 dark:text-white">ঢাকা শহরতলী (সাভার, ডেমরা, টঙ্গী, গাজীপুর)</td>
                      <td className="p-3.5 font-bold font-mono text-primary">৳১০০</td>
                      <td className="p-3.5">২ থেকে ৩ দিন</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-gray-800 dark:text-white">ঢাকার বাইরে (সারাদেশে জেলা শহরসমুহ)</td>
                      <td className="p-3.5 font-bold font-mono text-primary">৳১২০</td>
                      <td className="p-3.5">৩ থেকে ৫ দিন</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-primary/4 rounded-xl border border-primary/20 text-xs text-gray-500 flex items-center gap-2.5 mt-4">
                <Truck className="text-primary" size={18} />
                <span>💡 স্পেশাল অফার: মোট কার্ট সাবটোটাল ৳৯৯৯ বা তারবেশি হলে ঢাকা সিটিতে অথবা দেশের যেকোনো পয়েন্টে পাচ্ছেন বিনামূল্যে ফ্রি শিপিং সুবিধা!</span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* RECENTLY VIEWED & RELATED PRODUCTS CAROUSEL ZONE */}
      {related.length > 0 && (
        <section className="font-sans border-t border-gray-200 dark:border-gray-800 pt-12 select-none text-left">
          <h2 className="text-md sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">রিলেটেড অন্য প্রোডাক্টসমুহ (You Might Also Need)</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <div
                key={p.id}
                onClick={() => onProductClick(p)}
                className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-850 rounded-xl overflow-hidden p-3 hover:shadow-xl hover:border-primary transition group cursor-pointer"
              >
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-white line-clamp-1 mt-2.5">{p.name}</h4>
                <div className="flex items-center justify-between mt-1.5 shrink-0">
                  <span className="text-xs font-extrabold text-primary font-mono">৳{p.price.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 font-mono">CODE: {p.sku}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HELMET SIZE SIZING CHART MODAL OVERLAY DIRECT BOX */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="bg-white dark:bg-dark-soft rounded-2xl w-full max-w-md p-6 overflow-hidden z-10 animate-modal font-sans text-gray-900 dark:text-gray-100 text-left relative">
            <button onClick={() => setIsSizeGuideOpen(false)} className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400" aria-label="Close size guide">
              <X size={18} />
            </button>
            <h3 className="text-md font-bold mb-4 flex items-center gap-1.5 uppercase">
              📏 হেলমেট সাইজ গাইড (Helmet Sizing Chart)
            </h3>
            
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              একটি মেজারমেন্ট ফিতা দিয়ে কপাল ও ভ্রুর ১ সে.মি. উপর দিয়ে মাথার চারপাশ মেপে নিচের চার্ট অনুযায়ী আপনার প্রয়োজনীয় হেলমেট সাইজটি বের করুন।
            </p>

            <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-center divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-100 dark:bg-gray-900 font-bold">
                  <tr>
                    <th className="p-2.5">Size Tag</th>
                    <th className="p-2.5">Head Measure (cm)</th>
                    <th className="p-2.5">Inches Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold text-primary">S</td>
                    <td className="p-2">55 – 56 cm</td>
                    <td className="p-2 text-gray-400">21.7" – 22"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/40">
                    <td className="p-2 font-bold text-primary">M</td>
                    <td className="p-2">57 – 58 cm</td>
                    <td className="p-2 text-gray-400">22.4" – 22.8"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-primary">L</td>
                    <td className="p-2">59 – 60 cm</td>
                    <td className="p-2 text-gray-400">23.2" – 23.6"</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/40">
                    <td className="p-2 font-bold text-primary">XL</td>
                    <td className="p-2">61 – 62 cm</td>
                    <td className="p-2 text-gray-400">24" – 24.4"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-primary">XXL</td>
                    <td className="p-2">63 – 64 cm</td>
                    <td className="p-2 text-gray-400">24.8" – 25.2"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-primary/4 border border-primary/20 text-[11px] text-gray-500">
              💡 রাইডার টিপস: আপনি যদি দুটি সাইজের মধ্যবর্তী অবস্থানে থাকেন, তবে আরামদায়ক হাইওয়ে রাইডের সুবিধার্থে তুলনামূলক বড় সাইজটি বেছে নিন।
            </div>
          </div>
        </div>
      )}

      {/* STICKY MOBILE ATC BAR (PERSISTS AT BOTTOM OF SCREEN AFTER MATC SCROLLS AWAY) */}
      <div className={`fixed bottom-0 inset-x-0 bg-white dark:bg-dark-soft border-t border-gray-200 dark:border-gray-850 p-3 z-30 flex items-center justify-between gap-4 shadow-2xl transition-transform duration-300 font-sans md:hidden ${isStickyVisible ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center gap-2 text-left min-w-0">
          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded border border-gray-250 shrink-0" />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-800 dark:text-white truncate">{product.name}</h4>
            <span className="text-xs font-extrabold text-primary font-mono">৳{product.price.toLocaleString()}</span>
          </div>
        </div>
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="bg-primary hover:bg-primary-dark text-white font-bold text-xs py-2 px-4 rounded-lg shrink-0 flex items-center gap-1.5"
        >
          <ShoppingCart size={13} />
          অর্ডার করুন
        </button>
      </div>

    </div>
  );
}

// Simple absolute close helper mapping standard X
function X({ size }: { size: number }) {
  return (
    <svg className={`w-${size} h-${size}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
