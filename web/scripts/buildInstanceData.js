import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root directory
const PROJECT_ROOT = path.join(__dirname, "../../");
const WEB_ROOT = path.join(__dirname, "../");
const PUBLIC_DIR = path.join(WEB_ROOT, "public");
const INSTANCES_SOURCE_DIR = path.join(PROJECT_ROOT, "instances");
const INSTANCES_DIR = path.join(PUBLIC_DIR, "instances");

// Image types to scan
const IMAGE_TYPES = {
  rgb: "train",
  depth: "depth",
  normal: "normal",
  mask: "mask",
};

// Supported categories
const CATEGORIES = ["household", "industry", "art", "nature"];

// Check if it's an instance folder
function isInstanceFolder(folderName) {
  // Instance folder format: number_name
  return /^\d+_/.test(folderName);
}

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

// Format instance name
function formatInstanceName(folderName) {
  // Convert 1_kloppenheim_02_enamel to Kloppenheim 02 Enamel
  const parts = folderName.split("_");
  parts.shift(); // Remove number prefix
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// Scan single instance
function scanInstance(instancePath, folderName, categoryFolder) {
  const metaPath = path.join(instancePath, "meta.json");

  // Check if meta.json exists
  if (!fs.existsSync(metaPath)) {
    console.warn(`Warning: ${folderName} missing meta.json file, skipping`);
    return null;
  }

  try {
    // Read metadata
    const metaData = JSON.parse(fs.readFileSync(metaPath, "utf8"));

    // Collect images of each type
    const images = {};
    let frameCount = 0;

    for (const [type, folder] of Object.entries(IMAGE_TYPES)) {
      const imagePath = path.join(instancePath, folder);
      const imageFiles = getImagesInFolder(imagePath);
      images[type] = imageFiles;

      // Use RGB image count as total frame count
      if (type === "rgb") {
        frameCount = imageFiles.length;
      }
    }

    // Determine preview image - use frame 11 (index 10) if available, otherwise use first frame
    const previewFrameIndex = images.rgb && images.rgb.length > 10 ? 10 : 0;
    const preview =
      images.rgb && images.rgb.length > 0
        ? `/instances/${categoryFolder}/${folderName}/train/${images.rgb[previewFrameIndex]}`
        : null;

    return {
      id: folderName,
      name: formatInstanceName(folderName),
      category: metaData.category_name || "unknown",
      categoryFolder: categoryFolder,
      material: metaData.material_name || "",
      model: metaData.model_name || "",
      environment: metaData.env_name || "",
      preview: preview,
      images: images,
      frameCount: frameCount,
      metadata: {
        hasGlass: metaData.hasGlass || false,
        isGenerated: metaData.isGenerated || false,
        transparent: metaData.transparent || false,
      },
    };
  } catch (error) {
    console.error(`Error processing ${folderName}:`, error);
    return null;
  }
}

// Main function
async function buildData() {
  console.log("Starting instance data scan...");
  console.log("Instance source directory:", INSTANCES_SOURCE_DIR);

  // Check if instances directory exists
  if (!fs.existsSync(INSTANCES_SOURCE_DIR)) {
    console.error(
      `Error: instances directory does not exist: ${INSTANCES_SOURCE_DIR}`
    );
    console.log(
      "Please ensure instance folders are placed in the instances directory"
    );
    return;
  }

  // Read category folders under instances directory
  const categoryFolders = fs.readdirSync(INSTANCES_SOURCE_DIR);
  const instances = [];
  const categorySet = new Set();

  // Scan each category folder
  for (const categoryFolder of categoryFolders) {
    const categoryPath = path.join(INSTANCES_SOURCE_DIR, categoryFolder);
    const categoryStat = fs.statSync(categoryPath);

    if (!categoryStat.isDirectory()) continue;

    console.log(`Scanning category: ${categoryFolder}`);

    // Read instance folders in category folder
    const instanceFolders = fs.readdirSync(categoryPath);

    for (const folder of instanceFolders) {
      if (!isInstanceFolder(folder)) continue;

      const instancePath = path.join(categoryPath, folder);
      const stat = fs.statSync(instancePath);

      if (!stat.isDirectory()) continue;

      console.log(`  Scanning instance: ${folder}`);
      const instanceData = scanInstance(instancePath, folder, categoryFolder);

      if (instanceData) {
        instances.push(instanceData);
        categorySet.add(instanceData.category);
      }
    }
  }

  // Generate index data
  const indexData = {
    instances: instances,
    categories: Array.from(categorySet).filter((cat) =>
      CATEGORIES.includes(cat)
    ),
    totalInstances: instances.length,
    lastUpdated: new Date().toISOString(),
  };

  // Ensure output directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Write index file
  const outputPath = path.join(PUBLIC_DIR, "instances.json");
  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));

  console.log(`\nData build completed!`);
  console.log(`- Found ${instances.length} instances`);
  console.log(`- Categories: ${indexData.categories.join(", ")}`);
  console.log(`- Index file saved to: ${outputPath}`);

  // Create symbolic links or copy files to public/instances directory
  console.log("\nCreating instance data links...");

  // Ensure public/instances directory exists
  if (!fs.existsSync(INSTANCES_DIR)) {
    fs.mkdirSync(INSTANCES_DIR, { recursive: true });
  }

  // Copy instance folders to public/instances
  for (const instance of instances) {
    const sourceDir = path.join(
      INSTANCES_SOURCE_DIR,
      instance.categoryFolder,
      instance.id
    );
    const targetCategoryDir = path.join(INSTANCES_DIR, instance.categoryFolder);
    const targetDir = path.join(targetCategoryDir, instance.id);

    // Ensure category directory exists
    if (!fs.existsSync(targetCategoryDir)) {
      fs.mkdirSync(targetCategoryDir, { recursive: true });
    }

    // If target directory exists, delete it first
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }

    // Create symbolic link (development) or copy files (production)
    if (process.env.NODE_ENV === "production") {
      console.log(
        `Copying instance data: ${instance.categoryFolder}/${instance.id}`
      );
      copyFolderRecursiveSync(sourceDir, targetDir);
    } else {
      console.log(
        `Creating symbolic link: ${instance.categoryFolder}/${instance.id}`
      );
      try {
        fs.symlinkSync(sourceDir, targetDir, "dir");
      } catch (error) {
        console.warn(
          `Failed to create symbolic link, attempting to copy: ${instance.categoryFolder}/${instance.id}`
        );
        copyFolderRecursiveSync(sourceDir, targetDir);
      }
    }
  }

  console.log("\nNote: Instance data preparation completed");
}

// Recursively copy folder
function copyFolderRecursiveSync(source, target) {
  // Create target folder with parent directories
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
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
