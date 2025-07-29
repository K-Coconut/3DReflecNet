import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root directory
const PROJECT_ROOT = path.join(__dirname, "../../");
const WEB_ROOT = path.join(__dirname, "../");
const PUBLIC_DIR = path.join(WEB_ROOT, "public");
const LIDARS_SOURCE_DIR = path.join(PROJECT_ROOT, "lidars");
const LIDARS_DIR = path.join(PUBLIC_DIR, "lidars");

// Get image files in folder
function getImagesInFolder(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files
      .filter((file) => file.endsWith(".png"))
      .sort((a, b) => {
        // Sort by frame number
        const frameA = parseInt(a.match(/\d+/)?.[0] || "0");
        const frameB = parseInt(b.match(/\d+/)?.[0] || "0");
        return frameA - frameB;
      });
  } catch (error) {
    return [];
  }
}

// Format scan name
function formatScanName(folderName) {
  // Convert folder_name to Folder Name
  return folderName
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// Scan single lidar folder
function scanLidarFolder(lidarPath, folderName) {
  try {
    // Get all PNG files in the folder
    const frames = getImagesInFolder(lidarPath);
    
    if (frames.length === 0) {
      console.warn(`Warning: ${folderName} has no PNG files, skipping`);
      return null;
    }

    // Use the first frame as preview
    const preview = `/lidars/${folderName}/${frames[0]}`;

    return {
      id: folderName,
      name: formatScanName(folderName),
      frameCount: frames.length,
      frames: frames,
      preview: preview,
      firstFrame: frames[0],
      lastFrame: frames[frames.length - 1],
    };
  } catch (error) {
    console.error(`Error processing ${folderName}:`, error);
    return null;
  }
}

// Main function
async function buildData() {
  console.log("Starting LiDAR data scan...");
  console.log("LiDAR source directory:", LIDARS_SOURCE_DIR);

  // Check if lidars directory exists
  if (!fs.existsSync(LIDARS_SOURCE_DIR)) {
    console.error(
      `Error: lidars directory does not exist: ${LIDARS_SOURCE_DIR}`
    );
    console.log(
      "Please ensure LiDAR scan folders are placed in the lidars directory"
    );
    return;
  }

  // Read folders under lidars directory
  const scanFolders = fs.readdirSync(LIDARS_SOURCE_DIR);
  const lidars = [];

  // Scan each LiDAR folder
  for (const folder of scanFolders) {
    const lidarPath = path.join(LIDARS_SOURCE_DIR, folder);
    const stat = fs.statSync(lidarPath);

    if (!stat.isDirectory()) continue;

    console.log(`Scanning LiDAR folder: ${folder}`);
    const lidarData = scanLidarFolder(lidarPath, folder);

    if (lidarData) {
      lidars.push(lidarData);
    }
  }

  // Generate index data
  const indexData = {
    lidars: lidars,
    totalLidars: lidars.length,
    lastUpdated: new Date().toISOString(),
  };

  // Ensure output directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Write index file
  const outputPath = path.join(PUBLIC_DIR, "lidars.json");
  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));

  console.log(`\nData build completed!`);
  console.log(`- Found ${lidars.length} LiDAR scans`);
  console.log(`- Index file saved to: ${outputPath}`);

  // Create symbolic links or copy files to public/lidars directory
  console.log("\nCreating LiDAR data links...");

  // Ensure public/lidars directory exists
  if (!fs.existsSync(LIDARS_DIR)) {
    fs.mkdirSync(LIDARS_DIR, { recursive: true });
  }

  // Copy LiDAR folders to public/lidars
  for (const lidar of lidars) {
    const sourceDir = path.join(LIDARS_SOURCE_DIR, lidar.id);
    const targetDir = path.join(LIDARS_DIR, lidar.id);

    // If target directory exists, delete it first
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }

    // Create symbolic link (development) or copy files (production)
    if (process.env.NODE_ENV === "production") {
      console.log(`Copying LiDAR data: ${lidar.id}`);
      copyFolderRecursiveSync(sourceDir, targetDir);
    } else {
      console.log(`Creating symbolic link: ${lidar.id}`);
      try {
        fs.symlinkSync(sourceDir, targetDir, "dir");
      } catch (error) {
        console.warn(
          `Failed to create symbolic link, attempting to copy: ${lidar.id}`
        );
        copyFolderRecursiveSync(sourceDir, targetDir);
      }
    }
  }

  console.log("\nNote: LiDAR data preparation completed");
}

// Recursively copy folder
function copyFolderRecursiveSync(source, target) {
  // Create target folder
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Copy files and subfolders
  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderRecursiveSync(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// Execute build
buildData().catch(console.error);