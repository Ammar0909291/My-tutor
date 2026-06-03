const fs = require('fs')
const path = require('path')

// Generate a minimal valid PNG with coral background
// PNG structure: signature + IHDR + IDAT + IEND
function createPNG(size) {
  const { deflateSync } = require('zlib')

  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR chunk
  function chunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii')
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const crcData = Buffer.concat([typeBuf, data])
    const crc = crc32(crcData)
    const crcBuf = Buffer.alloc(4); crcBuf.writeInt32BE(crc)
    return Buffer.concat([len, typeBuf, data, crcBuf])
  }

  // CRC32 table
  const table = (() => {
    const t = new Int32Array(256)
    for (let i = 0; i < 256; i++) {
      let c = i
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
      t[i] = c
    }
    return t
  })()
  function crc32(buf) {
    let c = -1
    for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8)
    return c ^ -1
  }

  // IHDR
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(size, 0)   // width
  ihdrData.writeUInt32BE(size, 4)   // height
  ihdrData[8] = 8                    // bit depth
  ihdrData[9] = 2                    // color type: RGB
  ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0

  // Image data — coral #F78166 = rgb(247,129,102)
  const r = 247, g = 129, b = 102
  const rows = []
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3)
    row[0] = 0 // filter type: none
    for (let x = 0; x < size; x++) {
      row[1 + x * 3] = r
      row[2 + x * 3] = g
      row[3 + x * 3] = b
    }
    rows.push(row)
  }
  const raw = Buffer.concat(rows)
  const compressed = deflateSync(raw)

  const ihdr = chunk('IHDR', ihdrData)
  const idat = chunk('IDAT', compressed)
  const iend = chunk('IEND', Buffer.alloc(0))

  return Buffer.concat([sig, ihdr, idat, iend])
}

const outDir = path.join(__dirname, '../public/icons')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'icon-192.png'), createPNG(192))
fs.writeFileSync(path.join(outDir, 'icon-512.png'), createPNG(512))
console.log('Icons generated: icon-192.png, icon-512.png')
