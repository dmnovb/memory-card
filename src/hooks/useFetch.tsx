import { useState, useEffect } from "react";
export const useFetch = (url: string, elements: number) => {
  const [response, setResponse] = useState<Array<object>>([]);

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => setResponse(data.results.splice(0, elements)));
  }, [url, elements]);

  return { response };
};
