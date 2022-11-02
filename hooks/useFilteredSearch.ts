import { useMemo } from "react";
import useSearch from "hooks/useSearch";
import type { TagType, SearchValueType } from "types/common";

export const CAT_KEYS: { [key: string]: string } = {
  e: "ethnicity",
  c: "cod",
  n: "name",
};

function useFilteredSearch<
  Tag = TagType,
  DataType = Record<string, TagType>[]
>({
  data,
  search,
}: {
  data: DataType[];
  search?: SearchValueType;
}): {
  result: DataType[];
  filteredData: DataType[];
  categorizedTags: Record<string, Tag[]>;
  count: number;
} {
  const categorizedTags = useMemo(
    () =>
      search?.tags?.reduce((p: any, c: any) => {
        const cat = c.id.split("_")[0];
        return {
          ...p,
          [CAT_KEYS[cat]]: p?.[cat] ? [...p[cat], c] : [c],
        };
      }, {}),
    [search?.tags]
  );

  const filteredData = useMemo(() => {
    if (!categorizedTags) return data;
    return Object.keys(categorizedTags).reduce((p, c: string) => {
      const result = p.filter((item: any) => {
        const index = search?.tags?.findIndex((tag: any) => tag.id === item[c]);
        return index !== -1;
      });
      return result;
    }, data);
  }, [categorizedTags, data, search?.tags]);
  const { flatResult, noResult } = useSearch<DataType>({
    data: filteredData,
    term: search?.term,
    options: {
      keys: ["_fn", "_cod.label", "_e.label"],
    },
  });
  return {
    result: flatResult,
    count: flatResult.length,
    categorizedTags,
    filteredData,
  };
}

export default useFilteredSearch;
