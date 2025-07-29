export type Category = 'household' | 'industry' | 'art' | 'nature';

export type ImageType = 'rgb' | 'depth' | 'normal' | 'mask';

export interface InstanceMetadata {
  hasGlass: boolean;
  isGenerated: boolean;
  transparent: boolean;
}

export interface Instance {
  id: string;
  name: string;
  category: Category;
  categoryFolder: string;
  material: string;
  model: string;
  environment: string;
  preview: string;
  images: {
    rgb: string[];
    depth: string[];
    normal: string[];
    mask: string[];
  };
  frameCount: number;
  metadata: InstanceMetadata;
}

export interface InstancesData {
  instances: Instance[];
  categories: Category[];
  totalInstances: number;
  lastUpdated: string;
}

export interface FilterState {
  category: Category | null;
  imageType: ImageType | null;
  searchText: string;
  hasGlass: boolean | null;
}

export const IMAGE_TYPE_LABELS: Record<ImageType, string> = {
  rgb: 'RGB',
  depth: 'Depth',
  normal: 'Normal',
  mask: 'Mask'
};

export const CATEGORY_LABELS: Record<Category, string> = {
  household: 'Household',
  industry: 'Industry',
  art: 'Art',
  nature: 'Nature'
};

export const IMAGE_TYPE_FOLDERS: Record<ImageType, string> = {
  rgb: 'train',
  depth: 'depth',
  normal: 'normal',
  mask: 'mask'
};

// Environment Map Types
export interface EnvironmentMap {
  id: string;
  name: string;
  path: string;
  format: 'exr';
  thumbnail?: string;
}

export interface EnvironmentMapsData {
  environments: EnvironmentMap[];
  totalEnvironments: number;
  lastUpdated: string;
}

// LiDAR Scan Types
export interface LidarScan {
  id: string;
  name: string;
  frameCount: number;
  frames: string[];
  preview: string;
  firstFrame: string;
  lastFrame: string;
}

export interface LidarData {
  lidars: LidarScan[];
  totalLidars: number;
  lastUpdated: string;
}