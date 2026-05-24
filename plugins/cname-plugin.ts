import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

export const cnamePlugin = (): Plugin => {
    let outDir = ''
    let isBuild = false

    return {
        name: 'copy-cname',
        async configResolved(config) {
            outDir = path.resolve(config.root, config.build.outDir)
            isBuild = config.command === 'build'
        },
        async closeBundle() {
            if (!isBuild) {
                return
            }

            await copyFile(
                path.join(outDir, '..', 'CNAME'),
                path.join(outDir, 'CNAME'),
            )
        },
    }
}
