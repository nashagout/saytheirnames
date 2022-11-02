import React, { useMemo } from "react";
import Card from "components/Card";
import { NameType, SearchValueType } from "types/common";
import usePagination from "hooks/usePagination";
import Pagination from "components/Pagination";
import { useEffect } from "react";

type CardListProps = {
  data: NameType[];
  loading: boolean;
  search?: SearchValueType;
};

function CardList({ data, loading, search }: CardListProps) {
  const hasSearch = search?.term || search?.tags?.[0];

  const noResult = hasSearch && !data?.[0];

  const cols = 6;
  const pageSize = cols * 7;
  const totalPages = Math.ceil(data.length / pageSize);

  const { range, active, previous, next, setPage } = usePagination({
    total: totalPages,
    initialPage: 1,
  });

  const paginatedData = useMemo<Record<number, NameType[]>>(
    () =>
      range.reduce((a, c, i) => {
        const u = [...data];
        return { ...a, [c]: u.splice(i * pageSize, pageSize) };
      }, {}),
    [data, pageSize, range]
  );

  useEffect(() => {
    setPage(1);
  }, [data]);

  return (
    <>
      {!loading ? (
        <>
          {noResult ? (
            <div className=" text-center">
              <div className="divider">
                <h1 className=" text-base">No result for your search </h1>
              </div>
            </div>
          ) : (
            <>
              <div className="m-5 flex flex-row-reverse">
                <Pagination next={next} previous={previous} active={active} />
              </div>
              <div
                className={`grid grid-cols-2 gap-1 px-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`}
              >
                {paginatedData?.[active]?.map((data, i) => {
                  return <Card key={i} data={data} id={i} />;
                })}
              </div>
              <div className="m-5 flex flex-row-reverse">
                <Pagination next={next} previous={previous} active={active} />
              </div>
            </>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default CardList;
