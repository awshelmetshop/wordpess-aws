import React, { useState } from "react";
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, Check, HelpCircle } from "lucide-react";
import { CartItem } from "../types";

interface CartProps {
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onApplyCoupon: (code: string) => boolean;
  couponCode: string;
  setCouponCode: (c: string) => void;
  discount: number;
  onCheckout: () => void;
  onBrowse: () => void;
}

export default function Cart({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onApplyCoupon,
  couponCode,
  setCouponCode,
  discount,
  onCheckout,
  onBrowse
}: CartProps) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = 60;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    if (!couponInput.trim()) {
      setCouponError("দয়া করে কুপন কোড প্রবেশ করান।");
      return;
    }

    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess(true);
      setCouponCode(couponInput.trim().toUpperCase());
    } else {
      setCouponError("ভুল কোড! অতিরিক্ত ১০% ডিসকাউন্টের জন্য 'RIDE10' টাইপ করুন।");
    }
  };

  const finalTotal = Math.max(0, subtotal - discount) + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200 text-left">
      <h1 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-2">
        <ShoppingBag className="text-primary" />
        আপনার শপিং কার্ট (My Shopping Cart Bag)
      </h1>

      {cartItems.length === 0 ? (
        /* 19.2 Empty State: Search Results layout match */
        <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-805 rounded-2xl py-16 px-6 text-center select-none shadow-sm">
          <ShoppingBag size={56} className="mx-auto text-gray-400 mb-4 animate-bounce" />
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider font-sans">
            আপনার কার্ট ব্যাগ খালি! (Cart is Empty)
          </h3>
          <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto font-sans leading-relaxed">
            মটোশপ ব্যাগে কোনো মোটরসাইকেল পার্টস বা হেলমেট যুক্ত করা হয়নি। দয়া করে কালেকশন থেকে আপনার পছন্দের ক্যাটাগরি ব্রাউজ করুন।
          </p>
          <div className="pt-8">
            <button
              onClick={onBrowse}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold uppercase transition"
            >
              ← গ্যালাক্সি শপ ব্রাউজ করুন
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Layout Checklist (col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* List columns */}
            <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-150 dark:border-gray-800 text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-gray-50 dark:bg-dark/40 font-mono">
                <div className="col-span-6 text-left">Product Details</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {cartItems.map((item) => {
                  const itemTotal = item.product.price * item.quantity;
                  return (
                    <div key={item.id} className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      
                      {/* Thumbs & information name */}
                      <div className="col-span-6 flex gap-4 items-start text-left">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white line-clamp-2">
                            {item.product.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-gray-400 font-bold font-mono">
                            <span>Code: {item.product.sku}</span>
                            {item.selectedSize && <span className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-0.5 px-2 rounded-md">Size: {item.selectedSize}</span>}
                            {item.selectedColor && <span className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-0.5 px-2 rounded-md">Color: {item.selectedColor}</span>}
                          </div>
                          
                          {/* Trash button mobile layout */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[10px] font-bold text-red-500 flex items-center gap-1.5 mt-2.5 sm:hidden"
                          >
                            <Trash2 size={12} />
                            Remove Item
                          </button>
                        </div>
                      </div>

                      {/* Prices */}
                      <div className="col-span-2 text-left sm:text-center shrink-0">
                        <span className="text-xs font-extrabold font-mono text-gray-700 dark:text-gray-300">
                          ৳{item.product.price.toLocaleString()}
                        </span>
                        {item.product.originalPrice && (
                          <span className="block text-[10px] text-gray-400 line-through font-mono sm:hidden md:block">
                            ৳{item.product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quantity Selectors */}
                      <div className="col-span-2 flex items-center justify-start sm:justify-center">
                        <div className="flex items-center border border-gray-250 dark:border-gray-700 bg-white dark:bg-dark rounded-lg scale-90 sm:scale-100 shadow-sm shrink-0">
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                            className="p-1 px-2.5 hover:text-primary transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 font-bold font-mono text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="p-1 px-2.5 hover:text-primary transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="col-span-2 text-right flex items-center justify-between sm:justify-end gap-2.5 shrink-0 border-t sm:border-0 border-gray-100 pt-2.5 sm:pt-0">
                        <span className="sm:hidden text-xs text-gray-400 font-bold uppercase">Subtotal:</span>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black font-mono text-primary">
                            ৳{itemTotal.toLocaleString()}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="hidden sm:block text-[10px] font-bold text-red-400 hover:text-red-500 underline text-right ml-auto mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Right Layout Sidebar Totals Column (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-sm space-y-5 sticky top-24">
              <h3 className="text-sm font-extrabold uppercase tracking-wide border-b border-gray-150 dark:border-gray-800 pb-3">
                অর্ডার সারসংক্ষেপ (Cart Summary)
              </h3>

              {/* Promo validation */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-bold text-gray-655 dark:text-gray-300 block">ডিসকাউন্ট কুপন কোড ব্যবহার করুন:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="E.g. RIDE10"
                    aria-label="Promo code coupon input"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-gray-700 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary uppercase font-bold"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 text-xs font-extrabold rounded-lg tracking-wider transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-500 font-semibold">{couponError}</p>}
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check size={12} /> কুপন RIDE10 (10% ডিসকাউন্ট) অ্যাক্টিভেটেড!
                  </p>
                )}
              </form>

              {/* Order calculations */}
              <div className="space-y-2 text-xs text-gray-500 pb-3 border-b border-gray-150 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <span>পণ্য সাবটোটাল (Subtotal):</span>
                  <span className="font-mono font-bold text-gray-800 dark:text-white">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-semibold">
                    <span>কুপন ডিসকাউন্ট ({couponCode}):</span>
                    <span className="font-mono font-bold">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>ডেলিভারি ফি (Courier Fee):</span>
                  <span className="font-mono font-bold text-gray-800 dark:text-white">৳{deliveryFee}</span>
                </div>
              </div>

              {/* Pricing Grand Total */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-black">Grand Total:</span>
                <span className="text-xl font-black text-primary font-mono select-all">
                  ৳{finalTotal.toLocaleString()}
                </span>
              </div>

              {/* Secure Checkout details list */}
              <div className="space-y-3 font-sans">
                <button
                  onClick={onCheckout}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-primary/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  চেকআউট করুন (Proceed to Checkout)
                  <ArrowRight size={14} />
                </button>
                
                <p className="text-[10px] text-center text-gray-400 select-none leading-relaxed">
                  🔐 ১০০% সেফ চেকআউট গ্যারান্টি। SSLCommerz ও ক্যাশ অন ডেলিভারি পেমেন্ট মাধ্যম উপলব্ধ।
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
