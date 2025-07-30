// Utility to get the correct path for public assets when using a base path
export const getPublicAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production with base path, we need to prepend the base
  // In development, Vite handles this automatically
  const base = import.meta.env.BASE_URL || '/';
  
  return `${base}${cleanPath}`;
};