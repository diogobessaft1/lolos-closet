import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  discount
}) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingGoal = 299.00;
  const remainingForFreeShipping = Math.max(0, freeShippingGoal - subtotal);
  const freeShippingPercentage = Math.min(100, (subtotal / freeShippingGoal) * 100);

  const total = Math.max(0, subtotal - discount);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    onApplyCoupon(couponInput.trim().toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111111] border-l border-[#262626] text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#222] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-[#c5a880]" />
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">SUA SACOLA ({items.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-[#1f1f1f] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-[#181512] px-5 py-3 border-b border-[#2d2822]">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-neutral-300">
                Faltam <strong className="text-[#c5a880]">R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para ganhar <strong className="text-[#c5a880]">FRETE GRÁTIS!</strong>
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5">
                <Sparkles size={14} />
                <span>Parabéns! Você ganhou FRETE GRÁTIS! 🎉</span>
              </p>
            )}
            <div className="w-full bg-[#2a241c] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#c5a880] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-neutral-600 stroke-1" />
                <p className="text-sm text-neutral-400">Sua sacola está vazia.</p>
                <button
                  onClick={onClose}
                  className="bg-[#c5a880] text-black text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-full hover:bg-[#d6ba94] transition-colors"
                >
                  COMEÇAR A COMPRAR
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="flex space-x-3 bg-[#161616] border border-[#242424] p-3 rounded-xl"
                >
                  <img
                    src={item.image || item.images[0]}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top rounded-lg bg-black shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-white line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-neutral-500 hover:text-rose-400 p-1"
                          title="Remover"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="text-[11px] text-neutral-400 space-y-0.5 mt-1">
                        <p>Cor: <span className="text-neutral-200">{item.selectedColor}</span></p>
                        <p>Tamanho: <span className="text-neutral-200">{item.selectedSize}</span></p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center space-x-2 bg-[#202020] border border-[#303030] rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="text-neutral-400 hover:text-white text-xs"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="text-neutral-400 hover:text-white text-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-[#eae5d9]">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals and action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#222] bg-[#141414] space-y-3">
              
              {/* Coupon form */}
              <form onSubmit={handleCouponSubmit} className="flex space-x-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Cupom (ex: BEMVINDA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-[#1b1b1b] border border-[#2e2e2e] rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                  />
                  <Tag size={13} className="absolute left-2.5 top-2.5 text-neutral-500" />
                </div>
                <button
                  type="submit"
                  className="bg-[#242424] hover:bg-[#333] border border-[#3d3d3d] text-xs font-semibold px-3 py-1.5 rounded-lg text-neutral-200 transition-colors"
                >
                  Aplicar
                </button>
              </form>

              {appliedCoupon && (
                <div className="text-[11px] text-emerald-400 flex justify-between">
                  <span>Cupom {appliedCoupon} aplicado!</span>
                  <span>-R$ {discount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto</span>
                    <span>-R$ {discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#262626]">
                  <span>Total</span>
                  <span className="text-[#c5a880]">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-[#c5a880] hover:bg-[#d6ba94] text-black font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl shadow-[#c5a880]/15 cursor-pointer"
              >
                <span>FINALIZAR PEDIDO</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
