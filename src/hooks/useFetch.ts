import { useEffect, useMemo, useState } from 'react';
import { handleFetch } from '../services/pokemonService';

export default function useFetch<T>(endpoint: string) {
  const [fetchHookData, setFetchHookData] = useState<T | null>(null);
  const [fetchHookError, setFetchHookError] = useState<T | null>(null);
  const [fetchHookLoading, setFetchHookLoading] = useState<T | boolean>(false);
  const handleMemoizedFetch = useMemo(
    (): Promise<any> => handleFetch(endpoint),
    [endpoint],
  );

  useEffect(() => {
    (async function (): Promise<void> {
      try {
        setFetchHookLoading(true);
        const data = await handleMemoizedFetch;
        setFetchHookData(data);
      } catch (err) {
        setFetchHookError(err as T);
      } finally {
        setFetchHookLoading(false);
      }
    })();
  }, [endpoint]);

  return { fetchHookData, fetchHookError, fetchHookLoading };
}
