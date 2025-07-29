import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENVIRONMENTS_DIR = path.join(__dirname, '../../environments');
const THUMBNAILS_DIR = path.join(__dirname, '../public/environments/thumbnails');

async function generateThumbnail(exrPath, outputPath) {
  try {
    // Note: sharp doesn't support EXR directly, so we'll use a placeholder approach
    // For actual EXR support, you'd need to use Python script or other tools
    
    // For now, create a placeholder based on the filename
    const filename = path.basename(exrPath, '.exr');
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
      '#48dbfb', '#ff9ff3', '#54a0ff', '#feca57', '#ff6b6b'
    ];
    const colorIndex = filename.charCodeAt(0) % colors.length;
    const color = colors[colorIndex];
    
    // Create SVG with the color
    const svg = `
      <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="${color}"/>
        <text x="200" y="112" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em">
          ${filename.replace(/_/g, ' ')}
        </text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    console.error(`Error generating thumbnail for ${exrPath}:`, error);
    return false;
  }
}

async function main() {
  // Create thumbnails directory if it doesn't exist
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  }
  
  // Get all EXR files
  const files = fs.readdirSync(ENVIRONMENTS_DIR);
  const exrFiles = files.filter(file => file.endsWith('.exr'));
  
  console.log(`Found ${exrFiles.length} EXR files`);
  console.log('Generating thumbnails...\n');
  
  let successCount = 0;
  
  for (const exrFile of exrFiles) {
    const exrPath = path.join(ENVIRONMENTS_DIR, exrFile);
    const thumbnailName = exrFile.replace('.exr', '_thumb.png');
    const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailName);
    
    console.log(`Processing ${exrFile}...`);
    
    if (await generateThumbnail(exrPath, thumbnailPath)) {
      successCount++;
      console.log(`  ✓ Generated ${thumbnailName}`);
    } else {
      console.log(`  ✗ Failed to generate thumbnail`);
    }
  }
  
  console.log(`\nCompleted! Generated ${successCount}/${exrFiles.length} thumbnails`);
  console.log(`Thumbnails saved to: ${THUMBNAILS_DIR}`);
}

// Check if sharp is installed
try {
  await import('sharp');
  main();
} catch (error) {
  console.error('Error: sharp is not installed.');
  console.log('Please run: npm install --save-dev sharp');
  process.exit(1);
}