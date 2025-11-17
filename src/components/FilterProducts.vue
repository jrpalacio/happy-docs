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
  5: 'Adaptógenos',
}
// Optimized: single pass counting + direct building of existing categories only
const productCategories = computed(() => {
  const counts: Record<number, number> = {}
  const list = products.value
  for (let i = 0; i < list.length; i++) {
    const tipo = list[i].tipo
    counts[tipo] = (counts[tipo] || 0) + 1
  }
  const result: { id: number; name: string; count: number }[] = []
  for (const id in categoryMeta) {
    const numericId = +id
    const count = counts[numericId]
    if (count) {
      result.push({ id: numericId, name: categoryMeta[numericId], count })
    }
  }
  return result
})

// --- Animation Hook --- (removed for simpler animations)

// --- CSS Classes --- (frozen to avoid reactive proxy overhead)
const theme = Object.freeze({
  aside: "z-50 w-full overflow-y-auto overflow-x-hidden opacity-95 backdrop-blur-sm border-b border-neutral-800 bg-neutral-900 md:border-r md:fixed md:left-0 md:h-[calc(100vh-57px)] md:w-56 md:pb-0",
  nav: "flex items-center space-x-1 overflow-y-auto px-6 pb-2 pt-2 md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible md:px-0 md:pt-0",
  button: "w-full flex items-center justify-center md:justify-between rounded-md p-2 transition-all duration-200 ease-out hover:text-white text-neutral-400 hover:bg-neutral-200 hover:bg-neutral-700/40 text-sm transform hover:scale-[1.02] active:scale-[0.98]",
  span: "px-2.5 py-0.5 rounded-full font-medium bg-neutral-800/50 border border-neutral-800 text-neutral-400 hidden font-mono text-xs md:inline transition-all duration-200",
  selectedButton: 'bg-neutral-700/40 shadow-sm',
})

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
  >
    <article
      v-for="(producto, index) in filteredProducts"
      :key="producto.slug"
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
    line-clamp: 2; /* Standard property for broader compatibility */
  }

  /* Animación sencilla: solo levantar la card en hover */
  .product-article {
    will-change: transform;
    backface-visibility: hidden;
    transition: transform 200ms ease;
  }

  .product-article:hover {
    transform: translateY(-6px);
  }

  /* Desactivar transiciones internas para mantenerlo simple */
  .product-article header,
  .product-article h5,
  .product-article .information-basica,
  .product-article a,
  .product-article > .absolute {
    transition: none !important;
  }
	
</style>