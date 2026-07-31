<script setup lang="ts">
import { siteConfig } from '../config/site'

const props = defineProps<{
  getCaseStudyTagClass: (variant?: 'default' | 'gold' | 'muted') => string
  openCaseStudy: (id: string) => void
}>()

const nonFeaturedStudies = siteConfig.caseStudies.filter((study) => !study.featured)
const trailingSingleCardId =
  nonFeaturedStudies.length % 2 === 1 ? nonFeaturedStudies[nonFeaturedStudies.length - 1].id : null
</script>

<template>
  <section id="work" class="section">
    <div class="section-header">
      <div>
        <p class="section-label">Projects</p>
        <h2 class="section-title">Selected work</h2>
      </div>
    </div>
    <div class="work-grid">
      <article v-for="study in siteConfig.caseStudies" :key="study.id"
        :class="['case-study', { featured: study.featured, locked: study.locked, 'span-row': study.id === trailingSingleCardId }]"
        :tabindex="study.locked ? undefined : 0" :role="study.locked ? undefined : 'button'"
        :aria-haspopup="study.locked ? undefined : 'dialog'"
        @click="!study.locked && props.openCaseStudy(study.id)"
        @keydown.enter="!study.locked && props.openCaseStudy(study.id)"
        @keydown.space.prevent="!study.locked && props.openCaseStudy(study.id)">
        <div>
          <span :class="props.getCaseStudyTagClass(study.tagVariant)">{{ study.tag }}</span>
          <h3 class="case-study-title">{{ study.title }}</h3>
          <p class="case-study-desc">{{ study.description }}</p>
          <div v-if="study.stats?.length" class="case-study-meta">
            <template v-for="(stat, index) in study.stats" :key="stat.label">
              <div class="case-study-stat">
                <span class="stat-num">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
              <div v-if="index < study.stats.length - 1" class="case-study-divider"></div>
            </template>
          </div>
        </div>
        <span v-if="study.stack && !study.locked" class="stack">
          <span class="stack-label">Stack:</span>{{ study.stack }}
        </span>
        <span v-if="study.locked" class="cs-lock">⊘ {{ study.lockLabel }}</span>
        <span v-if="!study.locked" class="case-study-arrow">↗</span>
        <span class="case-study-bg-num">{{ study.number }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.case-study {
  background: var(--paper-2);
  padding: 48px;
  position: relative;
  overflow: hidden;
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background 0.2s;
  cursor: pointer;
}

.case-study:hover {
  background: var(--paper-3);
}

.case-study:focus-visible {
  outline: 2px solid var(--accent-mid);
  outline-offset: -2px;
}

.case-study.locked {
  cursor: default;
}

.case-study.featured {
  grid-column: span 2;
}

.case-study.span-row {
  grid-column: span 2;
}

.case-study-title {
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  letter-spacing: -0.01em;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 12px;
  white-space: pre-line;
}

.case-study.featured .case-study-title {
  font-size: 32px;
}

.case-study-desc {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.6;
  max-width: 360px;
}

.case-study-arrow {
  position: absolute;
  top: 48px;
  right: 48px;
  font-size: 20px;
  color: var(--ink-3);
  transition: transform 0.2s, color 0.2s;
}

.case-study:hover .case-study-arrow {
  transform: translate(3px, -3px);
  color: var(--accent);
}

.case-study-meta {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 24px;
}

.case-study-divider {
  width: 1px;
  height: 36px;
  background: var(--rule);
  flex-shrink: 0;
}

.case-study-bg-num {
  position: absolute;
  bottom: -20px;
  right: -10px;
  font-family: 'DM Serif Display', serif;
  font-style: italic;
  font-size: 160px;
  color: rgba(14, 13, 11, 0.04);
  pointer-events: none;
  line-height: 1;
}

.case-study.locked {
  opacity: 0.6;
}

@media (max-width: 1024px) {
  .work-grid {
    grid-template-columns: 1fr;
  }

  .case-study.featured,
  .case-study.span-row {
    grid-column: span 1;
  }
}

@media (max-width: 700px) {
  .case-study {
    padding: 24px;
    min-height: 280px;
  }

  .case-study-arrow {
    top: 24px;
    right: 24px;
  }
}
</style>
