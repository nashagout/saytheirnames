import React, { useState, useEffect, useMemo, Fragment } from "react";
import useKeyPress from "hooks/useKeyPress";
import type { TagType, IdType } from "types/common";

type Props = {
  data: any;
  selectedItems?: TagType[];
  onSelect: (param: TagType) => void;
};
enum CatKeys {
  Ethnic = "e",
  Cod = "c",
}

const CAT_LABELS: { [key: string]: string } = {
  [CatKeys.Ethnic]: "Ethicities",
  [CatKeys.Cod]: "City of death",
};

const CAT_ORDER: { [key: string]: number } = {
  [CatKeys.Ethnic]: 300,
  [CatKeys.Cod]: 200,
};
function List({ data = [], selectedItems, onSelect }: Props) {
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(-1);
  const [hovered, setHovered] = useState<IdType | undefined>(undefined);

  const isCursorItemDisabled = useMemo(() => {
    const index = selectedItems?.findIndex(
      ({ id }) => id === data[cursor]?.item?.id
    );
    return selectedItems && index !== -1;
  }, [cursor, data, selectedItems]);

  useEffect(() => {
    if (data.length && downPress) {
      setCursor((prevState) =>
        prevState < data.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [data.length, downPress]);

  useEffect(() => {
    if (data.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [data.length, upPress]);

  useEffect(() => {
    if (cursor !== -1 && data.length && !isCursorItemDisabled && enterPress) {
      setCursor(-1);
      onSelect(data[cursor].item);
    }
  }, [cursor, data, enterPress, isCursorItemDisabled, onSelect]);

  useEffect(() => {
    if (data.length && hovered) {
      setCursor(data.indexOf(hovered));
    }
  }, [data, hovered]);

  const categorizedResult = data.reduce((p: any, c: any) => {
    const cat = c.item.id.split("_")[0];
    return {
      ...p,
      [cat]: p?.[cat] ? [...p[cat], c] : [c],
    };
  }, {});

  return (
    <>
      {data?.[0] && (
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-full border-b border-primary bg-base-300 shadow-xl  "
        >
          {Object.keys(categorizedResult).map((key) => {
            return (
              <Fragment key={CAT_LABELS[key]}>
                <li key={CAT_LABELS[key]} className=" menu-title ">
                  <span>{CAT_LABELS[key]}</span>
                </li>
                {categorizedResult[key]
                  .sort((a: number, b: number) => CAT_ORDER[a] > CAT_ORDER[b])
                  .map(({ item }: { item: TagType }) => {
                    const index = selectedItems?.findIndex(
                      ({ id }) => id === item.id
                    );
                    const disabled = selectedItems && index !== -1;
                    return (
                      <li key={`${key}-${item.id}`}>
                        <button
                          className={`hover:bg-primary-focus disabled:cursor-default disabled:hover:bg-gray-900 ${
                            item.id === data[cursor]?.item?.id &&
                            "bg-primary-focus"
                          } disabled:text-gray-700`}
                          disabled={disabled}
                          onClick={() => {
                            if (!disabled) {
                              onSelect(item);
                            }
                          }}
                          onMouseEnter={() => !disabled && setHovered(item.id)}
                          onMouseLeave={() =>
                            !disabled && setHovered(undefined)
                          }
                        >
                          {item.label}
                          {item?.p && (
                            <div className={`badge badge-sm`}>{item.p}</div>
                          )}
                        </button>
                      </li>
                    );
                  })}
              </Fragment>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default List;
