import { useState, useEffect } from "react";
import type { LidarData } from "../types";
import { getAssetPath } from "../utils/getAssetPath";

interface UseLidarsDataReturn {
  data: LidarData | null;
  loading: boolean;
  error: string | null;
}

export const useLidarsData = (): UseLidarsDataReturn => {
  const [data, setData] = useState<LidarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(getAssetPath("lidars.json"));

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