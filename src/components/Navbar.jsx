import React from 'react';
import { ShoppingBag, Heart, Search, User } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  onOpenAccount,
  customerProfile
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Linha Principal: Busca (Esquerda) | LOGO CENTRALIZADO (Centro) | Conta, Favoritos & Sacola (Direita) */}
        <div className="grid grid-cols-3 items-center h-20">
          
          {/* Lado Esquerdo: Busca Desktop */}
          <div className="flex items-center justify-start">
            <div className="relative hidden md:block w-full max-w-xs">
              <input
                type="text"
                placeholder="Buscar peças..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880] transition-colors"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
            </div>
          </div>

          {/* Centro: LOGO PRINCIPAL CENTRALIZADO */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer text-center group"
            onClick={() => setActiveCategory("Todos")}
          >
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.28em] text-white group-hover:text-[#c5a880] transition-colors uppercase select-none">
              LÔLO'S CLOSET
            </h1>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#9e9585] font-light mt-0.5">
              BOUTIQUE OFICIAL • EST. 2024
            </span>
          </div>

          {/* Lado Direito: Minha Conta, Favoritos e Sacola */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4">
            
            {/* Botão Minha Conta (Identificação) */}
            <button
              onClick={onOpenAccount}
              className="flex items-center space-x-1.5 p-2 text-neutral-300 hover:text-[#c5a880] transition-colors rounded-full hover:bg-[#161616]"
              title={customerProfile?.name ? `Olá, ${customerProfile.name}` : "Minha Conta / Entrar"}
            >
              <User size={19} className={customerProfile?.name ? "text-[#c5a880]" : "text-neutral-300"} />
              {customerProfile?.name && (
                <span className="text-[11px] font-semibold hidden md:inline text-neutral-200">
                  {customerProfile.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Botão de Favoritos */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-neutral-300 hover:text-[#c5a880] transition-colors rounded-full hover:bg-[#161616]"
              title="Meus Favoritos"
            >
              <Heart size={20} />
              {favoritesCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Botão da Sacola */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 bg-[#171512] hover:bg-[#23201a] border border-[#383125] text-[#eae5d9] px-3 sm:px-4 py-2 rounded-full transition-all group shadow-md"
              title="Sacola de Compras"
            >
              <ShoppingBag size={18} className="text-[#c5a880] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-wider hidden sm:inline text-white">SACOLA</span>
              <span className="bg-[#c5a880] text-black font-bold text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </button>

          </div>

        </div>

        {/* Linha Inferior de Categorias (100% Centralizada) */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 xl:space-x-10 py-3 border-t border-[#181818]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs tracking-[0.18em] uppercase transition-all pb-1.5 font-medium whitespace-nowrap ${
                  isActive
                    ? "text-[#c5a880] border-b-2 border-[#c5a880] font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Campo de Busca no Mobile */}
        <div className="pb-3 pt-1 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar roupas em Lôlo's Closet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#141414] border border-[#262626] rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
            />
            <Search size={15} className="absolute left-3.5 top-2.5 text-neutral-400" />
          </div>
        </div>

      </div>
    </header>
  );
}
