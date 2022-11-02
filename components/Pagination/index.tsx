import React from "react";

type PaginationProps = {
  previous: () => void;
  next: () => void;
  active: number;
};

function Pagination({ previous, next, active }: PaginationProps) {
  return (
    <div className="btn-group">
      <button onClick={previous} className="btn btn-xs">
        «
      </button>
      <button className="btn btn-xs">Page {active}</button>
      <button onClick={next} className="btn btn-xs">
        »
      </button>
    </div>
  );
}

export default Pagination;
