// composables/useRestaurants.js
// Mock data — ready to swap for real API calls

const categories = [
  { id: 'all',       label: 'Todos',       emoji: '🍽️' },
  { id: 'burgers',   label: 'Burgers',     emoji: '🍔' },
  { id: 'pizza',     label: 'Pizza',       emoji: '🍕' },
  { id: 'sushi',     label: 'Sushi',       emoji: '🍣' },
  { id: 'tacos',     label: 'Tacos',       emoji: '🌮' },
  { id: 'healthy',   label: 'Saludable',   emoji: '🥗' },
  { id: 'desserts',  label: 'Postres',     emoji: '🍩' },
  { id: 'drinks',    label: 'Bebidas',     emoji: '🧃' },
]

const restaurants = [
  {
    id: 1,
    name: 'SMASH Burger Co.',
    category: 'burgers',
    rating: 4.9,
    reviews: 2341,
    deliveryTime: '15–25',
    deliveryFee: 0,
    minOrder: 8,
    tags: ['Gratis', 'Popular', '#1 Burgers'],
    heroColor: '#1a1a1a',
    coverEmoji: '🍔',
    description: 'Las mejores smash burgers de la ciudad. Carne fresca, queso americano derretido, pan brioche tostado.',
    menu: [
      {
        section: '🔥 Más Pedidos',
        items: [
          { id: 101, name: 'Classic Smash Burger', description: 'Doble carne, queso americano, pepinillo, cebolla, salsa secreta', price: 12.90, calories: 680, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', badge: 'Best Seller', popular: true },
          { id: 102, name: 'BBQ Bacon Smash', description: 'Doble carne, bacon crujiente, cheddar, BBQ smoky, aros de cebolla', price: 14.90, calories: 820, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80', badge: 'Nuevo', popular: false },
          { id: 103, name: 'Mushroom Swiss', description: 'Carne wagyu, hongos salteados, queso suizo, mayo trufa', price: 16.50, calories: 710, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', badge: null, popular: false },
        ]
      },
      {
        section: '🍟 Acompañamientos',
        items: [
          { id: 104, name: 'Smash Fries', description: 'Papas crocantes con pimentón y sal de mar', price: 5.50, calories: 380, image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80', badge: null, popular: true },
          { id: 105, name: 'Onion Rings', description: 'Aros de cebolla con panko y dip chipotle', price: 6.50, calories: 420, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80', badge: null, popular: false },
        ]
      },
      {
        section: '🥤 Bebidas',
        items: [
          { id: 106, name: 'Milkshake Vainilla', description: 'Helado artesanal, leche entera, vainilla de Madagascar', price: 7.90, calories: 520, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80', badge: null, popular: false },
          { id: 107, name: 'Limonada Fría', description: 'Limón natural, menta, agua mineral', price: 4.50, calories: 90, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80', badge: null, popular: false },
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Napoli Express',
    category: 'pizza',
    rating: 4.8,
    reviews: 1872,
    deliveryTime: '20–35',
    deliveryFee: 1.99,
    minOrder: 12,
    tags: ['Horno de Leña', 'Auténtica'],
    heroColor: '#b91c1c',
    coverEmoji: '🍕',
    description: 'Pizza napolitana auténtica con masa de 48h de fermentación, tomate San Marzano y mozzarella di bufala.',
    menu: [
      {
        section: '🍕 Pizzas Signature',
        items: [
          { id: 201, name: 'Margherita DOP', description: 'Tomate San Marzano, mozzarella di bufala, albahaca fresca, EVOO', price: 16.90, calories: 720, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', badge: 'Clásica', popular: true },
          { id: 202, name: 'Diavola Picante', description: 'Salame piccante, pimiento rojo, mozzarella, chile calabrese', price: 18.90, calories: 810, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', badge: '🌶️ Hot', popular: false },
          { id: 203, name: 'Tartufo Nero', description: 'Crema de trufa negra, funghi porcini, taleggio, parmigiano', price: 22.50, calories: 780, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', badge: 'Premium', popular: false },
          { id: 204, name: '4 Stagioni', description: 'Tomate, mozzarella, jamón, alcachofas, aceitunas, champiñones', price: 19.90, calories: 850, image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=400&q=80', badge: null, popular: false },
        ]
      },
      {
        section: '🥗 Antipasti',
        items: [
          { id: 205, name: 'Bruschetta Napoli', description: 'Pan ciabatta, tomate cherry, ajo, albahaca, aceite de oliva virgen', price: 8.50, calories: 290, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80', badge: null, popular: false },
          { id: 206, name: 'Burrata e Prosciutto', description: 'Burrata fresca, prosciutto di Parma 24 meses, rúcula, higos', price: 14.90, calories: 410, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80', badge: 'Must try', popular: false },
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Sakura Sushi Bar',
    category: 'sushi',
    rating: 4.9,
    reviews: 3104,
    deliveryTime: '25–40',
    deliveryFee: 2.50,
    minOrder: 20,
    tags: ['Omakase', 'Premium', 'Chef Japonés'],
    heroColor: '#be123c',
    coverEmoji: '🍣',
    description: 'Sushi de nivel omakase para tu casa. Ingredientes importados de Tsukiji. Chef con 20 años de experiencia en Tokio.',
    menu: [
      {
        section: '🍱 Combos Especiales',
        items: [
          { id: 301, name: 'Combo Sakura 16 pzs', description: 'Salmón, atún, pulpo, camarón — 8 nigiri + 8 maki california', price: 28.90, calories: 580, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80', badge: 'Favorito', popular: true },
          { id: 302, name: 'Omakase Box 20 pzs', description: 'Selección del chef, ingredientes premium del día', price: 42.00, calories: 710, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80', badge: 'Chef Special', popular: false },
        ]
      },
      {
        section: '🍣 Nigiris',
        items: [
          { id: 303, name: 'Nigiri Salmón (2 pzs)', description: 'Salmón atlántico premium, arroz vinagrado, wasabi', price: 8.90, calories: 160, image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400&q=80', badge: null, popular: true },
          { id: 304, name: 'Nigiri Atún (2 pzs)', description: 'Bluefin tuna, arroz de sushi, ginger encurtido', price: 9.90, calories: 155, image: 'https://images.unsplash.com/photo-1617196035302-73ea3ab2f6b8?w=400&q=80', badge: null, popular: false },
        ]
      },
      {
        section: '🥢 Rolls Signature',
        items: [
          { id: 305, name: 'Dragon Roll 8 pzs', description: 'Camarón tempura, aguacate, palta encima, salsa eel', price: 16.90, calories: 420, image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80', badge: 'Popular', popular: true },
          { id: 306, name: 'Spicy Tuna Roll 8 pzs', description: 'Atún picante, pepino, sriracha mayo, masago', price: 14.90, calories: 380, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80', badge: null, popular: false },
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'El Taquero',
    category: 'tacos',
    rating: 4.7,
    reviews: 987,
    deliveryTime: '15–25',
    deliveryFee: 0,
    minOrder: 10,
    tags: ['Gratis', 'Auténtico MX', 'Noche'],
    heroColor: '#92400e',
    coverEmoji: '🌮',
    description: 'Sabor de la Ciudad de México directo a tu puerta. Tortillas nixtamalizadas, salsas artesanales y carne al carbón.',
    menu: [
      {
        section: '🌮 Tacos al Carbón',
        items: [
          { id: 401, name: 'Taco de Pastor x3', description: 'Carne adobada al trompo, piña, cebolla, cilantro, salsa verde', price: 10.90, calories: 480, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80', badge: 'Favorito', popular: true },
          { id: 402, name: 'Taco de Suadero x3', description: 'Suadero estilo DF, cebolla, cilantro, salsa roja tatemada', price: 10.90, calories: 510, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', badge: null, popular: false },
          { id: 403, name: 'Taco de Birria x3', description: 'Birria estilo Jalisco, consomé para mojar, queso manchego', price: 12.90, calories: 550, image: 'https://images.pexels.com/photos/9258709/pexels-photo-9258709.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Viral', popular: false },
        ]
      },
      {
        section: '🌯 Quesabirria & Extras',
        items: [
          { id: 404, name: 'Quesabirria x2', description: 'Tortilla dorada con queso, birria, consomé incluido', price: 13.90, calories: 620, image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=400&q=80', badge: '🔥 Trending', popular: true },
          { id: 405, name: 'Guacamole + Totopos', description: 'Aguacate Hass, tomate, cebolla, cilantro, limón, jalapeño', price: 7.50, calories: 310, image: 'https://images.pexels.com/photos/7613677/pexels-photo-7613677.jpeg?auto=compress&cs=tinysrgb&w=400', badge: null, popular: false },
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'GreenBowl',
    category: 'healthy',
    rating: 4.8,
    reviews: 1543,
    deliveryTime: '20–30',
    deliveryFee: 1.50,
    minOrder: 15,
    tags: ['Vegan', 'Orgánico', 'Superfood'],
    heroColor: '#166534',
    coverEmoji: '🥗',
    description: 'Alimentación consciente y deliciosa. Bowls personalizables con ingredientes 100% orgánicos y de temporada.',
    menu: [
      {
        section: '🥣 Signature Bowls',
        items: [
          { id: 501, name: 'Buddha Bowl Zen', description: 'Arroz integral, garbanzos, kale, zanahoria, aguacate, tahini', price: 14.90, calories: 490, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', badge: 'Vegan', popular: true },
          { id: 502, name: 'Poke Bowl Salmón', description: 'Salmón, edamame, mango, pepino, aguacate, arroz, salsa ponzu', price: 17.90, calories: 540, image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80', badge: 'Best Seller', popular: false },
          { id: 503, name: 'Acaí Bowl', description: 'Base acaí, granola, banana, fresa, kiwi, miel de agave', price: 12.90, calories: 380, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80', badge: null, popular: false },
        ]
      },
      {
        section: '🥤 Smoothies & Jugos',
        items: [
          { id: 504, name: 'Green Detox', description: 'Espinaca, pepino, manzana verde, jengibre, limón, agua de coco', price: 8.90, calories: 120, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80', badge: null, popular: false },
          { id: 505, name: 'Golden Latte', description: 'Leche de avena, cúrcuma, pimienta negra, jengibre, canela', price: 7.50, calories: 140, image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&q=80', badge: null, popular: false },
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Sweet Lab',
    category: 'desserts',
    rating: 4.9,
    reviews: 2210,
    deliveryTime: '20–30',
    deliveryFee: 1.00,
    minOrder: 10,
    tags: ['Artesanal', 'Sin Gluten', 'Instagrameable'],
    heroColor: '#9d174d',
    coverEmoji: '🍩',
    description: 'Postres artesanales que son obras de arte. Donuts gourmet, cheesecakes NYC y tartas de temporada.',
    menu: [
      {
        section: '🍩 Donuts Gourmet',
        items: [
          { id: 601, name: 'Donut Matcha Mochi', description: 'Masa mochi esponjosa, glaseado matcha, perlas de tapioca', price: 5.90, calories: 310, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80', badge: 'Nuevo', popular: true },
          { id: 602, name: 'Donut Nutella Crunch', description: 'Relleno de nutella, cobertura chocolate, crumble avellana', price: 5.50, calories: 380, image: 'https://images.pexels.com/photos/33066207/pexels-photo-33066207.jpeg?auto=compress&cs=tinysrgb&w=400', badge: null, popular: false },
          { id: 603, name: 'Donut Limón Merengue', description: 'Relleno lemon curd, merengue tostado, ralladura limón', price: 5.50, calories: 290, image: 'https://images.pexels.com/photos/4686961/pexels-photo-4686961.jpeg?auto=compress&cs=tinysrgb&w=400', badge: null, popular: false },
        ]
      },
      {
        section: '🎂 Cheesecakes & Tartas',
        items: [
          { id: 604, name: 'NY Cheesecake Slice', description: 'Cheesecake New York original, base graham cracker, coulis frutos rojos', price: 9.90, calories: 520, image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80', badge: 'Clásico', popular: true },
          { id: 605, name: 'Tarta Chocolate Belga', description: 'Ganache Valrhona 70%, brownie base, sal flor, hojuelas oro', price: 10.90, calories: 580, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80', badge: 'Premium', popular: false },
        ]
      }
    ]
  }
]

export function useRestaurants() {
  /**
   * Get all categories
   */
  function getCategories() {
    return categories
  }

  /**
   * Get all restaurants (optionally filtered by category)
   * @param {string} categoryId - category id or 'all'
   */
  function getRestaurants(categoryId = 'all') {
    if (categoryId === 'all') return restaurants
    return restaurants.filter(r => r.category === categoryId)
  }

  /**
   * Get a single restaurant by id
   * @param {number|string} id
   */
  function getRestaurantById(id) {
    return restaurants.find(r => r.id === Number(id)) || null
  }

  /**
   * Get featured/popular restaurants (top rated)
   * @param {number} limit
   */
  function getFeatured(limit = 4) {
    return [...restaurants]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  /**
   * Search restaurants by name or category
   * @param {string} query
   */
  function searchRestaurants(query) {
    if (!query) return restaurants
    const q = query.toLowerCase()
    return restaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  return {
    getCategories,
    getRestaurants,
    getRestaurantById,
    getFeatured,
    searchRestaurants,
  }
}
