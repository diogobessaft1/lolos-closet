import React from 'react';
import { Flame, Sparkles, Heart, Crown, Gem, Truck } from 'lucide-react';

const stories = [
  { id: "Todos", label: "Todas as Peças", icon: Flame, border: "from-amber-400 via-rose-500 to-purple-600" },
  { id: "Lançamentos", label: "Lançamentos", icon: Sparkles, border: "from-yellow-300 via-amber-500 to-amber-700" },
  { id: "Conjuntos", label: "Conjuntos", icon: Crown, border: "from-pink-500 via-rose-500 to-red-500" },
  { id: "Vestidos", label: "Vestidos", icon: Gem, border: "from-purple-500 via-indigo-500 to-pink-500" },
  { id: "Tops & Corsets", label: "Corsets & Tops", icon: Heart, border: "from-orange-400 via-rose-400 to-pink-600" },
  { id: "Jeans & Calças", label: "Jeans & Cargo", icon: Flame, border: "from-zinc-400 via-neutral-300 to-stone-500" }
];

export default function StoriesBar({ activeCategory, setActiveCategory, onOpenPolicies }) {
  return (
    <div className="py-3.5 sm:py-4 border-b border-[#1c1c1c] bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar flex items-center space-x-4 sm:space-x-8">
        {stories.map((story) => {
          const Icon = story.icon;
          const isActive = activeCategory === story.id;
          return (
            <button
              key={story.id}
              onClick={() => {
                setActiveCategory(story.id);
                const catElement = document.getElementById("catalogo");
                if (catElement) catElement.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex flex-col items-center space-y-1.5 shrink-0 group focus:outline-none cursor-pointer active:scale-95 transition-transform"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] sm:p-[2.5px] bg-gradient-to-tr ${story.border} ${
                  isActive ? "scale-105 ring-2 ring-[#c5a880] shadow-md shadow-[#c5a880]/30" : "opacity-85 hover:opacity-100"
                }`}
              >
                <div className="w-full h-full bg-[#141414] rounded-full flex items-center justify-center p-2">
                  <Icon
                    size={22}
                    className={`transition-colors ${isActive ? "text-[#c5a880]" : "text-neutral-300 group-hover:text-white"}`}
                  />
                </div>
              </div>
              <span
                className={`text-[11px] font-medium max-w-[70px] sm:max-w-[80px] text-center truncate ${
                  isActive ? "text-[#c5a880] font-semibold" : "text-neutral-400 group-hover:text-neutral-200"
                }`}
              >
                {story.label}
              </span>
            </button>
          );
        })}

        {/* Destaque Oficial: Trocas & Envios */}
        <button
          onClick={() => onOpenPolicies("trocas")}
          className="flex flex-col items-center space-y-1.5 shrink-0 group focus:outline-none cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] sm:p-[2.5px] bg-gradient-to-tr from-amber-200 via-amber-400 to-amber-600 opacity-95 hover:opacity-100 hover:ring-2 hover:ring-[#c5a880]">
            <div className="w-full h-full bg-[#141414] rounded-full flex items-center justify-center p-2 text-[#c5a880]">
              <Sparkles size={22} />
            </div>
          </div>
          <span className="text-[11px] font-medium max-w-[70px] sm:max-w-[80px] text-center truncate text-[#c5a880]">
            Sobre Trocas
          </span>
        </button>

        {/* Destaque Oficial: Formas de Envio */}
        <button
          onClick={() => onOpenPolicies("envios")}
          className="flex flex-col items-center space-y-1.5 shrink-0 group focus:outline-none cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] sm:p-[2.5px] bg-gradient-to-tr from-neutral-400 via-stone-300 to-amber-500 opacity-95 hover:opacity-100 hover:ring-2 hover:ring-[#c5a880]">
            <div className="w-full h-full bg-[#141414] rounded-full flex items-center justify-center p-2 text-[#c5a880]">
              <Truck size={22} />
            </div>
          </div>
          <span className="text-[11px] font-medium max-w-[70px] sm:max-w-[80px] text-center truncate text-neutral-300">
            Entregas 📦
          </span>
        </button>
      </div>
    </div>
  );
}
