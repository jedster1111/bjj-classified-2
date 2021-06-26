import { useState, useEffect } from "react";
import { RequestResponses, NetworkError, RequestError } from "../api/doFetch";

export const useFetch = <Data>(
  makeRequest: () => Promise<RequestResponses<Data>>,
  dependencies: unknown[] = []
) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<NetworkError | RequestError>();
  const [isLoading, setIsLoading] = useState(true);

  let isMounted = true;
  useEffect(() => {
    const doRequest = async () => {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);
      const response = await makeRequest();

      if (isMounted) {
        if (
          response.type === "networkFailure" ||
          response.type === "requestError"
        ) {
          setError(response);
        }

        if (response.type === "requestSuccess") {
          setData(response.data);
        }

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
