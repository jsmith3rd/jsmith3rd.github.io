<script setup lang="ts">
// import removed: no longer needed
import { siteConfig } from '../config/site'
const props = defineProps<{
  activeSection: string
  getSectionFromHref: (href: string) => string | null
  trackEvent: (event: string, data?: Record<string, any>) => void
}>()
</script>

<template>
  <nav>
    <a href="#" class="nav-logo" aria-label="John J. Smith III - home"
      @click="props.trackEvent('nav_logo_click', { link_url: '#' })">
      <img class="nav-logo-mark" src="/logo-square.svg" alt="JIII monogram logo" width="32" height="32"
        aria-hidden="true" />
      <span class="nav-logo-text">{{ siteConfig.navLogo }}</span>
    </a>
    <ul class="nav-links">
      <li v-for="link in siteConfig.navLinks" :key="link.href">
        <a :href="link.href" :class="{ active: props.activeSection === props.getSectionFromHref(link.href) }"
          @click="props.trackEvent('nav_link_click', { link_label: link.label, link_url: link.href })">
          {{ link.label }}
        </a>
      </li>
    </ul>
    <a :href="siteConfig.navCta.href" class="nav-cta"
      @click="props.trackEvent('nav_cta_click', { link_label: siteConfig.navCta.label, link_url: siteConfig.navCta.href })">
      {{ siteConfig.navCta.label }}
    </a>
  </nav>
</template>

<style scoped>
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.95;
  text-decoration: none;
}

.nav-logo-mark {
  display: block;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.nav-logo-text {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--accent);
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav-links a {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  color: var(--ink-2);
  text-decoration: none;
  letter-spacing: 0.02em;
  padding: 6px 2px;
  transition: color 0.18s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.5px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.18s ease;
}

.nav-links a:hover {
  color: var(--accent);
}

.nav-links a:hover::after {
  transform: scaleX(1);
}

.nav-links a.active {
  color: var(--accent);
  font-weight: 500;
}

.nav-links a.active::after {
  transform: scaleX(1);
}

.nav-links a:focus-visible {
  outline: 2px solid var(--accent-mid);
  outline-offset: 4px;
  border-radius: 2px;
}

.nav-cta {
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  border: 1px solid var(--accent);
  padding: 6px 16px;
  border-radius: 2px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background 0.15s, color 0.15s;
}

.nav-cta:hover {
  background: var(--accent);
  color: var(--paper);
}

@media (max-width: 1024px) {
  nav {
    padding: 0 24px;
  }
}

@media (max-width: 700px) {
  nav {
    height: auto;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 20px;
  }
}
</style>
