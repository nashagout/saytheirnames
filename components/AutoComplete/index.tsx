import React, { useEffect, useMemo } from "react";
import List from "./components/List";
import useSearch from "hooks/useSearch";
import { useRouter } from "next/router";
import usePrevious from "hooks/usePrevious";
import useUncontrolled from "hooks/useUncontrolled";
import type { TagType, TagListType, SearchValueType } from "types/common";

type Props = {
  data: TagListType;
  onChange: (params?: SearchValueType) => void;
  className?: string;
  initialValue?: SearchValueType;
  value?: SearchValueType;
};

function AutoComplete({
  data,
  onChange,
  className,
  value: valueProp,
  initialValue,
}: Props) {
  const [value, setValue] = useUncontrolled<SearchValueType>({
    value: valueProp,
    onChange,
  });
  const router = useRouter();

  const initialSearch = useMemo(() => {
    const { term, tagIds } = router.query;
    const tags =
      typeof tagIds === "string"
        ? [{ id: tagIds }]
        : tagIds?.map((id) => ({
            id,
          }));
    return router.isReady
      ? ({
          term,
          tags,
        } as SearchValueType)
      : undefined;
  }, [router]);
  const prevInitialSearch = usePrevious(initialSearch);
  useEffect(() => {
    if (!prevInitialSearch && initialSearch) {
      setValue(initialSearch);
    }
  }, [initialSearch, prevInitialSearch, setValue]);

  const { result } = useSearch<TagType>({ data, term: value?.term });

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchInputValue = e.target.value;
    setValue({ ...value, term: searchInputValue });
  }

  function handleItemSelect(tag: TagType) {
    const updatedValue = {
      term: "",
      tags: [...(value?.tags ? value.tags : []), tag],
    };
    setValue(updatedValue);
  }

  function handleTagClick(id: string | number) {
    const updatedValue = {
      ...value,
      tags: value?.tags?.filter((item) => item.id !== id),
    };
    setValue(updatedValue);
  }

  return (
    <div className={className}>
      <div className="dropdown w-full ">
        <div className="">
          <input
            value={value?.term}
            onChange={handleSearchTermChange}
            type="text"
            placeholder="Search here"
            className="input input-lg w-full border-accent-focus text-accent placeholder:text-accent "
          />
        </div>
        <div className="tags py-1">
          {value?.tags?.map((item) => {
            const label =
              item?.label || data.find(({ id }) => id === item.id)?.label;
            return (
              <button
                key={item.id}
                onClick={() => handleTagClick(item.id)}
                className="btn-xs btn mx-0.5 uppercase "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="mr-1 inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {label}
              </button>
            );
          })}
        </div>
        <List
          data={result}
          selectedItems={value?.tags}
          onSelect={handleItemSelect}
        />
      </div>
    </div>
  );
}

export default AutoComplete;
