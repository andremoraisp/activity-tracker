const fs = require('fs');

function createSVGIcon(size) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.35}" fill="none" stroke="white" stroke-width="${size * 0.04}"/>
  <text x="${size/2}" y="${size/2}" font-size="${size * 0.4}" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Arial, sans-serif">🔔</text>
</svg>`;
}

fs.writeFileSync('icon-192.svg', createSVGIcon(192));
fs.writeFileSync('icon-512.svg', createSVGIcon(512));

console.log('Ícones SVG criados com sucesso!');
console.log('Para converter para PNG, você pode:');
console.log('1. Abrir create-icons.html no navegador e baixar os PNGs');
console.log('2. Usar um conversor online como cloudconvert.com');
console.log('3. Usar ImageMagick: convert icon-192.svg icon-192.png');
