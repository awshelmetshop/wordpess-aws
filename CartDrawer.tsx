import React, { useState } from "react";
import { X, Trash2, ShoppingBag, Plus, Minus, Check, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onViewCartPage: () => void;
  couponCode: string;
  setCouponCode: (c: string) => void;
  discount: number;
  onApplyCoupon: (code: string) => boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  onViewCartPage,
  couponCode,
  setCouponCode,
  discount,
  onApplyCoupon
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    if (!couponInput.trim()) {
      setCouponError("Please type a coupon code.");
      return;
    }

    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess(true);
      setCouponCode(couponInput.trim().toUpperCase());
    } else {
      setCouponError("ভুল কোড! 'RIDE10' (10% ডিসকাউন্ট) চেষ্টা করুন।");
    }
  };

  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer panel with right side slide slide transition */}
        <div className="w-screen max-w-md bg-white dark:bg-dark-soft text-gray-900 dark:text-gray-100 flex flex-col h-full shadow-2xl overflow-hidden animate-modal">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-dark">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-primary" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">ব্যাগ কার্ট ({cartItems.length} আইটেম)</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:text-primary transition" aria-label="Close cart drawer">
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center text-gray-400">
                <ShoppingBag size={48} className="text-gray-300 dark:text-gray-750 mb-3" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">আপনার কার্ট খালি!</p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">পছন্দসই হেলমেট, গিয়ার বা মোটরসাইকেল ডেকোরেশন পণ্য ব্যাগে যুক্ত করুন।</p>
                <button
                  onClick={() => {
                    onClose();
                    onViewCartPage();
                  }}
                  className="mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-semibold transition"
                >
                  পণ্য ব্রাউজ করুন →
                </button>
              </div>
            ) : (
              <>
                <div className="px-5 py-3 divide-y divide-gray-100 dark:divide-gray-800">
                  {cartItems.map((item) => {
                    const itemTotal = item.product.price * item.quantity;
                    return (
                      <div key={item.id} className="py-4 flex gap-3.5 items-start">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 leading-tight hover:text-primary transition">
                            {item.product.name}
                          </h4>
                          {/* Variants selected details */}
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-gray-400 font-medium">
                            {item.selectedSize && <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">Size: {item.selectedSize}</span>}
                            {item.selectedColor && <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">Color: {item.selectedColor}</span>}
                          </div>

                          <div className="flex items-center justify-between mt-3 gap-2">
                            {/* Qty selectors */}
                            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md scale-90 origin-left">
                              <button
                                onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                className="p-1 hover:text-primary dark:hover:bg-gray-800 rounded-l"
                                aria-label="Reduce quantity"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2.5 text-xs font-bold font-mono text-gray-855 dark:text-gray-100">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                className="p-1 hover:text-primary dark:hover:bg-gray-800 rounded-r"
                                aria-label="Increase quantity"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            <div className="text-right flex flex-col">
                              <span className="text-xs font-extrabold font-mono text-primary">৳{itemTotal.toLocaleString()}</span>
                              {item.quantity > 1 && <span className="text-[9px] text-gray-400 font-mono">৳{item.product.price} each</span>}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-gray-300 hover:text-red-500 rounded transition shrink-0 self-center"
                          title="Remove product"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Summary Section */}
                <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark">
                  {/* Promo code form */}
                  <form onSubmit={handleApplyCoupon} className="mb-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (RIDE10)"
                      aria-label="Promo Code input"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none focus:border-transparent text-gray-800 dark:text-white uppercase font-semibold tracking-wider placeholder-gray-450"
                    />
                    <button
                      type="submit"
                      className="bg-dark hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs tracking-wider uppercase transition"
                    >
                      Apply
                    </button>
                  </form>

                  {couponError && <p className="text-[11px] text-red-500 font-medium mb-3">{couponError}</p>}
                  {couponSuccess && (
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mb-3">
                      <Check size={12} /> কুপন সফলভাবে অ্যাপ্লাই করা হয়েছে!
                    </p>
                  )}

                  {/* Subtotals */}
                  <div className="space-y-1.5 text-xs text-gray-550 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-3 mb-3">
                    <div className="flex justify-between items-center text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-mono text-gray-800 dark:text-white">৳{subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 font-bold">
                        <span>Discount Coupon ({couponCode})</span>
                        <span className="font-mono">-৳{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-gray-500">
                      <span>ডেলিভারি ফি</span>
                      <span className="font-mono text-gray-855 dark:text-white">৳৬০</span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">Grand Total</span>
                    <span className="text-lg font-black text-primary font-mono tracking-tight">
                      ৳{(finalTotal + 60).toLocaleString()}
                    </span>
                  </div>

                  {/* Trigger Buttons */}
                  <div className="grid grid-cols-2 gap-3 font-sans">
                    <button
                      onClick={onViewCartPage}
                      className="w-full py-2.5 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold text-xs rounded-lg transition text-center"
                    >
                      View Full Cart
                    </button>
                    <button
                      onClick={onCheckout}
                      className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      Checkout Now
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
