import React, { useState } from 'react';
import { X, Settings, Phone, Check, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function AdminDrawer({
  isOpen,
  onClose,
  products,
  onUpdateProductPrice,
  onToggleProductAvailable,
  storePhone,
  onSaveStorePhone
}) {
  if (!isOpen) return null;

  const [phoneInput, setPhoneInput] = useState(storePhone || "5511999999999");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePhone = (e) => {
    e.preventDefault();
    onSaveStorePhone(phoneInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-[#262626] text-white flex flex-col justify-between p-6 shadow-2xl">
          
          <div className="space-y-6 overflow-y-auto pr-1">
            <div className="flex justify-between items-center border-b border-[#222] pb-4">
              <div className="flex items-center space-x-2">
                <Settings size={20} className="text-[#c5a880]" />
                <h3 className="text-sm font-bold tracking-wider uppercase text-white">Painel da Loja</h3>
              </div>
              <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Store WhatsApp Phone */}
            <form onSubmit={handleSavePhone} className="space-y-2 bg-[#181818] p-4 rounded-xl border border-[#2b2b2b]">
              <label className="text-xs font-semibold text-neutral-300 flex items-center space-x-1.5">
                <Phone size={14} className="text-[#c5a880]" />
                <span>WhatsApp que recebe os pedidos:</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="Ex: 5511999999999"
                  className="flex-grow bg-[#121212] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                />
                <button
                  type="submit"
                  className="bg-[#c5a880] text-black font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#d6ba94] transition-colors"
                >
                  Salvar
                </button>
              </div>
              {savedSuccess && (
                <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
                  <Check size={12} />
                  <span>Número salvo com sucesso!</span>
                </p>
              )}
            </form>

            {/* Quick Price & Stock Controls */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Catálogo Rápido (Preços e Pausar)
              </h4>
              <div className="space-y-2.5">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 bg-[#181818] border border-[#292929] rounded-xl text-xs"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-10 h-12 object-cover object-top rounded bg-black shrink-0"
                      />
                      <div className="truncate">
                        <span className="font-semibold text-white truncate block max-w-[150px]">{p.name}</span>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-neutral-400">R$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={p.price}
                            onChange={(e) => onUpdateProductPrice(p.id, parseFloat(e.target.value) || 0)}
                            className="w-20 bg-[#121212] border border-[#333] rounded px-1.5 py-0.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleProductAvailable(p.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        p.isAvailable
                          ? "border-emerald-800 bg-emerald-950/40 text-emerald-400"
                          : "border-rose-800 bg-rose-950/40 text-rose-400"
                      }`}
                      title={p.isAvailable ? "Disponível na loja" : "Pausado / Esgotado"}
                    >
                      {p.isAvailable ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-[#222] text-[11px] text-neutral-500 text-center">
            As alterações são salvas automaticamente no seu navegador.
          </div>

        </div>
      </div>
    </div>
  );
}
