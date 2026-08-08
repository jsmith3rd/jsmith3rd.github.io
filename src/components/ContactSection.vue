<script setup lang="ts">
import { siteConfig } from '../config/site'
import VCardDownload from './VCardDownload.vue'
const props = defineProps<{
  toggleQrZoom: (source: 'contact_qr') => void
}>()
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-logo-bg" aria-hidden="true">
      <img src="/logo-hero-contact.svg" alt="JIII monogram logo" width="400" height="400" />
    </div>
    <div class="contact-content">
      <p class="contact-eyebrow">{{ siteConfig.contact.eyebrow }}</p>
      <h2 class="contact-heading">{{ siteConfig.contact.headingLineOne }}<br /><em>{{ siteConfig.contact.headingEmphasis
      }}</em></h2>
      <p class="contact-sub">{{ siteConfig.contact.subtitle }}</p>
    </div>
    <div class="contact-content">
      <div class="contact-links">
        <a v-for="contactLink in siteConfig.contact.links" :key="contactLink.label" :href="contactLink.href"
          class="contact-link-row" :target="contactLink.external ? '_blank' : undefined"
          :rel="contactLink.external ? 'noopener noreferrer' : undefined">
          <div>
            <p class="contact-link-label">{{ contactLink.label }}</p>
            <p class="contact-link-value">{{ contactLink.value }}</p>
          </div>
          <span class="contact-link-arrow">↗</span>
        </a>
      </div>
      <div class="contact-qr">
        <button class="contact-qr-button" type="button" :aria-label="siteConfig.vcard.label"
          @click="props.toggleQrZoom('contact_qr')">
          <img class="contact-qr-image" :src="siteConfig.vcard.src" :alt="siteConfig.vcard.alt" width="72" height="72"
            loading="lazy" decoding="async" />
        </button>
        <VCardDownload :contact="siteConfig.vcardContact" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 100px 48px;
  background: var(--accent);
  color: var(--paper);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--col-gap);
  align-items: center;
  position: relative;
  overflow: hidden;
}

@media (max-width: 800px) {
  .contact-section {
    grid-template-columns: 1fr;
    padding: 64px 16px;
    gap: 32px;
  }

  .contact-logo-bg {
    display: none;
  }

  .contact-content {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
  }
}

@media (max-width: 600px) {
  .contact-section {
    padding: 48px 8px;
  }
}

.contact-logo-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 1;
  opacity: 0.05;
  filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.08));
  transition: opacity 0.3s;
}

.contact-logo-bg img {
  width: 100%;
  max-width: 800px;
  min-width: 400px;
  height: auto;
  display: block;
  user-select: none;
  margin-right: 0;
}

.contact-content {
  position: relative;
  z-index: 2;
}

.contact-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--accent-lt);
  text-transform: uppercase;
  margin-bottom: 20px;
}

.contact-heading {
  font-family: 'DM Serif Display', serif;
  font-size: 48px;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 24px;
}

.contact-heading em {
  font-style: italic;
  color: var(--accent-lt);
}

.contact-sub {
  font-size: 15px;
  color: var(--accent-lt);
  line-height: 1.6;
  opacity: 0.8;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: center;
}

@media (max-width: 800px) {
  .contact-links {
    margin-top: 32px;
    width: 100%;
    align-items: stretch;
  }
}

.contact-link-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 0.5px solid rgba(200, 221, 209, 0.2);
  text-decoration: none;
  color: var(--paper);
  transition: color 0.15s;
}

.contact-link-row:hover {
  color: var(--accent-lt);
}

.contact-link-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--accent-lt);
  text-transform: uppercase;
  margin-bottom: 4px;
  opacity: 0.7;
}

.contact-link-value {
  font-size: 15px;
}

.contact-link-arrow {
  font-size: 18px;
  opacity: 0.5;
  transition: transform 0.15s, opacity 0.15s;
}

.contact-link-row:hover .contact-link-arrow {
  transform: translate(3px, -3px);
  opacity: 1;
}

.contact-qr {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 800px) {
  .contact-qr {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 24px;
  }
}

.contact-qr-button {
  display: inline-flex;
  padding: 6px;
  border: 1px solid rgba(200, 221, 209, 0.4);
  border-radius: 4px;
  background: var(--paper);
  cursor: zoom-in;
}

.contact-qr-image {
  width: 64px;
  height: 64px;
  display: block;
  border-radius: 2px;
}
</style>
