<script setup lang="ts">
import { siteConfig } from '../config/site'
// import removed: no longer needed
const props = defineProps<{
  openPrivacyPreferences: () => void
  trackEvent: (event: string, data?: Record<string, any>) => void
}>()
</script>

<template>
  <footer>
    <a href="#" class="footer-logo" aria-label="John J. Smith III - back to top"
      @click="props.trackEvent('footer_logo_click', { link_url: '#' })">
      <img src="/logo-square.svg" alt="JIII monogram logo" width="32" height="32" aria-hidden="true" />
      <span class="footer-logo-text">{{ siteConfig.navLogo }}</span>
    </a>
    <p>
      {{ siteConfig.footer.copyright }} · {{ siteConfig.footer.location }}
      <button class="footer-privacy" type="button"
        @click="props.trackEvent('privacy_preferences_open', { source: 'footer' }); props.openPrivacyPreferences()">Privacy
        preferences</button>
    </p>
  </footer>
</template>

<style scoped>
footer {
  background: var(--accent);
  border-top: 0.5px solid rgba(200, 221, 209, 0.15);
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer p {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--accent-lt);
  opacity: 0.7;
  letter-spacing: 0.06em;
}

.footer-privacy {
  margin-left: 10px;
  border: 0;
  background: transparent;
  color: var(--accent-lt);
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.25;
  text-decoration: none;
}

.footer-logo svg {
  width: 22px;
  height: 22px;
}

.footer-logo-text {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--accent-lt);
  opacity: 0.6;
  text-transform: uppercase;
}
</style>
