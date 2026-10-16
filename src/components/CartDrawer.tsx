import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    discountCode,
    discountPercent,
    applyDiscount,
    addItem
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscount(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  const handleRecommendationAdd = (product: typeof PRODUCTS[0]) => {
    setAddingId(product.id);
    addItem(product, product.sizes[0]?.name || 'M', product.colors[0]?.name || 'Standard');
    setTimeout(() => setAddingId(null), 1200);
  };

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Recommendations that aren't already in the cart
  const itemIds = new Set(items.map((i) => i.productId));
  const recommendations = PRODUCTS.filter((p) => !itemIds.has(p.id)).slice(0, 5);

  return (
    <>
      {/* Dim Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Drawer */}
      <aside
        className="fixed top-2 right-2 bottom-2 z-50 w-full max-w-[440px] bg-white text-black rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-[slideLeft_0.35s_cubic-bezier(0.22,1,0.36,1)]"
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-neutral-100">
          <h2 className="text-[16px] font-semibold tracking-tight">
            {totalItems > 0 ? `Your cart (${totalItems} ${totalItems === 1 ? 'item' : 'items'})` : 'Your cart is empty'}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-2.5 bg-neutral-50 border-b border-neutral-100 text-[12px]">
          {remainingForFreeShipping > 0 ? (
            <p className="text-neutral-600 mb-1.5">
              Add <span className="font-semibold text-black">${remainingForFreeShipping.toFixed(2)}</span> more for Free Worldwide Shipping
            </p>
          ) : (
            <p className="text-emerald-700 font-semibold mb-1.5">
              ✓ You unlocked Free Worldwide Shipping!
            </p>
          )}
          <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
          {items.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-[14px]">
              Nothing here yet. Add something you love.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded-lg bg-neutral-100 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[13px] font-semibold text-neutral-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {item.color} / {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="inline-flex items-center border border-neutral-200 rounded-full h-7">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-full text-[14px] flex items-center justify-center hover:bg-neutral-100 rounded-l-full cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-2 text-[12px] font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-full text-[14px] flex items-center justify-center hover:bg-neutral-100 rounded-r-full cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-500 text-[11px] underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* "Others also bought" Recommendations */}
          {recommendations.length > 0 && (
            <div className="pt-3">
              <h4 className="text-[12px] font-bold tracking-wider uppercase text-neutral-500 mb-3">
                Others also bought
              </h4>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
                {recommendations.map((rec) => {
                  const isDone = addingId === rec.id;
                  return (
                    <div
                      key={rec.id}
                      className="w-[130px] shrink-0 bg-neutral-50 border border-neutral-200/80 rounded-xl p-2 flex flex-col justify-between"
                    >
                      <img
                        src={rec.images[0]}
                        alt={rec.title}
                        className="w-full h-24 object-contain mb-2"
                      />
                      <div>
                        <p className="text-[11px] font-medium text-neutral-800 truncate">
                          {rec.title}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[12px] font-semibold">${rec.price}</span>
                          <button
                            type="button"
                            onClick={() => handleRecommendationAdd(rec)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                              isDone ? 'bg-black text-white' : 'bg-neutral-200 hover:bg-black hover:text-white'
                            }`}
                            aria-label={`Add ${rec.title}`}
                          >
                            {isDone ? (
                              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                                <path d="M3.5 8.5l3 3 6-7" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3">
                                <path d="M8 3v10M3 8h10" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout & Discounts */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-white">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Discount code (e.g. NORTH10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 px-3 py-2 text-[13px] border border-neutral-300 rounded-lg outline-none focus:border-black uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white text-[12px] font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p
                className={`text-[11px] mb-3 ${
                  promoMessage.isError ? 'text-red-500' : 'text-emerald-700 font-medium'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {discountPercent > 0 && (
              <div className="flex justify-between text-[13px] text-emerald-700 font-medium mb-1">
                <span>Discount ({discountCode}):</span>
                <span>-{discountPercent}%</span>
              </div>
            )}

            <div className="flex justify-between items-baseline mb-4">
              <div>
                <span className="text-[15px] font-bold">Total</span>
                <span className="block text-[11px] text-neutral-400">
                  Taxes and shipping calculated at checkout
                </span>
              </div>
              <span className="text-[18px] font-bold">${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                alert(`Proceeding to checkout with ${totalItems} items. Total: $${subtotal.toFixed(2)}`);
              }}
              className="w-full py-3.5 bg-black text-white hover:bg-neutral-800 text-[14px] font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <span>Checkout</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
