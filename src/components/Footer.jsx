import React from 'react';
import { MessageCircle, ShieldCheck, CreditCard, Lock, Clock, MapPin, Truck } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer({ storePhone }) {
  return (
    <footer className="bg-[#080808] border-t border-[#1c1c1c] text-neutral-400 text-xs pt-16 pb-40 lg:pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1f1f1f]">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-xl font-serif font-bold tracking-[0.2em] text-white">
              LÔLO'S CLOSET
            </span>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Moda feminina com sofisticação, recortes exclusivos, rendas delicadas e modelagens perfeitas que valorizam cada curva.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.instagram.com/loloscloset.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#161616] hover:bg-[#c5a880] hover:text-black rounded-full transition-colors"
                title="Instagram Oficial"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={`https://wa.me/${(storePhone || "5521972310968").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#161616] hover:bg-[#4ade80] hover:text-black rounded-full transition-colors"
                title="WhatsApp de Atendimento"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Departamentos</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#catalogo" className="hover:text-[#c5a880] transition-colors">Conjuntos Renda</a></li>
              <li><a href="#catalogo" className="hover:text-[#c5a880] transition-colors">Vestidos e Tubinhos</a></li>
              <li><a href="#catalogo" className="hover:text-[#c5a880] transition-colors">Corsets e Tops</a></li>
              <li><a href="#catalogo" className="hover:text-[#c5a880] transition-colors">Calças e Cargo Jeans</a></li>
              <li><a href="#catalogo" className="hover:text-[#c5a880] transition-colors">Novidades & Tendências</a></li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atendimento & Prazos</h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center space-x-2">
                <Clock size={13} className="text-[#c5a880] shrink-0" />
                <span>Terça a Sábado: 09:30 às 20:00 (Dom e Seg fechado)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#c5a880]">✉️</span>
                <a href="mailto:Loloscloset.com.br01@gmail.com" className="hover:text-[#c5a880] transition-colors">Loloscloset.com.br01@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <Truck size={13} className="text-[#c5a880] shrink-0" />
                <span>Postagem em até 2 dias úteis após pagamento</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck size={13} className="text-[#c5a880] shrink-0" />
                <span>Troca garantida em até 7 dias corridos</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={13} className="text-[#c5a880] shrink-0" />
                <span>Motoboy RJ (ZN/ZO Taxa Fixa R$ 15) • Envio Brasil</span>
              </li>
            </ul>
          </div>

          {/* Security & Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Segurança & Pagamentos</h4>
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2 text-neutral-300">
                <Lock size={15} className="text-[#c5a880]" />
                <span>Navegação Segura com Criptografia SSL</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <ShieldCheck size={15} className="text-[#c5a880]" />
                <span>Compra 100% Protegida & Garantida</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <CreditCard size={15} className="text-[#c5a880]" />
                <span>Pix Instantâneo ou Cartão em até 6x</span>
              </div>
            </div>
          </div>

        </div>

        {/* Rodapé com espaçamento extra para mobile */}
        <div className="pt-8 pb-8 lg:pb-0 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[11px] space-y-3 sm:space-y-0">
          <p>© 2026 Lôlo's Closet. Todos os direitos reservados.</p>
          <p className="tracking-widest uppercase">Boutique Oficial de Moda Feminina</p>
        </div>

      </div>
    </footer>
  );
}
