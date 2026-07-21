<script setup lang="ts">

import VCardDownload from './VCardDownload.vue'
const props = defineProps<{
  isQrZoomed: boolean
  closeQrZoom: () => void
  toggleQrZoom: (source: 'contact_qr') => void
  vcard: { src: string; alt: string; label: string }
  vcardContact: any
}>()
</script>

<template>
  <div v-if="props.isQrZoomed" class="qr-overlay" role="dialog" aria-modal="true" :aria-label="props.vcard.label"
    @click.self="props.closeQrZoom">
    <div class="qr-overlay-panel">
      <button class="qr-overlay-close" type="button" aria-label="Close enlarged QR code" @click="props.closeQrZoom">
        Close
      </button>
      <button class="qr-overlay-panel-image" type="button" :aria-label="props.vcard.alt" @click="props.closeQrZoom">
        <img class="qr-overlay-image" :src="props.vcard.src" :alt="props.vcard.alt" width="720" height="720"
          decoding="async" />
      </button>
      <div class="qr-overlay-actions">
        <VCardDownload class="qr-overlay-download" :contact="props.vcardContact" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.qr-overlay {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 36px);
  background: rgba(5, 9, 15, 0.7);
  backdrop-filter: blur(4px);
}

.qr-overlay-close {
  position: absolute;
  top: clamp(10px, 1.4vw, 16px);
  right: clamp(10px, 1.4vw, 16px);
  padding: 8px 14px;
  border: 1px solid rgba(14, 13, 11, 0.2);
  border-radius: 100px;
  background: rgba(245, 242, 236, 0.95);
  color: var(--ink);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

.qr-overlay-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: clamp(44px, 5vw, 56px) clamp(12px, 2vw, 18px) clamp(12px, 2vw, 18px);
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 36px 64px -28px rgba(0, 0, 0, 0.7);
}

.qr-overlay-panel-image {
  display: inline-flex;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: zoom-out;
}

.qr-overlay-image {
  display: block;
  width: min(82vw, 82vh);
  height: auto;
  max-width: 680px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
}

.qr-overlay-actions {
  display: flex;
  justify-content: center;
  width: 100%;
}

.qr-overlay-download {
  color: var(--ink);
  border-color: rgba(14, 13, 11, 0.24);
}
</style>
