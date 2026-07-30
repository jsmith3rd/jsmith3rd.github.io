import type { Plugin } from 'vite'

const PUBLISHED_TIME = '2026-05-24T00:00:00-04:00'

export const articleDatesPlugin = (): Plugin => {
    let modifiedTime = ''

    return {
        name: 'inject-article-dates',
        configResolved() {
            modifiedTime = new Date().toISOString()
        },
        transformIndexHtml(html) {
            return html
                .replaceAll('__ARTICLE_PUBLISHED_TIME__', PUBLISHED_TIME)
                .replaceAll('__ARTICLE_MODIFIED_TIME__', modifiedTime)
        },
    }
}
