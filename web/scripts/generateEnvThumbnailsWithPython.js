import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PYTHON_SCRIPT = path.join(__dirname, '../../scripts/generate_env_thumbnails.py');
const THUMBNAILS_DIR = path.join(__dirname, '../public/environments/thumbnails');

function runPythonScript() {
  return new Promise((resolve, reject) => {
    // Check if Python script exists
    if (!fs.existsSync(PYTHON_SCRIPT)) {
      reject(new Error('Python script not found'));
      return;
    }
    
    console.log('Running Python script to generate EXR thumbnails...');
    
    // Run Python script
    const pythonProcess = spawn('python3', [PYTHON_SCRIPT]);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function copyThumbnailsToPublic() {
  const sourceThumbnailsDir = path.join(__dirname, '../../environments/thumbnails');
  
  // Create public thumbnails directory if it doesn't exist
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  }
  
  // Copy thumbnails to public directory
  if (fs.existsSync(sourceThumbnailsDir)) {
    const thumbnails = fs.readdirSync(sourceThumbnailsDir);
    console.log(`\nCopying ${thumbnails.length} thumbnails to public directory...`);
    
    for (const thumbnail of thumbnails) {
      const sourcePath = path.join(sourceThumbnailsDir, thumbnail);
      const destPath = path.join(THUMBNAILS_DIR, thumbnail);
      fs.copyFileSync(sourcePath, destPath);
      console.log(`  ✓ Copied ${thumbnail}`);
    }
  }
}

async function main() {
  try {
    // Check if Python is available
    const checkPython = spawn('python3', ['--version']);
    
    checkPython.on('error', () => {
      console.error('Python 3 is not installed or not in PATH');
      console.log('Please install Python 3 and the required packages:');
      console.log('  pip install opencv-python numpy');
      process.exit(1);
    });
    
    checkPython.on('close', async () => {
      try {
        // Run Python script to generate thumbnails
        await runPythonScript();
        
        // Copy thumbnails to public directory
        await copyThumbnailsToPublic();
        
        console.log('\n✅ Thumbnail generation completed!');
        console.log(`Thumbnails are available at: ${THUMBNAILS_DIR}`);
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();