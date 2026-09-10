import React, { useState, useEffect, useMemo } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import StoriesBar from './components/StoriesBar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AccountModal from './components/AccountModal';
import BottomNav from './components/BottomNav';
import PoliciesModal from './components/PoliciesModal';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { initialProducts, categories } from './data/products';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Persistence state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('lolos_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lolos_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('lolos_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [customerProfile, setCustomerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('lolos_customer_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('lolos_order_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [storePhone, setStorePhone] = useState(() => {
    return "5521972310968";
  });

  // UI state
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalInitialColor, setModalInitialColor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [policiesTab, setPoliciesTab] = useState("trocas");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [sortBy, setSortBy] = useState("destaques");

  // Save to localStorage (Safe with try/catch)
  useEffect(() => {
    try {
      localStorage.setItem('lolos_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('lolos_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('lolos_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      if (customerProfile) {
        localStorage.setItem('lolos_customer_profile', JSON.stringify(customerProfile));
      } else {
        localStorage.removeItem('lolos_customer_profile');
      }
    } catch (e) {}
  }, [customerProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('lolos_order_history', JSON.stringify(orderHistory));
    } catch (e) {}
  }, [orderHistory]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedColor,
            selectedSize,
            quantity
          }
        ];
      }
    });

    setIsCartOpen(true);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    } catch (e) {}
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
    } else {
      setCart((prev) => {
        const next = [...prev];
        next[index].quantity = newQuantity;
        return next;
      });
    }
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = (code) => {
    if (code === "BEMVINDA10") {
      setAppliedCoupon(code);
      const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
      setDiscount(subtotal * 0.1);
      alert("Cupom de 10% OFF aplicado com sucesso! 🎉");
    } else if (code === "LOLO15") {
      setAppliedCoupon(code);
      const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
      setDiscount(subtotal * 0.15);
      alert("Cupom VIP de 15% OFF aplicado! ✨");
    } else {
      alert("Cupom inválido ou expirado.");
    }
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.isAvailable);

    if (activeCategory === "Lançamentos") {
      list = list.filter((p) => p.badge?.includes("NOVO") || p.badge?.includes("TENDÊNCIA") || p.badge?.includes("MAIS VENDIDO"));
    } else if (activeCategory !== "Todos") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (sortBy === "menor-preco") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "maior-preco") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, activeCategory, searchTerm, sortBy]);

  const handleOpenModal = (product, color) => {
    setSelectedProduct(product);
    setModalInitialColor(color || product.colors[0]?.name);
    setIsModalOpen(true);
  };

  const handleBuyNowWhatsApp = (product, color, size, qty) => {
    addToCart(product, color, size, qty);
    setIsModalOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f5f5] flex flex-col justify-between">
      
      {/* Top Banner & Header */}
      <div>
        <AnnouncementBar />
        <Navbar
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          favoritesCount={favorites.length}
          onOpenFavorites={() => {
            if (favorites.length === 0) {
              alert("Você ainda não tem peças salvas nos favoritos. Clique no coração de qualquer peça para salvar!");
            } else {
              alert(`Você tem ${favorites.length} peça(s) favorita(s)!`);
            }
          }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          onOpenAccount={() => setIsAccountOpen(true)}
          customerProfile={customerProfile}
        />
        <StoriesBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onOpenPolicies={(tab) => {
            setPoliciesTab(tab);
            setIsPoliciesOpen(true);
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {activeCategory === "Todos" && !searchTerm && (
          <HeroBanner
            onExplore={() => {
              const el = document.getElementById("catalogo");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        )}

        {/* Catalog Section */}
        <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#222] pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#c5a880] text-xs uppercase tracking-widest font-semibold mb-1">
                <Sparkles size={14} />
                <span>Boutique de Peças Exclusivas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {activeCategory === "Todos" ? "Todas as Peças da Coleção" : activeCategory}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? "peça disponível" : "peças disponíveis"}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-neutral-400">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#181818] border border-[#2e2e2e] text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#c5a880]"
              >
                <option value="destaques">Mais Populares</option>
                <option value="menor-preco">Menor Preço</option>
                <option value="maior-preco">Maior Preço</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <p className="text-base text-neutral-400">Nenhuma peça encontrada para sua busca.</p>
              <button
                onClick={() => {
                  setActiveCategory("Todos");
                  setSearchTerm("");
                }}
                className="text-xs text-[#c5a880] hover:underline uppercase tracking-wider font-semibold"
              >
                Limpar filtros e ver tudo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={handleOpenModal}
                  onQuickAdd={(p, color, size) => addToCart(p, color, size, 1)}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

        </section>
      </main>
      <PoliciesModal
        isOpen={isPoliciesOpen}
        onClose={() => setIsPoliciesOpen(false)}
        initialTab={policiesTab}
        storePhone={storePhone}
      />

      {/* Footer */}
      <Footer storePhone={storePhone} />
      <WhatsAppFloatingButton phone={storePhone} />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenFavorites={() => {
          if (favorites.length === 0) {
            alert("Você ainda não tem peças favoritas salvas.");
          } else {
            alert(`Você tem ${favorites.length} peça(s) favorita(s)!`);
          }
        }}
        favoritesCount={favorites.length}
        onOpenAccount={() => setIsAccountOpen(true)}
        customerProfile={customerProfile}
      />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        initialColor={modalInitialColor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onBuyNowWhatsApp={handleBuyNowWhatsApp}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        discount={discount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        total={cart.reduce((s, i) => s + i.price * i.quantity, 0)}
        discount={discount}
        appliedCoupon={appliedCoupon}
        storePhone={storePhone}
        customerProfile={customerProfile}
        onSaveProfile={(profile) => setCustomerProfile(profile)}
        onOrderCompleted={(order) => {
          setOrderHistory((prev) => [order, ...prev]);
          setCart([]);
          setDiscount(0);
          setAppliedCoupon("");
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        customerProfile={customerProfile}
        onSaveProfile={(profile) => {
          setCustomerProfile(profile);
          alert("Seus dados foram salvos com sucesso!");
        }}
        onClearProfile={() => {
          setCustomerProfile(null);
          alert("Seus dados foram removidos deste aparelho.");
        }}
        orderHistory={orderHistory}
        favoritesCount={favorites.length}
        onOpenFavorites={() => {
          alert(`Você tem ${favorites.length} peça(s) favorita(s)!`);
        }}
      />

    </div>
  );
}
