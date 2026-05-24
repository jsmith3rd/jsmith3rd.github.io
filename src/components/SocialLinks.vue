<script setup lang="ts">
import type { SocialLink } from '../config/site'
import { trackEvent } from '../lib/analytics'

const props = defineProps<{
    links: SocialLink[]
}>()

const EXTERNAL_LINK_ATTRS = {
    target: '_blank',
    rel: 'noreferrer noopener',
} as const

const sanitizeHex = (value: string | undefined, fallback: string) =>
    value?.replace('#', '').slice(0, 6) || fallback

const getLinkAttrs = (link: SocialLink) => {
    if (link.kind === 'external') {
        return EXTERNAL_LINK_ATTRS
    }

    return {
        target: undefined,
        rel: undefined,
    }
}

const buildBadgeUrl = (link: SocialLink) => {
    const base = 'https://custom-icon-badges.demolab.com/badge'
    const style = link.badge.style ?? 'flat-square'
    const badgeColor = sanitizeHex(link.badge.color, '0a0e16')
    const params = new URLSearchParams({
        style,
        logo: link.badge.logo,
        logoColor: link.badge.logoColor ?? 'white',
        labelColor: sanitizeHex(link.badge.labelColor, badgeColor),
        messageColor: sanitizeHex(link.badge.messageColor, badgeColor),
    })

    return `${base}/-%20-${badgeColor}?${params.toString()}`
}
</script>

<template>
    <ul class="social-links" aria-label="Social and contact links">
        <li v-for="(link, index) in props.links" :key="link.href"
            :style="{ '--stagger-delay': `${360 + index * 60}ms` }">
            <a :href="link.href" v-bind="getLinkAttrs(link)"
                @click="trackEvent('social_link_click', { link_label: link.label, link_url: link.href })">
                <img class="social-icon" :src="buildBadgeUrl(link)" alt="" aria-hidden="true" loading="lazy"
                    decoding="async" />
                <span class="social-platform">{{ link.label }}</span>
                <span v-if="link.name" class="social-separator" aria-hidden="true">/</span>
                <span v-if="link.name" class="social-name">{{ link.name }}</span>
            </a>
        </li>
    </ul>
</template>

<style scoped>
.social-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.72rem;
    flex-wrap: nowrap;
}

.social-links li {
    flex: 0 0 auto;
    animation-delay: var(--stagger-delay, 360ms);
}

.social-links a {
    display: inline-flex;
    align-items: center;
    gap: 0.66rem;
    padding: 0.62rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(237, 242, 255, 0.22);
    background: rgba(10, 14, 22, 0.72);
    color: var(--text);
    text-decoration: none;
    font-family: var(--font-display);
    font-size: 0.86rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    transition:
        transform 200ms ease,
        background-color 200ms ease,
        border-color 200ms ease,
        box-shadow 200ms ease;
}

.social-icon {
    display: block;
    height: 18px;
    width: auto;
    border-radius: 0;
    flex-shrink: 0;
}

.social-platform {
    color: rgba(237, 242, 255, 0.95);
    font-weight: 600;
}

.social-separator {
    color: rgba(155, 168, 194, 0.75);
    font-weight: 500;
}

.social-name {
    color: var(--muted);
    font-weight: 500;
    flex-shrink: 0;
}

.social-links a:hover {
    transform: translateY(-1px);
    background: rgba(21, 32, 45, 0.9);
    border-color: rgba(120, 228, 255, 0.48);
    box-shadow: 0 10px 24px -14px rgba(120, 228, 255, 0.65);
}

.social-links a:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
}

@container (max-width: 760px) {
    .social-links {
        flex-direction: column;
        align-items: flex-start;
    }

    .social-links li {
        flex: initial;
        width: auto;
    }

    .social-links a {
        width: auto;
        justify-content: flex-start;
    }
}

@media (prefers-reduced-motion: reduce) {

    .social-links li,
    .social-links a {
        animation: none;
        transition: none !important;
        opacity: 1;
    }

    .social-links a:hover {
        transform: none;
    }
}
</style>
