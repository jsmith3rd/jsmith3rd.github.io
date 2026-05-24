<template>
  <div v-if="open" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close" aria-label="Close map">×</button>
      <iframe class="modal-map-iframe" :src="iframeSrc" width="400" height="350" style="border:0;" allowfullscreen
        loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Google Map: Tuxedo Park, NY"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])
const close = () => emit('close')
const iframeSrc = computed(() =>
  'https://www.google.com/maps?q=Tuxedo+Park,+NY&output=embed'
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(14, 13, 11, 0.38);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: var(--paper, #fff);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 0;
  position: relative;
  min-width: 400px;
  min-height: 350px;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--ink-2, #333);
  cursor: pointer;
  z-index: 2;
}

.modal-map-iframe {
  width: 100%;
  height: 350px;
  border: none;
  border-radius: 8px;
}
</style>
