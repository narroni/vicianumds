// One-off image optimization pipeline.
//
// Reads full-resolution originals from images-source/ and writes resized
// WebP + JPEG variants into public/images/, named <basename>-<width>.<ext>.
// Re-run this whenever a source photo in images-source/ is added or
// replaced: `node scripts/optimize-images.mjs`
//
// Widths were chosen to cover how these images are actually displayed
// across the site: from the ~280-400px service icons and hero circular
// thumbnail up to the full-bleed hero background / gallery tiles. The
// sources are 1024x1024, so 1024 is also the largest useful output —
// upscaling beyond the source resolution would just add bytes with no
// quality gain.

import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = path.join(import.meta.dirname, '..', 'images-source')
const OUTPUT_DIR = path.join(import.meta.dirname, '..', 'public', 'images')

const WIDTHS = [400, 700, 1024]
const WEBP_QUALITY = 75
const JPEG_QUALITY = 78

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  const files = (await readdir(SOURCE_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f))

  for (const file of files) {
    const name = path.parse(file).name
    const srcPath = path.join(SOURCE_DIR, file)

    for (const width of WIDTHS) {
      const base = sharp(srcPath).resize({ width, withoutEnlargement: true })

      const webpPath = path.join(OUTPUT_DIR, `${name}-${width}.webp`)
      await base.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath)

      // Flatten onto white before JPEG re-encode in case a source has alpha
      // (all current sources don't, but this keeps the script safe for future ones).
      const jpegPath = path.join(OUTPUT_DIR, `${name}-${width}.jpg`)
      await base.clone().flatten({ background: '#ffffff' }).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpegPath)

      console.log(`  ${name}-${width}.webp / .jpg`)
    }
  }

  console.log(`\nDone — ${files.length} source image(s) × ${WIDTHS.length} widths written to public/images/`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
