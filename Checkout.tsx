import React, { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Phone,
  MapPin,
  Sparkles,
  Check,
  ChevronDown,
} from "lucide-react";
import { CartItem, Order } from "../types";

interface CheckoutProps {
  cartItems: CartItem[];
  discount: number;
  couponCode: string;
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
  onUpdateQty: (itemId: string, qty: number) => void;
}

const BD_DISTRICTS = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapainawabganj",
  "Chattogram",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
].sort();

export default function Checkout({
  cartItems,
  discount,
  couponCode,
  onOrderPlaced,
  onClearCart,
  onUpdateQty,
}: CheckoutProps) {
  // Steps progress state
  const [step, setStep] = useState<"info" | "success">("info");

  // Fields state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "bkash" | "nagad" | "sslcommerz"
  >("cod");
  const [transactionId, setTransactionId] = useState("");

  // COD OTP simulation states
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSentPhone, setOtpSentPhone] = useState("");

  // Validation details
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Order Cache
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = !city ? 0 : city === "Dhaka" ? 60 : 120;
  const finalTotal = subtotal - discount + deliveryFee;

  const validatePhone = (p: string) => {
    const clean = p.replace(/[^0-9]/g, "");
    return /^01[3-9]\d{8}$/.test(clean);
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "দয়া করে নাম প্রদান করুন।";
    if (!phone.trim()) {
      errors.phone = "দয়া করে মোবাইল নম্বর প্রদান করুন।";
    } else if (!validatePhone(phone)) {
      errors.phone = "ভুল মোবাইল নম্বর! সঠিক ফর্ম্যাট: 01XXXXXXXXX (১১ ডিজিট)";
    }
    if (!city) errors.city = "ডেলিভারি জেলা নির্বাচন করুন।";
    if (!area.trim()) errors.area = "থানা / উপজেলা লিখুন।";
    if (!address.trim()) errors.address = "সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।";

    // Transaction ID validation if mobile cash chosen
    if (
      (paymentMethod === "bkash" || paymentMethod === "nagad") &&
      !transactionId.trim()
    ) {
      errors.transactionId = "বিকাশ বা নগদ ট্রানজেকশন আইডি (TxnID) লিখুন!";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    // Cash on Delivery OTP matching step
    if (paymentMethod === "cod") {
      setOtpSentPhone(phone);
      setOtpError("");
      setIsOtpModalOpen(true);
    } else {
      processOrderSuccess();
    }
  };

  // COD OTP validation
  const verifyCodOtp = () => {
    if (enteredOtp === "1234") {
      setIsOtpModalOpen(false);
      processOrderSuccess();
    } else {
      setOtpError(
        "ভুল OTP কোড! কন্ডিশনাল টেস্ট গ্যারান্টি কোড '1234' ব্যবহার করুন।",
      );
    }
  };

  const processOrderSuccess = () => {
    setIsSubmitting(true);

    // WooCommerce Order Integration
    const wpApiUrl = (window as any).WordPressData?.apiUrl;
    if (wpApiUrl) {
      const orderPayload = {
        name,
        phone,
        address,
        area,
        city,
        notes,
        paymentMethod,
        transactionId,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
        total: finalTotal,
      };

      fetch(`${wpApiUrl}wc/v3/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": (window as any).WordPressData?.nonce || "",
        },
        body: JSON.stringify(orderPayload),
      }).catch((err) => console.error("WooCommerce checkout failed:", err));
    }

    // Simulate API posting logic delays
    setTimeout(() => {
      const randomOrderId =
        "MSB-" + Math.floor(100000 + Math.random() * 900000);
      const trackingCodeStr =
        "SF" + Math.floor(20000000 + Math.random() * 80000000) + "BD";

      const newOrder: Order = {
        id: randomOrderId,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        name,
        phone,
        address,
        city,
        area,
        paymentMethod,
        transactionId: transactionId || undefined,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.selectedSize,
          color: item.selectedColor,
          image: item.product.image,
        })),
        subtotal,
        discount,
        deliveryFee,
        total: finalTotal,
        status: "placed",
        trackingCode: trackingCodeStr,
      };

      setPlacedOrder(newOrder);
      onOrderPlaced(newOrder);
      onClearCart();
      setIsSubmitting(false);
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  if (step === "success" && placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 font-sans transition-colors duration-200 text-center space-y-8 select-none">
        {/* Ordered success badge */}
        <div className="space-y-3">
          <CheckCircle2
            className="mx-auto text-emerald-500 animate-pulse"
            size={64}
          />
          <h1 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white uppercase tracking-tight">
            আপনার অর্ডারটি সফল হয়েছে!
          </h1>
          <p className="text-xs text-gray-400">
            অর্ডারটি কনফার্ম করার জন্য আপনাকে ধন্যবাদ। খুব শীঘ্রই কাস্টমার কেয়ার
            থেকে আপনাকে কল দেওয়া হবে।
          </p>
        </div>

        {/* Invoice Grid receipt specs card */}
        <div className="bg-white dark:bg-dark-soft border border-gray-150 dark:border-gray-800 rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-md font-sans">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3.5 border-b border-gray-150 dark:border-gray-800 text-xs">
            <div>
              <span className="text-gray-400">Order Reference ID:</span>
              <p className="font-extrabold text-primary text-md font-mono">
                {placedOrder.id}
              </p>
            </div>
            <div className="sm:text-right">
              <span className="text-gray-400">অর্ডারের তারিখ:</span>
              <p className="font-bold text-gray-800 dark:text-white">
                {placedOrder.date}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <span className="text-gray-450 uppercase font-mono block text-[10px] text-gray-500">
                Shipping To:
              </span>
              <p className="font-bold text-gray-800 dark:text-white mt-1">
                {placedOrder.name}
              </p>
              <p className="text-gray-400 mt-0.5 font-mono">
                {placedOrder.phone}
              </p>
              <p className="text-gray-450 mt-1 leading-relaxed">
                {placedOrder.address}, {placedOrder.area}, {placedOrder.city}
              </p>
            </div>
            <div>
              <span className="text-gray-450 uppercase font-mono block text-[10px] text-gray-500">
                Payment Status:
              </span>
              <p className="font-bold text-primary mt-1 uppercase">
                {placedOrder.paymentMethod.toUpperCase()}
              </p>
              {placedOrder.transactionId && (
                <p className="text-[10px] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full inline-block font-mono text-primary mt-1">
                  Txn: {placedOrder.transactionId}
                </p>
              )}

              <div className="mt-3 text-[11px] text-gray-400">
                <p>📦 Courier Consignment:</p>
                <p className="font-mono font-bold text-gray-700 dark:text-gray-200">
                  Steadfast: {placedOrder.trackingCode}
                </p>
              </div>
            </div>
          </div>

          {/* Items listed row details */}
          <div className="border-t border-gray-150 dark:border-gray-800 pt-4 space-y-2 text-xs">
            <span className="text-gray-400 font-bold block mb-2">
              ক্রয় করা পণ্যসমুহ:
            </span>
            {placedOrder.items.map((it, idx) => (
              <div
                key={idx}
                className="flex gap-3 justify-between items-center bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-850 p-2 rounded-lg"
              >
                <div className="flex gap-2 items-center min-w-0">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 dark:text-white truncate">
                      {it.name}
                    </p>
                    <p className="text-[10px] text-gray-400 tracking-wider">
                      Qty: {it.quantity} {it.size ? `· Size: ${it.size}` : ""}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-primary font-bold">
                  ৳{(it.price * it.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Row totals */}
          <div className="border-t border-gray-150 dark:border-gray-800 pt-3 flex flex-col gap-1.5 text-xs text-gray-500 font-mono">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{placedOrder.subtotal.toLocaleString()}</span>
            </div>
            {placedOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount Saved:</span>
                <span>-৳{placedOrder.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>ডেলিভারি ফি:</span>
              <span>৳{placedOrder.deliveryFee}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-850 pt-2.5">
              <span>Grand Total Paid:</span>
              <span className="text-primary text-md">
                ৳{placedOrder.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Triggers redirects */}
        <div className="flex flex-wrap gap-4 justify-center font-sans">
          <button
            onClick={() => window.print()}
            className="py-2.5 px-5 border border-primary text-primary hover:bg-primary/5 text-xs font-bold rounded-lg transition"
          >
            🖨️ ইনভয়েস প্রিন্ট করুন (Print Invoice)
          </button>
          <button
            onClick={() => {
              // Direct lookup tracking status during runtime session
              window.location.reload();
            }}
            className="py-2.5 px-5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg uppercase tracking-wider transition"
          >
            হোমপেজে ফিরে যান →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200 text-left">
      <div className="flex items-center gap-1.5 mb-6 text-xs text-gray-400 font-sans select-none">
        <span>১. শপিং ব্যাগ কার্ট</span>
        <span>→</span>
        <span className="text-primary font-black font-mono">
          ২. কাস্টমার চেকআউট বিবরণ
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Personal Info Form inputs (col-span-7) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handlePlaceOrderSubmit}
            className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
              <MapPin size={18} className="text-primary shrink-0" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                ১. শিপিং ডেলিভারি ঠিকানা (Shipping Info)
              </h2>
            </div>

            <div className="space-y-4 font-sans text-xs">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">
                  পূর্ণ নাম (Receiver Full Name) *
                </label>
                <input
                  type="text"
                  placeholder="E.g. Md. Kausar Rahman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-2.5 bg-gray-50 dark:bg-gray-900 border text-gray-900 dark:text-white text-xs font-bold rounded-lg uppercase focus:ring-1 focus:ring-primary focus:outline-none ${fieldErrors.name ? "border-red-500" : "border-gray-200 dark:border-gray-750"}`}
                  required
                />
                {fieldErrors.name && (
                  <p className="text-[11px] text-red-500 font-semibold">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Phone Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">
                  মোবাইল নম্বর (Phone) *
                </label>
                <input
                  type="tel"
                  placeholder="E.g. 01788223344"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-2.5 bg-gray-50 dark:bg-gray-900 border text-gray-900 dark:text-white text-xs font-extrabold font-mono rounded-lg focus:ring-1 focus:ring-primary focus:outline-none ${fieldErrors.phone ? "border-red-500" : "border-gray-200 dark:border-gray-750"}`}
                  required
                />
                {fieldErrors.phone && (
                  <p className="text-[11px] text-red-500 font-semibold">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* City and Area Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700 dark:text-gray-300 block">
                    ডেলিভারি শহর (City Zone) *
                  </label>
                  <div className="relative">
                    <div
                      className={`w-full p-2.5 bg-[#022c22] border-[#064e3b] text-white text-xs font-bold rounded-lg focus-within:ring-1 focus-within:ring-primary flex items-center justify-between cursor-pointer ${fieldErrors.city ? "border border-red-500" : "border border-[#064e3b]"}`}
                      onClick={() => {
                        const el = document.getElementById(
                          "city-dropdown-options",
                        );
                        if (el) el.classList.toggle("hidden");
                      }}
                    >
                      <span className={city ? "" : "text-gray-300"}>
                        {city
                          ? `${city} ${city === "Dhaka" ? "(৳৬০ delivery)" : "(৳১২০ delivery)"}`
                          : "জেলা নির্বাচন করুন"}
                      </span>
                      <ChevronDown size={16} className="text-gray-300" />
                    </div>

                    <div
                      id="city-dropdown-options"
                      className="hidden absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-[#022c22] border border-[#064e3b] rounded-lg shadow-xl"
                    >
                      {BD_DISTRICTS.map((district) => (
                        <div
                          key={district}
                          className={`p-2.5 text-xs font-bold cursor-pointer hover:bg-primary hover:text-[#022c22] transition-colors ${city === district ? "bg-primary/20 text-primary" : "text-white"}`}
                          onClick={() => {
                            setCity(district);
                            const el = document.getElementById(
                              "city-dropdown-options",
                            );
                            if (el) el.classList.add("hidden");
                          }}
                        >
                          {district}{" "}
                          {district === "Dhaka"
                            ? "(৳৬০ delivery)"
                            : "(৳১২০ delivery)"}
                        </div>
                      ))}
                    </div>
                  </div>
                  {fieldErrors.city && (
                    <p className="text-[11px] text-red-500 font-semibold">
                      {fieldErrors.city}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700 dark:text-gray-300 block">
                    থানা / উপজেলা (Upanzila / Thana) *
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. উত্তরা / Uttara"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className={`w-full p-2.5 bg-gray-50 dark:bg-gray-900 border text-gray-900 dark:text-white text-xs rounded-lg focus:ring-1 focus:ring-primary focus:outline-none ${fieldErrors.area ? "border-red-500" : "border-gray-200 dark:border-gray-750"}`}
                    required
                  />
                  {fieldErrors.area && (
                    <p className="text-[11px] text-red-500 font-semibold">
                      {fieldErrors.area}
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Complete Address block */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">
                  সম্পূর্ণ ডেলিভারি ঠিকানা (Detailed Address) *
                </label>
                <textarea
                  placeholder="বাসা নং, রোড নং, ইউনিয়ন বা মহল্লার বিবরণ বিশদভাবে লিখুন..."
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full p-2.5 bg-gray-50 dark:bg-gray-900 border text-gray-900 dark:text-white text-xs rounded-lg focus:ring-1 focus:ring-primary focus:outline-none ${fieldErrors.address ? "border-red-500" : "border-gray-200 dark:border-gray-750"}`}
                  required
                />
                {fieldErrors.address && (
                  <p className="text-[11px] text-red-500 font-semibold">
                    {fieldErrors.address}
                  </p>
                )}
              </div>

              {/* Order Notes */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">
                  অর্ডার নোট বা বিশেষ অনুরোধ (ঐচ্ছিক)
                </label>
                <textarea
                  placeholder="ডেলিভারিম্যানের জন্য বিশেষ কোনো রোড ডিরেকশন বা সাইজ নিশ্চিত মেসেজ..."
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-750 text-gray-905 dark:text-white text-xs rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Part 2: Payments Selector */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-805">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <CreditCard size={18} className="text-primary shrink-0" />
                <h2 className="text-base font-extrabold uppercase tracking-wide">
                  ২. পেমেন্ট পদ্ধতি নির্বাচন করুন (Payment Option)
                </h2>
              </div>

              <div className="space-y-3 font-sans text-xs">
                {/* 1. Cash on Delivery */}
                <label className="flex items-center gap-3 p-3.5 border border-gray-250 dark:border-gray-750 hover:border-primary rounded-xl cursor-pointer bg-white dark:bg-gray-900 select-none">
                  <input
                    type="radio"
                    name="paymentSelect"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  <div className="text-left font-sans flex-1">
                    <span className="font-bold text-gray-905 dark:text-white text-xs block">
                      💵 ক্যাশ অন ডেলিভারি (Cash on Delivery)
                    </span>
                    <span className="text-[10px] text-gray-400">
                      পণ্য হাতে পেয়ে স্টিডফাস্ট কুরিয়ারকে মূল্য পরিশোধ করুন।
                    </span>
                  </div>
                </label>

                {/* 2. bKash payment instruction manual */}
                <label className="flex items-center gap-3 p-3.5 border border-gray-250 dark:border-gray-750 hover:border-primary rounded-xl cursor-pointer bg-white dark:bg-gray-900 select-none">
                  <input
                    type="radio"
                    name="paymentSelect"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  <div className="text-left font-sans flex-1">
                    <span className="font-bold text-pink-600 block">
                      📱 বিকাশ পেমেন্ট (bKash Manual SendMoney)
                    </span>
                    <span className="text-[10px] text-gray-400">
                      বিকাশ পার্সোনাল কাস্টমার নাম্বারে সেন্ডমানি করে TxnID
                      প্রোভাইড করুন।
                    </span>
                  </div>
                </label>
                {paymentMethod === "bkash" && (
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/20 rounded-xl border border-pink-200 text-xs leading-relaxed space-y-2 text-left animate-modal">
                    <h4 className="font-extrabold text-pink-700 dark:text-pink-400 font-sans uppercase">
                      বিকাশ পেমেন্ট নির্দেশনাবলী (bKash Pay Instructions)
                    </h4>
                    <p>১. আপনার বিকাশ অ্যাপ থেকে সেন্ড মানি করুন।</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      ২. বিকাশ মার্চেন্ট / পার্সোনাল নাম্বার:{" "}
                      <span className="font-bold text-pink-600 font-mono select-all">
                        ০১৭৮৮২২৩৩৪৪
                      </span>{" "}
                      (Personal)
                    </p>
                    <p>৩. রেফারেন্সে আপনার ফোন নম্বর টাইপ করুন।</p>
                    <p>
                      ৪. টাকা পাঠানোর পর নিচের ইনপুটে ট্রানজেকশন আইডি (TxnID)
                      প্রবেশ করান:
                    </p>

                    <div className="pt-2 text-xs space-y-1">
                      <label className="font-bold block">
                        bKash Transaction ID *
                      </label>
                      <input
                        type="text"
                        placeholder="E.g. 8N7A6B5C4D"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className={`w-full max-w-xs p-2 bg-white dark:bg-gray-900 border text-xs font-mono font-bold rounded-lg uppercase focus:ring-1 focus:ring-pink-500 focus:outline-none ${fieldErrors.transactionId ? "border-red-500" : "border-gray-255"}`}
                      />
                      {fieldErrors.transactionId && (
                        <p className="text-[10px] text-red-500 font-bold">
                          {fieldErrors.transactionId}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trigger Button Place Order */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-805">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[length:200%_auto] hover:bg-right text-gray-900 font-black text-sm sm:text-base uppercase tracking-wide rounded-xl shadow-xl shadow-amber-500/30 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center gap-3 animate-pulse hover:animate-none transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                {isSubmitting ? (
                  "অর্ডার প্রসেস হচ্ছে..."
                ) : (
                  <>
                    <ShieldCheck size={20} className="text-gray-900" />
                    <span>অর্ডার কনফার্ম করুন</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Order Item reviews sidebar summaries (col-span-5) */}
        <div className="lg:col-span-5 whitespace-normal">
          <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-sm space-y-4 sticky top-24 select-none text-xs font-sans">
            <h3 className="text-xs font-extrabold uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 pb-3">
              ক্রয় তালিকা বিবরণ (Summary list)
            </h3>

            {/* items rows */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item, id) => (
                <div
                  key={id}
                  className="py-2.5 flex justify-between gap-3 items-center"
                >
                  <div className="flex gap-2 items-center min-w-0 text-left">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-9 h-9 object-cover rounded border border-gray-250 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-800 dark:text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[9px] text-gray-400 mb-1">
                        {item.selectedSize ? `Size: ${item.selectedSize}` : ""}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-5 h-5 flex items-center justify-center rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary transition"
                        >
                          -
                        </button>
                        <span className="font-mono text-[10px] font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, item.quantity + 1)
                          }
                          className="w-5 h-5 flex items-center justify-center rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-primary">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-gray-150 dark:border-gray-800 pt-3 space-y-2 font-mono text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-gray-800 dark:text-white">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon discount ({couponCode}):</span>
                  <span>-৳{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ডেলিভারি খরচ (Courier):</span>
                <span>৳{deliveryFee}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-850 pt-3 flex justify-between text-sm font-black text-gray-900 dark:text-white">
                <span>Grand Total Total:</span>
                <span className="text-primary text-md">
                  ৳{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-2 flex flex-col gap-1.5 text-gray-400 select-none">
              <p className="flex items-center gap-1.5">
                ✓ Steadfast Courier integration verified.
              </p>
              <p className="flex items-center gap-1.5">
                ✓ 7-day hassle-free refunds guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COD OTP SIMULATION VERIFICATION DIALOG MODAL */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75"
            onClick={() => setIsOtpModalOpen(false)}
          />

          <div className="bg-white dark:bg-dark-soft rounded-2xl w-full max-w-sm p-6 overflow-hidden z-20 shadow-2xl animate-modal text-left text-gray-900 dark:text-white relative">
            <h3 className="text-sm font-black mb-1.5 tracking-tight uppercase flex items-center gap-1">
              <Sparkles className="text-primary" size={16} />
              COD OTP ভেরিফিকেশন কোড
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Fraud এবং ভুয়া অর্ডার রুখতে Cash on Delivery সার্ভিসের জন্য আপনার
              সাবমিট করা নম্বরে{" "}
              <span className="font-mono text-primary font-bold">
                {otpSentPhone}
              </span>{" "}
              একটি OTP কোড পাঠানো হয়েছে।
            </p>

            <div className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label className="font-bold">
                  Enter Verification OTP Code:
                </label>
                <input
                  type="text"
                  placeholder="E.g. 1234 (Default)"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-gray-750 text-center font-mono font-black tracking-widest text-sm rounded-lg"
                  maxLength={4}
                />
                <span className="block text-[10px] text-gray-400 font-mono mt-1">
                  💡 মটোশপ টেস্ট ডেমো কোড: 1234
                </span>
                {otpError && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">
                    {otpError}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2.5">
                <button
                  type="button"
                  onClick={() => setIsOtpModalOpen(false)}
                  className="w-1/2 py-2 border border-gray-200 dark:border-gray-700 text-xs font-semibold rounded-lg text-center text-gray-655"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={verifyCodOtp}
                  className="w-1/2 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-lg text-center"
                >
                  Verify & Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
