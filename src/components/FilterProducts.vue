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

const asideClass = "z-50 w-full overflow-y-auto overflow-x-hidden bg-white opacity-95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 md:border-r md:fixed md:left-0 md:h-[calc(100vh-57px)] md:w-56 md:pb-0"
const navClass = "flex items-center space-x-1 overflow-y-auto px-6 pb-2 pt-2 md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible md:px-0 md:pt-0"
const buttonClass = "w-full flex items-center justify-center md:justify-between rounded-md p-2 transition-none duration-100 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-sm"
const spanClass = "px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hidden font-mono text-xs md:inline"
const selectedButtonClass = 'dark:bg-neutral-700/40 bg-neutral-200/30'
</script>

<template>
  <aside :class="asideClass">
    <div class="md:px-3 md:py-6">
      <nav :class="navClass">
      <button @click="selected = null" :class="[buttonClass, selected === null ? selectedButtonClass : '']" >
        <span>Todos</span>
        <span :class="spanClass">{{products.length}}</span>
      </button> 
      <button @click="selected = 1"  :class="[buttonClass, selected === 1 ? selectedButtonClass : '']">
        <span>Aceites</span> 
        <span :class="spanClass">6</span> 
      </button>
      <button @click="selected = 2"  :class="[buttonClass, selected === 2 ? selectedButtonClass : '']">
        <span>Topicos</span> 
        <span :class="spanClass">3</span> 
      </button>
      <button @click="selected = 3"  :class="[buttonClass, selected === 3 ? selectedButtonClass : '']">
        <span>Cremas</span> 
        <span :class="spanClass">2</span> 
      </button>
      <button @click="selected = 4"  :class="[buttonClass, selected === 4 ? selectedButtonClass : '']">
        <span>Gomitas</span> 
        <span :class="spanClass">1</span> 
      </button>
      </nav>
    </div>
  </aside>
  <TransitionGroup
    tag="section"
    name="list"
    class="products md:ml-[calc(14rem)] p-4 md:p-8 lg:p-16"
  >
    <article
      v-for="producto in filteredProducts"
      :key="producto.nombre"
      data-product-type={producto.tipo}
      class="product-article relative flex flex-col h-[560px] lg:h-[650px] rounded-2xl bg-center bg-no-repeat bg-cover group overflow-hidden transition-[height] duration-300 ease-in-out"
      :style="{ backgroundImage: `url(${producto.img})` }" 
    >      
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/75 transition-all duration-300 rounded-2xl"></div>
      
      <header class="relative z-20 flex justify-between mx-3 mb-0 pt-3 pb-2 px-1">
        <a :href="shopLink" target="_blank" class="text-sm font-bold text-white flex items-center gap-2">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" /></svg>
          <span>
            ${{producto.precio_publico}}.00 
          </span>
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
  </TransitionGroup>
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

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1); /* More dynamic easing */
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95); /* Enter/leave from/to scaled and slightly below */
}

.list-leave-active {
  position: absolute;
  /* width: 100%; Consider if items are in a grid/flex row and collapse */
}
</style>
