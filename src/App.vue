<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as CookieConsent from 'vanilla-cookieconsent/dist/cookieconsent.esm.js'
import ConsentBanner from './components/ConsentBanner.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import HighlightsBand from './components/HighlightsBand.vue'
import WorkSection from './components/WorkSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterBar from './components/FooterBar.vue'
import QrOverlay from './components/QrOverlay.vue'
import CaseStudyDrawer from './components/CaseStudyDrawer.vue'
import { siteConfig } from './config/site'
import { trackEvent, trackPageView } from './lib/analytics'

const isQrZoomed = ref(false)
const activeCaseStudyIndex = ref<number | null>(null)
const activeSection = ref('work')
const viewedSections = new Set<string>()
const trackedScrollDepths = new Set<number>()
const isOverlayOpen = computed(() => isQrZoomed.value || activeCaseStudyIndex.value !== null)

let sectionObserver: IntersectionObserver | null = null
let lastFocusedElement: HTMLElement | null = null

const toggleQrZoom = (source: 'contact_qr'): void => {
    trackEvent('qr_code_toggle', { expanded: !isQrZoomed.value, source })
    isQrZoomed.value = !isQrZoomed.value
}

const closeQrZoom = (): void => {
    trackEvent('qr_code_toggle', { expanded: false, source: 'overlay_close' })
    isQrZoomed.value = false
}

const openCaseStudy = (id: string): void => {
    const index = siteConfig.caseStudies.findIndex((study) => study.id === id)
    if (index === -1) {
        return
    }

    lastFocusedElement = document.activeElement as HTMLElement | null
    activeCaseStudyIndex.value = index
    trackEvent('case_study_open', { case_study_id: id })
}

const closeCaseStudy = (): void => {
    if (activeCaseStudyIndex.value === null) {
        return
    }

    trackEvent('case_study_close', { case_study_id: siteConfig.caseStudies[activeCaseStudyIndex.value].id })
    activeCaseStudyIndex.value = null
    lastFocusedElement?.focus()
    lastFocusedElement = null
}

const stepCaseStudy = (direction: 1 | -1): void => {
    if (activeCaseStudyIndex.value === null) {
        return
    }

    const total = siteConfig.caseStudies.length
    const nextIndex = (activeCaseStudyIndex.value + direction + total) % total
    activeCaseStudyIndex.value = nextIndex
    trackEvent('case_study_navigate', {
        case_study_id: siteConfig.caseStudies[nextIndex].id,
        direction: direction === 1 ? 'next' : 'previous',
    })
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

watch(isOverlayOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
})

const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') {
        return
    }

    if (activeCaseStudyIndex.value !== null) {
        closeCaseStudy()
    } else if (isQrZoomed.value) {
        closeQrZoom()
    }
}

onMounted(() => {
    setupSectionObserver()
    updateActiveSection()
    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.body.style.overflow = ''
    sectionObserver?.disconnect()
    sectionObserver = null
    window.removeEventListener('scroll', handleWindowScroll)
    window.removeEventListener('hashchange', handleHashChange)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <main>
        <NavBar :activeSection="activeSection" :getSectionFromHref="getSectionFromHref" :trackEvent="trackEvent" />

        <HeroSection />

        <HighlightsBand :eyebrow="siteConfig.highlights.eyebrow" :items="siteConfig.highlights.items" />

        <WorkSection :getCaseStudyTagClass="getCaseStudyTagClass" :openCaseStudy="openCaseStudy" />

        <AboutSection />

        <ContactSection :toggleQrZoom="toggleQrZoom" />

        <FooterBar :openPrivacyPreferences="openPrivacyPreferences" :trackEvent="trackEvent" />

        <ConsentBanner />

        <QrOverlay :isQrZoomed="isQrZoomed" :closeQrZoom="closeQrZoom" :toggleQrZoom="toggleQrZoom"
            :vcard="siteConfig.vcard" :vcardContact="siteConfig.vcardContact" />

        <CaseStudyDrawer :activeIndex="activeCaseStudyIndex" :closeDrawer="closeCaseStudy" :stepCaseStudy="stepCaseStudy"
            :getCaseStudyTagClass="getCaseStudyTagClass" />
    </main>
</template>
