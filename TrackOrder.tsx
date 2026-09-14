import React, { useState } from "react";
import { Package, Search, ChevronRight, Check } from "lucide-react";
import { Order } from "../types";

interface TrackOrderProps {
  orders: Order[];
}

export default function TrackOrder({ orders }: TrackOrderProps) {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSearchedOrder(null);
    setSearched(true);

    const cleanOrderId = orderIdInput.trim().toUpperCase();
    const cleanPhone = phoneInput.trim().replace(/[^0-9]/g, "");

    if (!cleanOrderId || !cleanPhone) {
      setSearchError("দয়া করে সম্পূর্ণ অর্ডার আইডি ও মোবাইল নম্বর প্রদান করুন।");
      return;
    }

    // First, look up inside session orders placed by user
    const found = orders.find(
      (o) => o.id.toUpperCase() === cleanOrderId && o.phone.replace(/[^0-9]/g, "") === cleanPhone
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // Check if it matches fallback demo credentials: ID "MSB-554432" and Phone "01788223344"
      if (cleanOrderId === "MSB-554432" && cleanPhone === "01788223344") {
        const demoOrder: Order = {
          id: "MSB-554432",
          date: "May 25, 2026",
          name: "Md. Kausar Rahman",
          phone: "01788223344",
          address: "Flat 4B, Sector 7, Jassimuddin Ave",
          area: "Uttara",
          city: "Dhaka",
          paymentMethod: "cod",
          items: [
            { productId: "1", name: "ProRide X3 Carbon Full-Face Helmet", quantity: 1, price: 5500, size: "L", image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=200" }
          ],
          subtotal: 5500,
          discount: 550,
          deliveryFee: 0,
          total: 4950,
          status: "packed", // current state matching instructions
          trackingCode: "SF98765432BD"
        };
        setSearchedOrder(demoOrder);
      } else {
        setSearchError("অর্ডারটি খুঁজে পাওয়া যায়নি! সঠিক রেফারেন্স টাইপ করুন অথবা ডেমো দেখতে Order ID: 'MSB-554432' এবং Phone: '01788223344' টাইপ করুন।");
      }
    }
  };

  // Helper map rendering step badge
  const steps = [
    { key: "placed", label: "Placed", desc: "Order submitted" },
    { key: "confirmed", label: "Confirmed", desc: "Verified by admin" },
    { key: "packed", label: "Packed", desc: "Packed at warehouse" },
    { key: "shipped", label: "Shipped", desc: "Sent by Steadfast" },
    { key: "delivered", label: "Delivered", desc: "Handover complete" }
  ];

  const getStepIndex = (status: string) => {
    return steps.findIndex((s) => s.key === status);
  };

  const activeIndex = searchedOrder ? getStepIndex(searchedOrder.status) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans transition-colors duration-200 text-left">
      <div className="text-center max-w-md mx-auto space-y-3 mb-10">
        <Package className="text-primary mx-auto animate-pulse" size={48} />
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">অর্ডার ট্র্যাকিং (Track My Order)</h1>
        <p className="text-xs text-gray-400 font-medium font-sans">
          স্টিডফাস্ট কুরিয়ারে বুকিং এর পূর্বে আপনার মটোশপ অর্ডারের সার্বিক অগ্রগতি ট্রাক করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Track Form inputs (col-span-5) */}
        <form onSubmit={handleTrackSubmit} className="md:col-span-4 bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-800 p-5 rounded-2xl space-y-4 shadow-sm text-xs font-sans">
          <h3 className="font-bold text-gray-800 dark:text-white uppercase tracking-wider mb-2">অর্ডার তথ্য দিন</h3>
          
          <div className="space-y-1.5">
            <label className="font-bold">Order Reference ID *</label>
            <input
              type="text"
              placeholder="E.g. MSB-554432 / MSB-123456"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="w-full p-2.5 bg-gray-55 dark:bg-gray-900 border border-gray-250 dark:border-gray-750 text-xs font-mono font-extrabold uppercase rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold">মোবাইল নম্বর (Phone Number) *</label>
            <input
              type="tel"
              placeholder="E.g. 01788223344"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full p-2.5 bg-gray-55 dark:bg-gray-900 border border-gray-250 dark:border-gray-750 text-xs font-mono font-bold rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg uppercase tracking-wide transition shadow"
          >
            সার্চ করুন (Track Order)
          </button>

          {searchError && <p className="text-[11px] text-red-500 font-bold leading-relaxed">{searchError}</p>}

          <div className="pt-3 border-t border-gray-150 dark:border-gray-800 text-[10px] text-gray-400 select-none">
            <p className="font-bold text-gray-500">টেস্ট করতে ডেমো ডেটা ব্যবহার করুন:</p>
            <p className="mt-1 font-mono">Order ID: <span className="text-primary font-bold">MSB-554432</span></p>
            <p className="font-mono">Phone: <span className="text-primary font-bold">01788223344</span></p>
          </div>
        </form>

        {/* Right Side: Progress Track Steps (col-span-7) */}
        <section className="md:col-span-8 whitespace-normal">
          {searchedOrder ? (
            <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-805 rounded-2xl p-6 shadow-sm space-y-6 animate-modal">
              
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4 text-xs font-sans flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="text-gray-400 uppercase tracking-widest font-mono text-[9px] block">Order tracking code for:</span>
                  <p className="font-mono font-black text-gray-800 dark:text-white text-sm">{searchedOrder.id}</p>
                </div>
                <div>
                  <span className="text-gray-400 uppercase tracking-widest font-mono text-[9px] block">Consignment (Steadfast):</span>
                  <p className="font-mono text-primary font-bold">{searchedOrder.trackingCode}</p>
                </div>
              </div>

              {/* Progress Steps Roadmap Graphic */}
              <div className="relative pl-6 sm:pl-0 font-sans pr-4 py-2">
                {/* Connector strip line desktop layout */}
                <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 hidden sm:block pointer-events-none" />
                
                {/* Vertical connector on mobile */}
                <div className="absolute top-4 bottom-4 left-[34px] w-1 bg-gray-200 dark:bg-gray-800 sm:hidden pointer-events-none" />

                <div className="relative grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2">
                  {steps.map((st, idx) => {
                    const isDone = idx <= activeIndex;
                    const isCurrent = idx === activeIndex;
                    return (
                      <div key={st.key} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-center text-xs relative z-10">
                        {/* Circle Badge */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold border-2 text-[10px] shrink-0 transition-colors ${
                            isCurrent
                              ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20"
                              : isDone
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "bg-white dark:bg-dark-soft border-gray-300 dark:border-gray-700 text-gray-400"
                          }`}
                        >
                          {isDone ? <Check size={14} /> : idx + 1}
                        </div>
                        {/* Text labels */}
                        <div className="text-left sm:text-center text-xs font-sans">
                          <p className={`font-black ${isDone ? "text-gray-855 dark:text-white" : "text-gray-400"}`}>{st.label}</p>
                          <p className="text-[10px] text-gray-400 font-sans hidden md:block">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer details checklist */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-855 p-4 rounded-xl text-xs space-y-2.5">
                <h4 className="font-extrabold text-gray-800 dark:text-white uppercase mb-1">অর্ডার ডেলিভারি বিবরণ (Customer Details)</h4>
                <p><span className="font-bold text-gray-450 text-gray-500">গ্রাহকের নাম:</span> {searchedOrder.name}</p>
                <p><span className="font-bold text-gray-450 text-gray-500">ফোন সংস্করণ:</span> {searchedOrder.phone}</p>
                <p><span className="font-bold text-gray-450 text-gray-505 text-gray-500 font-sans">শিপিং অ্যাড্রেস:</span> {searchedOrder.address}, {searchedOrder.area}, {searchedOrder.city}</p>
                <p><span className="font-bold text-gray-450 text-gray-500">মোট পরিশোধিতব্য মূল্য BDT:</span> <span className="font-bold text-primary font-mono">৳{searchedOrder.total.toLocaleString()}</span></p>
              </div>

            </div>
          ) : searched ? (
            /* 19.5 Empty State: Order Not Found design */
            <div className="bg-white dark:bg-dark-soft border border-gray-250 dark:border-gray-805 rounded-xl py-12 px-6 text-center text-gray-500 select-none shadow-sm animate-modal">
              <Package className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">অর্ডার ট্র্যাকিং এন্ট্রি খুঁজে পাওয়া যায়নি</h3>
              <p className="text-xs text-gray-450 max-w-sm mx-auto mt-2 leading-relaxed">
                আপনার প্রবেশ করানো রেফারেন্স তথ্য আমাদের লাইভ ডাটাবেজের সাথে মেলেনি। দয়া করে সঠিক মোবাইল এবং অর্ডার আইডি প্রদান করুন।
              </p>
              <div className="pt-6">
                <a
                  href="https://wa.me/8801788223344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  📨 কাস্টমার কেয়ারে হোয়াটসঅ্যাপ করুন
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-dark-soft border border-gray-250 dark:border-gray-805 rounded-xl p-8 text-center text-gray-450 italic select-none shadow-sm py-16">
              পণ্য শিপিং প্রগ্রেস ট্র্যাক করতে বামদিকের বক্সে আপনার অর্ডার রেফারেন্স আইডিটি প্রবেশ করান।
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
