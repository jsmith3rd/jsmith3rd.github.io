<script setup lang="ts">
// import removed: no longer needed
import { siteConfig } from '../config/site'
</script>

<template>
  <section class="hero">
    <div class="hero-left">
      <div class="hero-left-inner">
        <p class="hero-eyebrow">{{ siteConfig.hero.eyebrow }}</p>
        <h1 class="hero-name">{{ siteConfig.hero.nameFirstLine }}<br /><em>{{ siteConfig.hero.nameEmphasis }}</em></h1>
        <p class="hero-title">{{ siteConfig.hero.description }}</p>

        <div class="hero-meta">
          <template v-for="(metric, index) in siteConfig.hero.metrics" :key="metric.label">
            <div class="hero-meta-item">
              <span class="meta-num">{{ metric.value }}</span>
              <span class="meta-label">{{ metric.label }}</span>
            </div>
            <div v-if="index < siteConfig.hero.metrics.length - 1" class="hero-divider"></div>
          </template>
        </div>

        <div class="hero-actions">
          <a :href="siteConfig.hero.actions.primary.href" class="btn-primary">
            {{ siteConfig.hero.actions.primary.label }}
          </a>
          <a :href="siteConfig.hero.actions.ghost.href" class="btn-ghost">
            {{ siteConfig.hero.actions.ghost.label }}
          </a>
        </div>
      </div>
    </div>

    <div class="hero-right">
      <div class="skills-card-centerer">
        <div class="skills-card-bg" aria-hidden="true"></div>
        <div class="skills-card">
          <p class="skills-card-label">Specialties</p>
          <div class="skills-groups">
            <div v-for="group in siteConfig.hero.specialtyGroups" :key="group.label" class="skills-group">
              <p class="skills-group-label">{{ group.label }}</p>
              <div class="skills-list">
                <span v-for="skill in group.items" :key="skill"
                  :class="['skill-tag', { accent: siteConfig.hero.highlightedSpecialties.includes(skill) }]">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>
.hero {
  padding-top: 56px;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  overflow: hidden;
}

.hero-left {
  padding: clamp(80px, 9vw, 160px) clamp(48px, 6vw, 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-left-inner {
  width: 100%;
  max-width: 560px;
}

.hero-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: var(--accent-mid);
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero-eyebrow::before {
  content: '';
  display: block;
  width: 32px;
  height: 1px;
  background: var(--accent-mid);
}

.hero-name {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(48px, 6vw, 80px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 28px;
}

.hero-name em {
  font-style: italic;
  color: var(--accent-mid);
}

.hero-title {
  font-size: 15px;
  font-weight: 400;
  color: var(--ink-2);
  line-height: 1.6;
  max-width: 420px;
  margin-bottom: 40px;
  border-left: 2px solid var(--accent-lt);
  padding-left: 16px;
}

.hero-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 48px;
}

.hero-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-num {
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  color: var(--ink);
  line-height: 1;
}

.meta-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--ink-3);
  text-transform: uppercase;
}

.hero-divider {
  width: 1px;
  background: var(--rule);
  align-self: stretch;
}

.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-primary {
  background: var(--accent);
  color: var(--paper);
  padding: 12px 28px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.15s;
}

.btn-primary:hover {
  background: var(--accent-mid);
}

.btn-ghost {
  color: var(--ink-2);
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.15s;
}

.btn-ghost:hover {
  color: var(--accent);
}

.btn-ghost::after {
  content: '→';
  transition: transform 0.15s;
}

.btn-ghost:hover::after {
  transform: translateX(3px);
}

.hero-right {
  position: relative;
  background: var(--paper-2);
  border-left: 0.5px solid var(--rule);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.skills-card-bg {
  position: absolute;
  left: 50%;
  top: -18px;
  bottom: -18px;
  transform: translateX(-50%);
  width: clamp(320px, 26vw, 460px);
  border: 1.5px solid var(--rule);
  border-radius: 12px;
  z-index: 1;
  background: transparent;
  pointer-events: none;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.03);
}

.skills-card-centerer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 340px;
}

.skills-card {
  background: var(--paper);
  border: 0.5px solid var(--rule);
  border-radius: 2px;
  padding: clamp(28px, 2.2vw, 40px);
  width: clamp(300px, 24vw, 420px);
  position: relative;
  z-index: 2;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skills-groups {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.skills-group-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--accent-mid);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 8px;
}

.skills-card-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--ink-3);
  text-transform: uppercase;
  margin-bottom: 20px;
  align-self: flex-start;
}

.skill-tag {
  display: inline-block;
  background: var(--paper-2);
  border: 0.5px solid var(--rule);
  border-radius: 2px;
  padding: 4px 10px;
  font-size: 11px;
  color: var(--ink-2);
  margin: 0 4px 6px 0;
}

.skill-tag.accent {
  background: var(--accent-lt);
  border-color: var(--accent-mid);
  color: var(--accent);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-right {
    min-height: 440px;
    border-left: 0;
    border-top: 0.5px solid var(--rule);
  }

  .hero-logo-mark {
    display: none;
  }
}

@media (max-width: 700px) {
  .hero-left {
    padding: 28px 16px;
  }

  .hero {
    padding-top: 104px;
  }

  .hero-meta {
    flex-direction: column;
    gap: 14px;
  }

  .hero-divider {
    width: 100%;
    height: 1px;
  }
}
</style>