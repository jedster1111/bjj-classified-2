import { useState, useEffect } from "react";

export const useFetch = <T>(
  makeRequest: () => Promise<T>,
  dependencies: unknown[] = []
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  let isMounted = true;
  useEffect(() => {
    const doRequest = async () => {
      try {
        setIsLoading(true);
        const response = await makeRequest();

        if (isMounted) {
          setData(response);
          setError(undefined);
          setIsLoading(false);
        }
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };

    doRequest();

    return () => {
      isMounted = false;
    };
  }, [...dependencies]);

  return { data, error, isLoading };
};
