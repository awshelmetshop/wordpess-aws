import React from "react";
import { RefreshCw, X, ArrowRight } from "lucide-react";
import { Product } from "../types";

interface ComparisonBarProps {
  compareList: Product[];
  onRemove: (p: Product) => void;
  onClearAll: () => void;
  onTriggerComparePage: () => void;
}

export default function ComparisonBar({
  compareList,
  onRemove,
  onClearAll,
  onTriggerComparePage
}: ComparisonBarProps) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-dark text-white p-3 z-30 shadow-2xl border-t border-gray-800 animate-modal font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side info */}
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white">
            <RefreshCw size={18} className="animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">পণ্য তুলনা করুন ({compareList.length}/4)</h4>
            <p className="text-[10px] text-gray-400">সর্বোচ্চ ৪ টি পণ্য একসাথে স্পেসিফিকেশন তুলনা করতে পারবেন।</p>
          </div>
        </div>

        {/* Selected Products Thumbs strip */}
        <div className="flex flex-wrap items-center gap-3">
          {compareList.map((product) => (
            <div
              key={product.id}
              className="relative bg-gray-900 border border-gray-800 rounded-lg p-1.5 flex items-center gap-2 pr-8 group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="text-[11px] font-medium max-w-[100px] truncate text-gray-200">
                {product.name}
              </span>
              <button
                onClick={() => onRemove(product)}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition"
                title="Remove from comparison"
                aria-label="Remove comparison item"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {compareList.length < 4 && (
            <div className="border border-dashed border-gray-750 text-gray-500 rounded-lg py-1.5 px-3 text-[11px] font-medium">
              + আরও পণ্য সিলেক্ট করুন
            </div>
          )}
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-3.5 shrink-0 self-stretch sm:self-auto justify-end">
          <button
            onClick={onClearAll}
            className="text-xs text-gray-400 hover:text-white transition font-medium underline"
          >
            Clear All
          </button>
          
          <button
            onClick={onTriggerComparePage}
            disabled={compareList.length < 2}
            className={`py-2 px-4 rounded-lg font-bold text-xs flex items-center gap-1.5 transition ${
              compareList.length >= 2
                ? "bg-primary hover:bg-primary-dark text-white cursor-pointer shadow-lg hover:shadow-primary/20"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            তুলনা করুন (Compare)
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
