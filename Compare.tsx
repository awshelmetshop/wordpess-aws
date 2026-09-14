import React from "react";
import { HelpCircle, Trash2, ShoppingCart, RefreshCw } from "lucide-react";
import { Product } from "../types";
import { SAMPLE_PRODUCTS } from "../data";

interface CompareProps {
  compareIds: string[];
  onRemove: (p: Product) => void;
  onClearAll: () => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onBrowse: () => void;
}

export default function Compare({
  compareIds,
  onRemove,
  onClearAll,
  onAddToCart,
  onProductClick,
  onBrowse
}: CompareProps) {
  
  const comparedProducts = SAMPLE_PRODUCTS.filter((p) => compareIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans transition-colors duration-200 text-left">
      <div className="flex justify-between items-center mb-6 font-sans select-none">
        <div>
          <h1 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <RefreshCw className="text-primary animate-spin-slow" />
            পণ্য স্পেসিফিকেশন তুলনা (Compare Board)
          </h1>
          <p className="text-xs text-gray-500 font-medium">রানিং বিভিন্ন হেলমেট বা এক্সেসরিজ নির্বাচন করুন ও তুলনামূলক স্পেকস মেপে নিন</p>
        </div>
        {comparedProducts.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-500 font-bold hover:underline"
          >
            ✕ Clear List
          </button>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="bg-white dark:bg-dark-soft border border-gray-200 dark:border-gray-805 rounded-2xl py-16 px-6 text-center select-none shadow-sm font-sans">
          <HelpCircle size={56} className="mx-auto text-gray-300 dark:text-gray-800 mb-4 animate-pulse" />
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">তুলনার বোর্ড খালি (Compare Board Empty)</h3>
          <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
            কোনো মোটরসাইকেল পণ্য তুলনা বোর্ড তালিকাভুক্ত করা হয়নি। শপ গ্যালারিতে পণ্যের পাশে থাকা রিলোড (🔄) আইকনে ক্লিক করে সর্বোচ্চ ৪টি পণ্য এখানে সেভ করুন।
          </p>
          <div className="pt-8">
            <button
              onClick={onBrowse}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold uppercase transition"
            >
              পণ্য সিলেক্ট করতে ব্রাউজ করুন →
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-dark-soft shadow-sm text-xs font-sans select-none">
          <table className="w-full division-x division-y border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark/40 font-bold text-gray-550 border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 w-1/5 text-left uppercase text-[10px] tracking-wider text-gray-400 font-mono">Parameters</th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="p-4 text-center min-w-[200px]">
                    <div className="relative flex flex-col items-center gap-1">
                      <button
                        onClick={() => onRemove(p)}
                        className="absolute -top-1 -right-1 text-gray-400 hover:text-red-500 p-0.5 rounded transition"
                        title="Remove comparing detail"
                      >
                        <Trash2 size={13} />
                      </button>
                      
                      <div className="w-20 h-24 rounded-lg overflow-hidden border bg-gray-50 dark:bg-gray-900 mb-2">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <h4
                        onClick={() => onProductClick(p)}
                        className="text-xs font-extrabold text-gray-800 dark:text-white hover:text-primary transition line-clamp-1 cursor-pointer max-w-[150px]"
                      >
                        {p.name}
                      </h4>
                      <p className="text-[10px] font-bold font-mono text-primary">৳{p.price.toLocaleString()}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
              
              {/* Brand Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">Brand Name</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center font-extrabold text-gray-700 dark:text-white font-mono uppercase">{p.brand}</td>
                ))}
              </tr>

              {/* Weight Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">Shell Weight</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center font-bold text-gray-600 dark:text-gray-300 font-mono">{p.attributes?.weight || "N/A"}</td>
                ))}
              </tr>

              {/* Material Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">Build Material</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center font-medium leading-tight">{p.attributes?.material || "N/A"}</td>
                ))}
              </tr>

              {/* Certification Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">Security Certified</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center">
                    <span className="bg-primary/10 border border-primary/20 text-primary font-bold px-2 py-0.5 rounded text-[10px]">
                      {p.attributes?.certification || "Not Declared"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Ventilation Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">Flow Vents Count</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center text-gray-600 dark:text-gray-200">{p.attributes?.ventilation || "No Air Vents"}</td>
                ))}
              </tr>

              {/* Visor Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">Visor Shields Spec</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center text-gray-650 dark:text-gray-200">{p.attributes?.visor || "Standard Shield"}</td>
                ))}
              </tr>

              {/* Stock Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">In-Store Stock</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center font-mono">
                    {p.stock === 0 ? (
                      <span className="text-red-500 font-bold">OOS</span>
                    ) : (
                      <span className="text-emerald-500 font-bold">{p.stock} units</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Ratings Row */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-3.5 font-bold uppercase text-gray-450 tracking-wide">Rider Ratings Avg</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-center font-mono font-bold text-amber-500">
                    ★ {p.rating} ({p.reviewCount})
                  </td>
                ))}
              </tr>

              {/* Purchase Button triggers Row */}
              <tr className="bg-gray-50/30 dark:bg-dark/10">
                <td className="p-4" />
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <button
                      onClick={() => onAddToCart(p)}
                      disabled={p.stock === 0}
                      className="py-2 px-4 bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-bold text-xs uppercase rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingCart size={13} />
                      Buy Item
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
