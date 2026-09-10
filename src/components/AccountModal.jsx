import React, { useState, useEffect } from 'react';
import { X, User, MapPin, Phone, ShoppingBag, Clock, Check, LogOut, Heart } from 'lucide-react';

export default function AccountModal({
  isOpen,
  onClose,
  customerProfile,
  onSaveProfile,
  onClearProfile,
  orderHistory = [],
  favoritesCount = 0,
  onOpenFavorites
}) {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(!customerProfile?.name);
  const [formData, setFormData] = useState({
    name: customerProfile?.name || "",
    phone: customerProfile?.phone || "",
    cep: customerProfile?.cep || "",
    address: customerProfile?.address || "",
    number: customerProfile?.number || "",
    complement: customerProfile?.complement || "",
    neighborhood: customerProfile?.neighborhood || "",
    city: customerProfile?.city || "São Paulo",
    state: customerProfile?.state || "SP"
  });

  useEffect(() => {
    if (customerProfile?.name) {
      setFormData(customerProfile);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [customerProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsEditing(false);
  };

  const handleAutoFillAddress = async (cepInput) => {
    const cleanCep = cepInput.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro || prev.address,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.localidade || prev.city,
            state: data.uf || prev.state
          }));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-[#262626] text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-[#222] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User size={20} className="text-[#c5a880]" />
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">MINHA CONTA</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-[#1f1f1f]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Boas-vindas ou Identificação */}
            {customerProfile?.name && !isEditing ? (
              <div className="bg-[#181512] p-4 rounded-xl border border-[#3b3223] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#c5a880] font-semibold">Cliente Lôlo's</span>
                    <h3 className="text-base font-serif font-bold text-white">Olá, {customerProfile.name}! 💕</h3>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-[#c5a880] hover:underline"
                  >
                    Editar dados
                  </button>
                </div>

                <div className="text-xs text-neutral-300 space-y-1 pt-1 border-t border-[#292319]">
                  <p className="flex items-center space-x-2">
                    <Phone size={13} className="text-[#c5a880]" />
                    <span>{customerProfile.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <MapPin size={13} className="text-[#c5a880]" />
                    <span>{customerProfile.address}, {customerProfile.number} - {customerProfile.city}/{customerProfile.state}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {customerProfile?.name ? "Editar Meus Dados" : "Identifique-se para Compras Rápidas"}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Sem senhas chatas! Seus dados ficam salvos no seu aparelho para agilizar o checkout nas próximas compras.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="text-neutral-400 block mb-1">Seu Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">WhatsApp / Celular *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-neutral-400 block mb-1">CEP</label>
                      <input
                        type="text"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={(e) => {
                          setFormData({ ...formData, cep: e.target.value });
                          handleAutoFillAddress(e.target.value);
                        }}
                        className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-neutral-400 block mb-1">Endereço</label>
                      <input
                        type="text"
                        placeholder="Rua / Avenida"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-neutral-400 block mb-1">Número</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Cidade / UF</label>
                      <input
                        type="text"
                        placeholder="São Paulo/SP"
                        value={`${formData.city}/${formData.state}`}
                        onChange={(e) => {
                          const [city, state] = e.target.value.split('/');
                          setFormData({ ...formData, city: city || "", state: state || "SP" });
                        }}
                        className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#c5a880] hover:bg-[#d6ba94] text-black font-bold py-2.5 rounded-lg transition-colors uppercase tracking-wider text-xs"
                    >
                      Salvar Meus Dados
                    </button>
                    {customerProfile?.name && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-2.5 bg-[#222] text-neutral-300 rounded-lg hover:bg-[#2c2c2c]"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Acesso rápido aos favoritos */}
            <div
              onClick={() => {
                onClose();
                onOpenFavorites();
              }}
              className="p-3.5 bg-[#171717] border border-[#262626] rounded-xl flex items-center justify-between cursor-pointer hover:border-[#3d3d3d] transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Heart size={18} className="text-rose-500" />
                <span className="text-xs font-semibold text-neutral-200">Meus Favoritos Salvos</span>
              </div>
              <span className="text-xs font-bold text-[#c5a880] bg-[#221e16] px-2.5 py-0.5 rounded-full border border-[#3b3223]">
                {favoritesCount}
              </span>
            </div>

            {/* Histórico dos Pedidos */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-300 flex items-center space-x-1.5">
                <Clock size={15} className="text-[#c5a880]" />
                <span>Meus Pedidos Recentes ({orderHistory.length})</span>
              </h4>

              {orderHistory.length === 0 ? (
                <div className="text-center py-6 bg-[#161616] rounded-xl border border-[#242424] text-xs text-neutral-400">
                  <ShoppingBag size={28} className="mx-auto text-neutral-600 mb-2 stroke-1" />
                  <p>Você ainda não realizou pedidos neste dispositivo.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderHistory.map((order, idx) => (
                    <div
                      key={idx}
                      className="bg-[#181818] border border-[#282828] p-3.5 rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-center text-neutral-400 text-[11px]">
                        <span>{new Date(order.date).toLocaleDateString('pt-BR')} às {new Date(order.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-emerald-400 font-semibold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                          {order.paymentMethod === 'pix' ? 'Pix Confirmado' : 'Enviado no WhatsApp'}
                        </span>
                      </div>

                      <div className="space-y-1 pt-1 border-t border-[#242424]">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-neutral-300">
                            <span className="truncate max-w-[200px]">{item.quantity}x {item.name}</span>
                            <span className="text-neutral-400">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#242424] flex justify-between font-bold text-white">
                        <span>Total:</span>
                        <span className="text-[#c5a880]">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Limpar dados */}
            {customerProfile?.name && (
              <div className="pt-4 border-t border-[#222]">
                <button
                  onClick={() => {
                    if (confirm("Deseja realmente desconectar e limpar os dados salvos deste navegador?")) {
                      onClearProfile();
                      setIsEditing(true);
                    }
                  }}
                  className="w-full text-xs text-neutral-500 hover:text-rose-400 flex items-center justify-center space-x-1.5 py-2 transition-colors"
                >
                  <LogOut size={13} />
                  <span>Esquecer meus dados deste aparelho</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
