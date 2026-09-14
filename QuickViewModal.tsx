import React, { useState, useEffect } from "react";
import { X, ShoppingCart, MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { Product } from "../types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size?: string, color?: string) => void;
  onBuyNow: (p: Product, size?: string, color?: string) => void;
  onToggleWishlist: (p: Product) => void;
  isWishlisted: boolean;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted
}: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedSize(product.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions[0] : "");
      setSelectedColor(product.colorOptions && product.colorOptions.length > 0 ? product.colorOptions[0].name : "");
      setQty(1);
      setSuccessMsg("");
    }
  }, [product]);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedSize || undefined, selectedColor || undefined);
    setSuccessMsg("আপনার কার্টে যুক্ত করা হয়েছে!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onBuyNow(product, selectedSize || undefined, selectedColor || undefined);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const variantStr = [
      selectedSize ? `Size: ${selectedSize}` : "",
      selectedColor ? `Color: ${selectedColor}` : ""
    ].filter(Boolean).join(", ");

    const text = `আসসালামু আলাইকুম, আমি এই পণ্যটি মটোশপ বিডি থেকে কিনতে চাই:\n\n📦 পণ্য: ${product.name}\n🔖 কোড: ${product.sku}\n💰 মূল্য: ৳${product.price}${variantStr ? `\n⚙️ ভ্যারিয়েন্ট: ${variantStr}` : ""}\n\nঅনুগ্রহ করে ডেলিভারির প্রক্রিয়াটি নিশ্চিত করুন।`;
    window.open(`https://wa.me/8801788223344?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 transition-opacity" onClick={onClose} />
      
      {/* Container main box */}
      <div className="relative bg-white dark:bg-dark-soft rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 animate-modal font-sans text-gray-900 dark:text-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-1.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 text-gray-700 dark:text-gray-300 transition"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Images Gallery */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900/50 flex flex-col justify-between border-r border-gray-100 dark:border-gray-800">
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Thumbnail strips */}
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="flex gap-2 justify-center overflow-x-auto py-1">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-12 h-12 rounded-lg border overflow-hidden shrink-0 ${selectedImage === product.image ? "border-primary ring-1 ring-primary" : "border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}
                >
                  <img src={product.image} alt="main thumb" className="w-full h-full object-cover" />
                </button>
                {product.additionalImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-12 h-12 rounded-lg border overflow-hidden shrink-0 ${selectedImage === img ? "border-primary ring-1 ring-primary" : "border-gray-200 dark:border-gray-700 hover:border-gray-400"}`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Security certification stamp */}
            <div className="mt-5 p-3 rounded-lg border border-primary/20 bg-primary/2 text-[11px] text-gray-500 flex items-center gap-2">
              <ShieldCheck className="text-primary shrink-0" size={18} />
              <div>
                <p className="font-bold text-gray-750 dark:text-gray-300">ভেরিফাইড অ্যান্ড সেফ গ্যারান্টি</p>
                <p className="text-[10px]">বাংলাদেশ মোটরস্ট্রিট রাইডারদের দ্বারা ১০০% ভেরিফাইড ব্র্যান্ড।</p>
              </div>
            </div>
          </div>

          {/* Right Side: Product Details info */}
          <div className="p-6 flex flex-col max-h-[85vh] overflow-y-auto">
            {/* Category tag */}
            <span className="text-[10px] text-primary uppercase font-mono tracking-widest font-bold mb-1.5 block">
              {product.brand} · {product.subcategory.toUpperCase()}
            </span>
            
            <h2 className="text-md sm:text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2">
              {product.name}
            </h2>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mb-4 py-2 border-y border-gray-150 dark:border-gray-800">
              <span className="text-xl font-black text-primary font-mono tracking-tight">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xs text-gray-400 line-through font-mono">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] bg-save/15 text-save font-bold px-2 py-0.5 rounded-full">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            <p className="text-xs text-gray-650 dark:text-gray-450 leading-relaxed mb-5">
              {product.shortDescription || product.description.slice(0, 160) + "..."}
            </p>

            {/* Variant selections form content */}
            <div className="space-y-4 mb-6">
              {/* Sizes Swatches */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span>সাইজ সিলেক্ট করুন:</span>
                    <span className="text-[11px] text-primary cursor-pointer hover:underline">📏 সাইজ গাইড</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {product.sizeOptions.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-md font-mono font-bold border transition ${selectedSize === sz ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "border-gray-200 dark:border-gray-700 hover:border-gray-450"}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors selection */}
              {product.colorOptions && product.colorOptions.length > 0 && (
                <div>
                  <p className="text-xs font-bold mb-2">কালার সিলেক্ট করুন:</p>
                  <div className="flex flex-wrap gap-3">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`px-2.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition ${selectedColor === color.name ? "border-primary bg-primary/10 text-primary" : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: color.hex }} />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Stock Indicator */}
            <div className="mb-6">
              {isOutOfStock ? (
                <span className="bg-red-500/10 text-red-500 text-xs px-2.5 py-1 rounded-full font-bold">
                  ❌ দুঃখিত! স্টক শেষ হয়ে গিয়েছে
                </span>
              ) : product.stock <= 5 ? (
                <span className="bg-amber-500/10 text-amber-500 text-xs px-2.5 py-1 rounded-full font-bold animate-pulse">
                  ⚠️ আর মাত্র {product.stock} টি স্টক বাকি আছে!
                </span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-bold">
                  🟢 স্টকে পর্যাপ্ত রানিং কোয়ান্টিটি আছে
                </span>
              )}
            </div>

            {/* Success indicator feedback banner */}
            {successMsg && (
              <p className="p-2 mb-4 bg-emerald-50 text-emerald-600 border border-emerald-200 text-center rounded-lg text-xs font-bold">
                {successMsg}
              </p>
            )}

            {/* Action buttons triggers */}
            <div className="flex flex-col gap-2.5 font-sans">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-3 bg-dark hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-750 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={15} />
                কার্টে যুক্ত করুন (Add to Cart)
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-primary/20 transition flex items-center justify-center gap-2"
              >
                ⚡ সরাসরি অর্ডার করুন (Buy Now)
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare size={15} />
                হোয়াটসঅ্যাপে অর্ডার দিন
              </button>
            </div>

            {/* Additional details row shortcuts */}
            <div className="mt-6 flex justify-between gap-4 text-[11px] text-gray-500 select-none">
              <button
                onClick={() => onToggleWishlist(product)}
                className="flex items-center gap-1.5 hover:text-red-500 transition"
              >
                <Heart size={14} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                Wishlist
              </button>
              <span>SKU Code: <span className="font-mono text-gray-700 dark:text-gray-300">{product.sku}</span></span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
