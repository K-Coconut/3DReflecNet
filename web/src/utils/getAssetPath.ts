export const getAssetPath = (path: string | null | undefined): string => {
  // Handle null or undefined paths
  if (!path) {
    return '';
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development, use absolute path
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, prepend base URL
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${cleanPath}`;
};