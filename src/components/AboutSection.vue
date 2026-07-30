<script setup lang="ts">
import { siteConfig } from '../config/site'
</script>

<template>
  <section id="about" class="section about-section">
    <div class="section-header">
      <div>
        <p class="section-label">Background</p>
        <h2 class="section-title">About</h2>
      </div>
    </div>
    <div class="about-grid">
      <div class="about-left">
        <div class="photo-placeholder">
          <img src="/profile-photo-green.png" alt="John J. Smith III profile photo" class="profile-photo-img fill"
            loading="lazy" decoding="async" />
        </div>
        <p v-for="paragraph in siteConfig.about.leadParagraphs" :key="paragraph" class="about-body">{{ paragraph }}</p>
        <div class="tools-row">
          <span v-for="tool in siteConfig.about.tools" :key="tool" class="tool-chip">{{ tool }}</span>
        </div>
      </div>
      <div>
        <div class="timeline">
          <div v-for="item in siteConfig.about.timeline" :key="`${item.years}-${item.role}`" class="timeline-item">
            <span class="timeline-year">{{ item.years }}</span>
            <div>
              <p class="timeline-role">{{ item.role }}</p>
              <p class="timeline-org">{{ item.organization }}</p>
              <p class="timeline-detail">{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: var(--paper-2);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--col-gap);
  align-items: start;
}

.about-left {
  position: sticky;
  top: 80px;
}

.about-body {
  font-size: 16px;
  line-height: 1.75;
  color: var(--ink-2);
  margin-bottom: 24px;
}

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  column-gap: 24px;
  padding: 24px 0;
  border-top: 0.5px solid var(--rule);
  position: relative;
}

.timeline-year {
  grid-column: 1;
  position: relative;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--ink-3);
  letter-spacing: 0.08em;
  padding-top: 2px;
  white-space: pre-line;
}

.timeline-year::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-mid);
}

.timeline-role {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 4px;
}

.timeline-org {
  font-size: 13px;
  color: var(--accent-mid);
  margin-bottom: 6px;
}

.timeline-detail {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.5;
}

.tools-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.tool-chip {
  padding: 6px 14px;
  border: 0.5px solid var(--rule);
  border-radius: 100px;
  font-size: 12px;
  color: var(--ink-2);
  background: var(--paper);
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-left {
    position: static;
  }
}

@media (max-width: 700px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
