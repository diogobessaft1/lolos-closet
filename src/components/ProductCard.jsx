import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  onOpenModal,
  onQuickAdd,
  isFavorite,
  onToggleFavorite
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const installments = (product.price / 3).toFixed(2).replace('.', ',');

  return (
    <div className="group flex flex-col h-full bg-[#121212] border border-[#222222] hover:border-[#42392c] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
      
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#181818] cursor-pointer shrink-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(product, selectedColor)}
      >
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#0c0c0c]/85 backdrop-blur-md text-[#c5a880] border border-[#443828] text-[8px] sm:text-[10px] tracking-wider uppercase font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
            {product.badge}
          </span>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? "bg-rose-600 text-white"
              : "bg-black/50 text-neutral-300 hover:text-white hover:bg-black/80"
          }`}
          title="Favoritar"
        >
          <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Quick View overlay on hover (desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product, selectedColor);
            }}
            className="w-full bg-[#c5a880] hover:bg-[#d6ba94] text-black font-semibold text-xs tracking-wider uppercase py-2.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-lg"
          >
            <Eye size={15} />
            <span>VER DETALHES</span>
          </button>
        </div>
      </div>

      {/* Info Container (Com flex-grow e altura uniforme) */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Color swatch pills */}
          <div className="flex items-center space-x-1.5 mb-2 overflow-x-auto no-scrollbar">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? "ring-2 ring-[#c5a880] scale-110 border-white"
                    : "border-neutral-600 opacity-75 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-[10px] text-neutral-400 pl-1">
              {product.colors.length} {product.colors.length === 1 ? "cor" : "cores"}
            </span>
          </div>

          {/* Category */}
          <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#9e9585] font-medium block">
            {product.category}
          </span>
          
          {/* Title com ALTURA FIXA UNIFORME para não desnivelar o grid */}
          <h3
            onClick={() => onOpenModal(product, selectedColor)}
            className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors line-clamp-2 min-h-[2.5rem] flex items-start cursor-pointer mt-0.5 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action (Perfeitamente nivelados) */}
        <div className="pt-2.5 border-t border-[#1f1f1f] flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-sm sm:text-base font-bold text-[#eae5d9]">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-neutral-500 line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-neutral-400 block mt-0.5">
              3x de R$ {installments} sem juros
            </span>
          </div>

          <button
            onClick={() => onQuickAdd(product, selectedColor, product.sizes[0])}
            className="p-2 sm:p-2.5 bg-[#1f1c18] hover:bg-[#c5a880] text-[#c5a880] hover:text-black border border-[#3b3325] hover:border-[#c5a880] rounded-lg transition-all"
            title="Adicionar à sacola"
          >
            <ShoppingBag size={16} />
          </button>
        </div>

      </div>

    </div>
  );
}
