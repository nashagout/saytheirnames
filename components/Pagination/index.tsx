import React from "react";

type PaginationProps = {
  previous: () => void;
  next: () => void;
  active: number;
};

function Pagination({ previous, next, active }: PaginationProps) {
  return (
    <div className="btn-group">
      <button onClick={previous} className="btn-xs btn">
        «
      </button>
      <button className="btn-xs btn uppercase">Page {active}</button>
      <button onClick={next} className="btn-xs btn">
        »
      </button>
    </div>
  );
}

export default Pagination;
