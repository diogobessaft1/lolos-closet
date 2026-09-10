import React, { useState, useEffect } from 'react';
import { X, Check, MessageCircle, QrCode, Copy, ArrowLeft, Sparkles } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  discount,
  appliedCoupon,
  storePhone,
  customerProfile,
  onSaveProfile,
  onOrderCompleted
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [saveDataPreference, setSaveDataPreference] = useState(true);
  const [customer, setCustomer] = useState({
    name: customerProfile?.name || "",
    phone: customerProfile?.phone || "",
    cpf: customerProfile?.cpf || "",
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
      setCustomer((prev) => ({
        ...prev,
        ...customerProfile
      }));
    }
  }, [customerProfile]);

  const [shippingType, setShippingType] = useState("SEDEX Express");
  const [shippingCost, setShippingCost] = useState(total >= 299 ? 0 : 15.00);
  const [paymentMethod, setPaymentMethod] = useState("whatsapp");
  const [copiedPix, setCopiedPix] = useState(false);

  const finalTotal = total + (total >= 299 ? 0 : shippingCost);
  const pixKey = "(21) 97231-0968";
  const pixCode = "00020126580014br.gov.bcb.pix0114+55219723109685204000053039865405" + finalTotal.toFixed(2) + "5802BR5913LOLOS CLOSET6009SAO PAULO62070503***6304E8F2";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleFinishWhatsApp = () => {
    if (saveDataPreference) {
      onSaveProfile(customer);
    }

    const link = generateWhatsAppLink({
      phone: storePhone || "5521972310968",
      customer,
      items,
      total: finalTotal,
      shipping: { type: shippingType, cost: total >= 299 ? 0 : shippingCost },
      discount,
      coupon: appliedCoupon,
      paymentMethod
    });

    onOrderCompleted({
      customer,
      items,
      total: finalTotal,
      paymentMethod,
      date: new Date().toISOString()
    });

    window.open(link, "_blank");
    onClose();
  };

  const handleAutoFillAddress = async (cepInput) => {
    const cleanCep = cepInput.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setCustomer((prev) => ({
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#111111] border border-[#2b261e] rounded-2xl overflow-hidden shadow-2xl text-white my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="mr-2 p-1 text-neutral-400 hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">
              {step === 1 ? "1. DADOS DE ENTREGA" : "2. FORMA DE FECHAMENTO"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-[#1f1f1f]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {customerProfile?.name && step === 1 && (
            <div className="mb-4 p-3 bg-[#1c1914] border border-[#3b3323] rounded-xl flex items-center justify-between text-xs">
              <span className="text-neutral-300 flex items-center space-x-1.5">
                <Sparkles size={14} className="text-[#c5a880]" />
                <span>Bem-vinda de volta, <strong>{customerProfile.name}</strong>! Seus dados foram preenchidos.</span>
              </span>
            </div>
          )}

          {step === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">WhatsApp / Celular *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">CEP *</label>
                  <input
                    type="text"
                    required
                    placeholder="00000-000"
                    value={customer.cep}
                    onChange={(e) => {
                      setCustomer({ ...customer, cep: e.target.value });
                      handleAutoFillAddress(e.target.value);
                    }}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-400 block mb-1">Rua / Endereço *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Av. Paulista"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Número *</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={customer.number}
                    onChange={(e) => setCustomer({ ...customer, number: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Complemento</label>
                  <input
                    type="text"
                    placeholder="Apto 42"
                    value={customer.complement}
                    onChange={(e) => setCustomer({ ...customer, complement: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Bairro *</label>
                  <input
                    type="text"
                    required
                    placeholder="Centro"
                    value={customer.neighborhood}
                    onChange={(e) => setCustomer({ ...customer, neighborhood: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Cidade / UF *</label>
                  <input
                    type="text"
                    required
                    placeholder="São Paulo/SP"
                    value={`${customer.city}/${customer.state}`}
                    onChange={(e) => {
                      const [city, state] = e.target.value.split('/');
                      setCustomer({ ...customer, city: city || "", state: state || "SP" });
                    }}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Checkbox salvar dados no aparelho */}
              <div className="pt-2">
                <label className="flex items-center space-x-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveDataPreference}
                    onChange={(e) => setSaveDataPreference(e.target.checked)}
                    className="rounded border-[#333] text-[#c5a880] focus:ring-[#c5a880] bg-[#1a1a1a]"
                  />
                  <span>Lembrar meus dados para compras futuras neste dispositivo (sem senha)</span>
                </label>
              </div>

              {/* Shipping selection */}
              <div className="pt-2">
                <label className="text-xs text-neutral-400 block mb-2 font-medium">Método de Envio</label>
                <div className="mb-2 flex items-center space-x-1.5 text-[11px] text-[#a09a8e]">
                    <span>ℹ️ Postagem em até 2 dias úteis após a confirmação do pagamento (conforme política oficial da loja).</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => {
                      setShippingType("Motoboy RJ (ZN / ZO)");
                      setShippingCost(total >= 299 ? 0 : 15.00);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center ${
                      shippingType.includes("Motoboy")
                        ? "border-[#c5a880] bg-[#1d1914]"
                        : "border-[#262626] bg-[#161616]"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">Motoboy RJ</p>
                      <p className="text-[10px] text-neutral-400">Zona Norte / Zona Oeste</p>
                    </div>
                    <span className="text-xs font-bold text-[#c5a880]">
                      {total >= 299 ? "GRÁTIS" : "R$ 15,00"}
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      setShippingType("SEDEX Express");
                      setShippingCost(total >= 299 ? 0 : 18.00);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center ${
                      shippingType === "SEDEX Express"
                        ? "border-[#c5a880] bg-[#1d1914]"
                        : "border-[#262626] bg-[#161616]"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">SEDEX Express (1 a 3 dias)</p>
                      <p className="text-[11px] text-neutral-400">Mais rápido</p>
                    </div>
                    <span className="text-xs font-bold text-[#c5a880]">
                      {total >= 299 ? "GRÁTIS" : "R$ 15,00"}
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      setShippingType("PAC Econômico");
                      setShippingCost(total >= 299 ? 0 : 9.90);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center ${
                      shippingType === "PAC Econômico"
                        ? "border-[#c5a880] bg-[#1d1914]"
                        : "border-[#262626] bg-[#161616]"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">PAC Econômico (4 a 7 dias)</p>
                      <p className="text-[11px] text-neutral-400">Entrega padrão</p>
                    </div>
                    <span className="text-xs font-bold text-[#c5a880]">
                      {total >= 299 ? "GRÁTIS" : "R$ 9,90"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#c5a880] hover:bg-[#d6ba94] text-black font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all"
                >
                  IR PARA O PAGAMENTO
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("whatsapp")}
                  className={`p-4 rounded-xl border flex flex-col items-center space-y-2 text-center transition-all ${
                    paymentMethod === "whatsapp"
                      ? "border-[#4ade80] bg-[#142618]"
                      : "border-[#2a2a2a] bg-[#161616] text-neutral-400"
                  }`}
                >
                  <MessageCircle size={24} className="text-[#4ade80]" />
                  <span className="text-xs font-bold text-white">Finalizar via WhatsApp</span>
                  <span className="text-[10px] text-neutral-400">Envia o pedido pronto no Zap da dona</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={`p-4 rounded-xl border flex flex-col items-center space-y-2 text-center transition-all ${
                    paymentMethod === "pix"
                      ? "border-[#c5a880] bg-[#221e16]"
                      : "border-[#2a2a2a] bg-[#161616] text-neutral-400"
                  }`}
                >
                  <QrCode size={24} className="text-[#c5a880]" />
                  <span className="text-xs font-bold text-white">Pagar com Pix Direto</span>
                  <span className="text-[10px] text-neutral-400">QR Code e Copia e Cola imediato</span>
                </button>
              </div>

              {paymentMethod === "pix" && (
                <div className="bg-[#181818] p-4 rounded-xl border border-[#2e2e2e] space-y-4 text-center">
                  <div className="p-3 bg-white inline-block rounded-xl mx-auto shadow-lg">
                    <div className="w-36 h-36 bg-neutral-900 flex items-center justify-center text-white text-xs font-mono p-2 text-center">
                      <QrCode size={110} className="text-black" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-400 block mb-1">Chave Pix da Loja (E-mail):</span>
                    <span className="text-xs font-bold text-[#c5a880] select-all bg-[#121212] px-3 py-1 rounded border border-[#2b2b2b]">
                      {pixKey}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyPix}
                    className="inline-flex items-center space-x-2 bg-[#252525] hover:bg-[#333] border border-[#3d3d3d] text-xs font-semibold px-4 py-2 rounded-lg text-white transition-colors"
                  >
                    {copiedPix ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedPix ? "Código Pix Copiado!" : "Copiar Código Pix (Copia e Cola)"}</span>
                  </button>
                </div>
              )}

              <div className="bg-[#161616] p-4 rounded-xl border border-[#262626] space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Itens ({items.length})</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Frete ({shippingType})</span>
                  <span>{total >= 299 ? "GRÁTIS" : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#262626]">
                  <span>Total Final</span>
                  <span className="text-[#c5a880]">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                onClick={handleFinishWhatsApp}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl shadow-green-500/20 cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>CONFIRMAR E ENVIAR PEDIDO NO WHATSAPP</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
