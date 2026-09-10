import React from 'react';
import { X, RefreshCw, Truck, Clock, MapPin, CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function PoliciesModal({ isOpen, onClose, initialTab = "trocas", storePhone = "5521972310968" }) {
  if (!isOpen) return null;

  const [tab, setTab] = React.useState(initialTab);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#13110f] border border-[#3b3225] rounded-2xl overflow-hidden shadow-2xl text-white my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-[#26211a] flex items-center justify-between bg-[#191512]">
          <div>
            <span className="text-[10px] tracking-widest uppercase text-[#c5a880] font-semibold">Lôlo's Closet Oficial</span>
            <h3 className="text-base font-serif font-bold text-white">Informações & Políticas da Loja</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-[#26221c]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 border-b border-[#26211a] bg-[#110f0d] text-xs">
          <button
            onClick={() => setTab("trocas")}
            className={`py-3 px-2 font-medium tracking-wider uppercase transition-colors border-b-2 flex items-center justify-center space-x-1.5 ${
              tab === "trocas"
                ? "border-[#c5a880] text-[#c5a880] bg-[#1b1713]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <RefreshCw size={14} />
            <span>Sobre Trocas</span>
          </button>

          <button
            onClick={() => setTab("envios")}
            className={`py-3 px-2 font-medium tracking-wider uppercase transition-colors border-b-2 flex items-center justify-center space-x-1.5 ${
              tab === "envios"
                ? "border-[#c5a880] text-[#c5a880] bg-[#1b1713]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Truck size={14} />
            <span>Formas de Envio</span>
          </button>

          <button
            onClick={() => setTab("horarios")}
            className={`py-3 px-2 font-medium tracking-wider uppercase transition-colors border-b-2 flex items-center justify-center space-x-1.5 ${
              tab === "horarios"
                ? "border-[#c5a880] text-[#c5a880] bg-[#1b1713]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Clock size={14} />
            <span>Horários & Local</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: TROCAS */}
          {tab === "trocas" && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h4 className="text-lg font-serif font-bold text-white">SOBRE TROCAS</h4>
                <p className="text-xs text-neutral-400">Processo simples e garantido pelo Código do Consumidor</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl flex space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#eae5d9]">PRAZO PARA TROCA</h5>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      Você tem até <strong className="text-[#c5a880]">7 dias corridos</strong> após o recebimento do seu pedido para solicitar a troca da sua peça.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl flex space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#eae5d9]">CONDIÇÕES DAS PEÇAS</h5>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      As peças devem estar <strong>sem uso</strong>, com a <strong>etiqueta fixada</strong> e na <strong>embalagem original</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl flex space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#eae5d9]">COMO SOLICITAR</h5>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      Entre em contato conosco pelo nosso canal de atendimento no WhatsApp informando o número do pedido e o motivo da troca.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl flex space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    04
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#eae5d9]">PRAZO DE ENVIO DA TROCA</h5>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      Após a aprovação da troca, o envio da nova peça ou reembolso será realizado em até <strong className="text-[#c5a880]">5 dias úteis</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENVIOS */}
          {tab === "envios" && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h4 className="text-lg font-serif font-bold text-white">FORMAS DE ENVIO</h4>
                <p className="text-xs text-neutral-400">Entregamos com agilidade em todo o Brasil e Rio de Janeiro</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-[#c5a880]">
                    <Truck size={18} />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">VIA MOTOBOY (RIO DE JANEIRO)</h5>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Nossos envios para a <strong className="text-[#c5a880]">Zona Norte e Zona Oeste têm taxa fixa de apenas R$ 15,00</strong>. Para outras regiões e zonas, consulte valores no WhatsApp.
                  </p>
                </div>

                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-[#c5a880]">
                    <Package size={18} />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">VIA CORREIOS (TODO O BRASIL)</h5>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Enviamos para todo o Brasil via SEDEX ou PAC. O valor e o prazo variam conforme a região informada no seu CEP.
                  </p>
                </div>

                <div className="p-4 bg-[#211b15] border border-[#443828] rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-[#c5a880]">
                    <Clock size={18} />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">PRAZO DE POSTAGEM</h5>
                  </div>
                  <p className="text-xs text-neutral-200 leading-relaxed">
                    Nosso prazo de postagem e envio é de <strong className="text-[#c5a880]">2 dias úteis após a confirmação do pagamento</strong> do pedido.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HORÁRIOS & LOCAL */}
          {tab === "horarios" && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h4 className="text-lg font-serif font-bold text-white">ENDEREÇO E HORÁRIO</h4>
                <p className="text-xs text-neutral-400">Atendimento ao cliente e funcionamento oficial</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-[#c5a880]">
                    <MapPin size={18} />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">ENDEREÇO</h5>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Loja Online com Envios Diretos • Rio de Janeiro / Brasil.  
                    <span className="block text-neutral-500 mt-1 italic">Espaço físico: em breve atualização oficial!</span>
                  </p>
                </div>

                <div className="p-4 bg-[#1a1714] border border-[#2e261d] rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-[#c5a880]">
                    <Clock size={18} />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">HORÁRIO DE ATENDIMENTO</h5>
                  </div>
                  <div className="text-xs text-neutral-300 space-y-1">
                    <p><strong className="text-white">Terça a Sábado:</strong> 09:30 às 20:00</p>
                    <p><strong className="text-neutral-400">Domingo e Segunda:</strong> Não abrimos</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action */}
        <div className="p-4 bg-[#161310] border-t border-[#26211a] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-neutral-400">Ficou com alguma dúvida específica?</span>
          <a
            href={`https://wa.me/${storePhone.replace(/\D/g, "")}?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20sobre%20trocas%20ou%20envios%20💕`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#c5a880] hover:bg-[#d6ba94] text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors text-center"
          >
            Falar no WhatsApp Oficial
          </a>
        </div>

      </div>
    </div>
  );
}
