import type { Instance, FilterState } from "../types";

export const filterInstances = (
  instances: Instance[],
  filters: FilterState
): Instance[] => {
  return instances.filter((instance) => {
    // Filter by search text
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const matchesSearch =
        instance.name.toLowerCase().includes(searchLower) ||
        instance.material.toLowerCase().includes(searchLower) ||
        instance.model.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Filter by category
    if (filters.category !== null) {
      if (instance.category !== filters.category) {
        return false;
      }
    }

    // Filter by hasGlass
    if (filters.hasGlass !== null) {
      if (instance.metadata.hasGlass !== filters.hasGlass) {
        return false;
      }
    }

    // Note: Image type filtering is handled at the Gallery component level
    // since all instances have all image types

    return true;
  });
};
