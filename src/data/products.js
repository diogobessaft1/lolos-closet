export const initialProducts = [
  {
    id: "conjunto-saint-tropez",
    name: "CONJUNTO SAINT TROPEZ RENDA",
    category: "Conjuntos",
    price: 179.99,
    originalPrice: 219.90,
    badge: "MAIS VENDIDO",
    sizes: ["ÚNICO (36 ao 42)"],
    colors: [
      { name: "Off White", hex: "#F8F6F0", bgClass: "bg-[#F8F6F0]" },
      { name: "Rosa", hex: "#F48FB1", bgClass: "bg-[#F48FB1]" },
      { name: "Amarelo", hex: "#FFF59D", bgClass: "bg-[#FFF59D]" },
      { name: "Preto", hex: "#111111", bgClass: "bg-[#111111]" }
    ],
    images: [
      "/produtos/saint-tropez/foto-1.jpeg",
      "/produtos/saint-tropez/foto-2.jpeg",
      "/produtos/saint-tropez/foto-3.jpeg"
    ],
    description: "Conjunto exclusivo em renda delicada premium com babados fluídos nas mangas flare e saia com drapeado ajustável. Perfeito para festas, baladas, sunsets e ocasiões especiais. Possui forro confortável e modelagem que valoriza a silhueta.",
    fabric: "Renda Especial com Elastano e Forro de Toque Sedoso",
    care: "Lavar à mão em água fria. Não usar alvejante. Secar à sombra.",
    stock: 7,
    isAvailable: true
  },
  {
    id: "conjunto-sicilia",
    name: "CONJUNTO SICÍLIA RENDA",
    category: "Conjuntos",
    price: 179.99,
    originalPrice: 229.90,
    badge: "TENDÊNCIA",
    sizes: ["ÚNICO (36 ao 42)"],
    colors: [
      { name: "Preto Renda Premium", hex: "#000000", bgClass: "bg-black" },
      { name: "Preto Texturizado", hex: "#1A1A1A", bgClass: "bg-[#1A1A1A]" },
      { name: "Off White", hex: "#FAF8F5", bgClass: "bg-[#FAF8F5]" },
      { name: "Rosa", hex: "#F06292", bgClass: "bg-[#F06292]" },
      { name: "Amarelo", hex: "#FFE082", bgClass: "bg-[#FFE082]" },
      { name: "Marrom", hex: "#6D4C41", bgClass: "bg-[#6D4C41]" }
    ],
    images: [
      "/produtos/sicilia/foto-1.jpeg",
      "/produtos/sicilia/foto-2.jpeg",
      "/produtos/sicilia/foto-3.jpeg",
      "/produtos/sicilia/foto-4.jpeg",
      "/produtos/sicilia/foto-5.jpeg",
      "/produtos/sicilia/foto-6.jpeg",
      "/produtos/sicilia/foto-7.jpeg",
      "/produtos/sicilia/foto-8.jpeg"
    ],
    description: "O queridinho da coleção! Top tomara que caia estruturado com barbatana e saia cintura alta com drapeados laterais. Tecido texturizado premium que abraça as curvas com total sustentação e elegância.",
    fabric: "Poliamida com Textura Acetinada e Elastano de Alta Compressão",
    care: "Lavar delicadamente. Não passar ferro quente sobre a textura.",
    stock: 12,
    isAvailable: true
  },
  {
    id: "dress-loren",
    name: "DRESS LOREN PREMIUM",
    category: "Vestidos",
    price: 169.99,
    originalPrice: 199.90,
    badge: "EXCLUSIVO",
    sizes: ["ÚNICO (36 ao 42)"],
    colors: [
      { name: "Rosa Candy", hex: "#F8BBD0", bgClass: "bg-[#F8BBD0]" },
      { name: "Preto", hex: "#111111", bgClass: "bg-[#111111]" },
      { name: "Vermelho", hex: "#C62828", bgClass: "bg-[#C62828]" },
      { name: "Off White", hex: "#FAF9F6", bgClass: "bg-[#FAF9F6]" }
    ],
    images: [
      "/produtos/loren/foto-1.jpeg",
      "/produtos/loren/foto-2.jpeg",
      "/produtos/loren/foto-3.jpeg",
      "/produtos/loren/foto-4.jpeg",
      "/produtos/loren/foto-5.jpeg"
    ],
    description: "Vestido curto tubinho em poliamida ultra macia com detalhe barra em renda chantilly e amarração ajustável nas laterais para você regular o comprimento exato desejado.",
    fabric: "Poliamida Premium com Tecnologia Confort Modeladora",
    care: "Lavagem manual recomendada. Secagem natural em varal à sombra.",
    stock: 9,
    isAvailable: true
  },
  {
    id: "corset-popstar",
    name: "CORSET POPSTAR",
    category: "Tops & Corsets",
    price: 64.99,
    originalPrice: 89.90,
    badge: "HIT DO MOMENTO",
    sizes: ["ÚNICO (36 ao 42)"],
    colors: [
      { name: "Preto", hex: "#111111", bgClass: "bg-[#111111]" },
      { name: "Off White", hex: "#F5F5F0", bgClass: "bg-[#F5F5F0]" }
    ],
    images: [
      "/produtos/corset-popstar/foto-1.jpeg",
      "/produtos/corset-popstar/foto-2.jpeg",
      "/produtos/corset-popstar/foto-3.jpeg"
    ],
    description: "Corset frente única com decote V profundo e fecho frontal com ganchos reforçados estilo colete chic. Super versátil para compor desde looks casuais com jeans até produções de balada e festival.",
    fabric: "Poliamida com Estruturação Interna",
    care: "Lavar à mão. Não torcer. Secar na horizontal.",
    stock: 15,
    isAvailable: true
  },
  {
    id: "calca-cargo-black",
    name: "CALÇA JEANS ESPECIAL CARGO BLACK",
    category: "Jeans & Calças",
    price: 199.99,
    originalPrice: 249.90,
    badge: "MUST HAVE",
    sizes: ["34", "36", "38", "40", "42", "44"],
    colors: [
      { name: "Black Washed", hex: "#222222", bgClass: "bg-[#222222]" }
    ],
    images: [
      "/produtos/cargo-black/foto-1.jpeg",
      "/produtos/cargo-black/foto-2.jpeg"
    ],
    description: "Calça jeans estilo cargo baggy na cor preta estonada com bolsos utilitários amplos nas laterais. Caimento solto e despojado que fica perfeito com salto alto, bota ou tênis.",
    fabric: "Jeans 100% Algodão Premium de Alta Gramatura",
    care: "Lavar pelo avesso para preservar o tom estonado.",
    stock: 8,
    isAvailable: true
  },
  {
    id: "bermuda-cargo-animal-print",
    name: "BERMUDA JEANS CARGO LEOPARD & TOP",
    category: "Jeans & Calças",
    price: 159.99,
    originalPrice: 189.90,
    badge: "NOVA COLEÇÃO",
    sizes: ["36", "38", "40", "42"],
    colors: [
      { name: "Animal Print Oncinha", hex: "#A67C52", bgClass: "bg-[#A67C52]" }
    ],
    images: [
      "/produtos/animal-print/foto-1.jpeg",
      "/produtos/animal-print/foto-2.jpeg"
    ],
    description: "Bermudão jeans de cintura média/baixa com estampa animal print leopardo tendência internacional. Barra desfiada com acabamento industrial e bolsos utilitários.",
    fabric: "Sarja Jeans Estonada com Estampa Digital Exclusiva",
    care: "Lavar em temperatura ambiente. Secar à sombra.",
    stock: 6,
    isAvailable: true
  }
];

export const categories = [
  "Todos",
  "Lançamentos",
  "Conjuntos",
  "Vestidos",
  "Tops & Corsets",
  "Jeans & Calças"
];
