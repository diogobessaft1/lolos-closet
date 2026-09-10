import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Truck, ShieldCheck, MessageCircle, ChevronDown, Clock, Zap } from 'lucide-react';

export default function ProductModal({
  product,
  initialColor,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNowWhatsApp
}) {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(initialColor || product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "ÚNICO");
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");
  const [shippingResult, setShippingResult] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("description");

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedColor(initialColor || product.colors[0]?.name || "");
      setSelectedSize(product.sizes[0] || "ÚNICO");
      setQuantity(1);
      setShippingResult(null);
      setCep("");
    }
  }, [product, initialColor]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSimulateShipping = async (e) => {
    e.preventDefault();
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      alert("Por favor, digite um CEP válido com 8 dígitos.");
      return;
    }

    setLoadingShipping(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (data.erro) {
        alert("CEP não encontrado.");
      } else {
        const isSP = data.uf === "SP";
        setShippingResult({
          city: data.localidade,
          uf: data.uf,
          options: [
            { name: "SEDEX Express", price: isSP ? 14.90 : 28.50, days: isSP ? "1 a 2 dias úteis" : "3 a 5 dias úteis" },
            { name: "PAC Econômico", price: isSP ? 9.90 : 18.90, days: isSP ? "3 a 4 dias úteis" : "6 a 9 dias úteis" }
          ]
        });
      }
    } catch (err) {
      console.error(err);
      setShippingResult({
        city: "Sua Região",
        uf: "BR",
        options: [
          { name: "SEDEX Express", price: 19.90, days: "2 a 4 dias úteis" },
          { name: "PAC Econômico", price: 12.90, days: "5 a 8 dias úteis" }
        ]
      });
    } finally {
      setLoadingShipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111111] border border-[#2b261e] rounded-2xl overflow-hidden shadow-2xl text-white my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#1a1a1a]/80 hover:bg-[#282828] text-neutral-300 hover:text-white rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
          
          {/* Photos Gallery */}
          <div className="p-4 sm:p-6 flex flex-col space-y-3 bg-[#0d0d0d]">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black border border-[#222]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-black/80 text-[#c5a880] border border-[#443828] text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails Row */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? "border-[#c5a880] scale-95" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Controls */}
          <div className="p-6 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              
              {/* Category & Title */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                  {product.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {product.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#eae5d9]">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-xs text-[#c5a880] bg-[#252018] px-2.5 py-1 rounded-full border border-[#443828]">
                  Em até 6x sem juros
                </span>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                  Cor Escolhida: <span className="text-[#c5a880]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedColor === c.name
                          ? "border-[#c5a880] bg-[#221e18] text-white ring-1 ring-[#c5a880]"
                          : "border-[#2a2a2a] bg-[#161616] text-neutral-400 hover:border-neutral-500"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                  Tamanho: <span className="text-[#c5a880]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase border transition-all ${
                        selectedSize === s
                          ? "border-[#c5a880] bg-[#c5a880] text-black font-bold"
                          : "border-[#2d2d2d] bg-[#161616] text-neutral-300 hover:border-neutral-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-3 pt-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Quantidade:</span>
                <div className="flex items-center bg-[#181818] border border-[#2d2d2d] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-semibold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* HIERARQUIA DE CTAs CLARA & PROFISSIONAL (Item 4) */}
              <div className="space-y-2.5 pt-3">
                {/* CTA Primário (Ação Principal destacada em Dourado de Luxo) */}
                <button
                  onClick={() => {
                    onBuyNowWhatsApp(product, selectedColor, selectedSize, quantity);
                  }}
                  className="w-full bg-[#c5a880] hover:bg-[#d6ba94] text-black font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl shadow-[#c5a880]/20 group cursor-pointer"
                >
                  <Zap size={16} className="fill-black" />
                  <span>COMPRAR AGORA (FINALIZAR PEDIDO)</span>
                </button>

                {/* CTA Secundário (Apoio elegante para continuar navegando) */}
                <button
                  onClick={() => {
                    onAddToCart(product, selectedColor, selectedSize, quantity);
                    onClose();
                  }}
                  className="w-full bg-[#161616] hover:bg-[#202020] border border-[#333] hover:border-[#c5a880] text-neutral-200 font-semibold text-xs tracking-widest uppercase py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={16} className="text-[#c5a880]" />
                  <span>Adicionar à Sacola e Continuar Olhando</span>
                </button>

                {/* Micro-garantias de confiança */}
                <div className="flex items-center justify-center space-x-4 pt-1 text-[11px] text-neutral-400">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Compra 100% Segura</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Truck size={13} className="text-[#c5a880]" />
                    <span>Envio para todo o Brasil</span>
                  </span>
                </div>
              </div>

              {/* Shipping Simulator (Item 6: Polimento e Transparência de Prazos) */}
              <div className="pt-4 border-t border-[#222]">
                <form onSubmit={handleSimulateShipping} className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider uppercase text-neutral-300 flex items-center space-x-1.5">
                    <Truck size={14} className="text-[#c5a880]" />
                    <span>Calcular Frete e Prazo de Entrega</span>
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Digite seu CEP (ex: 01310-100)"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      maxLength={9}
                      className="flex-grow bg-[#161616] border border-[#2d2d2d] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                    />
                    <button
                      type="submit"
                      disabled={loadingShipping}
                      className="bg-[#242424] hover:bg-[#333] border border-[#3d3d3d] text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loadingShipping ? "Calculando..." : "Calcular"}
                    </button>
                  </div>
                </form>

                {shippingResult && (
                  <div className="mt-3 p-3 bg-[#171717] rounded-lg border border-[#262626] space-y-2 text-xs">
                    <span className="text-neutral-400 font-medium block">
                      Opções de entrega para {shippingResult.city}/{shippingResult.uf}:
                    </span>
                    {shippingResult.options.map((opt, i) => (
                      <div key={i} className="flex justify-between items-center text-neutral-200">
                        <span>{opt.name} ({opt.days})</span>
                        <span className="font-bold text-[#c5a880]">R$ {opt.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}

                    {/* Aviso transparente de prazo (Item 6) */}
                    <div className="pt-2 border-t border-[#242424] flex items-start space-x-1.5 text-[11px] text-[#a09a8e] leading-snug">
                      <Clock size={13} className="text-[#c5a880] shrink-0 mt-0.5" />
                      <span>O prazo de entrega começa a contar após a confirmação do pagamento. Postagem rápida em até 24h úteis com código de rastreamento enviado no seu WhatsApp.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordions (Description, Care, Fabric) */}
              <div className="pt-2 border-t border-[#222] space-y-2 text-xs">
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === "description" ? "" : "description")}
                    className="w-full flex justify-between items-center py-2 text-neutral-300 font-semibold uppercase tracking-wider text-[11px]"
                  >
                    <span>Descrição da Peça</span>
                    <ChevronDown size={14} className={`transition-transform ${openAccordion === "description" ? "rotate-180" : ""}`} />
                  </button>
                  {openAccordion === "description" && (
                    <p className="text-neutral-400 pb-2 leading-relaxed text-xs">
                      {product.description}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === "fabric" ? "" : "fabric")}
                    className="w-full flex justify-between items-center py-2 text-neutral-300 font-semibold uppercase tracking-wider text-[11px] border-t border-[#1f1f1f]"
                  >
                    <span>Composição & Cuidados</span>
                    <ChevronDown size={14} className={`transition-transform ${openAccordion === "fabric" ? "rotate-180" : ""}`} />
                  </button>
                  {openAccordion === "fabric" && (
                    <div className="text-neutral-400 pb-2 space-y-1">
                      <p><strong className="text-neutral-300">Tecido:</strong> {product.fabric}</p>
                      <p><strong className="text-neutral-300">Cuidados:</strong> {product.care}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
