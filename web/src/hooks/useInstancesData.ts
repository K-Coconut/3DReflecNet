import { useState, useEffect } from "react";
import type { InstancesData } from "../types";
import { getAssetPath } from "../utils/getAssetPath";

interface UseInstancesDataReturn {
  data: InstancesData | null;
  loading: boolean;
  error: string | null;
}

export const useInstancesData = (): UseInstancesDataReturn => {
  const [data, setData] = useState<InstancesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(getAssetPath("instances.json"));

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
