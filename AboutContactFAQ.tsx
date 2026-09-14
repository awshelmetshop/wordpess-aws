import React, { useState } from "react";
import { Compass, BookOpen, HelpCircle, Phone, Mail, MapPin, Send, HelpCircle as HelpIcon, ChevronDown } from "lucide-react";

interface SupportPagesProps {
  initialSubTab?: "about" | "contact" | "faq";
}

export default function AboutContactFAQ({ initialSubTab = "faq" }: SupportPagesProps) {
  const [subTab, setSubTab] = useState<"about" | "contact" | "faq">(initialSubTab);

  // FAQ Accordion toggles
  const [faqGroup, setFaqGroup] = useState<"ordering" | "shipping" | "payments" | "returns">("ordering");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact form submission simulator
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      alert("দয়া করে ফর্মের সব তথ্য পূরণ করুন।");
      return;
    }
    setContactSuccess(true);
    setContactForm({ name: "", phone: "", message: "" });
    setTimeout(() => {
      setContactSuccess(false);
    }, 3000);
  };

  const faqData = {
    ordering: [
      { q: "অর্ডার করার নিয়মটি কি?", a: "যে কোনো পণ্যের ডিটেইলস পেজে গিয়ে 'Add to Cart' বা 'Buy Now' বাটনে ক্লিক করুন। শিপিং ঠিকানায় আপনার সম্পূর্ণ নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন। আপনি বিকাশ/নগদে সেন্ডমানি করতে পারেন অথবা পেমেন্ট গেটওয়ের মাধ্যমে পরিশোধ করতে পারেন। অথবা সরাসরি Cash on Delivery ওর্ডার করতে পারেন।" },
      { q: "আমি কি হোয়াটসঅ্যাপের মাধ্যমে অর্ডার দিতে পারি?", a: "অবশ্যই! আমাদের প্রতিটি পণ্যের নিচে এবং শপিং কার্টে 'Order on WhatsApp' বাটন রয়েছে। সেখানে ক্লিক করলেই পণ্য কোডসহ একটি মেসেজ অটো-ফরম্যাট হয়ে আমাদের প্রতিনিধির নম্বরে ওয়ান-ক্লিক চ্যাট চালু হবে।" },
      { q: "অর্ডার কনফার্ম হতে কত সময় লাগে?", a: "অর্ডার সাবমিট করার পর আমাদের কাস্টমার কেয়ার টিম সর্বোচ্চ ১২ ঘন্টার মধ্যে আপনার নম্বরে কল দিয়ে সাইজ এবং ঠিকানা কনফার্ম করবে। কনফার্মেশন পাওয়ার পরপরই পণ্যটি আমাদের কুরিয়ারে বুকিং দেওয়া হবে।" }
    ],
    shipping: [
      { q: "ডেলিভারি করতে কতোদিন সময় লাগে?", a: "ঢাকা শহরের সিটি কর্পোরেশন এলাকার ভিতরে সর্বোচ্চ ২৪ থেকে ৪৮ ঘন্টার মধ্যে ডেলিভারি পেয়ে যাবেন। ঢাকার বাইরে জেলা বা উপজেলা সদরে পণ্য পৌঁছাতে ৩ থেকে ৫ দিন সময় লাগবে।" },
      { q: "ডেলিভারি চার্জ বা কুরিয়ার খরচ কত?", a: "ঢাকা সিটি কর্পোরেশনের ভিতরে ডেলিভারি চার্জ ৬০ টাকা এবং ঢাকার বাইরে সারাদেশের যেকোনো জেলা বা উপজেলায় ১২০ টাকা।" },
      { q: "ট্রেকিং কোড দিয়ে কিভাবে ট্র্যাক করব?", a: "অর্ডার শিফ্ট হওয়ার সাথে সাথেই আপনার মেসেজে একটি Steadfast Tracking Code চলে যাবে। আপনি আমাদের 'Track Order' পেজে গিয়ে অর্ডার আইডি এবং ফোন নম্বর দিয়ে রিয়েল-টাইম অগ্রগতি ট্র্যাক করতে পারবেন।" }
    ],
    payments: [
      { q: "বিকাশ বা নগদে ট্রানজেকশন সফল করার পর কি করতে হবে?", a: "বিকাশ বা নগদ সেন্ডমানি অপশন সিলেক্ট করার পর আমাদের মার্চেন্ট নাম্বারে সেন্ডমানি সম্পন্ন করুন। টাকা পাঠানোর পর বিকাশ বা নগদ থেকে প্রাপ্ত ৮ বা ১০ ডিজিটের ট্রানজেকশন আইডিটি চেকআউট ফর্মে প্রোভাইড করুন।" },
      { q: "SSLCommerz দিয়ে পেমেন্ট করা কি নিরাপদ?", a: "হ্যাঁ, এটি বাংলাদেশের সবচেয়ে নিরাপদ ব্যাংকিং পেমেন্ট গেটওয়ে। আপনি আপনার ভিসা, মাস্টারকার্ড, বা রকেট, ডাচ-বাংলা নেটওয়ার্ক ব্যবহার করে সর্বোচ্চ সিকিউরিটির সাথে মূল্য পরিশোধ করতে পারবেন।" }
    ],
    returns: [
      { q: "পণ্য পছন্দ না হলে বা সাইজ পরিবর্তন করতে চাইলে কি করব?", a: "মটোশপ বিডি গ্রাহকদের ৭ দিন পর্যন্ত সহজ রিটার্ন ও এক্সচেঞ্জ পলিসি দিয়ে থাকে। রি-ইউসেবল কন্ডিশনে হেলমেটের প্রটেক্টিভ স্টিকার পিল না করে বডি ও কার্টন ভ অক্ষত রেখে আমাদের ওয়ারহাউজে পাঠালে সাইজ এক্সচেঞ্জ করে দেওয়া হবে।" },
      { q: "ভুল সাইজের হেলমেট রিটার্নের খরচ কে দিবে?", a: "আমাদের দিক থেকে যদি ভুল সাইজ বা ক্ষতিগ্রস্ত পণ্য পাঠানো হয়, তবে রিটার্ন ও পুন-পাঠানোর কুরিয়ার চার্জ সম্পূর্ণ মটোশপ বহন করবে। অন্যথায়, গ্রাহক কুরিয়ার চার্জ বহন করে সাইজ পরিবর্তন করতে পারবেন।" }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200 text-left">
      
      {/* Top Customizer Nav buttons */}
      <div className="bg-white dark:bg-dark-soft border border-gray-250 dark:border-gray-800 rounded-2xl p-2.5 flex justify-center gap-4 mb-8 font-sans font-bold text-xs shadow-sm select-none">
        <button
          onClick={() => setSubTab("faq")}
          className={`py-2 px-5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition ${subTab === "faq" ? "bg-primary text-white" : "text-gray-400 hover:text-black dark:hover:text-white"}`}
        >
          <HelpIcon size={14} />
          FAQ
        </button>
        <button
          onClick={() => setSubTab("about")}
          className={`py-2 px-5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition ${subTab === "about" ? "bg-primary text-white" : "text-gray-400 hover:text-black dark:hover:text-white"}`}
        >
          <BookOpen size={14} />
          About Brand
        </button>
        <button
          onClick={() => setSubTab("contact")}
          className={`py-2 px-5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition ${subTab === "contact" ? "bg-primary text-white" : "text-gray-400 hover:text-black dark:hover:text-white"}`}
        >
          <Compass size={14} />
          Contact & Location
        </button>
      </div>

      <div className="animate-modal">
        {/* TAB 1: FAQ ACCORDIONS */}
        {subTab === "faq" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start select-none">
            {/* Left selector buttons */}
            <div className="md:col-span-3 space-y-2 border-r border-gray-150 dark:border-gray-800 pr-4">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1 mb-4">FAQ Departments</h3>
              {[
                { tag: "ordering", label: "📦 Ordering Workflow" },
                { tag: "shipping", label: "🚚 Shipping Zones" },
                { tag: "payments", label: "💳 Payments Gateway" },
                { tag: "returns", label: "🔄 Return & Exchange" }
              ].map((dep) => (
                <button
                  key={dep.tag}
                  onClick={() => {
                    setFaqGroup(dep.tag as any);
                    setOpenFaq(0);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-left transition ${faqGroup === dep.tag ? "bg-primary/10 text-primary border border-primary/20" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 border border-transparent"}`}
                >
                  {dep.label}
                </button>
              ))}
            </div>

            {/* Right Accordion box */}
            <div className="md:col-span-9 space-y-4">
              <h2 className="text-md sm:text-lg font-black uppercase text-gray-900 dark:text-white border-b border-gray-105 dark:border-gray-800 pb-3">
                {faqGroup.toUpperCase()} - সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
              </h2>
              
              <div className="space-y-3 font-sans">
                {faqData[faqGroup].map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-dark-soft shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 flex justify-between items-center text-xs font-bold text-gray-855 dark:text-white text-left hover:text-primary transition"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown size={14} className={`transform transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-gray-655 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-850 font-sans animate-modal">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT STORY PAGES */}
        {subTab === "about" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4 text-xs leading-relaxed text-gray-655 dark:text-gray-300">
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase font-display select-none">আমাদের বাইকার ভিশন ও গল্প</h2>
              <p>
                মটোশপ বিডি বাংলাদেশের বাইকিং কমিউনিটির একটি নির্ভরযোগ্য অংশীদার। আমরা বিশ্বাস করি যে, প্রতিটি গতিময় রাইড আনন্দের হতে পারে তখনই, যখন রাইডার পুরোপুরি সেফটি সম্পন্ন থাকবে।
              </p>
              <p className="font-sans">
                উত্তরা এবং মিরপুরের শোরুমসহ সম্পূর্ণ ডিজিটাল ই-কমার্স সিস্টেমে আমরা গ্রাহকদের জন্য শতভাগ জেনুইন অরিজিনাল পন্য কুরিয়ার বুকিং করতে প্রস্তুত। দেশের বাইকারদের প্রথম অনলাইন চয়েস হতে আমরা প্রফেশনাল মান বজায় রাখছি।
              </p>

              {/* Stats metric visuals */}
              <div className="grid grid-cols-3 gap-4 pt-6 select-none font-sans text-center">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 border rounded-xl">
                  <span className="block text-lg font-black text-primary font-mono tracking-tight">১০,০০০+</span>
                  <span className="text-[10px] text-gray-400">হেলমেট ডেলিভারি</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 border rounded-xl">
                  <span className="block text-lg font-black text-primary font-mono tracking-tight">E.C.E</span>
                  <span className="text-[10px] text-gray-400">সার্টিফাইড ইমপোর্ট</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-905 border rounded-xl">
                  <span className="block text-lg font-black text-primary font-mono tracking-tight">২৪ ঘন্টা</span>
                  <span className="text-[10px] text-gray-400">অর্ডার ভেরিফাই</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center select-none">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=450"
                alt="Motorcycle lifestyle apparel collection about banner"
                className="rounded-2xl shadow-xl w-full max-w-sm object-cover border border-gray-150 dark:border-gray-800"
              />
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT FORM & MAP REPRESENTATION */}
        {subTab === "contact" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Contact Form inputs block (col-span-6) */}
            <form onSubmit={handleContactSubmit} className="md:col-span-6 bg-white dark:bg-dark-soft border border-gray-150 dark:border-gray-800 p-6 rounded-2xl space-y-4 shadow-sm text-xs font-sans">
              <h3 className="text-sm font-black uppercase text-gray-905 dark:text-white border-b pb-3 mb-2">কাস্টমার এনকোয়ারি ফর্ম (Enquiry)</h3>
              
              {contactSuccess && (
                <p className="p-3 bg-emerald-50 text-emerald-600 font-extrabold text-xs text-center rounded-lg border border-emerald-250 animate-bounce">
                  📨 সফল হয়েছে! আপনার বার্তাটি আমাদের টিমের কাছে পাঠানো হয়েছে।
                </p>
              )}

              <div className="space-y-1.5">
                <label className="font-bold">আপনার নাম (Full Name) *</label>
                <input
                  type="text"
                  placeholder="E.g. Md. Kausar"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-55 dark:bg-gray-900 border border-gray-250 dark:border-gray-750 text-xs rounded-lg uppercase font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  placeholder="E.g. 01788223344"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-gray-55 dark:bg-gray-900 border border-gray-250 dark:border-gray-750 font-mono text-xs rounded-lg"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold">বিস্তারিত বার্তা লিখে পাঠান:</label>
                <textarea
                  placeholder="হেলমেট স্টক, সাইজ এক্সচেঞ্জ বা হোলসেল এক্সেসরিজ পার্টনারশিপ পেমেন্ট কুরিয়ার সম্পর্কিত যেকোনো প্রশ্ন..."
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full p-2.5 bg-gray-55 dark:bg-gray-900 border border-gray-250 dark:border-gray-750 text-xs rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg uppercase tracking-wide tracking-wider transition shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                বার্তা পাঠান (Send)
                <Send size={13} />
              </button>
            </form>

            {/* Right Map simulator & address details block (col-span-6) */}
            <div className="md:col-span-6 space-y-6">
              <div className="bg-white dark:bg-dark-soft border border-gray-150 dark:border-gray-800 p-6 rounded-2xl text-xs space-y-3 shadow-sm leading-relaxed">
                <h3 className="font-black text-gray-855 dark:text-white uppercase flex items-center gap-1">
                  <MapPin size={16} className="text-primary" />
                  মটোশপ শোরুম ও কর্পোরেট পয়েন্ট
                </h3>
                
                <p className="text-gray-655 dark:text-gray-300">
                  <span className="font-bold block mb-1">📍 প্রধান শাখা:</span>
                  {(window as any).WordPressData?.storeAddress ? (
                    (window as any).WordPressData.storeAddress
                  ) : (
                    "মটোশপ টাওয়ার, ৪র্থ তলা, উত্তরা হাউস রোডের জসিমউদ্দিন এভিনিউ, উত্তরা, ঢাকা ১২৩০। (উত্তরা ক্লাবের বিপরীতে)"
                  )}
                </p>

                <p className="text-gray-655 dark:text-gray-300">
                  <span className="font-bold block mb-1">📍 মিরপুর ১০ ব্রাঞ্চ:</span>
                  হাউস ২৪, রোড ৩, মিরপুর ১০ গোলচত্বর মেট্টোরেল পিলারের ২শ গজ পূর্বপার্শ্বে, ঢাকা।
                </p>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1 select-none font-sans text-gray-500">
                  <p>📞 হটলাইন সাপোর্ট: <span className="font-black text-primary font-mono select-all">{(window as any).WordPressData?.contactPhone || '+880 18XX-XXXXXX'}</span></p>
                  <p>📧 অফিশিয়াল মেইল: {(window as any).WordPressData?.contactEmail || 'support@motoshopbd.com'}</p>
                </div>
              </div>

              {/* Styled Mock Map Illustration */}
              <div className="h-44 w-full bg-gray-105 border-2 border-dashed border-gray-250 dark:border-gray-800 rounded-2xl flex flex-col justify-center items-center text-center p-4 relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-primary/2 rounded-full filter blur-xl pointer-events-none" />
                <MapPin className="text-primary mb-1.5 animate-bounce" size={24} />
                <span className="font-extrabold text-[11px] text-gray-800 dark:text-white">📍 GOOGLE MAPS DIRECT COORDINATES</span>
                <span className="text-[10px] text-gray-400 mt-1 max-w-xs leading-relaxed font-sans">
                  "MotoShop Towers, Sector 7, Jasimuddin Avenue, Dhaka" লিখে ম্যাপে সার্চ করলেই আমাদের সঠিক নেভিগেশন ডিরেকশন পয়েন্ট পেয়ে যাবেন।
                </span>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
