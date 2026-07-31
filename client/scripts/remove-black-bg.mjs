import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const input = path.resolve(
  'C:/Users/Admin/.cursor/projects/c-Users-Admin-Desktop-projects-sites-priemka-izh/assets/c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-c1133446-056e-4564-9d3a-5dc66e98b6e0.png'
)
const output = path.resolve('src/assets/images/3d.png')

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const pixels = new Uint8ClampedArray(data)
const visited = new Uint8Array(width * height)
const queue = new Int32Array(width * height)
let qStart = 0
let qEnd = 0

function idx(x, y) {
  return (y * width + x) * channels
}

function sample(x, y) {
  const i = idx(x, y)
  return [pixels[i], pixels[i + 1], pixels[i + 2]]
}

// Average background color from corners + edge midpoints
const probes = [
  sample(2, 2),
  sample(width - 3, 2),
  sample(2, height - 3),
  sample(width - 3, height - 3),
  sample((width / 2) | 0, 2),
  sample((width / 2) | 0, height - 3),
  sample(2, (height / 2) | 0),
  sample(width - 3, (height / 2) | 0),
]
const bg = probes
  .reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0])
  .map((v) => v / probes.length)

const MAX_DIST2 = 38 * 38

function isBg(x, y) {
  const i = idx(x, y)
  const dr = pixels[i] - bg[0]
  const dg = pixels[i + 1] - bg[1]
  const db = pixels[i + 2] - bg[2]
  return dr * dr + dg * dg + db * db <= MAX_DIST2
}

function enqueue(x, y) {
  const key = y * width + x
  if (visited[key]) return
  if (!isBg(x, y)) return
  visited[key] = 1
  queue[qEnd++] = key
}

for (let x = 0; x < width; x++) {
  enqueue(x, 0)
  enqueue(x, height - 1)
}
for (let y = 0; y < height; y++) {
  enqueue(0, y)
  enqueue(width - 1, y)
}

while (qStart < qEnd) {
  const key = queue[qStart++]
  const x = key % width
  const y = (key / width) | 0
  const i = idx(x, y)
  pixels[i + 3] = 0

  if (x > 0) enqueue(x - 1, y)
  if (x + 1 < width) enqueue(x + 1, y)
  if (y > 0) enqueue(x, y - 1)
  if (y + 1 < height) enqueue(x, y + 1)
}

// Soft fringe near cutout
const alphaCopy = new Uint8Array(width * height)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    alphaCopy[y * width + x] = pixels[idx(x, y) + 3]
  }
}

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const key = y * width + x
    if (alphaCopy[key] === 0) continue

    let transparentNeighbors = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        if (alphaCopy[(y + dy) * width + (x + dx)] === 0) transparentNeighbors++
      }
    }

    if (transparentNeighbors === 0) continue

    const i = idx(x, y)
    const dr = pixels[i] - bg[0]
    const dg = pixels[i + 1] - bg[1]
    const db = pixels[i + 2] - bg[2]
    const dist2 = dr * dr + dg * dg + db * db

    if (dist2 <= 55 * 55) {
      pixels[i + 3] = Math.max(0, Math.min(255, 255 - transparentNeighbors * 40 - Math.sqrt(dist2)))
    }
  }
}

await sharp(pixels, {
  raw: { width, height, channels },
})
  .trim({
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    threshold: 0,
  })
  .png({ compressionLevel: 9 })
  .toFile(output)

await sharp(output)
  .flatten({ background: { r: 0, g: 139, b: 214 } })
  .jpeg({ quality: 85 })
  .toFile('scripts/3d-preview-on-blue.jpg')

const meta = await sharp(output).metadata()
console.log(`bg≈rgb(${bg.map((v) => v.toFixed(0)).join(',')})`)
console.log(`Saved ${path.relative(process.cwd(), output)} (${meta.width}x${meta.height}, ${((await fs.stat(output)).size / 1024).toFixed(0)}KB)`)
