import { useMemo } from "react";
import Fuse from "fuse.js";

function useSearch<T>({
  data,
  term = "",
  options: optionsProp,
}: {
  data: T[];
  term?: string;
  options?: Partial<Fuse.FuseSearchOptions> & { keys?: string[] };
}): { result: Fuse.FuseResult<T>[]; flatResult: T[]; noResult: boolean } {
  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      includeMatches: false,
      findAllMatches: false,
      minMatchCharLength: 2,
      threshold: 0.3,
      keys: ["p", "label"],
      ...optionsProp,
    };
    return new Fuse(data, options);
  }, [data, optionsProp]);

  const result = fuse.search<T>(term);
  const noResult = result.length == 0;
  const flatResult = useMemo(
    () => (term ? result.map((v) => v.item) : data),
    [data, result, term]
  );

  return { result, flatResult, noResult };
}

export default useSearch;
