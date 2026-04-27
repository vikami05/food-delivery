# 🍔 FoodDash — Premium Food Delivery Frontend

Una aplicación de food delivery moderna y profesional construida con **Vue 3**, **Vite**, **Pinia** y **Tailwind CSS**.

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🧩 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Vue 3 | ^3.4 | Framework principal (Composition API) |
| Vite | ^5.2 | Build tool / Dev server |
| Pinia | ^2.1 | Estado global (carrito) |
| Vue Router | ^4.3 | Navegación SPA |
| Tailwind CSS | ^3.4 | Estilos utilitarios |
| Plus Jakarta Sans | Google Fonts | Tipografía body |
| Syne | Google Fonts | Tipografía display |

---

## 📁 Estructura del proyecto

```
src/
├── assets/
│   └── main.css              # Estilos globales + Tailwind
├── components/
│   ├── AppHeader.vue          # Header sticky con búsqueda y carrito
│   ├── CartDrawer.vue         # Drawer lateral del carrito (animado)
│   ├── CategoryFilter.vue     # Filtro de categorías scrollable
│   ├── FoodCard.vue           # Card de producto con control de cantidad
│   └── RestaurantCard.vue     # Card de restaurante
├── composables/
│   └── useRestaurants.js      # Datos mock + funciones de consulta
├── router/
│   └── index.js               # Configuración de rutas
├── stores/
│   └── cart.js                # Store Pinia del carrito
├── views/
│   ├── HomeView.vue           # Página principal (hero + categorías + listado)
│   ├── RestaurantView.vue     # Vista de restaurante con menú
│   └── CheckoutView.vue       # Checkout 3 pasos (dirección → pago → confirmar)
├── App.vue                    # Root component
└── main.js                    # Entry point
```

---

## 🎨 Diseño

- **Tipografía**: Syne (display/títulos) + Plus Jakarta Sans (body)
- **Color primario**: Naranja brand `#f97316` (Tailwind orange-500)
- **Fondo**: `#f8f7f4` (warm off-white)
- **Estilo**: Minimalista premium, mobile-first, inspirado en Uber Eats / Rappi
- **Microinteracciones**: hover states, scale activo, transiciones suaves, animaciones de entrada

---

## ⚙️ Funcionalidades

- ✅ **Home** con banner hero, restaurantes destacados, filtro por categorías y buscador
- ✅ **Vista de restaurante** con menú por secciones, tabs de navegación y banner flotante del carrito
- ✅ **Carrito global** con Pinia (agregar, quitar, aumentar/disminuir cantidad)
- ✅ **Cart Drawer** animado con resumen, totales y acceso rápido a checkout
- ✅ **Checkout** en 3 pasos: dirección → método de pago → confirmación
- ✅ **Pantalla de éxito** con tracking visual del estado del pedido
- ✅ **Empty states** para carrito vacío y resultados de búsqueda
- ✅ **Navegación SPA** con transiciones entre páginas
- ✅ **Responsive** completo (mobile-first)

---

## 🔌 Integración con backend

Para conectar con una API real, solo edita `src/composables/useRestaurants.js`:

```js
// Ejemplo: reemplazar datos mock con fetch real
async function getRestaurants(categoryId = 'all') {
  const res = await fetch(`/api/restaurants?category=${categoryId}`)
  return res.json()
}
```

El store del carrito (`src/stores/cart.js`) está listo para enviar el pedido al backend desde el método `placeOrder()` en `CheckoutView.vue`.

---

## 📦 Build para producción

```bash
npm run build
```

El output se genera en `/dist/`.

---

## 📝 Notas

- Las imágenes son URLs de Unsplash (requieren conexión a internet)
- No incluye autenticación ni pagos reales
- El formulario de checkout es solo UI/UX frontend
