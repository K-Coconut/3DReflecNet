import { useState, useEffect } from "react";
import type { EnvironmentMapsData } from "../types";

interface UseEnvironmentsDataReturn {
  data: EnvironmentMapsData | null;
  loading: boolean;
  error: string | null;
}

export const useEnvironmentsData = (): UseEnvironmentsDataReturn => {
  const [data, setData] = useState<EnvironmentMapsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/src/data/environments.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const environments = await response.json();
        
        // Transform the data to match the expected format
        const environmentsData: EnvironmentMapsData = {
          environments: environments,
          totalEnvironments: environments.length,
          lastUpdated: new Date().toISOString()
        };
        
        setData(environmentsData);
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