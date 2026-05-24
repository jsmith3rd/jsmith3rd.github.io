<script setup lang="ts">
import { siteConfig } from '../config/site'

const props = defineProps<{
  getCaseStudyTagClass: (variant?: 'default' | 'gold' | 'muted') => string
}>()
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
        :class="['case-study', { featured: study.featured, locked: study.locked }]">
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
              <div v-if="index < study.stats.length - 1" class="hero-divider case-study-divider"></div>
            </template>
          </div>
        </div>
        <div v-if="study.featured" class="featured-study-meta">
          <span class="case-study-num">{{ study.number }}</span>
          <p class="case-study-role">{{ study.roleNote }}</p>
        </div>
        <span v-if="study.annotation && !study.locked" class="annotation"><span class="annotation-dot"></span>{{
          study.annotation }}</span>
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
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background 0.2s;
}

.case-study:hover {
  background: var(--paper-3);
}

.case-study.featured {
  grid-column: span 2;
  min-height: 280px;
  flex-direction: row;
  align-items: flex-end;
  gap: 80px;
}

.featured-study-meta {
  max-width: 260px;
}

.case-study-role {
  font-size: 13px;
  color: var(--ink-3);
  margin-top: 8px;
  line-height: 1.5;
}

.case-study-num {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--ink-3);
}

.case-study-tag {
  display: inline-block;
  background: var(--accent-lt);
  color: var(--accent);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 2px;
  margin-bottom: 16px;
}

.case-study-tag.gold {
  background: var(--gold-lt);
  color: var(--gold);
}

.case-study-tag.muted {
  background: var(--paper-3);
  color: var(--ink-3);
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
  height: 36px;
}

.case-study-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-num {
  font-family: 'DM Serif Display', serif;
  font-size: 20px;
  color: var(--ink);
}

.stat-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: var(--ink-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
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

.cs-lock {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: var(--ink-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: auto;
  border-top: 0.5px solid var(--rule);
  padding-top: 12px;
}

@media (max-width: 1024px) {
  .work-grid {
    grid-template-columns: 1fr;
  }

  .case-study.featured {
    grid-column: span 1;
    min-height: 360px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
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
