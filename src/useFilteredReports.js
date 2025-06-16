import { useEffect, useState } from 'react';
import { fetchFilteredReports } from './filterReports';

/**
 * React hook to load report data when filters change.
 * @param {Object} filters
 * @returns {{data: any, error: any, loading: boolean}}
 */
export function useFilteredReports(filters) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchFilteredReports(filters).then(({ data, error }) => {
      if (isMounted) {
        setData(data);
        setError(error);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(filters)]);

  return { data, error, loading };
}

