<script setup lang="ts">
defineProps<{
  eyebrow: string
  items: Array<{ value: string; label: string }>
}>()
</script>

<template>
  <section class="highlights-band" aria-label="Scale and longevity highlights">
    <p class="highlights-label">{{ eyebrow }}</p>
    <dl class="highlights-grid">
      <div v-for="item in items" :key="item.label" class="highlight-item">
        <dt class="highlight-value">{{ item.value }}</dt>
        <dd class="highlight-label">{{ item.label }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.highlights-band {
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 48px;
  border-top: 0.5px solid var(--rule);
  border-bottom: 0.5px solid var(--rule);
  background: var(--paper-2);
}

.highlights-label {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: var(--ink-3);
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex: 1;
  margin: 0;
}

.highlight-item {
  padding: 0 28px;
  border-left: 0.5px solid var(--rule);
}

.highlight-item:first-child {
  border-left: none;
  padding-left: 0;
}

.highlight-value {
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  color: var(--ink);
  line-height: 1;
  margin: 0 0 6px;
}

.highlight-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--ink-3);
  text-transform: uppercase;
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 900px) {
  .highlights-band {
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
    padding: 36px 48px;
  }

  .highlights-grid {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    row-gap: 28px;
  }

  .highlight-item:nth-child(2n+1) {
    border-left: none;
    padding-left: 0;
  }
}

@media (max-width: 700px) {
  .highlights-band {
    padding: 32px 16px;
  }
}

@media (max-width: 480px) {
  .highlights-grid {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }

  .highlight-item {
    border-left: none !important;
    padding: 16px 0 0;
    border-top: 0.5px solid var(--rule);
  }

  .highlight-item:first-child {
    padding-top: 0;
    border-top: none;
  }
}
</style>
