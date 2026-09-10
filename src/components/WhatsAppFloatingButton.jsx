import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloatingButton({ phone = "5521972310968" }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const cleanPhone = phone.replace(/\D/g, "");
  const defaultMessage = encodeURIComponent("Olá! Estava olhando o site da Lôlo's Closet e gostaria de tirar uma dúvida 💕");
  const link = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
      
      {/* Tooltip flutuante discreto */}
      {showTooltip && (
        <div className="mb-2 mr-1 bg-[#161616] text-white border border-[#2e2e2e] shadow-2xl rounded-2xl p-2.5 text-xs max-w-[200px] flex items-start space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex-1">
            <span className="font-semibold text-[#4ade80] flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-ping inline-block mr-1" />
              Online agora
            </span>
            <p className="text-[11px] text-neutral-300 mt-0.5 leading-tight">
              Dúvidas sobre tamanhos ou peças? Fale comigo!
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-500 hover:text-white p-0.5"
            title="Fechar"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Botão de WhatsApp */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-200"
        title="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black"></span>
        </span>
        <MessageCircle size={28} className="fill-white text-transparent group-hover:rotate-12 transition-transform" />
      </a>

    </div>
  );
}
