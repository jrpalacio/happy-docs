<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['items', 'shopLink'])

const selected = ref(null)

const shopLink = props.shopLink

const categories = [...new Set(props.items.map(p => p.data.tipo))]
// [1,2,3,4]

// función que retorna el nombre, tipo ,img, precio_publico, contenido, description, slug
const products = computed(() => {
  return props.items.map(p => ({
    nombre: p.data.nombre,
    tipo: p.data.tipo,
    img: p.data.img,
    precio_publico: p.data.precio_publico,
    contenido: p.data.contenido,
    description: p.data.description,
    slug: p.slug  
  }))
})

const filteredProducts = computed(() => {
  if (selected.value === null) return products.value
  return products.value.filter(p => p.tipo === selected.value)
})
</script>

<template>
  <aside class="z-50 w-full overflow-y-auto overflow-x-hidden md:fixed md:left-0 md:h-[calc(100vh-57px)] md:w-56 md:pb-0 bg-white dark:bg-neutral-900 opacity-95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 md:border-r">
    <div class="md:px-3 md:py-6">
      <nav id="product-filter-nav" class="flex items-center space-x-1 overflow-y-auto px-6 pb-2 pt-2 md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible md:px-0 md:pt-0">
      <button @click="selected = null" class="filter-link flex w-full items-center space-x-3 justify-between rounded-md p-2 transition-none duration-100 hover:text-dark dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-sm bg-neutral-200 font-medium text-dark dark:bg-neutral-700/30 dark:text-white" >Todos</button> 
      <button @click="selected = 1"  class="filter-link flex w-full items-center space-x-3 justify-between rounded-md p-2 transition-none duration-100 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-sm"><span>Aceites</span> <span class="px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hidden font-mono text-xs md:inline">6</span> </button>
      <button @click="selected = 2"  class="filter-link flex w-full items-center space-x-3 justify-between rounded-md p-2 transition-none duration-100 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-sm"><span>Topicos</span> <span class="px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hidden font-mono text-xs md:inline">3</span> </button>
      <button @click="selected = 3"  class="filter-link flex w-full items-center space-x-3 justify-between rounded-md p-2 transition-none duration-100 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-sm"><span>Crema</span> <span class="px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hidden font-mono text-xs md:inline">2</span> </button>
      <button @click="selected = 4"  class="filter-link flex w-full items-center space-x-3 justify-between rounded-md p-2 transition-none duration-100 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-sm"><span>Gomitas</span> <span class="px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hidden font-mono text-xs md:inline">1</span> </button>
      </nav>
    </div>
  </aside>
  <section class="products">
    <article
      v-for="producto in filteredProducts"
      :key="producto.nombre"
      data-product-type={producto.tipo}
      class="product-article relative flex flex-col h-[560px] lg:h-[650px] rounded-2xl bg-center bg-no-repeat bg-cover group overflow-hidden transition-[height] duration-300 ease-in-out"
      :style="{ backgroundImage: `url(${producto.img})` }" 
    >      
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/75 transition-all duration-300 rounded-2xl"></div>
      
      <header class="relative z-20 flex justify-between mx-3 mb-0 pt-3 pb-2 px-1">
        <a :href="shopLink" target="_blank" class="text-sm font-bold text-white">
        🛒 ${{producto.precio_publico}}.00 
        </a>
        <span class="text-sm font-medium text-white">
          {{producto.contenido}}
        </span>
      </header>

      <a :href="`/producto/${producto.slug}`" class="absolute z-20 bottom-3 right-4 text-white font-semibold text-sm hover:underline flex items-center">
        Leer más
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>

      <div class="relative z-10 flex flex-col h-full justify-end transform translate-y-21 group-hover:translate-y-0 transition-transform duration-300">
        <div class="p-4">
          <h5 class="mb-2 text-white text-xl font-semibold">
            {{producto.nombre}}
          </h5>
          <p class="information-basica text-white/90 leading-normal font-light text-pretty">
            {{producto.description}}.
          </p>
        </div>
        <footer class="mx-3 pb-3 pt-2 px-1">
        </footer>
      </div>
    </article>
  </section>
</template>

<style scoped>
	.products {
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

