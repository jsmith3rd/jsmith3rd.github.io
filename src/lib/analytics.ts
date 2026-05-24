import type { App } from 'vue'
import { addGtag, consentDeniedAll, consentGrantedAll, createGtag, event, optIn, optOut, pageview } from 'vue-gtag'

const measurementId = import.meta.env.VITE_GTAG_ID as string | undefined

let gtagInstalled = false
let gtagLoaded = false

export const installAnalytics = (app: App): void => {
  if (!measurementId) {
    return
  }

  app.use(
    createGtag({
      tagId: measurementId,
      initMode: 'manual',
      consentMode: 'denied',
      config: {
        anonymize_ip: true,
      },
    }),
  )

  gtagInstalled = true

  // Start from denied until CookieConsent confirms analytics acceptance.
  consentDeniedAll('default')
  optOut()
}

export const trackPageView = (pagePath?: string): void => {
  if (!measurementId || !gtagInstalled || !gtagLoaded) {
    return
  }

  pageview({
    page_path: pagePath ?? `${window.location.pathname}${window.location.hash}`,
  })
}

export const setAnalyticsConsent = (granted: boolean): void => {
  if (!measurementId || !gtagInstalled) {
    return
  }

  if (granted) {
    consentGrantedAll('update')
    optIn()

    if (!gtagLoaded) {
      void addGtag().then(() => {
        gtagLoaded = true
        trackPageView()
      })

      return
    }

    trackPageView()

    return
  }

  consentDeniedAll('update')
  optOut()
}

export const trackEvent = (name: string, params?: Record<string, unknown>): void => {
  if (!measurementId || !gtagInstalled || !gtagLoaded) {
    return
  }

  event(name, params)
}