import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react';

export default function HeroBanner({ onExplore }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#161412] to-[#0b0b0b] py-8 sm:py-14 md:py-20 border-b border-[#24211c]">
      {/* Subtle decorative glow */}
      <div className="absolute -top-40 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-80 sm:w-96 h-80 sm:h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#252018] border border-[#443828] px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs text-[#d4af37]">
              <Sparkles size={14} className="text-[#c5a880]" />
              <span className="tracking-widest uppercase font-semibold">COLEÇÃO EXCLUSIVA • 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Sensualidade, renda refinada e <span className="italic text-[#c5a880]">atitude chic.</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Descubra os conjuntos, corsets e vestidos mais desejados de São Paulo e Rio. Modelagens em renda premium e poliamida de alta sustentação feitas para você brilhar.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto bg-[#c5a880] hover:bg-[#d6ba94] text-black font-semibold text-xs tracking-widest uppercase px-8 py-3.5 sm:py-4 rounded-full transition-all flex items-center justify-center space-x-2 shadow-xl shadow-[#c5a880]/15 group cursor-pointer active:scale-95"
              >
                <span>VER COLEÇÃO COMPLETA</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://www.instagram.com/loloscloset.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-[#3d362a] hover:border-[#c5a880] text-neutral-300 hover:text-white text-xs tracking-widest uppercase px-6 py-3.5 sm:py-4 rounded-full transition-all text-center"
              >
                Siga @loloscloset.com.br
              </a>
            </div>

            {/* Trust highlights adaptados para telas pequenas */}
            <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-1.5 sm:gap-2 border-t border-[#26231f] text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-1 sm:space-y-0 sm:space-x-2">
                <Truck size={15} className="text-[#c5a880] shrink-0" />
                <span className="text-[10px] sm:text-[11px] text-neutral-300">Envio para todo Brasil</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-1 sm:space-y-0 sm:space-x-2">
                <ShieldCheck size={15} className="text-[#c5a880] shrink-0" />
                <span className="text-[10px] sm:text-[11px] text-neutral-300">Compra 100% Segura</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-1 sm:space-y-0 sm:space-x-2">
                <RefreshCw size={15} className="text-[#c5a880] shrink-0" />
                <span className="text-[10px] sm:text-[11px] text-neutral-300">Troca em até 7 dias</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase collage */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black border border-[#332b21] group">
              <img
                src="/produtos/sicilia/foto-1.jpeg"
                alt="Conjunto Sicília Renda"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-5">
                <span className="text-[10px] tracking-widest uppercase text-[#c5a880] font-semibold">NOVA COLEÇÃO</span>
                <span className="text-base sm:text-lg font-serif font-bold text-white">Conjunto Sicília Renda</span>
                <span className="text-xs sm:text-sm font-semibold text-[#eae5d9]">R$ 179,99 • Em até 6x</span>
              </div>
            </div>
            
            {/* Floating second preview */}
            <div className="absolute -bottom-3 -left-2 sm:-left-8 w-28 sm:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-[#473b2d] hidden sm:block">
              <img
                src="/produtos/saint-tropez/foto-1.jpeg"
                alt="Conjunto Saint Tropez Renda"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
