/**
 * Icon Generator for T&C Clarity
 * Generates 16x16, 32x32, 48x48, 128x128 PNG icon files using pure Node.js zlib.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPngBuffer(width, height, r, g, b) {
  // CRC32 table & calculation
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const checksum = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(checksum, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // PNG Header
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit depth
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw Image Data (Filter 0 + RGBA per pixel)
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // filter type 0 (none)
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      
      // Draw shield icon / border logic
      const isMargin = x < 1 || x >= width - 1 || y < 1 || y >= height - 1;
      const isInnerShield = x >= Math.floor(width * 0.2) && x <= Math.floor(width * 0.8) &&
                            y >= Math.floor(height * 0.2) && y <= Math.floor(height * 0.8);
      
      if (isInnerShield) {
        // Deep teal / blue accent: #2563EB -> RGB(37, 99, 235)
        rawData[pxOffset] = 37;
        rawData[pxOffset + 1] = 99;
        rawData[pxOffset + 2] = 235;
        rawData[pxOffset + 3] = 255;
      } else if (!isMargin) {
        // Neutral gray background: #F3F4F6 -> RGB(243, 244, 246)
        rawData[pxOffset] = 243;
        rawData[pxOffset + 1] = 244;
        rawData[pxOffset + 2] = 246;
        rawData[pxOffset + 3] = 255;
      } else {
        // Darker border: #1E293B -> RGB(30, 41, 59)
        rawData[pxOffset] = 30;
        rawData[pxOffset + 1] = 41;
        rawData[pxOffset + 2] = 59;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  // Compress IDAT Chunk
  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.join(__dirname);
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const sizes = [16, 32, 48, 128];
sizes.forEach(size => {
  const buf = createPngBuffer(size, size, 37, 99, 235);
  const filePath = path.join(iconsDir, `icon-${size}.png`);
  fs.writeFileSync(filePath, buf);
  console.log(`Generated: ${filePath}`);
});
