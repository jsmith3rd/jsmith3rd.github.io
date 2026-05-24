<script setup lang="ts">

const props = defineProps<{
  repeatedMarqueeItems: string[]
}>()
</script>

<template>
  <div class="marquee-strip" aria-hidden="true">
    <div class="marquee-inner">
      <span v-for="(item, index) in props.repeatedMarqueeItems" :key="`marquee-${item}-${index}`" class="marquee-item">
        <span>✦</span>{{ item }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee-strip {
  overflow: hidden;
  border-top: 0.5px solid var(--rule);
  border-bottom: 0.5px solid var(--rule);
  padding: 14px 0;
  white-space: nowrap;
  background: var(--paper-2);
}

.marquee-inner {
  display: inline-block;
  animation: marquee 28s linear infinite;
}

.marquee-item {
  display: inline-block;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--ink-3);
  text-transform: uppercase;
  margin: 0 32px;
}

.marquee-item span {
  color: var(--accent-mid);
  margin-right: 8px;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
