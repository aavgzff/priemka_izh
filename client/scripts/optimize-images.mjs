import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve('src/assets/images')

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listFiles(full)))
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

function planFor(filePath, size) {
  const rel = path.relative(root, filePath).replaceAll('\\', '/')
  const lower = rel.toLowerCase()
  const isPng = /\.png$/i.test(filePath)

  if (lower === 'section-img.jpg') return { width: 1920, quality: 72 }
  if (lower === 'form-img.jpg') return { width: 1400, quality: 72 }
  if (lower === 'intro image.jpg') return { width: 1200, quality: 74 }
  if (lower.startsWith('services/')) {
    return { width: 800, quality: 72, toJpeg: isPng }
  }

  // Large root images used on home/finishing (>800KB)
  if (!rel.includes('/') && size > 800 * 1024) {
    return {
      width: lower.includes('intro') || lower.includes('интро') ? 1920 : 1400,
      quality: 74,
      toJpeg: isPng,
    }
  }

  return null
}

async function optimizeOne(filePath) {
  const before = (await fs.stat(filePath)).size
  const plan = planFor(filePath, before)
  if (!plan) return null

  const tempPath = `${filePath}.tmpopt`
  const outputPath = plan.toJpeg ? filePath.replace(/\.png$/i, '.jpg') : filePath

  let pipeline = sharp(filePath, { failOn: 'none', unlimited: true }).rotate().resize({
    width: plan.width,
    withoutEnlargement: true,
  })

  if (plan.toJpeg || /\.jpe?g$/i.test(filePath)) {
    pipeline = pipeline.jpeg({ quality: plan.quality, mozjpeg: true })
  } else {
    pipeline = pipeline.png({ compressionLevel: 9 })
  }

  await pipeline.toFile(tempPath)

  // Replace atomically via temp in same folder
  const swapPath = `${outputPath}.swap`
  await fs.rename(tempPath, swapPath)

  if (outputPath !== filePath) {
    await fs.unlink(filePath).catch(() => {})
  } else {
    await fs.unlink(filePath)
  }

  await fs.rename(swapPath, outputPath)

  const after = (await fs.stat(outputPath)).size
  console.log(
    `${path.relative(root, filePath)} → ${path.relative(root, outputPath)}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB`
  )
  return { from: filePath, to: outputPath }
}

const all = await listFiles(root)
const results = []
for (const file of all) {
  try {
    const result = await optimizeOne(file)
    if (result) results.push(result)
  } catch (error) {
    console.error('Failed', path.relative(root, file), error.message)
  }
}

console.log(`Optimized ${results.length} files`)
