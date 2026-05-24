import { mkdir, readFile, stat, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'
import type { Plugin } from 'vite'

const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" rx="32" fill="#1a3a2a"/><text x="50%" y="62%" text-anchor="middle" font-family="'DM Serif Display',Georgia,serif" font-size="140" font-style="italic" fill="#f5f2ec">J</text></svg>`

const ensureSvgExists = async (svgPath: string) => {
    try {
        await access(svgPath)
    } catch {
        await mkdir(path.dirname(svgPath), { recursive: true })
        await writeFile(svgPath, PLACEHOLDER_SVG, 'utf8')
    }
}

const generateFavicons = async (sourceSvgPath: string, outputDir: string) => {
    const rasterize = async (svgBuffer: Buffer, size: number) =>
        sharp(svgBuffer, { density: 1024 })
            .resize(size, size, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .png()
            .toBuffer()

    await mkdir(outputDir, { recursive: true })
    const svgBuffer = await readFile(sourceSvgPath)

    const [basePng, png32, png16, apple180] = await Promise.all([
        rasterize(svgBuffer, 64),
        rasterize(svgBuffer, 32),
        rasterize(svgBuffer, 16),
        rasterize(svgBuffer, 180),
    ])

    const icoBuffer = await pngToIco([png32, png16])

    await Promise.all([
        writeFile(path.join(outputDir, 'favicon.png'), basePng),
        writeFile(path.join(outputDir, 'favicon-32x32.png'), png32),
        writeFile(path.join(outputDir, 'favicon-16x16.png'), png16),
        writeFile(path.join(outputDir, 'apple-touch-icon.png'), apple180),
        writeFile(path.join(outputDir, 'favicon.ico'), icoBuffer),
        writeFile(path.join(outputDir, 'favicon.svg'), svgBuffer),
    ])
}

export const faviconPlugin = (): Plugin => {
    let rootDir = ''
    let outDir = ''
    let sourceSvgPath = ''
    let faviconVersion = ''
    let isBuild = false

    return {
        name: 'generate-favicons-from-svg',
        async configResolved(config) {
            rootDir = config.root
            outDir = path.resolve(rootDir, config.build.outDir)
            sourceSvgPath = path.join(rootDir, 'public', 'logo-square.svg')
            await ensureSvgExists(sourceSvgPath)
            const { mtimeMs } = await stat(sourceSvgPath)
            faviconVersion = Math.floor(mtimeMs).toString()
            isBuild = config.command === 'build'
        },
        async closeBundle() {
            if (!isBuild) {
                return
            }

            await generateFavicons(sourceSvgPath, outDir)
        },
        async transformIndexHtml(html) {
            return html.replaceAll('__FAVICON_VERSION__', faviconVersion)
        },
    }
}
