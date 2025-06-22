<script setup lang="ts">
import { ref } from 'vue'

const notes = ref('')

// Emitir el valor de las notas al componente padre
const emit = defineEmits<{
  updateNotes: [value: string]
}>()

function updateNotes() {
  emit('updateNotes', notes.value)
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-white font-semibold text-sm">Notas (opcional)</label>
    <textarea 
      v-model="notes"
      @input="updateNotes"
      placeholder="Ej: Tomado después del desayuno, antes de dormir..."
      class="w-full input-primary min-h-[80px] resize-none"
      maxlength="200"
    ></textarea>
    <div class="text-right text-xs text-gray-400">
      {{ notes.length }}/200
    </div>
  </div>
</template> 