<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as CookieConsent from 'vanilla-cookieconsent/dist/cookieconsent.esm.js'
import ConsentBanner from './components/ConsentBanner.vue'
import MapModal from './components/MapModal.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeStrip from './components/MarqueeStrip.vue'
import WorkSection from './components/WorkSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterBar from './components/FooterBar.vue'
import QrOverlay from './components/QrOverlay.vue'
const isMapOpen = ref(false)
const openMapModal = () => {
    trackEvent('location_pill_click', { location: 'Tuxedo Park, NY', source: 'hero_location_pill', maps: 'google' })
    isMapOpen.value = true
}
const closeMapModal = () => {
    isMapOpen.value = false
}
import { siteConfig } from './config/site'
import { trackEvent, trackPageView } from './lib/analytics'

const isQrZoomed = ref(false)
const activeSection = ref('work')
const viewedSections = new Set<string>()
const trackedScrollDepths = new Set<number>()

let sectionObserver: IntersectionObserver | null = null

const toggleQrZoom = (source: 'hero_location_pill' | 'contact_qr'): void => {
    trackEvent('qr_code_toggle', { expanded: !isQrZoomed.value, source })
    isQrZoomed.value = !isQrZoomed.value
}

const closeQrZoom = (): void => {
    trackEvent('qr_code_toggle', { expanded: false, source: 'overlay_close' })
    isQrZoomed.value = false
}

const openPrivacyPreferences = (): void => {
    CookieConsent.showPreferences()
}

const getCaseStudyTagClass = (variant?: 'default' | 'gold' | 'muted'): string => {
    if (variant === 'gold') {
        return 'case-study-tag gold'
    }

    if (variant === 'muted') {
        return 'case-study-tag muted'
    }

    return 'case-study-tag'
}

const repeatedMarqueeItems = computed(() => [...siteConfig.marqueeItems, ...siteConfig.marqueeItems])

const sectionIds = ['work', 'about', 'contact'] as const

const getSectionFromHref = (href: string): string | null => {
    if (!href.startsWith('#')) {
        return null
    }

    const id = href.slice(1)
    return sectionIds.includes(id as (typeof sectionIds)[number]) ? id : null
}

const updateActiveSection = (): void => {
    const navOffset = 120
    let currentSection = activeSection.value

    // If at or near the bottom, always highlight contact
    const scrollBottom = window.innerHeight + window.scrollY
    const docHeight = document.documentElement.scrollHeight
    if (docHeight - scrollBottom < 40) {
        activeSection.value = 'contact'
        return
    }

    for (const id of sectionIds) {
        const sectionEl = document.getElementById(id)
        if (!sectionEl) {
            continue
        }

        const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY
        if (window.scrollY + navOffset >= sectionTop) {
            currentSection = id
        }
    }

    activeSection.value = currentSection
}

const trackScrollDepth = (): void => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll <= 0) {
        return
    }

    const percent = Math.round((window.scrollY / maxScroll) * 100)
    const milestones = [25, 50, 75, 100]

    for (const milestone of milestones) {
        if (percent >= milestone && !trackedScrollDepths.has(milestone)) {
            trackedScrollDepths.add(milestone)
            trackEvent('scroll_depth', { depth_percent: milestone })
        }
    }
}

const handleWindowScroll = (): void => {
    trackScrollDepth()
    updateActiveSection()
}

const handleHashChange = (): void => {
    trackPageView(`${window.location.pathname}${window.location.hash}`)
    trackEvent('section_navigation', { hash: window.location.hash || '#top' })
    const targetSection = window.location.hash.replace('#', '')
    if (sectionIds.includes(targetSection as (typeof sectionIds)[number])) {
        activeSection.value = targetSection
    }
}

const setupSectionObserver = (): void => {
    if (!('IntersectionObserver' in window)) {
        return
    }

    sectionObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) {
                    continue
                }

                const sectionId = entry.target.id
                if (!sectionId || viewedSections.has(sectionId)) {
                    continue
                }

                viewedSections.add(sectionId)
                trackEvent('section_view', { section_id: sectionId })
            }
        },
        {
            threshold: 0.4,
        },
    )

    for (const sectionId of ['work', 'about', 'contact']) {
        const el = document.getElementById(sectionId)
        if (el) {
            sectionObserver.observe(el)
        }
    }
}

watch(isQrZoomed, (zoomed) => {
    document.body.style.overflow = zoomed ? 'hidden' : ''
})

onMounted(() => {
    setupSectionObserver()
    updateActiveSection()
    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    window.addEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
    document.body.style.overflow = ''
    sectionObserver?.disconnect()
    sectionObserver = null
    window.removeEventListener('scroll', handleWindowScroll)
    window.removeEventListener('hashchange', handleHashChange)
})
</script>

<template>
    <main>
        <NavBar :activeSection="activeSection" :getSectionFromHref="getSectionFromHref" :trackEvent="trackEvent" />

        <HeroSection :openMapModal="openMapModal" />
        <MapModal :open="isMapOpen" @close="closeMapModal" />

        <MarqueeStrip :repeatedMarqueeItems="repeatedMarqueeItems" />

        <WorkSection :getCaseStudyTagClass="getCaseStudyTagClass" />

        <AboutSection />

        <ContactSection :toggleQrZoom="toggleQrZoom" />

        <FooterBar :openPrivacyPreferences="openPrivacyPreferences" :trackEvent="trackEvent" />

        <ConsentBanner />

        <QrOverlay :isQrZoomed="isQrZoomed" :closeQrZoom="closeQrZoom" :toggleQrZoom="toggleQrZoom"
            :vcard="siteConfig.vcard" :vcardContact="siteConfig.vcardContact" />
    </main>
</template>
