const fs = require('fs');
const sharp = require('sharp');

const svg = `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#dbeafe" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#eef2ff"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <circle cx="400" cy="225" r="52" fill="#1e40af" opacity="0.15"/>
  <circle cx="400" cy="225" r="18" fill="#e95401"/>
  <circle cx="400" cy="225" r="7" fill="#ffffff"/>
</svg>`;

const output = 'src/assets/images/contact/contact-map-preview.webp';

sharp(Buffer.from(svg))
    .webp({ quality: 72 })
    .toFile(output)
    .then(() => {
        const sizeKb = (fs.statSync(output).size / 1024).toFixed(1);
        console.log(`Saved ${output} (${sizeKb} KB)`);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
