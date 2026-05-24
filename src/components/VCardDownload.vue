<script setup lang="ts">
import { computed } from 'vue'
import type { VCardContact } from '../config/site'
import { trackEvent } from '../lib/analytics'

const props = defineProps<{
    contact: VCardContact
}>()

const escapeValue = (value: string): string => {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
}

const cardText = computed(() => {
    const { contact } = props
    const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${escapeValue(contact.lastName)};${escapeValue(contact.firstName)};;;`,
        `FN:${escapeValue(contact.fullName)}`,
    ]

    if (contact.organization) {
        lines.push(`ORG:${escapeValue(contact.organization)}`)
    }

    if (contact.title) {
        lines.push(`TITLE:${escapeValue(contact.title)}`)
    }

    if (contact.email) {
        lines.push(`EMAIL;TYPE=INTERNET:${escapeValue(contact.email)}`)
    }

    if (contact.phone) {
        lines.push(`TEL;TYPE=CELL:${escapeValue(contact.phone)}`)
    }

    if (contact.website) {
        lines.push(`URL:${escapeValue(contact.website)}`)
    }

    if (contact.note) {
        lines.push(`NOTE:${escapeValue(contact.note)}`)
    }

    lines.push('END:VCARD')
    return lines.join('\r\n')
})

const downloadHref = computed(() => {
    return `data:text/vcard;charset=utf-8,${encodeURIComponent(cardText.value)}`
})
</script>

<template>
    <a class="vcard-download" :href="downloadHref" :download="contact.fileName"
        @click="trackEvent('vcard_download', { file_name: contact.fileName })">
        {{ contact.downloadLabel }}
    </a>
</template>

<style scoped>
.vcard-download {
    margin-top: 0;
    display: inline-flex;
    align-self: center;
    padding: 8px 14px;
    border-radius: 100px;
    border: 1px solid rgba(200, 221, 209, 0.4);
    background: transparent;
    color: inherit;
    text-decoration: none;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition:
        background-color 180ms ease,
        border-color 180ms ease,
        color 180ms ease;
}

.vcard-download:hover {
    background: rgba(245, 242, 236, 0.12);
    border-color: rgba(245, 242, 236, 0.6);
}

.vcard-download:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
    .vcard-download {
        transition: none !important;
    }
}
</style>
