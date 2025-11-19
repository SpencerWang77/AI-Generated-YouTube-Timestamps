const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const size = 30;
  const radius = 6;
  const padding = 3;
  const logoSize = size - (padding * 2);
  
  // Create rounded blue rectangle background
  const svgBackground = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${radius}" fill="#667eea"/>
    </svg>
  `;
  
  try {
    // Load the logo
    const logoPath = path.join(__dirname, 'src', 'assets', 'logo.png');
    const logo = sharp(logoPath);
    const logoMetadata = await logo.metadata();
    
    // Resize logo to fit with padding
    const resizedLogo = await logo
      .resize(logoSize, logoSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();
    
    // Create the background
    const background = sharp(Buffer.from(svgBackground))
      .resize(size, size)
      .png();
    
    // Composite logo on top of background
    const outputPath = path.join(__dirname, 'public', 'logo.png');
    await background
      .composite([{
        input: resizedLogo,
        top: padding,
        left: padding
      }])
      .png()
      .toFile(outputPath);
    
    console.log('✅ Favicon generated successfully at public/logo.png');
  } catch (error) {
    console.error('❌ Error generating favicon:', error.message);
    process.exit(1);
  }
}

generateFavicon();

