<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent/dist/cookieconsent.esm.js'
import { setAnalyticsConsent } from '../lib/analytics'

const privacyPolicyHref = 'https://github.com/jsmith3rd/jsmith3rd.github.io'
const LEGACY_STORAGE_KEY = 'site-consent-choice'
const CONSENT_STORAGE_KEY = 'jsmith3rd-cookie-consent'

const syncAnalyticsConsent = (): void => {
    setAnalyticsConsent(CookieConsent.acceptedCategory('analytics'))
}

onMounted(() => {
    window.localStorage.removeItem(LEGACY_STORAGE_KEY)
    CookieConsent.reset()

    void CookieConsent.run({
        root: document.body,
        mode: 'opt-in',
        autoShow: true,
        disablePageInteraction: false,
        hideFromBots: true,
        cookie: {
            name: CONSENT_STORAGE_KEY,
            useLocalStorage: true,
            expiresAfterDays: 182,
        },
        guiOptions: {
            consentModal: {
                layout: 'bar inline',
                position: 'bottom',
                equalWeightButtons: false,
                flipButtons: false,
            },
            preferencesModal: {
                layout: 'box',
                equalWeightButtons: false,
                flipButtons: false,
            },
        },
        categories: {
            necessary: {
                enabled: true,
                readOnly: true,
            },
            analytics: {},
        },
        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'Privacy Preferences',
                        description:
                            'This site uses a small amount of browser storage to remember your consent choice. You can accept optional analytics or decline and continue with only the essential storage required for the site to function.',
                        acceptAllBtn: 'Accept',
                        acceptNecessaryBtn: 'Decline',
                        showPreferencesBtn: 'Manage preferences',
                        footer: `<a href="${privacyPolicyHref}" target="_blank" rel="noopener noreferrer">Privacy details</a>`,
                    },
                    preferencesModal: {
                        title: 'Manage Privacy Preferences',
                        acceptAllBtn: 'Accept',
                        acceptNecessaryBtn: 'Decline',
                        savePreferencesBtn: 'Save choices',
                        closeIconLabel: 'Close preferences',
                        sections: [
                            {
                                title: 'Consent choices',
                                description:
                                    'Description: Choose whether this site may store analytics preferences on this device. Essential storage stays enabled so your consent choice can be remembered.',
                            },
                            {
                                title: 'Essential storage',
                                description:
                                    'Description: Required to store your consent selection and keep the site functioning correctly.',
                                linkedCategory: 'necessary',
                            },
                            {
                                title: 'Analytics',
                                description:
                                    'Description: Optional analytics can be enabled later if you decide you want lightweight usage measurement.',
                                linkedCategory: 'analytics',
                            },
                        ],
                    },
                },
            },
        },
        onFirstConsent: syncAnalyticsConsent,
        onConsent: syncAnalyticsConsent,
        onChange: ({ changedCategories }: { changedCategories: string[] }) => {
            if (changedCategories.includes('analytics')) {
                syncAnalyticsConsent()
            }
        },
    })
})

onBeforeUnmount(() => {
    CookieConsent.reset()
})
</script>

<template></template>