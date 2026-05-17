import sharp from 'sharp'
import { statSync, unlinkSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '../public')

const targets = [
  'founder-bruno.png',
  'founder-jessica.png',
  'screenshots/cronograma-dia.png',
  'screenshots/cronograma-semana.png',
  'screenshots/dashboard-final.png',
  'screenshots/flashcard-pergunta.png',
  'screenshots/flashcard-resposta.png',
  'screenshots/planos-estudo.png',
  'screenshots/prova-cronometro.png',
  'screenshots/questao-comentada.png',
  'screenshots/redacao-comentarios.png',
  'screenshots/redacao-manuscrita.png',
  'screenshots/redacao-radar.png',
]

for (const rel of targets) {
  const input = join(PUBLIC, rel)
  const output = input.replace(/\.png$/, '.webp')
  try {
    const origSize = statSync(input).size
    const info = await sharp(input).webp({ quality: 82 }).toFile(output)
    const pct = (((origSize - info.size) / origSize) * 100).toFixed(1)
    console.log(`✓ ${rel}  ${(origSize/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB (-${pct}%)`)
    unlinkSync(input)
  } catch (e) {
    console.error(`✗ ${rel}: ${e.message}`)
  }
}
