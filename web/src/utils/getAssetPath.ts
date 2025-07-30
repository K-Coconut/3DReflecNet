// 图片资源基础 URL（从环境变量读取）
const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || '';

// 判断路径是否为图片资源
const isImageAsset = (path: string): boolean => {
  return path.includes('instances/') || 
         path.includes('environments/') || 
         path.includes('lidars/');
};

export const getAssetPath = (path: string | null | undefined): string => {
  // Handle null or undefined paths
  if (!path) {
    return '';
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // 如果是图片资源且配置了外部 URL，使用外部 URL
  if (ASSETS_BASE_URL && isImageAsset(cleanPath)) {
    return `${ASSETS_BASE_URL}/${cleanPath}`;
  }
  
  // 其他情况使用原有逻辑
  // In development, use absolute path
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, prepend base URL
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${cleanPath}`;
};