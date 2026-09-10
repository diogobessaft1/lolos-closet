import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, CreditCard, Gift } from 'lucide-react';

const messages = [
  { icon: Truck, text: "FRETE GRÁTIS nas compras acima de R$ 299 para todo o Brasil" },
  { icon: CreditCard, text: "PARCELAMENTO EM ATÉ 6X SEM JUROS no cartão" },
  { icon: Gift, text: "10% OFF NA PRIMEIRA COMPRA COM O CUPOM: BEMVINDA10" },
  { icon: Sparkles, text: "NOVA COLEÇÃO 2026: PEÇAS EXCLUSIVAS EM RENDA & POLIAMIDA" }
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const { icon: Icon, text } = messages[current];

  return (
    <div className="bg-[#141210] border-b border-[#28221b] text-[#d4af37] text-xs py-2.5 px-4 select-none relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-center transition-all duration-500 ease-in-out">
        <Icon size={14} className="animate-pulse shrink-0 text-[#c5a880]" />
        <span className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs text-[#eae5d9]">
          {text}
        </span>
      </div>
    </div>
  );
}
