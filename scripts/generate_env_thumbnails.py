#!/usr/bin/env python3
"""
Generate thumbnails for EXR environment maps
Requires: pip install opencv-python numpy
"""

import os
os.environ["OPENCV_IO_ENABLE_OPENEXR"] = "1"
import cv2
import numpy as np
from pathlib import Path

def generate_thumbnail(exr_path, output_path, size=(400, 225)):
    """Generate a thumbnail from an EXR file"""
    try:
        # Read EXR file
        img = cv2.imread(str(exr_path), cv2.IMREAD_ANYCOLOR | cv2.IMREAD_ANYDEPTH)
        if img is None:
            print(f"Failed to read {exr_path}")
            return False
        
        # Convert to 8-bit for display
        # Apply tone mapping for HDR to LDR conversion
        # Use percentile-based normalization to handle HDR better
        percentile_low = np.percentile(img, 1)
        percentile_high = np.percentile(img, 99)
        
        # Clip and normalize
        img_clipped = np.clip(img, percentile_low, percentile_high)
        img_normalized = (img_clipped - percentile_low) / (percentile_high - percentile_low)
        
        # Apply gamma correction for better visibility
        gamma = 2.2
        img_gamma = np.power(img_normalized, 1.0 / gamma)
        
        # Convert to 8-bit
        img_8bit = (img_gamma * 255).astype(np.uint8)
        
        # Resize to thumbnail size
        thumbnail = cv2.resize(img_8bit, size, interpolation=cv2.INTER_AREA)
        
        # Convert BGR to RGB if needed
        if len(thumbnail.shape) == 3:
            thumbnail = cv2.cvtColor(thumbnail, cv2.COLOR_BGR2RGB)
        
        # Save as PNG
        cv2.imwrite(str(output_path), cv2.cvtColor(thumbnail, cv2.COLOR_RGB2BGR))
        return True
        
    except Exception as e:
        print(f"Error processing {exr_path}: {e}")
        return False

def main():
    # Paths
    script_dir = Path(__file__).parent
    environments_dir = script_dir.parent / "environments"
    thumbnails_dir = environments_dir / "thumbnails"
    
    # Also create thumbnails in web public directory if it exists
    web_thumbnails_dir = script_dir.parent / "web" / "public" / "environments" / "thumbnails"
    
    # Create thumbnails directories
    thumbnails_dir.mkdir(exist_ok=True)
    if web_thumbnails_dir.parent.exists():
        web_thumbnails_dir.mkdir(parents=True, exist_ok=True)
    
    # Process all EXR files
    exr_files = list(environments_dir.glob("*.exr"))
    print(f"Found {len(exr_files)} EXR files")
    
    success_count = 0
    for exr_file in exr_files:
        output_file = thumbnails_dir / f"{exr_file.stem}.png"
        print(f"Processing {exr_file.name}...")
        
        if generate_thumbnail(exr_file, output_file):
            success_count += 1
            print(f"  ✓ Generated {output_file.name}")
            
            # Also save to web public directory if it exists
            if web_thumbnails_dir.exists():
                web_output_file = web_thumbnails_dir / f"{exr_file.stem}_thumb.png"
                import shutil
                shutil.copy2(output_file, web_output_file)
        else:
            print("  ✗ Failed to generate thumbnail")
    
    print(f"\nCompleted! Generated {success_count}/{len(exr_files)} thumbnails")

if __name__ == "__main__":
    main()