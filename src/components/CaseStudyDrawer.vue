<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '../config/site'

const props = defineProps<{
  activeIndex: number | null
  closeDrawer: () => void
  stepCaseStudy: (direction: 1 | -1) => void
  getCaseStudyTagClass: (variant?: 'default' | 'gold' | 'muted') => string
}>()

const total = siteConfig.caseStudies.length

const study = computed(() => (props.activeIndex !== null ? siteConfig.caseStudies[props.activeIndex] : null))

const flattenTitle = (title: string): string => title.replace(/\n/g, ' ')

const prevTitle = computed(() => {
  if (props.activeIndex === null) {
    return ''
  }
  return flattenTitle(siteConfig.caseStudies[(props.activeIndex - 1 + total) % total].title)
})

const nextTitle = computed(() => {
  if (props.activeIndex === null) {
    return ''
  }
  return flattenTitle(siteConfig.caseStudies[(props.activeIndex + 1) % total].title)
})
</script>

<template>
  <Transition name="cs-drawer">
    <div v-if="study" class="cs-drawer-backdrop" @click.self="props.closeDrawer">
      <aside class="cs-drawer" role="dialog" aria-modal="true" :aria-label="flattenTitle(study.title)">
        <button class="cs-drawer-close" type="button" aria-label="Close case study" @click="props.closeDrawer">
          Close
        </button>

        <div class="cs-drawer-content">
          <div class="cs-drawer-top">
            <span class="cs-drawer-num">{{ study.number }} / {{ String(total).padStart(2, '0') }}</span>
            <span :class="props.getCaseStudyTagClass(study.tagVariant)">{{ study.tag }}</span>
          </div>

          <h2 class="cs-drawer-title">{{ study.title }}</h2>
          <p v-if="study.roleNote" class="cs-drawer-role">{{ study.roleNote }}</p>
          <p class="cs-drawer-desc">{{ study.description }}</p>

          <div v-if="study.scope || study.stats?.length" class="cs-drawer-facts">
            <template v-if="study.scope">
              <p class="cs-drawer-facts-label">Scope</p>
              <p class="cs-drawer-scope">{{ study.scope }}</p>
            </template>

            <div v-if="study.stats?.length" class="cs-drawer-stats">
              <div v-for="stat in study.stats" :key="stat.label" class="case-study-stat">
                <span class="stat-num">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
          </div>

          <span v-if="study.stack" class="stack">
            <span class="stack-label">Stack:</span>{{ study.stack }}
          </span>
          <span v-if="study.locked" class="cs-lock">⊘ {{ study.lockLabel }}</span>
        </div>

        <div class="cs-drawer-nav">
          <button type="button" class="cs-drawer-nav-btn" @click="props.stepCaseStudy(-1)">
            <span class="cs-drawer-nav-label">← Previous</span>
            <span class="cs-drawer-nav-title">{{ prevTitle }}</span>
          </button>
          <button type="button" class="cs-drawer-nav-btn align-right" @click="props.stepCaseStudy(1)">
            <span class="cs-drawer-nav-label">Next →</span>
            <span class="cs-drawer-nav-title">{{ nextTitle }}</span>
          </button>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.cs-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 130;
  background: rgba(5, 9, 15, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: flex-end;
}

.cs-drawer {
  position: relative;
  width: clamp(360px, 42vw, 560px);
  max-width: 100vw;
  height: 100%;
  background: var(--paper);
  box-shadow: -24px 0 64px -24px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.cs-drawer-close {
  position: sticky;
  top: 20px;
  align-self: flex-end;
  margin: 20px 20px 0 0;
  padding: 8px 14px;
  border: 1px solid var(--rule);
  border-radius: 100px;
  background: var(--paper);
  color: var(--ink);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 2;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.cs-drawer-close:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--paper);
}

.cs-drawer-content {
  padding: 8px 48px 40px;
  flex: 1;
}

.cs-drawer-top {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
}

.cs-drawer-num {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--ink-3);
}

.cs-drawer-title {
  font-family: 'DM Serif Display', serif;
  font-size: 34px;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: var(--ink);
  white-space: pre-line;
  margin-bottom: 16px;
}

.cs-drawer-role {
  font-size: 13px;
  color: var(--accent-mid);
  margin-bottom: 20px;
}

.cs-drawer-desc {
  font-size: 16px;
  line-height: 1.75;
  color: var(--ink-2);
  margin-bottom: 32px;
}

.cs-drawer-facts {
  padding-top: 24px;
  margin-bottom: 24px;
  border-top: 0.5px solid var(--rule);
}

.cs-drawer-facts-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 10px;
}

.cs-drawer-scope {
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink-2);
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 0.5px solid var(--rule);
}

.cs-drawer-stats {
  display: flex;
  gap: 32px;
}

.cs-drawer-nav {
  display: flex;
  border-top: 0.5px solid var(--rule);
  margin-top: auto;
}

.cs-drawer-nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 48px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}

.cs-drawer-nav-btn:hover {
  background: var(--paper-2);
}

.cs-drawer-nav-btn.align-right {
  text-align: right;
  align-items: flex-end;
  border-left: 0.5px solid var(--rule);
}

.cs-drawer-nav-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.cs-drawer-nav-title {
  font-family: 'DM Serif Display', serif;
  font-size: 15px;
  color: var(--ink);
}

.cs-drawer-enter-active,
.cs-drawer-leave-active {
  transition: opacity 0.25s ease;
}

.cs-drawer-enter-from,
.cs-drawer-leave-to {
  opacity: 0;
}

.cs-drawer-enter-active .cs-drawer,
.cs-drawer-leave-active .cs-drawer {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.cs-drawer-enter-from .cs-drawer,
.cs-drawer-leave-to .cs-drawer {
  transform: translateX(100%);
}

@media (max-width: 700px) {
  .cs-drawer {
    width: 100%;
  }

  .cs-drawer-content {
    padding: 8px 24px 32px;
  }

  .cs-drawer-title {
    font-size: 26px;
  }

  .cs-drawer-nav-btn {
    padding: 16px 24px;
  }
}
</style>
