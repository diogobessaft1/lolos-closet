import React from 'react';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';

export default function BottomNav({
  activeCategory,
  setActiveCategory,
  onOpenCart,
  cartCount,
  onOpenFavorites,
  favoritesCount,
  onOpenAccount,
  customerProfile
}) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-[#222] py-2 px-4 select-none">
      <div className="flex items-center justify-around">
        
        <button
          onClick={() => {
            setActiveCategory("Todos");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-col items-center text-neutral-400 hover:text-[#c5a880]"
        >
          <Home size={19} />
          <span className="text-[10px] mt-0.5 font-medium">Início</span>
        </button>

        <button
          onClick={() => {
            setActiveCategory("Todos");
            const catalog = document.getElementById("catalogo");
            if (catalog) catalog.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center text-neutral-400 hover:text-[#c5a880]"
        >
          <Grid size={19} />
          <span className="text-[10px] mt-0.5 font-medium">Catálogo</span>
        </button>

        <button
          onClick={onOpenFavorites}
          className="relative flex flex-col items-center text-neutral-400 hover:text-[#c5a880]"
        >
          <Heart size={19} />
          <span className="text-[10px] mt-0.5 font-medium">Favoritos</span>
          {favoritesCount > 0 && (
            <span className="absolute -top-1 right-2 bg-rose-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center text-[#c5a880]"
        >
          <ShoppingBag size={19} />
          <span className="text-[10px] mt-0.5 font-medium">Sacola</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1.5 bg-[#c5a880] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenAccount}
          className={`flex flex-col items-center ${customerProfile?.name ? "text-[#c5a880]" : "text-neutral-400 hover:text-[#c5a880]"}`}
        >
          <User size={19} />
          <span className="text-[10px] mt-0.5 font-medium">{customerProfile?.name ? "Conta" : "Entrar"}</span>
        </button>

      </div>
    </div>
  );
}
