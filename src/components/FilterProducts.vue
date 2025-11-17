<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

// --- Types ---
interface ProductData {
  nombre: string;
  tipo: number;
  img: string;
  precio_publico: number;
  contenido: string;
  description: string;
}

interface ProductItem {
  data: ProductData;
  slug: string;
}

// --- Props ---
const props = defineProps({
  items: {
    type: Array as PropType<ProductItem[]>,
    required: true,
  },
  shopLink: {
    type: String,
    required: true,
  },
})

// --- State ---
const selectedCategory = ref<number | null>(null)

// --- Computed Properties for Data ---
const products = computed(() => {
  return props.items.map(p => ({
    nombre: p.data.nombre,
    tipo: p.data.tipo,
    img: p.data.img,
    precio_publico: p.data.precio_publico,
    contenido: p.data.contenido,
    description: p.data.description,
    slug: p.slug,
  }))
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === null) {
    return products.value
  }
  return products.value.filter(p => p.tipo === selectedCategory.value)
})

const categoryMeta: Record<number, string> = {
  1: 'Aceites',
  2: 'Tópicos',
  3: 'Cremas',
  4: 'Gomitas',
}

const productCategories = computed(() => {
  const counts = products.value.reduce((acc, product) => {
    acc[product.tipo] = (acc[product.tipo] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  return Object.entries(categoryMeta)
    .map(([id, name]) => ({
      id: Number(id),
      name,
      count: counts[Number(id)] || 0,
    }))
    .filter(cat => cat.count > 0)
})

// --- Animation Hook ---
function onLeave(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement;
  const { offsetLeft, offsetTop, clientWidth, clientHeight } = htmlEl;

  // Pin the element to its current position before the layout shifts
  htmlEl.style.position = 'absolute';
  htmlEl.style.left = `${offsetLeft}px`;
  htmlEl.style.top = `${offsetTop}px`;
  htmlEl.style.width = `${clientWidth}px`;
  htmlEl.style.height = `${clientHeight}px`;

  // Animate it out and signal Vue when done
  htmlEl.animate([
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(0.9)', opacity: 0 }
  ], {
    duration: 300,
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  }).onfinish = done;
}

// --- CSS Classes ---
const theme = {
  aside: "z-50 w-full overflow-y-auto overflow-x-hidden opacity-95 backdrop-blur-sm border-b border-neutral-800 bg-neutral-900 md:border-r md:fixed md:left-0 md:h-[calc(100vh-57px)] md:w-56 md:pb-0",
  nav: "flex items-center space-x-1 overflow-y-auto px-6 pb-2 pt-2 md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible md:px-0 md:pt-0",
  button: "w-full flex items-center justify-center md:justify-between rounded-md p-2 transition-all duration-200 ease-out hover:text-white text-neutral-400 hover:bg-neutral-200 hover:bg-neutral-700/40 text-sm transform hover:scale-[1.02] active:scale-[0.98]",
  span: "px-2.5 py-0.5 rounded-full font-medium bg-neutral-800/50 border border-neutral-800 text-neutral-400 hidden font-mono text-xs md:inline transition-all duration-200",
  selectedButton: 'bg-neutral-700/40 shadow-sm',
}

function getButtonClass(categoryId: number | null) {
  return [
    theme.button,
    selectedCategory.value === categoryId ? theme.selectedButton : ''
  ]
}
</script>

<template>
  <aside :class="theme.aside">
    <div class="md:px-3 md:py-6">
      <nav :class="theme.nav">
        <button @click="selectedCategory = null" :class="getButtonClass(null)">
          <span>Todos</span>
          <span :class="theme.span">{{ products.length }}</span>
        </button>
        <button 
          v-for="category in productCategories" 
          :key="category.id" 
          @click="selectedCategory = category.id" 
          :class="getButtonClass(category.id)"
        >
          <span>{{ category.name }}</span>
          <span :class="theme.span">{{ category.count }}</span>
        </button>
      </nav>
    </div>
  </aside>
  <TransitionGroup
    tag="section"
    name="product-grid"
    class="products md:ml-[calc(14rem)] p-4 md:p-8 lg:p-16"
    @leave="onLeave"
  >
    <article
      v-for="(producto, index) in filteredProducts"
      :key="producto.nombre"
      :data-index="index"
      :data-product-type="producto.tipo"
      class="product-article relative flex flex-col h-[560px] lg:h-[650px] rounded-2xl bg-center bg-no-repeat bg-cover group overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-black/20"
      :style="{ backgroundImage: `url(${producto.img})` }" 
    >      
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/75 transition-all duration-500 ease-out rounded-2xl"></div>
      
      <header class="relative z-20 flex justify-between mx-3 mb-0 pt-3 pb-2 px-1">
        <a :href="shopLink" target="_blank" class="text-sm font-bold text-white flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-shopping-cart transition-transform duration-200 hover:rotate-12"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" /></svg>
          <span>
            ${{producto.precio_publico}}.00 
          </span>
        </a>
        <span class="text-sm font-medium text-white transition-all duration-200 hover:scale-105">
          {{producto.contenido}}
        </span>
      </header>

      <a :href="`/producto/${producto.slug}`" class="absolute z-20 bottom-3 right-4 text-white font-semibold text-sm hover:underline flex items-center transition-all duration-200 hover:scale-105 hover:translate-x-1">
        Leer más
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>

      <div class="relative z-10 flex flex-col h-full justify-end transform translate-y-21 group-hover:translate-y-0 transition-all duration-500 ease-out">
        <div class="p-4">
          <h5 class="mb-2 text-white text-xl font-semibold transition-all duration-300 group-hover:scale-105">
            {{producto.nombre}}
          </h5>
          <p class="information-basica text-white/90 leading-normal font-light text-pretty transition-all duration-300 group-hover:text-white">
            {{producto.description}}.
          </p>
        </div>
        <footer class="mx-3 pb-3 pt-2 px-1">
        </footer>
      </div>
    </article>
  </TransitionGroup>
</template>

<style scoped>
	.products {
    position: relative; /* Contexto de posicionamiento para la animación de salida */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
		gap: 2rem;
	}

	@media (min-width: 560px) {
		.products {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 840px) {
		.products {
			grid-template-columns: repeat(3, 1fr);
		}
	}

  .information-basica {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
	
</style>

<style>
/* Animaciones optimizadas para el rendimiento */
.product-grid-move {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-grid-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-grid-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.product-grid-leave-to {
 /* JS se encarga de esto, pero lo dejamos por si JS falla */
  opacity: 0;
  transform: scale(0.9);
}

/* Animación de entrada escalonada para los productos */
.product-article {
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.product-article:nth-child(1) { animation-delay: 0.1s; }
.product-article:nth-child(2) { animation-delay: 0.15s; }
.product-article:nth-child(3) { animation-delay: 0.2s; }
.product-article:nth-child(4) { animation-delay: 0.25s; }
.product-article:nth-child(5) { animation-delay: 0.3s; }
.product-article:nth-child(6) { animation-delay: 0.35s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Optimizaciones para el rendimiento */
.product-article {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Hover effects suaves */
.product-article:hover {
  transform: translateY(-8px) scale(1.02);
}

/* Transiciones suaves para elementos internos */
.product-article * {
  transition-property: transform, opacity, color, background-color;
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Animación de carga para imágenes */
.product-article::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.product-article:hover::before {
  transform: translateX(100%);
}

/* Mejoras en la accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .product-article,
  .product-article *,
  .product-grid-move,
  .product-grid-enter-active,
  .product-grid-leave-active {
    animation: none !important;
    transition: none !important;
  }
}
</style>
