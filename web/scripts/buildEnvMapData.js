import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENVIRONMENTS_DIR = path.join(__dirname, '../../environments');
const OUTPUT_DIR = path.join(__dirname, '../src/data');
const PUBLIC_ENVIRONMENTS_DIR = path.join(__dirname, '../public/environments');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(PUBLIC_ENVIRONMENTS_DIR)) {
  fs.mkdirSync(PUBLIC_ENVIRONMENTS_DIR, { recursive: true });
}

function generateThumbnails() {
  return new Promise((resolve, reject) => {
    console.log('Generating thumbnails for EXR files...');
    
    const pythonScript = path.join(__dirname, '../../scripts/generate_env_thumbnails.py');
    
    // Check if Python script exists
    if (!fs.existsSync(pythonScript)) {
      console.warn('⚠️  Python thumbnail generation script not found');
      console.log('   Thumbnails will not be generated');
      resolve(false);
      return;
    }
    
    // Run Python script
    const pythonProcess = spawn('python3', [pythonScript]);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(data.toString().trim());
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(data.toString().trim());
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.warn('⚠️  Thumbnail generation failed');
        resolve(false);
      } else {
        resolve(true);
      }
    });
    
    pythonProcess.on('error', (err) => {
      console.warn('⚠️  Could not run Python script:', err.message);
      console.log('   Make sure Python 3 is installed and opencv-python is available');
      resolve(false);
    });
  });
}

async function buildEnvironmentData() {
  const environments = [];
  
  // First, try to generate thumbnails
  const thumbnailsGenerated = await generateThumbnails();
  
  const thumbnailsDir = path.join(PUBLIC_ENVIRONMENTS_DIR, 'thumbnails');

  if (fs.existsSync(ENVIRONMENTS_DIR)) {
    const files = fs.readdirSync(ENVIRONMENTS_DIR);
    
    files.forEach(file => {
      if (file.endsWith('.exr')) {
        const name = file.replace('.exr', '');
        const thumbnailPath = `thumbnails/${name}_thumb.png`;
        const fullThumbnailPath = path.join(thumbnailsDir, `${name}_thumb.png`);
        
        environments.push({
          id: name,
          name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          path: file,
          format: 'exr',
          thumbnail: fs.existsSync(fullThumbnailPath) ? thumbnailPath : null
        });
      }
    });
  }

  // Write environment data
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'environments.json'),
    JSON.stringify(environments, null, 2)
  );

  console.log(`✅ Generated data for ${environments.length} environment maps`);
  if (thumbnailsGenerated) {
    console.log('✅ Thumbnails generated successfully');
  }
}

buildEnvironmentData();